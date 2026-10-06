import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

// Guard untuk semua Server Action / halaman admin.
// Melempar redirect ke /admin/login jika belum login atau bukan admin.
export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login?error=not-configured");
  }
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const allowlist = (process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  if (
    allowlist.length > 0 &&
    (!user.email || !allowlist.includes(user.email.toLowerCase()))
  ) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=forbidden");
  }
  return { supabase, user };
}
