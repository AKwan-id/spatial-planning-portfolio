<div align="center">
  <h1>Annisa Nur Prabawa Portfolio</h1>
  <p>Portofolio profesional interaktif untuk bidang <strong>Perencanaan Tata Ruang</strong> dan <strong>Administrasi Pertanahan</strong>.</p>
  <p>
    <a href="https://annisa-portofolio-beta.vercel.app">Lihat Situs</a> |
    <a href="#fitur-utama">Fitur</a> |
    <a href="#menjalankan-secara-lokal">Menjalankan Secara Lokal</a> |
    <a href="#pengelolaan-konten">Pengelolaan Konten</a>
  </p>
</div>

## Tentang Proyek

Proyek ini merupakan single-page portfolio untuk menampilkan profil, karya pilihan, keahlian, proyek, pengalaman, sertifikat, CV, dan informasi kontak Annisa Nur Prabawa.

Antarmuka mendukung Bahasa Indonesia dan Inggris. Pengalaman visual memakai latar sinematik berbasis urutan gambar yang bergerak mengikuti posisi scroll. Proyek juga menyediakan dashboard pengelola di dalam browser dan asisten AI untuk menjawab pertanyaan berbasis data portofolio.

**Status proyek:** prototipe publik aktif.

## Demo

Situs dapat diakses di:

**[annisa-portofolio-beta.vercel.app](https://annisa-portofolio-beta.vercel.app)**

## Fitur Utama

- Tampilan responsif untuk desktop, tablet, dan perangkat seluler.
- Pilihan bahasa Indonesia dan Inggris tanpa memuat ulang halaman.
- Delapan bagian utama: About, Selected Work, Skills, Projects, Experience, Certificates, CV, dan Contact.
- Navigasi aktif yang mengikuti posisi scroll.
- Latar sinematik berbasis canvas dengan 205 frame.
- Galeri proyek dengan filter kategori dan modal detail.
- Lightbox sertifikat serta pratinjau dan unduhan CV.
- Status konten `PUBLISHED`, `DRAFT`, dan `HIDDEN`.
- Dashboard pengelola untuk menyunting data portofolio.
- Impor, ekspor, dan reset data dalam format JSON.
- Asisten AI dengan respons streaming untuk pertanyaan portofolio dan analisis kecocokan Job Description.
- Metadata SEO dan konfigurasi SPA untuk deployment di Vercel.

## Teknologi

| Bagian | Teknologi |
| --- | --- |
| UI | React 19 dan TypeScript |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 dan CSS kustom |
| Animasi | Canvas API dan animasi CSS |
| Ikon | Lucide React |
| Data lokal | Browser `localStorage` |
| AI | Google Gemini Generative Language API |
| Deployment | Vercel |

## Struktur Proyek

```text
annisa-web/
├── public/
│   └── frames/                     # Frame latar sinematik
├── src/
│   ├── components/
│   │   ├── owner/                  # Dashboard dan editor konten
│   │   └── public/                 # Bagian portofolio publik
│   ├── context/
│   │   └── LanguageContext.tsx     # Bahasa dan state data global
│   ├── data/
│   │   └── initialPortfolioData.ts # Data bawaan portofolio
│   ├── services/
│   │   └── portfolioRepository.ts  # Adapter penyimpanan data
│   ├── types/
│   │   └── portfolio.ts            # Tipe data TypeScript
│   ├── App.tsx                     # Susunan halaman utama
│   ├── index.css                   # Design tokens dan gaya global
│   └── main.tsx                    # Entry point React
├── index.html                      # Metadata dan HTML utama
├── package.json                    # Dependensi dan script npm
├── vercel.json                     # Rewrite SPA untuk Vercel
└── vite.config.ts                  # Konfigurasi Vite
```

## Menjalankan Secara Lokal

### Prasyarat

- Node.js `18`, `20`, atau `22+`
- npm

### Instalasi

```bash
git clone https://github.com/AKwan-id/annisa-web.git
cd annisa-web
npm ci
npm run dev
```

Buka `http://localhost:3000` di browser.

## Script yang Tersedia

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan development server di port `3000` |
| `npm run lint` | Memeriksa tipe TypeScript tanpa menghasilkan file build |
| `npm run build` | Membuat production build di folder `dist` |
| `npm run preview` | Menjalankan pratinjau production build |
| `npm run clean` | Menghapus hasil build lokal |

## Pengelolaan Konten

Dashboard pengelola dapat dibuka melalui:

```text
http://localhost:3000/#owner
```

Dashboard menyediakan editor untuk branding, profil, karya pilihan, keahlian, proyek, pengalaman, sertifikat, CV, dan kontak. Data juga dapat dicadangkan atau dipulihkan melalui file JSON.

> [!IMPORTANT]
> Perubahan dari dashboard disimpan pada `localStorage` browser dengan key `annisa_portfolio_content_v1`. Perubahan tersebut hanya berlaku pada browser dan perangkat yang sama. Dashboard tidak mengubah source code, tidak memperbarui deployment Vercel, dan tidak menyinkronkan data antarperangkat.

Untuk menerbitkan perubahan bagi semua pengunjung, gunakan salah satu cara berikut:

1. Ubah data bawaan di `src/data/initialPortfolioData.ts`, lalu build dan deploy ulang.
2. Ganti adapter `portfolioRepository` dengan API atau database terpusat.

Dashboard saat ini tidak memakai autentikasi dan belum ditujukan sebagai CMS produksi.

## Konfigurasi Asisten AI

Widget `AKwan.id Agent` mengirim konteks portofolio ke Gemini dan menampilkan respons secara streaming. Untuk deployment produksi, panggilan AI harus melewati backend atau Vercel Function.

> [!CAUTION]
> Jangan menyimpan API key di source code React, file pengujian, atau environment variable yang diekspos ke bundle browser. Jika sebuah key pernah masuk ke repositori publik, segera cabut atau rotasi key tersebut.

Arsitektur produksi yang disarankan:

1. Browser mengirim pertanyaan ke endpoint serverless.
2. Endpoint membaca `GEMINI_API_KEY` dari environment variable server.
3. Endpoint memanggil Gemini API dan mengembalikan respons ke browser.
4. Endpoint menerapkan validasi input, pembatasan penggunaan, dan penanganan error.

## Build dan Deployment

Jalankan pemeriksaan sebelum deploy:

```bash
npm run lint
npm run build
```

Untuk Vercel:

- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrite: sudah diatur melalui `vercel.json`

## Catatan Pengembangan

- Data awal masih memuat beberapa konten dan gambar placeholder yang perlu diganti dengan data final.
- Canvas memuat 205 gambar latar saat halaman dibuka. Optimasi progressive loading disarankan untuk koneksi lambat dan perangkat seluler.
- Proyek belum memiliki automated test suite atau workflow CI.
- Dashboard belum memiliki penyimpanan cloud dan autentikasi.

## Lisensi

Repositori ini belum memiliki file lisensi. Kode dan aset tidak otomatis bebas digunakan, dimodifikasi, atau didistribusikan ulang. Hubungi pemilik repositori untuk memperoleh izin.

## Pemilik Repositori

Dikelola oleh **[AKwan-id](https://github.com/AKwan-id)**.
