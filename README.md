# Spatial Planning Portfolio

Portofolio web bilingual untuk menyajikan profil, kompetensi, proyek, pengalaman, sertifikat, dan CV di bidang Perencanaan Tata Ruang dan Administrasi Pertanahan.

[Live Website](https://annisa-portofolio-beta.vercel.app) | [Repository](https://github.com/AKwan-id/spatial-planning-portfolio)

## Ringkasan

Spatial Planning Portfolio merupakan single-page application berbasis React dan TypeScript. Aplikasi terdiri dari halaman portofolio publik, asisten portofolio berbasis Gemini, serta modul pengelolaan konten internal.

Konten menggunakan struktur data terpusat dan mendukung Bahasa Indonesia serta Inggris. Koleksi proyek, keahlian, pengalaman, dan sertifikat dapat diurutkan serta dikendalikan melalui status publikasi sebelum ditampilkan pada halaman publik.

## Fitur Aplikasi

### Portofolio Publik

| Modul | Implementasi |
| --- | --- |
| Navigasi | Menu desktop dan mobile, smooth scrolling, penanda section aktif, serta penyembunyian menu ketika suatu section tidak memiliki konten terpublikasi |
| About | Nama, bidang profesional, pengantar, pendidikan, minat karier, lokasi, dan foto profil |
| Selected Work | Menampilkan proyek berstatus featured berdasarkan urutan khusus, dengan fallback ke koleksi selected work |
| Skills | Filter kategori, pencarian nama atau deskripsi, penanda featured, serta kontrol tampilkan lebih banyak |
| Projects | Filter kategori, kartu proyek responsif, ringkasan tools, dan modal detail |
| Experience | Timeline pengalaman dengan filter kerja, magang, dan organisasi |
| Certificates | Daftar sertifikat, pratinjau gambar, lightbox, informasi penerbit, dan tautan verifikasi |
| CV | Gambar pratinjau, ringkasan bilingual, tanggal pembaruan, dan tautan dokumen |
| Contact | Email, LinkedIn, WhatsApp atau panggilan telepon, pengaturan visibilitas field, dan tombol kembali ke atas |
| Footer | Tahun berjalan diperbarui otomatis |

### Detail Proyek dan Media

- Detail proyek dibuka melalui modal tanpa meninggalkan halaman utama.
- Galeri mendukung navigasi gambar sebelumnya, berikutnya, dan thumbnail.
- Informasi detail mencakup deskripsi lengkap, kategori, tahun, peran, serta tools atau metodologi.
- Gambar proyek, sertifikat, profil, dan CV dapat menggunakan URL atau data hasil unggahan lokal.
- Sertifikat dapat diarahkan ke halaman kredensial resmi.

### Sistem Bilingual

- Bahasa aktif dapat diganti antara `ID` dan `ENG` dari navbar.
- Konten bilingual disimpan dalam pasangan field `id` dan `en`.
- Fungsi translasi memiliki urutan fallback ke Bahasa Inggris, Bahasa Indonesia, lalu nilai cadangan.
- Bahasa diterapkan pada profil, label kategori, proyek, pengalaman, sertifikat, CV, kontak, dan identitas brand.

### Status Publikasi

Koleksi portofolio mendukung tiga status:

| Status | Perilaku |
| --- | --- |
| `PUBLISHED` | Ditampilkan pada halaman publik |
| `DRAFT` | Disimpan tetapi tidak ditampilkan |
| `HIDDEN` | Disembunyikan dari halaman publik |

Field `visible`, `order`, `featured`, dan `featuredOrder` digunakan untuk mengendalikan visibilitas, urutan umum, serta urutan karya pilihan.

## Asisten Portofolio

`AKwan.id Agent` tersedia sebagai floating chat widget pada halaman publik dan modul pengelolaan internal.

### Mode Publik

- Menggunakan data portofolio aktif sebagai konteks jawaban.
- Menjawab dalam Bahasa Indonesia atau Inggris sesuai bahasa antarmuka.
- Menyediakan quick replies untuk ringkasan eksekutif, pencapaian utama, alasan perekrutan, keahlian teknis, karya terbaik, dan analisis Job Description.
- Analisis Job Description diarahkan pada `Match`, `Transferable`, `Gap`, dan `Evidence` berdasarkan data portofolio.
- Fokus respons mencakup perencanaan tata ruang, administrasi pertanahan, GIS, dan informasi profesional yang tersedia.

### Dukungan Internal

- Menyediakan quick replies untuk pemeriksaan bahasa profil, saran keyword ATS, serta bantuan teknis website.
- Menggunakan konteks data yang sama dengan halaman publik sehingga jawaban mengikuti perubahan konten terbaru pada browser.

### Integrasi Respons

- Permintaan dikirim ke Google Gemini melalui Fetch API.
- Respons diproses secara streaming menggunakan Server-Sent Events.
- Potongan respons langsung digabungkan ke pesan aktif.
- Riwayat percakapan dikirim bersama pertanyaan berikutnya.
- Antarmuka menyediakan loading state, quick replies, input bebas, auto-scroll, dan pesan fallback ketika layanan tidak tersedia.

## Modul Pengelolaan Konten

| Editor | Data dan operasi yang tersedia |
| --- | --- |
| Brand & Logo | Inisial brand, label portofolio bilingual, visibilitas ikon, pratinjau identitas, dan konfigurasi teks footer |
| About Me | Nama, foto, bidang profesional, pengantar, pendidikan, minat karier, dan lokasi |
| Selected Work | Memilih proyek featured dan mengatur urutan tampil pada section Selected Work |
| Skills | Tambah, edit, hapus, urutkan, kategori kustom, deskripsi bilingual, status publikasi, dan featured |
| Projects | Tambah, edit, hapus, urutkan, kategori kustom, status publikasi, featured, cover, galeri, tools, tahun, peran, dan detail bilingual |
| Experience | Tambah, edit, hapus, urutkan, tipe pengalaman, periode, organisasi, lokasi, deskripsi, bullet points, dan status publikasi |
| Certificates | Tambah, edit, hapus, urutkan, judul, penerbit, tahun, kategori, gambar, tautan verifikasi, dan status publikasi |
| CV Document | Tautan atau file PDF, gambar pratinjau, tanggal pembaruan, dan ringkasan bilingual |
| Contact Info | Email, LinkedIn, nomor telepon, pilihan WhatsApp atau panggilan, lokasi, status ketersediaan, dan visibilitas field |
| Backup / Export | Export JSON, import dari file atau teks JSON, validasi dasar, dan reset ke data awal |

Jenis pengalaman yang didukung meliputi `work`, `internship`, `organization`, `volunteering`, `kkn`, `field_activity`, dan `other`.

Kategori proyek bawaan meliputi `maps`, `planning`, `research`, dan `other`. Kategori keahlian bawaan meliputi `spatial_planning`, `technical_design`, `productivity`, dan `other`. Keduanya dapat ditambah melalui modul pengelolaan.

## Arsitektur

### Lapisan Aplikasi

| Lapisan | Tanggung jawab |
| --- | --- |
| Public components | Merender seluruh section portofolio dan interaksi pengunjung |
| Content management components | Menangani pemeliharaan data secara terpisah dari komponen publik |
| Language context | Menyimpan bahasa aktif, menyediakan data global, dan memilih teks terlokalisasi |
| Data repository | Membaca, menyimpan, mereset, mengimpor, dan mengekspor data |
| Type definitions | Mendefinisikan kontrak data portofolio menggunakan TypeScript |
| Initial data | Menyediakan nilai awal ketika browser belum memiliki data tersimpan |
| AI assistant | Menyusun konteks dari data portofolio dan menangani streaming respons |
| Canvas renderer | Memuat serta menggambar frame animasi berdasarkan posisi scroll |

### Alur Data

1. `initialPortfolioData.ts` menyediakan data awal aplikasi.
2. `portfolioRepository` memeriksa data yang tersimpan pada `localStorage`.
3. `LanguageProvider` memuat data dan mendistribusikannya melalui React Context.
4. Komponen publik memfilter data berdasarkan bahasa, status, visibilitas, dan urutan.
5. Modul pengelolaan mengirim perubahan kembali ke repository.
6. Event `portfolioDataUpdated` menyinkronkan perubahan ke komponen yang sedang aktif.
7. Asisten portofolio menyusun konteks dari `portfolioData` terbaru.

### Penyimpanan Konten

Data aplikasi disimpan menggunakan browser `localStorage` dengan key:

~~~text
annisa_portfolio_content_v1
~~~

Konsekuensi dari mekanisme ini:

- Perubahan berlaku pada browser dan perangkat yang digunakan.
- Data dapat dipindahkan menggunakan export dan import JSON.
- Reset menghapus data lokal dan memuat kembali data awal.
- Perubahan konten bawaan untuk seluruh deployment dilakukan pada `src/data/initialPortfolioData.ts`, lalu dilanjutkan dengan build dan deployment ulang.

## Animasi dan Antarmuka

### Cinematic Canvas Background

- Canvas dipasang sebagai background tetap di belakang seluruh konten.
- Runtime memuat 205 frame dari folder `public/frames`.
- Progress scroll halaman dipetakan ke nomor frame target.
- Perpindahan frame dihaluskan menggunakan interpolasi dan `requestAnimationFrame`.
- Ukuran canvas menyesuaikan viewport dan `devicePixelRatio`.
- Frame menggunakan perhitungan cover agar rasio gambar tetap terjaga pada berbagai ukuran layar.

### Design System

- Palet warna menggunakan sakura pink, deep rose, blush, dan charcoal.
- Surface menggunakan transparansi, blur, dan border untuk menjaga keterbacaan di atas background animasi.
- Tipografi menggunakan Cormorant Garamond untuk heading dan Plus Jakarta Sans untuk teks antarmuka.
- Layout disusun responsif untuk desktop, tablet, dan perangkat seluler.
- Focus style dan `aria-label` diterapkan pada kontrol interaktif utama.
- Metadata SEO, Open Graph, dan Twitter Card tersedia pada `index.html`.

## Model Data

Entity utama pada `PortfolioData`:

| Entity | Field penting |
| --- | --- |
| `profile` | Nama, bidang profesional, pengantar, pendidikan, minat karier, lokasi, dan portrait |
| `selectedWork` | Judul, deskripsi, kategori, galeri, tools, tahun, peran, urutan, featured, dan visibilitas |
| `skills` | Nama, kategori, label kategori, deskripsi, featured, urutan, visibilitas, dan status |
| `projects` | Judul, ringkasan, detail, kategori, cover, galeri, tools, tahun, peran, urutan, featured, dan status |
| `experience` | Peran, organisasi, periode, tipe, deskripsi, bullet points, lokasi, urutan, dan status |
| `certificates` | Judul, penerbit, tahun, kategori, gambar, credential URL, PDF URL, urutan, dan status |
| `cv` | Preview image, file URL, tanggal pembaruan, dan ringkasan |
| `contact` | Email, LinkedIn, telepon, aksi telepon, lokasi, status ketersediaan, dan visibilitas field |
| `siteSettings` | Judul situs, pengaturan brand, label portofolio, ikon, dan teks footer |

## Teknologi

| Kategori | Teknologi |
| --- | --- |
| UI | React 19 |
| Bahasa | TypeScript 5 |
| Build tool | Vite 6 |
| Styling | Tailwind CSS 4 dan CSS kustom |
| Ikon | Lucide React |
| State management | React Context API |
| Penyimpanan | Browser localStorage dan JSON |
| Animasi | Canvas API, requestAnimationFrame, dan CSS keyframes |
| AI integration | Google Gemini REST API |
| Streaming | Fetch API dan Server-Sent Events |
| Deployment | Vercel |

## Struktur Proyek

~~~text
spatial-planning-portfolio/
├── public/
│   └── frames/                     # Frame cinematic background
├── src/
│   ├── components/
│   │   └── public/                 # Section publik, modal, canvas, dan AI assistant
│   ├── context/
│   │   └── LanguageContext.tsx     # Bahasa, data global, dan sinkronisasi
│   ├── data/
│   │   └── initialPortfolioData.ts # Data awal portofolio
│   ├── services/
│   │   └── portfolioRepository.ts  # Persistence dan transfer JSON
│   ├── types/
│   │   └── portfolio.ts            # Kontrak data TypeScript
│   ├── App.tsx                     # Komposisi aplikasi
│   ├── index.css                   # Design tokens dan gaya global
│   └── main.tsx                    # Entry point React
├── index.html                      # Root HTML dan metadata
├── package.json                    # Dependensi dan npm scripts
├── tsconfig.json                   # Konfigurasi TypeScript
├── vercel.json                     # SPA rewrite untuk Vercel
└── vite.config.ts                  # Konfigurasi Vite
~~~

## Menjalankan Proyek

### Prasyarat

- Node.js
- npm

### Instalasi

~~~bash
git clone https://github.com/AKwan-id/spatial-planning-portfolio.git
cd spatial-planning-portfolio
npm ci
npm run dev
~~~

Development server berjalan pada:

~~~text
http://localhost:3000
~~~

## NPM Scripts

| Perintah | Fungsi |
| --- | --- |
| `npm run dev` | Menjalankan Vite development server pada port 3000 |
| `npm run lint` | Menjalankan pemeriksaan TypeScript tanpa menghasilkan file build |
| `npm run build` | Membuat production build pada folder `dist` |
| `npm run preview` | Menjalankan pratinjau production build |
| `npm run clean` | Menghapus output build lokal |

## Build dan Deployment

Jalankan pemeriksaan TypeScript dan production build:

~~~bash
npm run lint
npm run build
~~~

Konfigurasi Vercel:

| Pengaturan | Nilai |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| SPA rewrite | Seluruh path diarahkan ke `/` melalui `vercel.json` |

## Tautan

- Website: [annisa-portofolio-beta.vercel.app](https://annisa-portofolio-beta.vercel.app)
- Repository: [AKwan-id/spatial-planning-portfolio](https://github.com/AKwan-id/spatial-planning-portfolio)
