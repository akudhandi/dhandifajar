import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-guard";
import { createServiceClient } from "@/lib/supabase/service";
import { PageHeader } from "@/components/admin/ui";
import { MessagesTable } from "./messages-table";

export const dynamic = "force-dynamic";

async function toggleRead(formData: FormData) {
  "use server";
  await requireAdmin();
  const db = createServiceClient();
  const id = String(formData.get("id"));
  const is_read = formData.get("is_read") === "true";
  const { error } = await db.from("messages").update({ is_read: !is_read }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

async function deleteMessage(formData: FormData) {
  "use server";
  await requireAdmin();
  const db = createServiceClient();
  const { error } = await db.from("messages").delete().eq("id", String(formData.get("id")));
  if (error) throw new Error(error.message);
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export default async function AdminMessagesPage() {
  await requireAdmin();
  const db = createServiceClient();
  const { data, error } = await db
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <>
      <PageHeader
        title="Messages"
        subtitle="Pesan masuk dari contact form. Email notifikasi tetap dikirim via Resend."
      />
      <MessagesTable rows={data ?? []} toggleRead={toggleRead} deleteMessage={deleteMessage} />
    </>
  );
}
