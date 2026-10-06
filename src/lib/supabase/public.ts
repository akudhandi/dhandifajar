import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Public client TANPA cookies/session — untuk baca konten publik.
// Aman dipakai di generateStaticParams & Route Handler ISR
// (tidak memicu dynamic rendering seperti client berbasis cookies).
export function getPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  return createSupabaseClient(url, anon, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
