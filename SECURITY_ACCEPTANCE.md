# Uji Penerimaan Keamanan (Security Acceptance)

Dokumen ini melacak kepatuhan keamanan dan fungsional sistem.

## Pengujian Build & Secret
- [ ] `npm ci` berhasil.
- [ ] `npm run lint` berhasil.
- [ ] `npm run build` berhasil menghasilkan bundle publik.
- [ ] Tidak ada _Gemini API key_ yang terbawa ke dalam *build* akhir.
- [ ] Skrip pengujian otomatis yang mengekspos kata sandi / *key* telah dihapus permanen.

## Pengujian Akses (Auth & RLS)
- [ ] Pengunjung statis yang memaksa membuka `/owner` wajib diblokir UI *(Terkunci Auth Guard)*.
- [ ] Pengunjung hanya menerima JSON untuk kategori bernilai `PUBLISHED` dari *Supabase backend*. 
- [ ] Dokumen _Draft_ dan Rahasia (Private) tertolak *(Row Level Security)*.
- [ ] Otorisasi *Google Login* bekerja untuk akun yang `user_id`-nya tertulis di tabel `admin_users`.

## Pengujian Kinerja Agen AI
- [ ] `Endpoint` Vercel internal `/api/chat` memproses stream _Server-Sent Events_.
- [ ] Komponen frontend (Browser) _TIDAK PERNAH_ memanggil Google API secara langsung.
- [ ] Context *Prompt* agen hanya membaca kumpulan karya publik (Tanpa menelan Draft).

## Pengujian Responsivitas Mobile (Tahap 6)
- [ ] Dropdown tidak tumpang tindih.
- [ ] _Modal editor_ bisa di_*scroll*.
- [ ] Tombol simpan tak tertutup _keyboard_.

_Catatan: Segera bubuhkan PASS atau FAIL pada kriteria ini di Tahap Akhir (7)._
