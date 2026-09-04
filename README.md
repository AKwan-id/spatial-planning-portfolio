# Spatial Planning Portfolio

Portofolio profesional interaktif untuk menyajikan profil, kompetensi, proyek, pengalaman, sertifikat, dan CV di bidang Perencanaan Tata Ruang dan Administrasi Pertanahan.

## Ringkasan Arsitektur

Spatial Planning Portfolio merupakan *single-page application* modern berbasis React dan TypeScript. Aplikasi dibekali sistem CMS terintegrasi (Content Management System) yang dikelola melalui Dashboard Administrator khusus dengan autentikasi keamanan tingkat tinggi.

### Teknologi Utama
- **Frontend Layer:** React 19, TypeScript, Tailwind CSS v4, Lucide React
- **Backend & Database:** Supabase POSTGRES (Data storage), Supabase Auth (Google OAuth)
- **Security:** RLS (Row Level Security) Enforcement, Strict Admin Policies, Vercel Serverless Functions
- **Deployment:** Vercel serverless platform

## Fitur Utama

- **Real-time CMS:** Modul pengelolaan *(CRUD)* langsung dari dalam *browser* (tersedia melalui `/owner`) dengan akses yang terenkripsi oleh otentikasi Google.
- **Sistem Bilingual:** Dukungan bahasa aktif antara `ID` dan `ENG` yang terintegrasi di seluruh komponen portofolio, mempermudah akses tingkat global.
- **Dynamic Theming:** Palet warna kustom (*Sakura Pink*) dengan latar animasi *Cinematic Canvas* berlapis yang merespons pergerakan `scroll` pengguna.
- **Responsive Architecture:** Antarmuka responsif yang teroptimasi secara presisi baik untuk layar desktop ultra lebar maupun *mobile viewport*.
- **Role-based Authentication:** Akses kontrol admin yang diotorisasi khusus dengan `admin_users` whitelist di Supabase Database.

## Panduan Setup Development

### 1. Kebutuhan Environment Variables
Salin konfigurasi kunci berikut pada `.env` atau Vercel Environment Variables:
```env
VITE_SUPABASE_URL="https://[PROJECT-ID].supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="[SUPABASE-ANON-KEY]"
GEMINI_API_KEY="[SERVER-SIDE-API-KEY]"
```

### 2. Pemasangan & Persiapan Database (Supabase)
Jalankan skrip inisialisasi tabel SQL dari `SECURITY_SETUP.md` di Editor SQL Supabase untuk mengatur *Row Level Security* (RLS). Pastikan layanan *Google Auth Provider* aktif (Enabled).

### 3. Instalasi Repository Lokal
```bash
git clone https://github.com/AKwan-id/spatial-planning-portfolio.git
cd spatial-planning-portfolio
npm ci
npm run dev
```

## Mekanisme Ekspor & Impor Data
Data aplikasi yang lama (berbasis `localStorage`) dapat diunggah / dipindahkan ke Supabase menggunakan modul **Export/Import JSON** pada ruang *Owner Dashboard*. Modul ini memastikan sinkronisasi yang berkesinambungan apabila administrator beralih platform atau melakukan migrasi *database*.

---
*(C) Spatial Planning Portfolio*
