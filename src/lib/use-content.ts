"use client";

import { useEffect, useState } from "react";
import { fallbackContent } from "@/data/portfolio";
import type { SiteContent } from "@/types/portfolio";

// Hook client: ambil konten publik (DB via /api/content), fallback ke statis.
// Komponen tetap render instan dari fallback, lalu re-render saat DB tiba.
export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(fallbackContent);
  useEffect(() => {
    let cancelled = false;
    fetch("/api/content", { next: { revalidate: 60 } } as RequestInit)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && data.profile) setContent(data as SiteContent);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return content;
}
