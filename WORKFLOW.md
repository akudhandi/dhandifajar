# Alur Kerja Project Ini (Wajib Baca)

> Status migrasi: SELESAI — clone Linux `~/work/portofolio-website-new` aktif,
> branch `feature/admin-cms` ter-push dari clone pada 2026-10-06, build hijau.

Repo: `akudhandi/dhandifajar` — portfolio + webadmin Supabase. Deploy: Vercel (auto dari GitHub).

## 1. Arsitektur folder: DUA copy, SATU git

```
┌─ WINDOWS (kamu) ──────────────────────┐   ┌─ LINUX (agen AI) ───────────────┐
│ C:\projectVSCODE\portofolio-website-  │   │ ~/work/portofolio-website-new   │
│ new + node_modules WIN32              │   │ + node_modules LINUX            │
│ Semua perintah npm: HANYA dari CMD    │   │ Semua perintah npm: di sini     │
└───────────────┬───────────────────────┘   └───────────────┬─────────────────┘
                │  git pull / push          │  git push / pull│
                └─────────► GitHub ◄────────┘  (jembatan sinkron)
                               │
                               ▼
                         Vercel auto-deploy
                    PR → Preview link • main → Production
```

**Kenapa begini:** satu folder dipakai dua OS bikin `npm install` dari satu sisi
menghapus binary native sisi lain (kasus `lightningcss` 3x kejadian). Dengan dua
copy, tiap OS punya `node_modules` sendiri yang tidak pernah disentuh OS lain.

## 2. Tiga aturan keras (jangan dilanggar)

1. **Agen tidak menyentuh `C:\...` (folder Windows) lagi.** Semua kerjaan agen di clone Linux.
2. **Semua `npm install` di Windows HANYA dari CMD.** Jangan dari PowerShell/WSL/VS Code terminal lain.
3. **Sinkron selalu lewat git.** Tidak ada copy-paste file antar folder manual.

## 3. Alur kerja agen (Linux)

1. `git pull` / pastikan branch terbaru sebelum mulai.
2. Kerja di branch baru: `fitur/...`, `fix/...`, `konten/...`.
3. `npm run build` + lint hijau di clone Linux.
4. Push branch → buka PR ke `main` → kasih link PR + link Vercel Preview ke kamu.
5. Merge HANYA setelah kamu setuju (tombol Merge di GitHub).

## 4. Alur kerja kamu (Windows, CMD saja)

```cmd
cd /d C:\projectVSCODE\portofolio-website-new
git pull                :: ambil update (wajib sebelum dev / sebelum edit)
npm run dev             :: jalan harian
```

* **Edit sendiri:** edit → `git add -A` → `git commit -m "pesan"` → `git push`.
* **Review kerjaan agen:** buka link PR → cek Vercel Preview → Merge di GitHub → `git pull` di CMD.
* **Butuh paket npm baru:** `npm install nama-paket` dari CMD → commit `package.json` + `package-lock.json` → push. (Agen tidak boleh install dari Linux.)
* **Error aneh setelah pull:** tutup dev → `rmdir /s /q .next` → `npm run dev` lagi.

## 5. Environment & secrets

* `.env.local` TIDAK masuk git (sudah di `.gitignore`). Tiap mesin punya sendiri.
* Daftar key wajib ada di `.env.example`. Isi yang hilang sebelum run.
* Vercel: Settings → Environment Variables (Production + Preview). Tiap tambah env baru, isi di 3 tempat: `.env.local` Windows, `.env.local` Linux, Vercel.
* `SUPABASE_SERVICE_ROLE_KEY` tidak boleh diawali `NEXT_PUBLIC_`, tidak boleh ke-commit.

## 6. Vercel

* Push ke `main` = deploy Production otomatis. Hati-hati.
* PR = link Preview otomatis. Cek visual di sana sebelum Merge.
* Preview memakai env Preview — pastikan terisi sama dengan Production.

## 7. Kalau conflict (jarang terjadi)

1. `git pull` akan memberi tahu file mana yang bentrok.
2. Jangan panik: buka file, cari blok `<<<<<<<`, pilih versi yang benar, hapus penanda.
3. `git add -A` → `git commit` → `git push`.
4. Kalau ragu: batalkan dengan `git merge --abort` lalu kabari agen.

## 8. Troubleshooting cepat

| Gejala | Penyebab paling mungkin | Obat |
|---|---|---|
| `Cannot find module ...win32...node` | Binary kepangkas / `.next` basi | `rmdir /s /q .next` → dev lagi. Masih gagal → cek `dir node_modules\lightningcss-win32-x64-msvc` |
| Login `/admin` gagal | Env Supabase belum diisi / dev belum restart | Isi `.env.local` → `Ctrl+C` → `npm run dev` |
| `/api/content` masih `fallback` | Sama seperti di atas | Sama seperti di atas |
| Push ditolak | Belum `git pull` dulu | `git pull` → resolve bila perlu → push lagi |

## 9. Rollback migrasi ini

Kalau cara ini tidak cocok: hapus folder clone Linux, kembali edit folder bersama seperti dulu.
Repo GitHub tetap utuh — tidak ada yang dirusak eksperimen ini.
