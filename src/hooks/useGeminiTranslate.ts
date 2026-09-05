import { useState } from 'react';

export const useGeminiTranslate = () => {
    const [isTranslating, setIsTranslating] = useState(false);
    const [streamingText, setStreamingText] = useState('');
    const [error, setError] = useState<string | null>(null);

    const translateToEnglish = async (textToTranslate: string): Promise<string | null> => {
        if (!textToTranslate.trim()) return null;

        setIsTranslating(true);
        setStreamingText('');
        setError(null);

        try {
            const systemPrompt = `You are a professional translator for an executive portfolio.
Translate the following Indonesian text to highly professional, objective, and elegant English.
Return ONLY the translated text. Do not include any quotes, markdown formatting, explanations, or introductory text. Just the raw translated string.`;

            const contents = [
                {
                    role: 'user',
                    parts: [{ text: textToTranslate }]
                }
            ];

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream'
                },
                body: JSON.stringify({
                    systemInstruction: { parts: { text: systemPrompt } },
                    contents: contents,
                    generationConfig: { temperature: 0.1 }
                })
            });

            if (!response.ok) {
                throw new Error('Failed to translate');
            }

            if (!response.body) throw new Error('No streaming body found');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedText = '';
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (!trimmedLine) continue;
                    if (trimmedLine === 'data: [DONE]') break;
                    if (trimmedLine.startsWith('data: ')) {
                        try {
                            const rawData = trimmedLine.replace('data: ', '');
                            const data = JSON.parse(rawData);
                            const textPart = data.candidates?.[0]?.content?.parts?.[0]?.text;
                            if (textPart) {
                                accumulatedText += textPart;
                                setStreamingText(accumulatedText);
                            }
                        } catch (e) {
                            console.error('Error parsing SSE chunk:', e);
                        }
                    }
                }
            }

            return accumulatedText.trim();
        } catch (err: any) {
            console.error('Translation error:', err);
            setError(err.message || 'Failed to translate. Please try again.');
            return null;
        } finally {
            setIsTranslating(false);
            setStreamingText('');
        }
    };

    return { translateToEnglish, isTranslating, streamingText, error };
};
