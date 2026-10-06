import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { Field, inputCls } from "@/components/admin/ui";

async function login(formData: FormData) {
  "use server";
  if (!isSupabaseConfigured()) redirect("/admin/login?error=not-configured");
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?error=invalid");

  const allowlist = (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (
    allowlist.length > 0 &&
    (!user?.email || !allowlist.includes(user.email.toLowerCase()))
  ) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=forbidden");
  }
  redirect("/admin");
}

const errors: Record<string, string> = {
  invalid: "Email atau password salah.",
  forbidden: "Akun ini bukan admin. Hubungi pemilik situs.",
  "auth-unavailable":
    "Layanan auth tidak merespons (Supabase tidak terjangkau / env belum benar). Tunggu sebentar lalu coba lagi.",
  "not-configured":
    "Supabase belum dikonfigurasi. Isi env NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, dan SUPABASE_SERVICE_ROLE_KEY, lalu restart server.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="min-h-screen bg-[#0A0C0F] text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* glow background */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[560px] h-[320px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 left-1/4 w-[420px] h-[280px] bg-violet-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[400px] relative">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-black text-black">
            d
          </span>
          <span className="font-bold tracking-wide">ADMIN</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl">
          <h1 className="text-xl font-semibold tracking-tight">Selamat datang kembali</h1>
          <p className="text-sm text-neutral-400 mt-1 mb-6">
            Masuk untuk mengelola konten portfolio.
          </p>

          {!isSupabaseConfigured() && (
            <p className="text-[13px] text-amber-300 border border-amber-500/30 bg-amber-500/10 rounded-xl p-3.5 mb-4 leading-relaxed">
              Supabase belum dikonfigurasi. Buat project gratis di supabase.com, jalankan
              SQL di <code className="font-mono">supabase/migrations/0001_init.sql</code>,
              buat user di Authentication, lalu isi env dan restart.
            </p>
          )}
          {error && errors[error] && (
            <p role="alert" className="text-[13px] text-red-300 border border-red-500/30 bg-red-500/10 rounded-xl p-3.5 mb-4 leading-relaxed">
              {errors[error]}
            </p>
          )}
          <form action={login} className="space-y-4">
            <Field label="Email">
              <input name="email" type="email" required autoComplete="email" placeholder="admin@email.com" className={inputCls} />
            </Field>
            <Field label="Password">
              <input name="password" type="password" required autoComplete="current-password" placeholder="••••••••" className={inputCls} />
            </Field>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl text-sm font-semibold bg-white text-black hover:bg-cyan-300 transition active:scale-[0.99]"
            >
              Masuk ke Dashboard
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-neutral-600 mt-6">
          Area khusus pengelola • <Link href="/" className="hover:text-neutral-300 transition">Kembali ke web</Link>
        </p>
      </div>
    </div>
  );
}
