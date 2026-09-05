import { useState } from 'react';

export const useGeminiTranslate = () => {
    const [isTranslating, setIsTranslating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const translateToEnglish = async (textToTranslate: string): Promise<string | null> => {
        if (!textToTranslate.trim()) return null;

        setIsTranslating(true);
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
                    // Do NOT pass Accept: 'text/event-stream' so we get standard JSON back
                },
                body: JSON.stringify({
                    systemInstruction: { parts: { text: systemPrompt } },
                    contents: contents,
                    generationConfig: { temperature: 0.1 } // Very low temp for deterministic translation
                })
            });

            if (!response.ok) {
                throw new Error('Failed to translate');
            }

            const data = await response.json();
            const translatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

            return translatedText.trim();
        } catch (err: any) {
            console.error('Translation error:', err);
            setError(err.message || 'Failed to translate. Please try again.');
            return null;
        } finally {
            setIsTranslating(false);
        }
    };

    return { translateToEnglish, isTranslating, error };
};
