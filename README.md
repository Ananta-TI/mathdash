# MathDash FPB

MathDash FPB adalah aplikasi web interaktif untuk menghitung **FPB (Faktor Persekutuan Terbesar)** dari dua bilangan menggunakan metode **faktorisasi prima** dan visualisasi **pohon faktor**.

Project ini dibangun menggunakan **React**, **Vite**, **Tailwind CSS**, **GSAP**, **Framer Motion**, dan **Anime.js** dengan pendekatan desain minimal-premium: canvas hitam, tipografi uppercase, garis tipis, tombol outline, dan layout responsif untuk desktop, tablet, dan mobile.

## Preview

```txt
Landing Page  : /
Calculator    : /calculator
```

## Fitur Utama

* Menghitung FPB dari dua bilangan bulat.
* Menggunakan algoritma faktorisasi prima.
* Menampilkan hasil faktorisasi prima dalam bentuk pangkat.
* Menampilkan visualisasi pohon faktor.
* Menampilkan detail faktor persekutuan yang digunakan.
* Menampilkan output pohon faktor dalam bentuk terminal-style.
* Input kosong tidak langsung menampilkan error.
* Validasi input bilangan bulat minimal 2.
* Responsive untuk desktop, iPad/tablet, dan handphone.
* Animasi premium menggunakan GSAP, Framer Motion, dan Anime.js.
* Routing terpisah antara landing page dan halaman kalkulator.
* Siap deploy ke Vercel.

## Teknologi yang Digunakan

* React
* Vite
* Tailwind CSS
* React Router DOM
* GSAP
* @gsap/react
* Framer Motion
* Anime.js

## Struktur Folder

```txt
mathdash/
├── public/
│   └── image/
│       └── 2.png
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── pages/
│   │   ├── Landing.jsx
│   │   └── Calculator.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Button.jsx
│   │   ├── SectionLabel.jsx
│   │   ├── CalculatorSection.jsx
│   │   ├── ResultPanel.jsx
│   │   ├── FactorizationLine.jsx
│   │   └── FactorTree.jsx
│   └── utils/
│       └── factorization.js
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
├── .gitignore
└── README.md
```

## Algoritma yang Digunakan

Project ini mempertahankan algoritma faktorisasi prima asli sebagai inti perhitungan.

```js
function primeFactors(n) {
  const factors = [];
  let i = 2;

  while (i * i <= n) {
    while (n % i === 0) {
      factors.push(i);
      n = n / i;
    }
    i++;
  }

  if (n > 1) {
    factors.push(n);
  }

  return factors;
}
```

Setelah faktor prima ditemukan, setiap faktor dihitung jumlah kemunculannya menggunakan `getFactorMap()`.

```js
function getFactorMap(factors) {
  const map = {};

  for (const f of factors) {
    map[f] = (map[f] || 0) + 1;
  }

  return map;
}
```

Kemudian FPB dihitung dengan mengambil faktor yang sama dari kedua bilangan dan memilih pangkat terkecil.

```js
function computeGCDDetails(factorsA, factorsB) {
  const mapA = getFactorMap(factorsA);
  const mapB = getFactorMap(factorsB);

  const commonFactors = Object.keys(mapA).filter((f) => mapB[f]);

  let gcd = 1;
  const gcdSteps = [];

  for (const f of commonFactors) {
    const minExp = Math.min(mapA[f], mapB[f]);

    gcd *= Math.pow(f, minExp);
    gcdSteps.push(`${f}^${minExp}`);
  }

  return {
    gcd,
    steps: gcdSteps.join(" × "),
    mapA,
    mapB,
  };
}
```

## Cara Kerja Aplikasi

1. User memasukkan dua bilangan bulat.
2. Aplikasi memvalidasi input.
3. Setiap angka dipecah menjadi faktor prima.
4. Faktor prima diubah menjadi bentuk map atau pangkat.
5. Faktor yang sama dari kedua angka dicari.
6. Pangkat terkecil dari faktor yang sama dipilih.
7. Semua faktor terpilih dikalikan.
8. Hasil FPB ditampilkan ke UI.
9. Pohon faktor divisualisasikan.
10. Output terminal-style tetap ditampilkan sebagai representasi dari algoritma awal.

## Contoh Perhitungan

Misalnya input:

```txt
84 dan 60
```

Faktorisasi prima:

```txt
84 = 2^2 × 3^1 × 7^1
60 = 2^2 × 3^1 × 5^1
```

Faktor yang sama:

```txt
2^2 dan 3^1
```

Hasil:

```txt
FPB = 2^2 × 3^1 = 12
```

Jadi:

```txt
FPB dari 84 dan 60 adalah 12
```

## Instalasi Project

Clone repository:

```bash
git clone https://github.com/username/mathdash.git
```

Masuk ke folder project:

```bash
cd mathdash
```

Install dependency:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka di browser:

```txt
http://localhost:5173
```

## Dependency Tambahan

Jika dependency animasi atau routing belum terinstall, jalankan:

```bash
npm install react-router-dom gsap @gsap/react framer-motion animejs
```

## Script yang Tersedia

```bash
npm run dev
```

Menjalankan project dalam mode development.

```bash
npm run build
```

Melakukan build production ke folder `dist`.

```bash
npm run preview
```

Menjalankan preview hasil build secara lokal.

## Routing

Project ini menggunakan React Router DOM dengan dua route utama:

```txt
/           → Landing Page
/calculator → Calculator Page
```

## Deployment ke Vercel

Project ini menggunakan Vite, sehingga output build berada di folder:

```txt
dist
```

Pastikan pengaturan Vercel seperti berikut:

```txt
Framework Preset : Vite
Build Command    : npm run build
Output Directory : dist
Install Command  : npm install
```

Tambahkan file `vercel.json` di root project:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

File ini diperlukan supaya refresh halaman seperti `/calculator` tidak menyebabkan error 404 di Vercel.

## Responsive Design

Aplikasi ini dibuat responsif untuk beberapa ukuran layar:

```txt
Mobile  : < 768px
Tablet  : 768px - 1024px
Desktop : 1024px - 1440px
Wide    : > 1440px
```

Perilaku responsive:

* Navbar berubah menjadi menu pada mobile.
* Hero title mengecil otomatis menggunakan `clamp()`.
* Button menjadi full-width pada mobile.
* Grid 2 kolom berubah menjadi 1 kolom pada layar kecil.
* Tabel hasil dapat di-scroll horizontal.
* Pohon faktor dapat di-scroll horizontal jika terlalu lebar.
* Layout kalkulator berubah dari dua kolom menjadi satu kolom pada perangkat kecil.

## Desain UI

Konsep desain yang digunakan:

* Black canvas.
* White typography.
* Uppercase display heading.
* Wide letter spacing.
* Transparent outline button.
* Hairline border.
* No colorful accent.
* No rounded card.
* Minimal, clean, and premium layout.

Font substitute yang digunakan:

* Display: Saira Condensed
* Body: Cormorant Garamond
* Monospace: JetBrains Mono

## Catatan Validasi Input

Input harus memenuhi aturan berikut:

* Tidak boleh kosong.
* Harus berupa bilangan bulat.
* Minimal bernilai 2.
* Maksimal 9.999.999.

Jika input belum lengkap, aplikasi menampilkan status:

```txt
WAITING FOR INPUT
```

Jika input tidak valid, aplikasi menampilkan status:

```txt
INVALID INPUT
```

Jika input valid, aplikasi langsung menampilkan hasil perhitungan.

## Build Production

Untuk membuat versi production:

```bash
npm run build
```

Hasil build akan muncul di folder:

```txt
dist/
```

Untuk preview hasil build:

```bash
npm run preview
```

## Git Ignore

Pastikan file `.gitignore` berisi minimal:

```gitignore
node_modules/
dist/
.env
.env.local
.vercel/
.DS_Store
Thumbs.db
```

## Author

```txt
Ananta Firdaus
Politeknik Caltex Riau
Teknik Informatika
```

## License

Project ini dibuat untuk kebutuhan pembelajaran, tugas, dan pengembangan antarmuka web interaktif berbasis React.
