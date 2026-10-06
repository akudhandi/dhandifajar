import { createServiceClient } from "@/lib/supabase/service";

// Upload file ke bucket 'portfolio', kembalikan public URL.
// Dipakai Server Actions admin (cover project, avatar, CV).
export async function uploadToPortfolio(
  file: File,
  folder: "covers" | "avatars" | "cv" | "certs"
): Promise<string> {
  const db = createServiceClient();
  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().slice(0, 8);
  const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const { error } = await db.storage.from("portfolio").upload(key, buf, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) throw new Error(`Upload gagal: ${error.message}`);
  const { data } = db.storage.from("portfolio").getPublicUrl(key);
  return data.publicUrl;
}

export function slugify(name: string) {
  return (
    name
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "project"
  );
}
