# Panduan Konfigurasi Keamanan (Security Setup) 

## 1. Setup Supabase & Database
1. Buat proyek baru di [Supabase](https://supabase.com/).
2. Copy Project URL dan Anon/Publishable Key ke `VITE_SUPABASE_URL` dan `VITE_SUPABASE_PUBLISHABLE_KEY` di Environment Variables Vercel.
3. Salin isi `supabase/migrations/00000000000000_initial_schema.sql` dan jalankan di Supabase **SQL Editor**.

## 2. Setup Google Sign-In
1. Masuk ke Google Cloud Console, buat klien OAuth (Web Application).
2. Masukkan Authorized redirect URIs: `https://[SUPABASE-PROJECT-ID].supabase.co/auth/v1/callback`
3. Buka **Supabase -> Authentication -> Providers -> Google**.
4. Aktifkan dan tempelkan Client ID serta Client Secret dari Google.
Jangan masukkan Client Secret ke GitHub atau source code.

## 3. Bootstrap Administrator Pertama
Karena akses dashboard dilindungi oleh RLS yang ketat, Anda harus mendaftarkan akun admin pertama secara manual ke tabel `admin_users` agar bisa mendaftarkan akun lain melalui aplikasi nantinya.

1. Buka Supabase -> Authentication -> Users. Pastikan Anda sudah mencoba login sekali via `/owner` lalu salin `User UID` Anda.
2. Buka Supabase -> SQL Editor, lalu jalankan:
   ```sql
   INSERT INTO public.admin_users (id) VALUES ('YOUR-USER-UID-DISINI');
   ```
3. Sekarang akun Anda memiliki hak akses penuh!

## 4. Konfigurasi Vercel & AI
Buka dashboard Vercel -> Settings -> Environment Variables, lalu setup:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `GEMINI_API_KEY` (Tanpa awalan VITE_! Vercel Function Serverless akan membacanya secara backend-only)
- `SITE_URL`
