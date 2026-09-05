import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Local Proxy added for Vercel API Gateway mimicking
      proxy: {
        '/api/chat': {
          target: 'https://generativelanguage.googleapis.com',
          changeOrigin: true,
          secure: false,
          rewrite: (path, req) => {
            const isStream = req?.headers?.accept === 'text/event-stream';
            const endpoint = isStream ? 'streamGenerateContent?alt=sse' : 'generateContent';
            const apiKey = env.GEMINI_API_KEY || '';
            return `/v1beta/models/gemini-1.5-flash:${endpoint}${isStream ? '&' : '?'}key=${apiKey}`;
          },
        },
      },
    },
  };
});
