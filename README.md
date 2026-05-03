# My Personal Website

Template website portofolio pribadi — siap deploy ke GitHub Pages.

## Struktur File

```
my-website/
├── index.html        # Halaman utama
├── css/
│   └── style.css     # Semua styling
├── js/
│   └── main.js       # Interaktivitas
├── assets/
│   └── cv.pdf        # (opsional) file CV Anda
└── README.md
```

## Cara Deploy ke GitHub Pages

### Langkah 1 — Buat repo di GitHub
1. Buka https://github.com/new
2. Nama repo: `username.github.io` (ganti `username` dengan username GitHub Anda)
3. Set **Public**, klik **Create repository**

### Langkah 2 — Upload file
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/username/username.github.io.git
git push -u origin main
```

### Langkah 3 — Aktifkan GitHub Pages
1. Buka repo > **Settings** > **Pages**
2. Source: **Deploy from a branch** → branch `main`, folder `/ (root)`
3. Klik **Save**

Website Anda akan live di: `https://username.github.io`

---

## Kustomisasi

| Yang perlu diubah | Lokasi |
|---|---|
| Nama, jabatan, deskripsi | `index.html` — section Hero |
| Foto profil | Ganti `📸` dengan tag `<img>` |
| Keahlian | `index.html` — section Skills |
| Proyek | `index.html` — section Projects |
| Link sosial (GitHub, LinkedIn) | `index.html` — section Contact & footer |
| Warna utama | `css/style.css` — variabel `--clr-primary` |
| Form kontak | Daftar di https://formspree.io lalu ganti URL di `js/main.js` |

## Form Kontak (Formspree)
1. Daftar gratis di https://formspree.io
2. Buat form baru → salin endpoint URL (`https://formspree.io/f/xxxxxxxx`)
3. Ganti `GANTI_DENGAN_ID_ANDA` di `js/main.js` dengan ID tersebut
