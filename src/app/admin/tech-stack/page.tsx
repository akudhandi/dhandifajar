import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin-guard";
import { createServiceClient } from "@/lib/supabase/service";
import { TechIcon } from "@/components/TechIcon";
import { PageHeader, Card, CardBody, SectionTitle, Field, inputCls, PrimaryButton } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/ui-client";
import { TechTable } from "./tech-table";

export const dynamic = "force-dynamic";

export const ICON_KEYS = [
  "SiHtml5", "SiCss3", "SiJavascript", "SiTypescript", "SiPhp", "SiLaravel",
  "SiNextdotjs", "SiNodedotjs", "SiMysql", "SiPostgresql", "SiGit",
  "SiFlutter", "SiDart", "SiTailwindcss", "SiPostman", "SiGradle",
  "SiPython", "SiFigma", "SiDocker", "SiSupabase",
];

function fail(context: string, msg: string): never {
  redirect(`/admin/tech-stack${context}${context ? "&" : "?"}error=${encodeURIComponent(msg)}`);
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
      icon_key: String(formData.get("icon_key") ?? "SiHtml5"),
      href: String(formData.get("href") ?? "").trim(),
      color: String(formData.get("color") ?? "#FFFFFF").trim() || "#FFFFFF",
      visible: formData.get("visible") === "on",
      sort_order: Number(formData.get("sort_order") ?? 0) || 0,
    };
    const { error } = id
      ? await db.from("tech_stack").update(row).eq("id", id)
      : await db.from("tech_stack").insert(row);
    if (error) fail(context, error.message);
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("NEXT_REDIRECT")) throw e;
    fail(context, e instanceof Error ? e.message : "Gagal menyimpan.");
  }
  revalidatePath("/admin/tech-stack");
  revalidatePath("/api/content");
  revalidatePath("/");
  redirect("/admin/tech-stack?saved=1");
}

async function remove(formData: FormData) {
  "use server";
  await requireAdmin();
  const db = createServiceClient();
  const { error } = await db.from("tech_stack").delete().eq("id", String(formData.get("id")));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/tech-stack");
  revalidatePath("/api/content");
  revalidatePath("/");
}

export default async function AdminTechPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string; new?: string }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const db = createServiceClient();
  const { data: rows, error } = await db.from("tech_stack").select("*").order("sort_order");
  if (error) throw new Error(error.message);

  const editing = params.edit ? rows?.find((r) => r.id === params.edit) ?? null : params.new !== undefined ? "new" : null;
  const context = params.edit ? `?edit=${params.edit}` : params.new !== undefined ? "?new=1" : "";

  return (
    <>
      <PageHeader
        title="Tech Stack"
        subtitle="Logo marquee di homepage. Pilih ikon dari daftar."
        actions={<PrimaryButton href="/admin/tech-stack?new=1"><Plus size={15} /> Tambah</PrimaryButton>}
      />
      <TechTable rows={rows ?? []} remove={remove} />
      {editing && (
        <Card className="mt-6">
          <CardBody>
            <SectionTitle>{editing === "new" ? "Tech baru" : `Edit — ${editing.title}`}</SectionTitle>
            <form action={upsert} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {editing !== "new" && <input type="hidden" name="id" value={editing.id} />}
              <input type="hidden" name="context" value={context} />
              <Field label="Judul *"><input name="title" required defaultValue={editing !== "new" ? editing.title : ""} placeholder="Next.js" className={inputCls} /></Field>
              <Field label="Ikon" hint="Preview ikon terpilih tampil di judul form.">
                <div className="flex gap-2 items-center">
                  <select name="icon_key" defaultValue={editing !== "new" ? editing.icon_key : "SiHtml5"} className={inputCls}>
                    {ICON_KEYS.map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                  <span className="text-2xl shrink-0 w-11 h-11 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                    <TechIcon iconKey={editing !== "new" ? editing.icon_key : "SiHtml5"} color={editing !== "new" ? editing.color : "#FFFFFF"} />
                  </span>
                </div>
              </Field>
              <Field label="Link"><input name="href" defaultValue={editing !== "new" ? editing.href : ""} placeholder="https://..." className={inputCls} /></Field>
              <Field label="Warna brand" hint="Klik untuk pilih warna."><input name="color" type="color" defaultValue={editing !== "new" ? editing.color : "#FFFFFF"} className="w-16 h-10 rounded-lg cursor-pointer bg-transparent" /></Field>
              <Field label="Urutan"><input name="sort_order" type="number" defaultValue={editing !== "new" ? editing.sort_order : 0} className={inputCls} /></Field>
              <div className="flex items-end pb-1"><label className="flex items-center gap-2 text-sm text-neutral-300"><input type="checkbox" name="visible" defaultChecked={editing === "new" ? true : editing.visible} className="accent-cyan-400 w-4 h-4" /> Visible di web</label></div>
              <div className="md:col-span-2 flex gap-2.5"><PendingButton label="Simpan" /><a href="/admin/tech-stack" className="text-sm px-5 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/[0.06] transition">Batal</a></div>
            </form>
          </CardBody>
        </Card>
      )}
    </>
  );
}
