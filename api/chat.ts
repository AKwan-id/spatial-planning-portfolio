export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return new Response(JSON.stringify({ error: 'AI Gateway not configured (missing GEMINI_API_KEY)' }), { status: 503 });
        }

        // Rate Limiting (Vercel Serverless free tier without KV)
        // Production integration with Upstash Redis or Vercel Edge Config should be inserted here
        // const clientIp = req.headers.get('x-forwarded-for') || '127.0.0.1';

        const body = await req.json();
        const { contents } = body;

        // Reject inputs > 50kb
        const rawBodySize = new TextEncoder().encode(JSON.stringify(body)).length;
        if (rawBodySize > 50000) {
            return new Response(JSON.stringify({ error: 'Payload too large' }), { status: 413 });
        }

        if (!contents || !Array.isArray(contents)) {
            return new Response(JSON.stringify({ error: 'Invalid input payload' }), { status: 400 });
        }

        // Proxy securely to Google's REST API for SSE Streaming
        const GEMINI_MODEL = 'gemini-1.5-flash';
        const isStream = req.headers.get('accept') === 'text/event-stream';

        // We append the key to URL securely server-side
        const endpoint = isStream ? 'streamGenerateContent?alt=sse' : 'generateContent';
        const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:${endpoint}&key=${apiKey}`;

        // Workaround for URL parsing issue with ampersand insertion, we must use ?key=
        const GOOGLE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:${isStream ? 'streamGenerateContent?alt=sse&key=' : 'generateContent?key='
            }${apiKey}`;

        const googleRes = await fetch(GOOGLE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents,
                generationConfig: body.generationConfig,
                systemInstruction: body.systemInstruction
            })
        });

        if (!googleRes.ok) {
            const text = await googleRes.text();
            console.error('Google API Error:', text);
            return new Response(JSON.stringify({ error: 'upstream_error' }), { status: 502 });
        }

        if (isStream) {
            return new Response(googleRes.body, {
                headers: {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

        // Non-stream fallback (e.g. initial quick sync checks)
        const jsonRes = await googleRes.json();
        return new Response(JSON.stringify(jsonRes), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Chat Gateway Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
