# Security Plan & Audit Report

## Temuan Keamanan (Security Audit Findings)

### 🔴 Critical (Sangat Kritis)
1. **Tidak Ada Autentikasi pada Dashboard:** Halaman pengelola (`/owner`) saat ini dapat diakses oleh siapa saja hanya dengan mengetikkan path `/owner` di URL. Tidak ada Supabase Auth atau blokir akses apa pun.
2. **Kunci API Gemini Terekspos Secara Publik:** File `src/components/public/AKwanAgent.tsx` memuat `GEMINI_API_KEY` (AQ.Ab8... XXaUw) secara *hardcoded* dan melakukan HTTP Call langsung dari browser, sehingga kunci dapat diinspeksi oleh siapa saja melalui tab Network browser.
3. **Penyimpanan Lokal (Local Storage) untuk Data Sensitif:** `portfolioRepository.ts` menyimpan dan membaca seluruh data operasional portofolio dari `localStorage` browser. Ini berisiko kehilangan data ketika *cache* dibersihkan dan tidak tersinkronisasi antar perangkat.

### 🟠 High (Tinggi)
1. **File Pengujian Terekspos:** File seperti `testgemini.mjs` dan skrip yang berakhiran `.mjs` lainnya mengandung *hardcoded key* aktif.
2. **Obscurity URL:** Mengandalkan *hash* `#owner` atau *pathname* sebagai perlindungan rute tanpa ada verifikasi di level backend.

### 🟡 Medium (Menengah)
1. **Overlap UI Mobile pada Dashboard:** Saat dibuka di mobile, pengaturan Modal dan form input (misalnya *dropdown*) memiliki masalah z-index, overflow, dan scroll lock yang menghalangi penggunaan.

### 🟢 Low (Rendah)
1. **Pemisahan Draft/Private:** Semua data (termasuk draft/privat) disalurkan ke klien secara mentah dari *storage* saat ini tanpa filtering *server-side* yang kuat.

---

## File yang Harus Diperbaiki
- `src/components/public/AKwanAgent.tsx` -> (Hapus *fetch* client-side, ubah menjadi panggil `api/chat`).
- `src/services/portfolioRepository.ts` -> (Ganti `localStorage` menjadi instruksi DB via Supabase).
- `src/components/owner/OwnerDashboard.tsx` -> (Lilit dengan proteksi Auth Provider session Check).
- `src/App.tsx` -> (Pasang routing aman dan pengecualian otorisasi backend).
- `testgemini.mjs` & `testgemini2.mjs` & `testmodels.mjs` -> (Dihapus/dibersihkan dari repo).

---

## Rencana Perubahan (Action Plan)
1. **Hapus dan Sanitasi Key:** Menghilangkan semua referensi API Key dalam *source code* dan file `test*.mjs`.
2. **Supabase Auth & Database:** Konfigurasi login *Google Provider*, terapkan Row Level Security (RLS) di mana pembacaan hanya diizinkan untuk data `PUBLISHED`, dan penulisan hanya untuk *whitelist administrator* di tabel terkait.
3. **Migrasi Penyimpanan:** Pindahkan logika penyimpanan dari `localStorage` ke Supabase *Repository Adapter* dengan tetap mempertahankan *interface* yang sama agar UI tidak eror.
4. **Vercel Serverless Function AI:** Buat `/api/chat` (AI Gateway) di Vercel agar panggilan AI *(fetch stream)* disembunyikan dari peramban pengunjung. `GEMINI_API_KEY` akan diambil melalui `process.env`.
5. **Perbaikan Mobile (Responsivitas):** Audit CSS `z-index`, tinggi absolut modal, dan *overflow constraint* di semua komponen UI pengelolaan.
6. **Membangun Panduan Infrastruktur:** Menyiapkan `SECURITY_SETUP.md` & konfigurasi `migrations`.

---

## Pengujian yang Harus Dilakukan
- Akses tamu ke halaman `/owner` akan ditolak *(Auto-Redirect/Block)*.
- Eksekusi AI berjalan sukses melalui proxy *server-side* Vercel (bukan langsung dari JS klien).
- Tidak ada nilai *Secret Key* / `GEMINI_API_KEY` yang terlihat dalam build output (`npm run build`).
- Modul manajemen konten di *mobile browser* dapat dibuka, *scroll*, dan diisi tanpa terhalang *keyboard* atau elemen lengket.

---

## Langkah Manual untuk Pengguna (Nanti)
- Menyiapkan Proyek Supabase dan memasukkan *Google OAuth Client IDs*.
- Membuat *New Gemini Key* di Google AI Studio.
- Setup Environment Variables di Vercel Dashboard (contoh `GEMINI_API_KEY`, `VITE_SUPABASE_URL`).
- Mengatur 2 akun Admin terverifikasi ke tabel rujukan keamanan.
