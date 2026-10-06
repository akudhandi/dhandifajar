import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

// Guard untuk semua Server Action / halaman admin.
// Melempar redirect ke /admin/login jika belum login atau bukan admin.
// TIDAK PERNAH melempar 500: kegagalan auth selalu jadi redirect login.
export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login?error=not-configured");
  }

  let supabase: Awaited<ReturnType<typeof createClient>>;
  try {
    supabase = await createClient();
  } catch (e) {
    console.error("[admin-guard] session unavailable:", e);
    redirect("/admin/login?error=auth-unavailable");
  }

  let userId: string | undefined;
  let userEmail: string | undefined;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id;
    userEmail = user?.email ?? undefined;
  } catch (e) {
    console.error("[admin-guard] auth unavailable:", e);
    redirect("/admin/login?error=auth-unavailable");
  }
  if (!userId) redirect("/admin/login");

  const allowlist = (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (
    allowlist.length > 0 &&
    (!userEmail || !allowlist.includes(userEmail.toLowerCase()))
  ) {
    try {
      await supabase.auth.signOut();
    } catch {
      // abaikan — tetap tolak akses
    }
    redirect("/admin/login?error=forbidden");
  }
  return { supabase, user: { id: userId, email: userEmail } };
}
