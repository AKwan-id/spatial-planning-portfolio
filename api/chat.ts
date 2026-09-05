export const config = {
    runtime: 'edge',
};

import { GoogleGenAI } from '@google/genai';

const rateLimitMap = new Map<string, { count: number, timestamp: number }>();

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';
        const now = Date.now();
        const limitWindow = 60000; // 1 minute window
        const userRate = rateLimitMap.get(clientIp) || { count: 0, timestamp: now };

        if (now - userRate.timestamp > limitWindow) {
            userRate.count = 1;
            userRate.timestamp = now;
        } else {
            userRate.count++;
        }

        rateLimitMap.set(clientIp, userRate);

        if (userRate.count > 10) { // Max 10 messages per minute
            return new Response(JSON.stringify({ error: 'Terlalu banyak pesan. Mohon tunggu sesaat.' }), { status: 429 });
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'AI Gateway not configured (missing GEMINI_API_KEY)' }), { status: 503 });
        }

        const body = await req.json();
        const { contents } = body;

        const rawBodySize = new TextEncoder().encode(JSON.stringify(body)).length;
        if (rawBodySize > 50000) {
            return new Response(JSON.stringify({ error: 'Payload too large' }), { status: 413 });
        }

        if (!contents || !Array.isArray(contents)) {
            return new Response(JSON.stringify({ error: 'Invalid input payload' }), { status: 400 });
        }

        const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
        const isStream = req.headers.get('accept') === 'text/event-stream';

        if (isStream) {
            const stream = await ai.models.generateContentStream({
                model: 'gemini-3.6-flash',
                contents: contents,
                config: {
                    systemInstruction: body.systemInstruction?.parts?.text,
                    temperature: body.generationConfig?.temperature || 0.3
                }
            });

            // Convert async iterable to ReadableStream for Edge
            const readable = new ReadableStream({
                async start(controller) {
                    try {
                        for await (const chunk of stream) {
                            const data = `data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: chunk.text }] } }] })}\n\n`;
                            controller.enqueue(new TextEncoder().encode(data));
                        }
                        controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
                        controller.close();
                    } catch (error) {
                        console.error('Stream error:', error);
                        controller.error(error);
                    }
                }
            });

            return new Response(readable, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3.6-flash',
            contents: contents,
            config: {
                systemInstruction: body.systemInstruction?.parts?.text,
                temperature: body.generationConfig?.temperature || 0.3
            }
        });

        return new Response(JSON.stringify({
            candidates: [{ content: { parts: [{ text: response.text }] } }]
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Chat Gateway Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error?.message }), { status: 500 });
    }
}
