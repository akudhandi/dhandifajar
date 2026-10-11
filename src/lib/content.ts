import { fallbackContent } from "@/data/portfolio";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { getPublicClient } from "@/lib/supabase/public";
import type { SiteContent } from "@/types/portfolio";

// Ambil seluruh konten publik. Coba Supabase dulu, fallback ke data statis.
// Dipakai oleh /api/content, halaman detail, dan admin (read path publik).
export async function getSiteContent(): Promise<SiteContent> {
  const supabase = isSupabaseConfigured() ? getPublicClient() : null;
  if (!supabase) return fallbackContent;
  try {
    const [profileRes, projectsRes, expRes, techRes, certRes] =
      await Promise.all([
        supabase.from("profiles").select("*").eq("id", "main").maybeSingle(),
        supabase
          .from("projects")
          .select("*")
          .eq("visible", true)
          .order("sort_order", { ascending: true }),
        supabase
          .from("experiences")
          .select("*")
          .eq("visible", true)
          .order("sort_order", { ascending: true }),
        supabase
          .from("tech_stack")
          .select("*")
          .eq("visible", true)
          .order("sort_order", { ascending: true }),
        supabase
          .from("certificates")
          .select("*")
          .eq("visible", true)
          .order("sort_order", { ascending: true }),
      ]);

    if (
      profileRes.error ||
      projectsRes.error ||
      expRes.error ||
      techRes.error ||
      certRes.error
    ) {
      console.error("[content] supabase error, pakai fallback");
      return fallbackContent;
    }

    const dbTech = techRes.data ?? [];
    const seen = new Set(dbTech.map((t) => t.title.toLowerCase()));
    const missing = fallbackContent.techStack.filter(
      (t) => !seen.has(t.title.toLowerCase())
    );
    const techStack =
      missing.length > 0
        ? [...dbTech, ...missing].sort(
            (a, b) => a.sort_order - b.sort_order
          )
        : dbTech;

    return {
      profile: profileRes.data ?? fallbackContent.profile,
      projects:
        projectsRes.data && projectsRes.data.length > 0
          ? projectsRes.data
          : fallbackContent.projects,
      experiences: expRes.data ?? fallbackContent.experiences,
      techStack: techStack.length > 0 ? techStack : fallbackContent.techStack,
      certificates: certRes.data ?? [],
      source: "database",
    };
  } catch (e) {
    console.error("[content] unexpected, pakai fallback:", e);
    return fallbackContent;
  }
}
