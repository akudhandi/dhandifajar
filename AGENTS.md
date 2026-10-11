# AGENTS.md — Petunjuk & Workflow Project Portfolio

Dokumen ini menggabungkan alur kerja, standar kode, panduan GSAP, dan acuan visual untuk pengembangan portofolio ini.

---

## 1. Lingkungan & Workflow Dua Folder (Penting)

Berdasarkan `WORKFLOW.md`:
* **Windows (Host / Dev Lokal)**: `C:\projectVSCODE\portofolio-website-new`.
  * Semua `npm install` di Windows **HANYA dari CMD**, jangan dari PowerShell/WSL jika ada binary native.
  * Preview langsung via `npm run dev` di `http://localhost:3000`.
* **Linux / Remote Clone (Jika Agen/CI jalan di Linux)**: `~/work/portofolio-website-new`.
* **Jembatan**: Git & GitHub (`akudhandi/dhandifajar`).
* **Deploy**: Vercel auto-deploy (Branch push = Preview link, Main = Production).

---

## 2. Tech Stack

* **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
* **Styling**: Tailwind CSS v4, `tw-animate-css`, `clsx`, `tailwind-merge`
* **Animasi**:
  * **GSAP 3.14.2** (`ScrollTrigger`, `Timeline`, `gsap.to/from`) untuk scroll-driven & layout transforms.
  * **Framer Motion 12** untuk UI micro-interactions & simple presence.
  * **Three.js / React Three Fiber** (jika ada komponen 3D).
* **Backend / Database**: Supabase (`@supabase/ssr`, `@supabase/supabase-js`).
* **Icons**: `lucide-react`, `react-icons`.

---

## 3. Perintah Utama

* Dev server: `npm run dev`
* Build production: `npm run build`
* Lint: `npm run lint`

---

## 4. Filosofi Desain & Animasi (Awwwards-Inspired Subtle Luxury)

* **Tone Visual**:
  * Dark palette (`#141516` canvas dasar, pure black overlay, white/neutral typography).
  * Aksen warna konsisten: Cyan (`#22d3ee`), Purple (`#c084fc`), Pink (`#f472b6`), Orange (`#fb923c`).
  * Micro-borders halus: `border-white/[0.08]` atau `border-white/10`.
  * Tidak ada template generic "AI aesthetic" (hindari over-glow ungu murahan, radius inkonsisten).
* **Karakter Animasi GSAP**:
  * **Subtle & deliberate**: Easing halus (`power2.out`, `power3.out`, `expo.out`), durasi elegan (0.8s - 1.4s).
  * **ScrollTrigger**: Stagger reveal dengan trigger offset yang tidak membebani viewport.
  * **Responsive Guard**: Gunakan `ScrollTrigger.matchMedia()` atau nonaktifkan transform berat di layar kecil (<768px) demi menjaga 60fps di mobile.
  * **Cleanup**: Selalu gunakan `gsap.context()` di dalam `useEffect` / `useGSAP` hook agar tidak ada memory leak atau trigger ganda saat route change.

---

## 5. Standar Kode & Aturan Penulisan

* Jangan tambahkan komentar kode berlebihan atau penjelasan basa-basi di kode sumber.
* Gunakan functional components dengan named/default export konsisten.
* Pisahkan komponen presentasional kompleks ke dalam file modular di `src/components/`.
* Selalu pastikan TypeScript types valid tanpa silent fallback / `any` serampangan.
* Verifikasi linting dan build sebelum deklarasi tugas selesai.

---

## 6. Aturan Commit (Wajib)

* **Commit setiap ada perubahan**: setiap selesai mengerjakan satu unit perubahan (satu komponen, satu page, satu fix, satu migration), langsung buat commit terpisah. Jangan menumpuk banyak perubahan dalam satu commit.
* Format pesan commit: `<type>: <deskripsi singkat>` (type: `feat`, `fix`, `style`, `refactor`, `chore`, `docs`, `db`).
* Contoh: `feat: tambah MaskedHeading di Hero`, `fix: samakan fade LogoLoop ke #1B1931`, `style: migrasi palette about ke Sunset/Plum`.
* Sebelum commit, cek `git status --short` dan `git diff --stat` agar hanya file yang relevan yang ikut.
* Jangan commit secret (`.env`, kredensial Supabase/Resend).
