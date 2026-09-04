# Panduan Pembaruan Sistem (Upgrade Guide)

Arsitektur portofolio ini menganut konsep *bongkar-pasang* (plug-and-play) untuk kemudahan migrasi layanan tanpa perlu merombak ulang kode sumber.

## Mengganti AI Provider
Saat ini sistem terhubung ke *Google Gemini Free Tier*. Jika di masa depan ingin menggunakan GPT-4, Claude, atau Gemini versi berbayar:
1. Tidak perlu menyentuh antarmuka di `AKwanAgent.tsx`.
2. Buka `api/chat.ts` (Gateway AI Vercel).
3. Ganti endpoint dan _payload formatting_ lokal di dalamnya.
4. Masukkan _API Key_ baru di Vercel.

## Peningkatan Hosting
Aplikasi bersifat ringan sebagai *Single Page Application (SPA)* berbasis React/Vite. 
- Dapat dipindahkan ke AWS, Netlify, Cloudflare Pages, atau VPS Nginx hanya dengan melakukan instruksi `npm run build` dan menyalin isi folder `dist/`.
- Jika menggunakan hosting non-Vercel, _Vercel Serverless Function_ (`api/chat.ts`) sebaiknya dipindahkan ke server Express terpisah atau Cloudflare Workers.

## Perubahan Domain
1. Pastikan domain baru Anda aktif (misal `https://annisanurprabawa.com`).
2. Buka *Environment Variables* di Vercel, ubah `SITE_URL`.
3. Buka **Google Cloud Console**, perbarui _Authorized Redirect URI_ Autentikasi Google ke domain baru.
4. Sistem akan otomatis menyesuaikan *Callback URL* untuk Supabase Auth.
