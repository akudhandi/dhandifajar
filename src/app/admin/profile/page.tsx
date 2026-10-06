import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-guard";
import { createServiceClient } from "@/lib/supabase/service";
import { uploadToPortfolio } from "@/lib/upload";
import { PageHeader, Card, CardBody, SectionTitle, Field, inputCls } from "@/components/admin/ui";
import { PendingButton } from "@/components/admin/ui-client";

export const dynamic = "force-dynamic";

async function saveProfile(formData: FormData) {
  "use server";
  await requireAdmin();
  const db = createServiceClient();

  const fail = (msg: string): never => {
    redirect(`/admin/profile?error=${encodeURIComponent(msg)}`);
  };

  try {
    const avatarFile = formData.get("avatar_file") as File | null;
    let avatar_url: string | null = String(formData.get("avatar_url") ?? "").trim() || null;
    if (avatarFile && avatarFile.size > 0) {
      if (avatarFile.size > 2 * 1024 * 1024) fail("Avatar maksimal 2MB.");
      avatar_url = await uploadToPortfolio(avatarFile, "avatars");
    } else if (!avatar_url && formData.get("keep_avatar") === "1") {
      const { data } = await db.from("profiles").select("avatar_url").eq("id", "main").maybeSingle();
      avatar_url = data?.avatar_url ?? null;
    }

    const cvFile = formData.get("cv_file") as File | null;
    let cv_url: string | null = String(formData.get("cv_url") ?? "").trim() || null;
    if (cvFile && cvFile.size > 0) {
      if (cvFile.size > 5 * 1024 * 1024) fail("CV maksimal 5MB.");
      cv_url = await uploadToPortfolio(cvFile, "cv");
    } else if (!cv_url && formData.get("keep_cv") === "1") {
      const { data } = await db.from("profiles").select("cv_url").eq("id", "main").maybeSingle();
      cv_url = data?.cv_url ?? null;
    }

    const row = {
      id: "main",
      full_name: String(formData.get("full_name") ?? "").trim(),
      headline: String(formData.get("headline") ?? "").trim(),
      bio: String(formData.get("bio") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      location: String(formData.get("location") ?? "").trim(),
      avatar_url,
      cv_url,
      socials: {
        linkedin: String(formData.get("social_linkedin") ?? "").trim(),
        github: String(formData.get("social_github") ?? "").trim(),
        instagram: String(formData.get("social_instagram") ?? "").trim(),
        discord: String(formData.get("social_discord") ?? "").trim(),
      },
      certificates_url: String(formData.get("certificates_url") ?? "").trim() || null,
      docs_url: String(formData.get("docs_url") ?? "").trim() || null,
      open_to_work: formData.get("open_to_work") === "on",
      years_exp: String(formData.get("years_exp") ?? "").trim() || "2+",
      projects_count: String(formData.get("projects_count") ?? "").trim() || "15+",
    };

    const { error } = await db.from("profiles").upsert(row, { onConflict: "id" });
    if (error) fail(`Gagal menyimpan: ${error.message}`);
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("NEXT_REDIRECT")) throw e;
    fail(e instanceof Error ? e.message : "Gagal menyimpan.");
  }

  revalidatePath("/admin/profile");
  revalidatePath("/api/content");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contactme");
  redirect("/admin/profile?saved=1");
}

export default async function AdminProfilePage() {
  await requireAdmin();
  const db = createServiceClient();
  const { data: p } = await db.from("profiles").select("*").eq("id", "main").maybeSingle();

  return (
    <>
      <PageHeader
        title="Profile"
        subtitle="Identitas, kontak, sosmed, CV, dan statistik yang tampil di seluruh web."
      />
      <form action={saveProfile} className="space-y-5">
        {p?.avatar_url && <input type="hidden" name="keep_avatar" value="1" />}
        {p?.cv_url && <input type="hidden" name="keep_cv" value="1" />}

        <Card><CardBody>
          <SectionTitle>Identitas</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Nama lengkap"><input name="full_name" defaultValue={p?.full_name ?? ""} className={inputCls} /></Field>
            <Field label="Email kontak"><input name="email" type="email" defaultValue={p?.email ?? ""} className={inputCls} /></Field>
            <div className="md:col-span-2"><Field label="Headline"><input name="headline" defaultValue={p?.headline ?? ""} className={inputCls} /></Field></div>
            <div className="md:col-span-2"><Field label="Bio singkat"><textarea name="bio" rows={3} defaultValue={p?.bio ?? ""} className={inputCls} /></Field></div>
            <Field label="Lokasi"><input name="location" defaultValue={p?.location ?? ""} className={inputCls} /></Field>
            <Field label="WhatsApp URL"><input name="whatsapp" defaultValue={p?.whatsapp ?? ""} placeholder="https://wa.me/..." className={inputCls} /></Field>
            <Field label="Tahun pengalaman"><input name="years_exp" defaultValue={p?.years_exp ?? ""} className={inputCls} /></Field>
            <Field label="Jumlah project"><input name="projects_count" defaultValue={p?.projects_count ?? ""} className={inputCls} /></Field>
            <div className="md:col-span-2"><label className="flex items-center gap-2 text-sm text-neutral-300"><input type="checkbox" name="open_to_work" defaultChecked={p?.open_to_work ?? true} className="accent-cyan-400 w-4 h-4" /> Open to work <span className="text-neutral-500">(tampil sebagai status di halaman About)</span></label></div>
          </div>
        </CardBody></Card>

        <Card><CardBody>
          <SectionTitle>Sosial media</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="LinkedIn"><input name="social_linkedin" defaultValue={p?.socials?.linkedin ?? ""} className={inputCls} /></Field>
            <Field label="GitHub"><input name="social_github" defaultValue={p?.socials?.github ?? ""} className={inputCls} /></Field>
            <Field label="Instagram"><input name="social_instagram" defaultValue={p?.socials?.instagram ?? ""} className={inputCls} /></Field>
            <Field label="Discord"><input name="social_discord" defaultValue={p?.socials?.discord ?? ""} className={inputCls} /></Field>
          </div>
        </CardBody></Card>

        <Card><CardBody>
          <SectionTitle>Media & arsip</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Avatar URL" hint="Opsional bila upload di samping."><input name="avatar_url" defaultValue={p?.avatar_url ?? ""} className={inputCls} /></Field>
            <Field label="Upload avatar (max 2MB)"><input name="avatar_file" type="file" accept="image/*" className="text-sm text-neutral-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 file:text-[13px]" /></Field>
            <Field label="CV URL" hint="PDF — Drive atau hasil upload."><input name="cv_url" defaultValue={p?.cv_url ?? ""} className={inputCls} /></Field>
            <Field label="Upload CV PDF (max 5MB)"><input name="cv_file" type="file" accept=".pdf" className="text-sm text-neutral-400 file:mr-3 file:px-4 file:py-2 file:rounded-xl file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20 file:text-[13px]" /></Field>
            <Field label="Drive Certificates"><input name="certificates_url" defaultValue={p?.certificates_url ?? ""} className={inputCls} /></Field>
            <Field label="Drive Docs"><input name="docs_url" defaultValue={p?.docs_url ?? ""} className={inputCls} /></Field>
          </div>
        </CardBody></Card>

        <div className="sticky bottom-4 flex justify-end">
          <div className="rounded-2xl border border-white/10 bg-[#0D1117]/95 backdrop-blur px-3 py-2 shadow-2xl">
            <PendingButton label="Simpan Profile" />
          </div>
        </div>
      </form>
    </>
  );
}
