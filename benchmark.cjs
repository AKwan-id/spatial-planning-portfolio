const https = require('https');

const data = JSON.stringify({
    systemInstruction: { parts: { text: "Anda adalah Asisten portofolio. Jawablah singkat 'Halo juga!' jika disapa." } },
    contents: [{ role: "user", parts: [{ text: "Halo" }] }],
    generationConfig: { temperature: 0.3 }
});

const options = {
    hostname: 'annisa-portofolio-beta.vercel.app',
    port: 443,
    path: '/api/chat',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        'Content-Length': data.length
    }
};

const startTime = Date.now();
console.log('Sending request...');

const req = https.request(options, (res) => {
    console.log(`\nStatus Code: ${res.statusCode}`);
    console.log(`Time to headers: ${Date.now() - startTime}ms`);

    res.on('data', (chunk) => {
        const time = Date.now() - startTime;
        console.log(`[${time}ms] Received chunk: ${chunk.length} bytes -> ${chunk.toString().substring(0, 30).trim()}`);
    });

    res.on('end', () => {
        console.log(`\nStream ended at: ${Date.now() - startTime}ms`);
    });
});

req.on('error', (error) => {
    console.error('Error:', error);
});

req.write(data);
req.end();
