# 🌍 Portofolio Perencanaan Tata Ruang & Agen AI Cerdas

Aplikasi web portofolio interaktif ultra-premium yang dibangun khusus untuk Perencana Tata Ruang, Analis GIS, dan Ahli Kebijakan Perkotaan. Repositori ini berisi kode sumber untuk *frontend* yang sangat dinamis yang dipadukan dengan *backend serverless* yang aman.

## ✨ Fitur Utama

1. **Animasi Hero Sinematik**
   - *Rendering* urutan gambar Canvas berbasis guliran (*scroll-driven*) berperforma tinggi untuk pengalaman visual yang memukau.
   - Efek transisi halus antar berbagai bagian halaman menggunakan Framer Motion.

2. **🤖 Asisten AI Otonom & Aman (Vercel Edge)**
   - Didukung oleh SDK resmi `@google/genai` (Gemini Flash).
   - Menghadirkan fitur **Server-Sent Events (SSE) Streaming** untuk efek ketikan respons secara *real-time*.
   - Menerapkan **Keamanan Standar Perusahaan**: Mencakup batasan *Prompt Guardrails* yang ketat, Kunci API sisi server yang tersembunyi 100%, dan Pembatasan Akses Anti-DDoS (*Sliding Window Rate Limiter*).

3. **Dasbor Pengelola Terbatas (CMS)**
   - Sistem manajemen konten (CMS) mode siluman yang hanya dapat diakses melalui Google OAuth.
   - Dikelola sepenuhnya oleh Database Supabase yang dilacak ketat dengan *Row Level Security* (RLS) untuk memastikan hanya administrator terverifikasi yang dapat Membuat, Membaca (Draf), Memperbarui, atau Menghapus data.
   - Fitur *Auto-Logout* pintar yang melacak aktivitas masuk pengguna guna mencegah kemungkinan pembajakan di tingkat lokal.

4. **Konteks Data Spesifik Dinamis**
   - Agen AI membaca seluruh datanya langsung dari input *database real-time*, menghapus keharusan Anda menyentuh kode pemrograman sama sekali setelah peluncuran awal.

## 🛠 Teknologi yang Digunakan
- **Inti Frontend:** React 19, TypeScript, Vite
- **Desain & Animasi:** Tailwind CSS, Framer Motion
- **Backend & Proxy:** Vercel Edge Serverless Functions
- **Database & Autentikasi:** Supabase (PostgreSQL, OAuth 2.0)

---

## 🚀 Panduan Instalasi Lokal

> **⚠️ PERINGATAN KEAMANAN:** Repositori ini dengan tegas menutupi seluruh API Keys dan endpoint dari *database*. Anda **WAJIB** menyediakan kunci API milik Anda sendiri untuk menjalankan sistem ini secara lokal. Jangan pernah mengunggah rincian `.env` atau kredensial Database pribadi Anda ke dalam repositori publik ini.

### 1. Prasyarat
Pastikan Anda telah menginstal Node.js (versi 18+) dan npm.

### 2. Duplikasi (*Clone*) & Instalasi
```bash
git clone https://github.com/USERNAME_GITHUB_ANDA/spatial-planning-portfolio.git
cd spatial-planning-portfolio
npm install
```

### 3. Konfigurasi Sistem (Environment Variables)
Buka dan salin dokumen bernama `.env.example` untuk meracik wujud asli kunci `.env` milik Anda sendiri.
```bash
cp .env.example .env
```
Isi bagian dalam datanya menggunakan kumpulan kunci yang Anda dapatkan di platform bersangkutan:
- `VITE_SUPABASE_URL`: Bawaan URL proyek Supabase Anda.
- `VITE_SUPABASE_ANON_KEY`: Kunci Publik (*Anon Key*) khusus Supabase.
- `GEMINI_API_KEY`: Kunci akses khusus area Google AI Studio Anda (JANGAN sesekali memasukkannya di area peredaran variabel *frontend*!).

### 4. Peluncuran Database (Supabase)
Demi melancarkan jalannya Dasbor CMS, buatlah ragam tabel database berikut pada area *SQL Editor* Supabase dan wajibkan perlindungan RLS di dalamnya:
- `admin_users` (Mensyaratkan pemasukan email Anda secara manual agar lolos uji sistem Auth)
- `projects`
- `skills`
- `experience`
- `certificates`

*Sebuah contoh dokumen eksekusi manual bernama `secure_rls.sql` sudah dilekatkan pada pangkal folder guna mempermudah Anda menutup paksa peredaran publik lewat RLS dalam waktu cepat.*

### 5. Hubungkan ke Server
```bash
npm run dev
```

---

## 👨‍💻 Penulis

**Annisa Nur Prabawa**
Perencana Tata Ruang | Analis GIS | Enthusiast Perangkat Lunak
- Tinjauan Publik: [https://annisa-portofolio-beta.vercel.app/](https://annisa-portofolio-beta.vercel.app/)

## 📄 Lisensi
Proyek peracikan kode ini bebas pakai untuk dipelajari di area awam (*open-sourced*) mengikuti perizinan standar MIT License.
