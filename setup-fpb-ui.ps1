Write-Host "Membuat UI MathDash FPB..." -ForegroundColor Cyan

# Pastikan folder utama
New-Item -ItemType Directory -Force -Path "src" | Out-Null
New-Item -ItemType Directory -Force -Path "src\components" | Out-Null
New-Item -ItemType Directory -Force -Path "src\utils" | Out-Null

# Buat package.json kalau belum ada
if (!(Test-Path "package.json")) {
@'
{
  "name": "mathdash",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {},
  "devDependencies": {}
}
'@ | Set-Content -Encoding UTF8 "package.json"
}

Write-Host "Install dependency..." -ForegroundColor Yellow
npm install react react-dom
npm install -D vite @vitejs/plugin-react tailwindcss @tailwindcss/vite

# Update vite config
@'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
'@ | Set-Content -Encoding UTF8 "vite.config.js"

# Update index.html
@'
<!doctype html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MathDash FPB</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
'@ | Set-Content -Encoding UTF8 "index.html"

# CSS
@'
@import "tailwindcss";

* {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background: #020617;
  color: #e5e7eb;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
    "Segoe UI", sans-serif;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  appearance: none;
  margin: 0;
}

input[type="number"] {
  appearance: textfield;
}

.glass-card {
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.95),
    rgba(15, 23, 42, 0.68)
  );
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(20px);
}

.hero-bg {
  background:
    radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.22), transparent 28%),
    radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.18), transparent 28%),
    radial-gradient(circle at 50% 80%, rgba(34, 197, 94, 0.12), transparent 30%),
    linear-gradient(180deg, #020617 0%, #0f172a 52%, #020617 100%);
}
'@ | Set-Content -Encoding UTF8 "src\index.css"

# main.jsx
@'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
'@ | Set-Content -Encoding UTF8 "src\main.jsx"

# utils
@'
export function primeFactors(input) {
  let n = Number(input);

  if (!Number.isInteger(n) || n < 2) return [];

  const factors = [];

  while (n % 2 === 0) {
    factors.push(2);
    n = n / 2;
  }

  let i = 3;

  while (i * i <= n) {
    while (n % i === 0) {
      factors.push(i);
      n = n / i;
    }

    i += 2;
  }

  if (n > 1) factors.push(n);

  return factors;
}

export function getFactorMap(factors) {
  const map = {};

  for (const factor of factors) {
    map[factor] = (map[factor] || 0) + 1;
  }

  return map;
}

export function buildFactorTree(input) {
  const n = Number(input);
  const factors = primeFactors(n);

  if (factors.length <= 1) {
    return {
      value: n,
      type: "prime",
      left: null,
      right: null,
    };
  }

  const left = factors[0];
  const right = n / left;

  return {
    value: n,
    type: "composite",
    left: {
      value: left,
      type: "prime",
      left: null,
      right: null,
    },
    right: buildFactorTree(right),
  };
}

export function formatFactorMap(map) {
  const entries = Object.entries(map).sort(([a], [b]) => Number(a) - Number(b));

  if (entries.length === 0) return "-";

  return entries
    .map(([base, exp]) => {
      if (exp === 1) return `${base}`;
      return `${base}^${exp}`;
    })
    .join(" × ");
}

export function computeGCDDetails(factorsA, factorsB) {
  const mapA = getFactorMap(factorsA);
  const mapB = getFactorMap(factorsB);

  const commonFactors = Object.keys(mapA)
    .filter((factor) => mapB[factor])
    .sort((a, b) => Number(a) - Number(b));

  let gcd = 1;

  const items = commonFactors.map((factor) => {
    const expA = mapA[factor];
    const expB = mapB[factor];
    const selectedExp = Math.min(expA, expB);
    const value = Math.pow(Number(factor), selectedExp);

    gcd *= value;

    return {
      factor: Number(factor),
      expA,
      expB,
      selectedExp,
      value,
    };
  });

  const steps =
    items.length > 0
      ? items
          .map((item) => {
            if (item.selectedExp === 1) return `${item.factor}`;
            return `${item.factor}^${item.selectedExp}`;
          })
          .join(" × ")
      : "1";

  return {
    gcd,
    steps,
    items,
    mapA,
    mapB,
  };
}

export function calculateFPB(numA, numB) {
  const factorsA = primeFactors(numA);
  const factorsB = primeFactors(numB);
  const gcdDetails = computeGCDDetails(factorsA, factorsB);

  return {
    numA,
    numB,
    factorsA,
    factorsB,
    mapA: getFactorMap(factorsA),
    mapB: getFactorMap(factorsB),
    treeA: buildFactorTree(numA),
    treeB: buildFactorTree(numB),
    ...gcdDetails,
  };
}

export function validateInput(value, label) {
  const cleanValue = String(value).trim();

  if (cleanValue === "") return `${label} belum diisi.`;

  const number = Number(cleanValue);

  if (!Number.isInteger(number)) return `${label} harus bilangan bulat.`;

  if (number < 2) return `${label} minimal 2.`;

  if (number > 9999999) {
    return `${label} terlalu besar. Maksimal 9.999.999. Jangan paksa browser jadi korban ambisimu.`;
  }

  return "";
}
'@ | Set-Content -Encoding UTF8 "src\utils\factorization.js"

# Navbar
@'
export default function Navbar({ onStart }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <a href="#home" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-cyan-400 text-lg font-black text-slate-950">
            M
          </div>

          <div>
            <p className="text-sm font-black text-white">MathDash</p>
            <p className="text-xs text-slate-400">FPB Factor Tree</p>
          </div>
        </a>

        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
          <a href="#fitur" className="hover:text-white">Fitur</a>
          <a href="#kalkulator" className="hover:text-white">Kalkulator</a>
          <a href="#cara-kerja" className="hover:text-white">Cara Kerja</a>
        </div>

        <button
          onClick={onStart}
          className="rounded-full bg-white px-5 py-2 text-sm font-black text-slate-950 transition hover:scale-105 hover:bg-cyan-200"
        >
          Mulai
        </button>
      </nav>
    </header>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\Navbar.jsx"

# LandingPage
@'
export default function LandingPage({ onStart }) {
  return (
    <section id="home" className="hero-bg relative overflow-hidden px-5 pb-20 pt-32 md:pt-40">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-200">
            Visualisasi FPB dengan pohon faktor
          </div>

          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
            Hitung FPB lebih jelas dengan pohon faktor interaktif.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Masukkan dua bilangan, lalu aplikasi akan menampilkan pohon faktor,
            faktorisasi prima, faktor persekutuan, dan hasil FPB. Versi ini
            memindahkan logic terminal kamu ke tampilan React yang lebih pantas
            dipamerkan.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onStart}
              className="rounded-2xl bg-cyan-400 px-7 py-4 font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-1 hover:bg-cyan-300"
            >
              Coba Sekarang
            </button>

            <a
              href="#cara-kerja"
              className="rounded-2xl border border-white/10 bg-white/5 px-7 py-4 text-center font-bold text-white transition hover:-translate-y-1 hover:bg-white/10"
            >
              Lihat Cara Kerja
            </a>
          </div>
        </div>

        <div className="glass-card rounded-[2rem] p-6">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="border-b border-white/10 pb-4">
              <p className="text-sm text-slate-400">Contoh Hasil</p>
              <h2 className="text-2xl font-black text-white">FPB dari 84 dan 60</h2>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">84</p>
                <p className="mt-2 text-lg font-bold text-white">2² × 3 × 7</p>
              </div>

              <div className="rounded-2xl bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-500">60</p>
                <p className="mt-2 text-lg font-bold text-white">2² × 3 × 5</p>
              </div>

              <div className="rounded-3xl bg-cyan-400 p-5 text-slate-950">
                <p className="text-sm font-bold opacity-80">Hasil FPB</p>
                <p className="mt-2 text-6xl font-black">12</p>
                <p className="mt-2 text-sm font-black">2² × 3 = 12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\LandingPage.jsx"

# FeatureSection
@'
export default function FeatureSection() {
  const features = [
    {
      title: "Pohon Faktor",
      desc: "Angka dipecah menjadi faktor prima dalam bentuk visual.",
    },
    {
      title: "Faktorisasi Prima",
      desc: "Hasil ditampilkan dalam bentuk pangkat seperti 2² × 3 × 7.",
    },
    {
      title: "Detail FPB",
      desc: "Aplikasi memilih faktor yang sama dengan pangkat terkecil.",
    },
  ];

  return (
    <section id="fitur" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-bold text-cyan-300">Fitur Utama</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-black text-white md:text-5xl">
          Bukan cuma hitung, tapi juga menjelaskan prosesnya.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {features.map((item, index) => (
            <div key={item.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 font-black text-cyan-300">
                0{index + 1}
              </div>

              <h3 className="mt-6 text-xl font-black text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\FeatureSection.jsx"

# FactorPower
@'
export default function FactorPower({ base, exp }) {
  return (
    <span className="inline-flex items-start rounded-xl bg-slate-900 px-3 py-2 font-black text-white ring-1 ring-white/10">
      <span>{base}</span>
      {Number(exp) > 1 && (
        <sup className="ml-0.5 text-[0.65rem] text-cyan-300">{exp}</sup>
      )}
    </span>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\FactorPower.jsx"

# FactorizationLine
@'
import FactorPower from "./FactorPower";

export default function FactorizationLine({ title, number, map }) {
  const entries = Object.entries(map).sort(([a], [b]) => Number(a) - Number(b));

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-1 text-2xl font-black text-white">{number}</h3>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {entries.map(([base, exp], index) => (
          <div key={base} className="flex items-center gap-2">
            {index > 0 && <span className="font-bold text-slate-500">×</span>}
            <FactorPower base={base} exp={exp} />
          </div>
        ))}
      </div>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\FactorizationLine.jsx"

# FactorTree
@'
function TreeNode({ node }) {
  if (!node) return null;

  const isPrime = node.type === "prime";

  return (
    <div className="flex flex-col items-center">
      <div
        className={[
          "grid min-h-12 min-w-12 place-items-center rounded-2xl px-4 py-3 text-lg font-black ring-1",
          isPrime
            ? "bg-emerald-400/10 text-emerald-300 ring-emerald-300/20"
            : "bg-cyan-400 text-slate-950 ring-cyan-200/40",
        ].join(" ")}
      >
        {node.value}
      </div>

      {(node.left || node.right) && (
        <div className="mt-4 flex flex-col items-center">
          <div className="h-5 w-px bg-white/20" />
          <div className="h-px w-28 bg-white/20 sm:w-36" />
          <div className="grid w-40 grid-cols-2 gap-6 pt-4 sm:w-56">
            <TreeNode node={node.left} />
            <TreeNode node={node.right} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function FactorTree({ title, tree }) {
  return (
    <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-slate-950/60 p-6">
      <h3 className="mb-6 text-center text-lg font-black text-white">{title}</h3>

      <div className="flex min-w-max justify-center pb-2">
        <TreeNode node={tree} />
      </div>

      <div className="mt-6 flex justify-center gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-3 w-3 rounded-full bg-cyan-400" />
          Komposit
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          Prima
        </div>
      </div>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\FactorTree.jsx"

# ResultPanel
@'
export default function ResultPanel({ data }) {
  if (!data) return null;

  return (
    <div className="rounded-[2rem] bg-cyan-400 p-7 text-slate-950">
      <p className="text-sm font-black uppercase tracking-[0.25em] opacity-70">
        Hasil FPB
      </p>

      <h2 className="mt-4 text-7xl font-black tracking-tight">{data.gcd}</h2>

      <p className="mt-4 text-lg font-black">
        FPB dari {data.numA} dan {data.numB} adalah {data.gcd}
      </p>

      <div className="mt-6 rounded-3xl bg-slate-950/10 p-4">
        <p className="text-sm font-bold opacity-75">Langkah</p>
        <p className="mt-2 text-xl font-black">
          {data.steps} = {data.gcd}
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-950/10 bg-white/20">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-950/10">
              <th className="px-4 py-3">Faktor</th>
              <th className="px-4 py-3">Angka 1</th>
              <th className="px-4 py-3">Angka 2</th>
              <th className="px-4 py-3">Dipilih</th>
            </tr>
          </thead>

          <tbody>
            {data.items.length > 0 ? (
              data.items.map((item) => (
                <tr key={item.factor} className="border-b border-slate-950/10 last:border-b-0">
                  <td className="px-4 py-3 font-black">{item.factor}</td>
                  <td className="px-4 py-3">pangkat {item.expA}</td>
                  <td className="px-4 py-3">pangkat {item.expB}</td>
                  <td className="px-4 py-3 font-black">pangkat {item.selectedExp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 font-bold" colSpan="4">
                  Tidak ada faktor prima yang sama. FPB = 1.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\ResultPanel.jsx"

# CalculatorSection
@'
import { useMemo, useState } from "react";
import { calculateFPB, validateInput } from "../utils/factorization";
import FactorTree from "./FactorTree";
import FactorizationLine from "./FactorizationLine";
import ResultPanel from "./ResultPanel";

export default function CalculatorSection() {
  const [numA, setNumA] = useState("84");
  const [numB, setNumB] = useState("60");

  const errorA = validateInput(numA, "Angka pertama");
  const errorB = validateInput(numB, "Angka kedua");
  const hasError = Boolean(errorA || errorB);

  const data = useMemo(() => {
    if (hasError) return null;
    return calculateFPB(Number(numA), Number(numB));
  }, [numA, numB, hasError]);

  const examples = [
    [84, 60],
    [120, 90],
    [72, 108],
    [45, 28],
  ];

  return (
    <section id="kalkulator" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="glass-card rounded-[2rem] p-5 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-bold text-cyan-300">Kalkulator</p>
              <h2 className="mt-3 text-3xl font-black text-white md:text-5xl">
                Masukkan dua angka.
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Hasil akan dihitung otomatis tanpa tombol. Karena menekan tombol
                untuk hal yang bisa live-update itu memang ritual kecil yang tidak perlu.
              </p>

              <div className="mt-8 grid gap-4">
                <label>
                  <span className="mb-2 block text-sm font-bold text-slate-300">
                    Angka pertama
                  </span>
                  <input
                    value={numA}
                    onChange={(event) => setNumA(event.target.value)}
                    type="number"
                    min="2"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-2xl font-black text-white outline-none transition focus:border-cyan-300"
                    placeholder="Contoh: 84"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-sm font-bold text-slate-300">
                    Angka kedua
                  </span>
                  <input
                    value={numB}
                    onChange={(event) => setNumB(event.target.value)}
                    type="number"
                    min="2"
                    className="w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-2xl font-black text-white outline-none transition focus:border-cyan-300"
                    placeholder="Contoh: 60"
                  />
                </label>
              </div>

              {hasError && (
                <div className="mt-5 rounded-2xl border border-red-400/20 bg-red-400/10 p-4 text-sm font-bold text-red-200">
                  {errorA || errorB}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                {examples.map(([a, b]) => (
                  <button
                    key={`${a}-${b}`}
                    onClick={() => {
                      setNumA(String(a));
                      setNumB(String(b));
                    }}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-300/40 hover:text-white"
                  >
                    {a} & {b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              {data ? (
                <ResultPanel data={data} />
              ) : (
                <div className="grid min-h-80 place-items-center rounded-[2rem] border border-white/10 bg-slate-950/60 text-center">
                  <p className="font-bold text-slate-400">Input belum valid.</p>
                </div>
              )}
            </div>
          </div>

          {data && (
            <div className="mt-8 grid gap-5">
              <div className="grid gap-5 lg:grid-cols-2">
                <FactorizationLine
                  title="Faktorisasi prima angka pertama"
                  number={data.numA}
                  map={data.mapA}
                />

                <FactorizationLine
                  title="Faktorisasi prima angka kedua"
                  number={data.numB}
                  map={data.mapB}
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <FactorTree title={`Pohon faktor dari ${data.numA}`} tree={data.treeA} />
                <FactorTree title={`Pohon faktor dari ${data.numB}`} tree={data.treeB} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\CalculatorSection.jsx"

# HowItWorks
@'
export default function HowItWorks() {
  const steps = [
    "Pecah angka menjadi faktor prima.",
    "Hitung jumlah kemunculan setiap faktor.",
    "Cari faktor yang sama dari kedua angka.",
    "Ambil pangkat terkecil, lalu kalikan.",
  ];

  return (
    <section id="cara-kerja" className="px-5 py-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-bold text-cyan-300">Cara Kerja</p>
        <h2 className="mt-3 max-w-3xl text-3xl font-black text-white md:text-5xl">
          Logic-nya sama seperti kode terminal kamu, hanya lebih manusiawi dilihat.
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400 font-black text-slate-950">
                {index + 1}
              </div>
              <p className="mt-5 font-bold leading-7 text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\HowItWorks.jsx"

# Footer
@'
export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-slate-500 md:flex-row">
        <p>© 2026 MathDash FPB.</p>
        <p>React + Vite + Tailwind CSS</p>
      </div>
    </footer>
  );
}
'@ | Set-Content -Encoding UTF8 "src\components\Footer.jsx"

# App.jsx
@'
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import FeatureSection from "./components/FeatureSection";
import CalculatorSection from "./components/CalculatorSection";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

export default function App() {
  const scrollToCalculator = () => {
    document
      .getElementById("kalkulator")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950">
      <Navbar onStart={scrollToCalculator} />
      <LandingPage onStart={scrollToCalculator} />
      <FeatureSection />
      <CalculatorSection />
      <HowItWorks />
      <Footer />
    </main>
  );
}
'@ | Set-Content -Encoding UTF8 "src\App.jsx"

Write-Host ""
Write-Host "Selesai. Jalankan:" -ForegroundColor Green
Write-Host "npm run dev" -ForegroundColor Cyan