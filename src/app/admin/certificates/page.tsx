import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin-guard";
import { createServiceClient } from "@/lib/supabase/service";
import { uploadToPortfolio } from "@/lib/upload";
import { PageHeader, Card, CardBody, SectionTitle, Field, inputCls, PrimaryButton } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/ui-client";
import { CertificatesTable } from "./certificates-table";

export const dynamic = "force-dynamic";

function fail(context: string, msg: string): never {
  redirect(`/admin/certificates${context}${context ? "&" : "?"}error=${encodeURIComponent(msg)}`);
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

    const file = formData.get("cert_file") as File | null;
    const fileUrlField = String(formData.get("file_url") ?? "").trim();
    let file_url: string | null = fileUrlField || null;
    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) fail(context, "File maksimal 5MB.");
      file_url = await uploadToPortfolio(file, "certs");
    } else if (id && !fileUrlField && formData.get("keep_file") === "1") {
      const { data } = await db.from("certificates").select("file_url").eq("id", id).maybeSingle();
      file_url = data?.file_url ?? null;
    }

    const row = {
      title,
      issuer: String(formData.get("issuer") ?? "").trim(),
      year: String(formData.get("year") ?? "").trim(),
      credential_url: String(formData.get("credential_url") ?? "").trim() || null,
      file_url,
      visible: formData.get("visible") === "on",
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    };
    const { error } = id
      ? await db.from("certificates").update(row).eq("id", id)
      : await db.from("certificates").insert(row);
    if (error) fail(context, error.message);
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("NEXT_REDIRECT")) throw e;
    fail(context, e instanceof Error ? e.message : "Gagal menyimpan.");
  }
  revalidatePath("/admin/certificates");
  revalidatePath("/api/content");
  revalidatePath("/projects");
  redirect("/admin/certificates?saved=1");
}

async function remove(formData: FormData) {
  "use server";
  await requireAdmin();
  const db = createServiceClient();
  const { error } = await db.from("certificates").delete().eq("id", String(formData.get("id")));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/certificates");
  revalidatePath("/api/content");
  revalidatePath("/projects");
}

export default async function AdminCertificatesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; new?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const db = createServiceClient();
  const { data: rows, error } = await db.from("certificates").select("*").order("sort_order");
  if (error) throw new Error(error.message);

  const editing = params.edit ? rows?.find((r) => r.id === params.edit) ?? null : params.new !== undefined ? "new" : null;
  const context = params.edit ? `?edit=${params.edit}` : params.new !== undefined ? "?new=1" : "";

  return (
    <>
      <PageHeader
        title="Certificates"
        subtitle="Sertifikasi individual. Tampil sebagai grid di halaman Projects."
        actions={<PrimaryButton href="/admin/certificates?new=1"><Plus size={15} /> Tambah</PrimaryButton>}
      />
      <CertificatesTable rows={rows ?? []} remove={remove} />
      {editing && (
        <Card className="mt-6">
          <CardBody>
            <SectionTitle>{editing === "new" ? "Certificate baru" : `Edit — ${editing.title}`}</SectionTitle>
            <form action={upsert} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editing !== "new" && <input type="hidden" name="id" value={editing.id} />}
              {editing !== "new" && editing.file_url && <input type="hidden" name="keep_file" value="1" />}
              <input type="hidden" name="context" value={context} />
              <Field label="Judul *"><input name="title" required defaultValue={editing !== "new" ? editing.title : ""} placeholder="AWS Certified..." className={inputCls} /></Field>
              <Field label="Penerbit"><input name="issuer" defaultValue={editing !== "new" ? editing.issuer : ""} placeholder="Dicoding / Google / ..." className={inputCls} /></Field>
              <Field label="Tahun"><input name="year" defaultValue={editing !== "new" ? editing.year : ""} placeholder="2025" className={inputCls} /></Field>
              <Field label="Urutan"><input name="sort_order" type="number" defaultValue={editing !== "new" ? editing.sort_order : 0} className={inputCls} /></Field>
              <Field label="Credential URL"><input name="credential_url" defaultValue={editing !== "new" ? editing.credential_url ?? "" : ""} placeholder="https://..." className={inputCls} /></Field>
              <Field label="File URL" hint="Opsional bila upload file di bawah."><input name="file_url" defaultValue={editing !== "new" ? editing.file_url ?? "" : ""} placeholder="https://..." className={inputCls} /></Field>
              <Field label="Upload file (max 5MB)"><input name="cert_file" type="file" accept=".pdf,.png,.jpg,.jpeg" className="text-sm text-neutral-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 file:text-[13px]" /></Field>
              <div className="flex items-end pb-1"><label className="flex items-center gap-2 text-sm text-neutral-300"><input type="checkbox" name="visible" defaultChecked={editing === "new" ? true : editing.visible} className="accent-cyan-400 w-4 h-4" /> Visible di web</label></div>
              <div className="md:col-span-2 flex gap-2.5"><PendingButton label="Simpan" /><a href="/admin/certificates" className="text-sm px-5 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/[0.06] transition">Batal</a></div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}
