
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("NO API KEY in .env");
    process.exit(1);
}

const GEMINI_MODEL = 'gemini-1.5-flash';

async function testFetch() {
    const GOOGLE_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

    const res = await fetch(GOOGLE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Hello' }] }],
        })
    });

    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Body:", text);
}

testFetch();
