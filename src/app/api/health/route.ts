import { NextResponse } from "next/server";
import { getPublicClient } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Diagnostik publik TANPA secret: status env (boolean saja) +
// reachability Supabase (latensi / pesan error yang disanitasi).
// Dipakai untuk debug deploy: buka /api/health di browser.
export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  let host: string | null = null;
  try {
    host = supabaseUrl ? new URL(supabaseUrl).host : null;
  } catch {
    host = "invalid-url";
  }

  const env = {
    supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    supabaseAnonKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    supabaseServiceKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    resendKey: Boolean(process.env.RESEND_API_KEY),
    contactTo: Boolean(process.env.CONTACT_TO_EMAIL),
    adminEmails: Boolean(process.env.ADMIN_EMAILS ?? process.env.ADMIN_EMAIL),
  };

  let supabase: { reachable: boolean; latencyMs: number | null; error: string | null } = {
    reachable: false,
    latencyMs: null,
    error: "not-configured",
  };

  const client = getPublicClient();
  if (client) {
    const started = Date.now();
    try {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("timeout after 8000ms")), 8000)
      );
      const probe = client.from("profiles").select("id", { count: "exact", head: true });
      const { error } = (await Promise.race([probe, timeout])) as { error: unknown };
      supabase = {
        reachable: !error,
        latencyMs: Date.now() - started,
        error: error ? sanitize(String((error as { message?: string }).message ?? error)) : null,
      };
    } catch (e) {
      supabase = {
        reachable: false,
        latencyMs: Date.now() - started,
        error: sanitize(e instanceof Error ? e.message : String(e)),
      };
    }
  }

  return NextResponse.json({
    ok: Object.values(env).every(Boolean) && supabase.reachable,
    host,
    env,
    supabase,
    time: new Date().toISOString(),
  });
}

// Buang pola mirip JWT / secret dari pesan error sebelum dikirim ke browser.
function sanitize(msg: string) {
  return msg
    .replace(/eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g, "[redacted-jwt]")
    .replace(/(api[_-]?key|service[_-]?role[_-]?key|secret)[=:]\s*\S+/gi, "$1=[redacted]")
    .slice(0, 300);
}
