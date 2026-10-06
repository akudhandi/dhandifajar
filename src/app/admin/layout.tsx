import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isServiceConfigured, createServiceClient } from "@/lib/supabase/service";
import { AdminChrome } from "@/components/admin/admin-chrome";
import { AdminToaster } from "@/components/admin/toaster";
import { FlashToast } from "@/components/admin/ui-client";

export const dynamic = "force-dynamic";

async function logout() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let unread: number | null = null;
  if (isServiceConfigured()) {
    try {
      const db = createServiceClient();
      const { count } = await db
        .from("messages")
        .select("id", { count: "exact", head: true })
        .eq("is_read", false);
      unread = count ?? 0;
    } catch {
      unread = null;
    }
  }

  return (
    <>
      <AdminChrome unread={unread} userEmail={user?.email ?? ""} logoutAction={logout}>
        {children}
      </AdminChrome>
      <AdminToaster />
      <Suspense fallback={null}>
        <FlashToast />
      </Suspense>
    </>
  );
}
