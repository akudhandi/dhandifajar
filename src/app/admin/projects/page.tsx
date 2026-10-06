import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin-guard";
import { createServiceClient } from "@/lib/supabase/service";
import { slugify, uploadToPortfolio } from "@/lib/upload";
import { PageHeader, Card, CardBody, SectionTitle, Field, inputCls, PrimaryButton } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/ui-client";
import { ProjectsTable } from "./projects-table";
import type { ProjectType } from "@/types/portfolio";

export const dynamic = "force-dynamic";

const TYPES: ProjectType[] = ["web", "mobile", "research", "software", "database", "networking"];

function parseTools(raw: string): string[] {
  return raw.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 12);
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const db = createServiceClient();
  let slug = base;
  let n = 2;
  for (;;) {
    let q = db.from("projects").select("id").eq("slug", slug);
    if (excludeId) q = q.neq("id", excludeId);
    const { data } = await q.limit(1);
    if (!data || data.length === 0) return slug;
    slug = `${base}-${n++}`;
  }
}

function fail(context: string, msg: string): never {
  redirect(`/admin/projects${context}${context ? "&" : "?"}error=${encodeURIComponent(msg)}`);
}

async function upsertProject(formData: FormData) {
  "use server";
  await requireAdmin();
  const db = createServiceClient();
  const context = String(formData.get("context") ?? "");

  try {
    const id = String(formData.get("id") ?? "") || undefined;
    const name = String(formData.get("name") ?? "").trim();
    if (name.length < 2) fail(context, "Nama project minimal 2 karakter.");
    const customSlug = String(formData.get("slug") ?? "").trim();
    const slug = await uniqueSlug(slugify(customSlug || name), id);

    const coverFile = formData.get("cover_file") as File | null;
    const coverUrlField = String(formData.get("cover_url") ?? "").trim();
    let cover_url: string | null = coverUrlField || null;
    if (coverFile && coverFile.size > 0) {
      if (coverFile.size > 2 * 1024 * 1024) fail(context, "Cover maksimal 2MB.");
      cover_url = await uploadToPortfolio(coverFile, "covers");
    } else if (id && !coverUrlField && formData.get("keep_cover") === "1") {
      const { data } = await db.from("projects").select("cover_url").eq("id", id).maybeSingle();
      cover_url = data?.cover_url ?? null;
    }

    const row = {
      slug,
      name,
      year: String(formData.get("year") ?? "").trim(),
      role: String(formData.get("role") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      type: String(formData.get("type") ?? "web"),
      tools: parseTools(String(formData.get("tools") ?? "")),
      github_url: String(formData.get("github_url") ?? "").trim() || null,
      doc_url: String(formData.get("doc_url") ?? "").trim() || null,
      doi_url: String(formData.get("doi_url") ?? "").trim() || null,
      cover_url,
      gradient: String(formData.get("gradient") ?? "").trim() || "bg-gradient-to-br from-blue-900/40 to-black",
      featured: formData.get("featured") === "on",
      visible: formData.get("visible") === "on",
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    };

    const { error } = id
      ? await db.from("projects").update(row).eq("id", id)
      : await db.from("projects").insert(row);
    if (error) fail(context, `Gagal menyimpan: ${error.message}`);
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("NEXT_REDIRECT")) throw e;
    fail(context, e instanceof Error ? e.message : "Gagal menyimpan.");
  }

  revalidatePath("/admin/projects");
  revalidatePath("/api/content");
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/admin/projects?saved=1");
}

async function deleteProject(formData: FormData) {
  "use server";
  await requireAdmin();
  const db = createServiceClient();
  const { error } = await db.from("projects").delete().eq("id", String(formData.get("id")));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/projects");
  revalidatePath("/api/content");
  revalidatePath("/");
  revalidatePath("/projects");
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; new?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const db = createServiceClient();
  const { data: rows, error } = await db.from("projects").select("*").order("sort_order");
  if (error) throw new Error(error.message);

  const editing = params.edit
    ? rows?.find((r) => r.id === params.edit) ?? null
    : params.new !== undefined
      ? "new"
      : null;
  const context = params.edit ? `?edit=${params.edit}` : params.new !== undefined ? "?new=1" : "";

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Kelola portofolio project. Visible tampil di web, Featured untuk sorotan."
        actions={
          <PrimaryButton href="/admin/projects?new=1">
            <Plus size={15} /> Tambah Project
          </PrimaryButton>
        }
      />
      <ProjectsTable rows={rows ?? []} deleteProject={deleteProject} />

      {editing && (
        <Card className="mt-6">
          <CardBody>
            <SectionTitle>{editing === "new" ? "Project baru" : `Edit — ${editing.name}`}</SectionTitle>
            <ProjectForm initial={editing === "new" ? null : editing} action={upsertProject} context={context} />
          </CardBody>
        </Card>
      )}
    </>
  );
}

type Initial = {
  id?: string; name?: string; slug?: string; year?: string; role?: string;
  description?: string; type?: string; tools?: string[]; github_url?: string | null;
  doc_url?: string | null; doi_url?: string | null; cover_url?: string | null;
  gradient?: string; featured?: boolean; visible?: boolean; sort_order?: number;
} | null;

function ProjectForm({
  initial,
  action,
  context,
}: {
  initial: Initial;
  action: (formData: FormData) => Promise<void>;
  context: string;
}) {
  return (
    <form action={action} className="space-y-6">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      {initial?.cover_url && <input type="hidden" name="keep_cover" value="1" />}
      <input type="hidden" name="context" value={context} />

      <div>
        <SectionTitle>Informasi dasar</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nama project *"><input name="name" required defaultValue={initial?.name ?? ""} placeholder="Morations" className={inputCls} /></Field>
          <Field label="Slug" hint="Kosongkan = otomatis dari nama. Unik untuk URL /projects/slug."><input name="slug" defaultValue={initial?.slug ?? ""} placeholder="morations" className={inputCls} /></Field>
          <Field label="Tahun"><input name="year" defaultValue={initial?.year ?? ""} placeholder="2025" className={inputCls} /></Field>
          <Field label="Role"><input name="role" defaultValue={initial?.role ?? ""} placeholder="Full-Stack Developer" className={inputCls} /></Field>
          <div className="md:col-span-2"><Field label="Deskripsi"><textarea name="description" rows={3} defaultValue={initial?.description ?? ""} placeholder="Ceritakan project..." className={inputCls} /></Field></div>
          <Field label="Tipe"><select name="type" defaultValue={initial?.type ?? "web"} className={inputCls}>{TYPES.map((t) => <option key={t} value={t}>{t}</option>)}</select></Field>
          <Field label="Tools" hint="Pisahkan dengan koma. Contoh: Next.js, Tailwind CSS"><input name="tools" defaultValue={(initial?.tools ?? []).join(", ")} className={inputCls} /></Field>
        </div>
      </div>

      <div>
        <SectionTitle>Tautan</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Field label="GitHub URL"><input name="github_url" defaultValue={initial?.github_url ?? ""} placeholder="https://github.com/..." className={inputCls} /></Field>
          <Field label="Document URL"><input name="doc_url" defaultValue={initial?.doc_url ?? ""} placeholder="https://drive.google.com/..." className={inputCls} /></Field>
          <Field label="DOI URL (riset)"><input name="doi_url" defaultValue={initial?.doi_url ?? ""} placeholder="https://doi.org/..." className={inputCls} /></Field>
        </div>
      </div>

      <div>
        <SectionTitle>Media & tampil</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Cover URL" hint="Opsional bila upload file di bawah."><input name="cover_url" defaultValue={initial?.cover_url ?? ""} placeholder="https://..." className={inputCls} /></Field>
          <Field label="Upload cover (max 2MB)"><input name="cover_file" type="file" accept="image/*" className="text-sm text-neutral-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 file:text-[13px]" /></Field>
          <Field label="Gradient panel" hint="Dipakai bila tanpa cover."><input name="gradient" defaultValue={initial?.gradient ?? ""} className={inputCls} /></Field>
          <Field label="Urutan tampil"><input name="sort_order" type="number" defaultValue={initial?.sort_order ?? 0} className={inputCls} /></Field>
          <div className="md:col-span-2 flex gap-6 text-sm">
            <label className="flex items-center gap-2 text-neutral-300"><input type="checkbox" name="featured" defaultChecked={initial?.featured ?? true} className="accent-cyan-400 w-4 h-4" /> Featured</label>
            <label className="flex items-center gap-2 text-neutral-300"><input type="checkbox" name="visible" defaultChecked={initial?.visible ?? true} className="accent-cyan-400 w-4 h-4" /> Visible di web</label>
          </div>
        </div>
      </div>

      <div className="flex gap-2.5 pt-1">
        <PendingButton label={initial?.id ? "Simpan perubahan" : "Tambah project"} />
        <a href="/admin/projects" className="text-sm px-5 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/[0.06] transition">Batal</a>
      </div>
    </form>
  );
}
