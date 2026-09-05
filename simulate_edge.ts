import handler from './api/chat.js';

// We must compile it on the fly or just run the logic directly because edge functions use standard Request/Response.
async function test() {
    process.env.GEMINI_API_KEY = "DUMMY_KEY_SPACES_OR_NOT";

    // Simulating the exact payload that errored 500 earlier
    const mockRequest = new Request("https://mock.com/api/chat", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        },
        body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: "hello" }] }]
        })
    });

    console.log('Sending mock request to edge handler...');
    try {
        const response = await handler(mockRequest);
        console.log('Status:', response.status);
        console.log('Headers:', Object.fromEntries(response.headers.entries()));
        const bodyText = await response.text();
        console.log('Body:', bodyText);
    } catch (e) {
        console.error('CRITICAL UNHANDLED EXCEPTION IN HANDLER:', e);
    }
}

test();
