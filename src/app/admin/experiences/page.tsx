import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin-guard";
import { createServiceClient } from "@/lib/supabase/service";
import { PageHeader, Card, CardBody, SectionTitle, Field, inputCls, PrimaryButton } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/ui-client";
import { ExperiencesTable } from "./experiences-table";

export const dynamic = "force-dynamic";

function fail(context: string, msg: string): never {
  redirect(`/admin/experiences${context}${context ? "&" : "?"}error=${encodeURIComponent(msg)}`);
}

async function upsert(formData: FormData) {
  "use server";
  await requireAdmin();
  const db = createServiceClient();
  const context = String(formData.get("context") ?? "");
  try {
    const id = String(formData.get("id") ?? "") || undefined;
    const title = String(formData.get("title") ?? "").trim();
    if (title.length < 2) fail(context, "Judul minimal 2 karakter.");
    const row = {
      title,
      role: String(formData.get("role") ?? "").trim(),
      year_range: String(formData.get("year_range") ?? "").trim(),
      type: String(formData.get("type") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      visible: formData.get("visible") === "on",
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    };
    const { error } = id
      ? await db.from("experiences").update(row).eq("id", id)
      : await db.from("experiences").insert(row);
    if (error) fail(context, error.message);
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("NEXT_REDIRECT")) throw e;
    fail(context, e instanceof Error ? e.message : "Gagal menyimpan.");
  }
  revalidatePath("/admin/experiences");
  revalidatePath("/api/content");
  revalidatePath("/");
  redirect("/admin/experiences?saved=1");
}

async function remove(formData: FormData) {
  "use server";
  await requireAdmin();
  const db = createServiceClient();
  const { error } = await db.from("experiences").delete().eq("id", String(formData.get("id")));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/experiences");
  revalidatePath("/api/content");
  revalidatePath("/");
}

export default async function AdminExperiencesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; new?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const db = createServiceClient();
  const { data: rows, error } = await db.from("experiences").select("*").order("sort_order");
  if (error) throw new Error(error.message);

  const editing = params.edit ? rows?.find((r) => r.id === params.edit) ?? null : params.new !== undefined ? "new" : null;
  const context = params.edit ? `?edit=${params.edit}` : params.new !== undefined ? "?new=1" : "";

  return (
    <>
      <PageHeader
        title="Experiences"
        subtitle="Pengalaman kerja, organisasi, dan kompetisi."
        actions={<PrimaryButton href="/admin/experiences?new=1"><Plus size={15} /> Tambah</PrimaryButton>}
      />
      <ExperiencesTable rows={rows ?? []} remove={remove} />
      {editing && (
        <Card className="mt-6">
          <CardBody>
            <SectionTitle>{editing === "new" ? "Experience baru" : `Edit — ${editing.title}`}</SectionTitle>
            <form action={upsert} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editing !== "new" && <input type="hidden" name="id" value={editing.id} />}
              <input type="hidden" name="context" value={context} />
              <Field label="Judul *"><input name="title" required defaultValue={editing !== "new" ? editing.title : ""} className={inputCls} /></Field>
              <Field label="Role"><input name="role" defaultValue={editing !== "new" ? editing.role : ""} className={inputCls} /></Field>
              <Field label="Rentang tahun"><input name="year_range" defaultValue={editing !== "new" ? editing.year_range : ""} placeholder="2024-2025" className={inputCls} /></Field>
              <Field label="Tipe"><input name="type" defaultValue={editing !== "new" ? editing.type : ""} placeholder="Organization / Competition" className={inputCls} /></Field>
              <div className="md:col-span-2"><Field label="Deskripsi"><textarea name="description" rows={3} defaultValue={editing !== "new" ? editing.description : ""} className={inputCls} /></Field></div>
              <Field label="Urutan"><input name="sort_order" type="number" defaultValue={editing !== "new" ? editing.sort_order : 0} className={inputCls} /></Field>
              <div className="flex items-end pb-1"><label className="flex items-center gap-2 text-sm text-neutral-300"><input type="checkbox" name="visible" defaultChecked={editing === "new" ? true : editing.visible} className="accent-cyan-400 w-4 h-4" /> Visible di web</label></div>
              <div className="md:col-span-2 flex gap-2.5"><PendingButton label="Simpan" /><a href="/admin/experiences" className="text-sm px-5 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/[0.06] transition">Batal</a></div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}
