import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
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
  // Tanpa env: JANGAN crash — render children apa adanya.
  // Halaman /admin/login punya panduan setup sendiri.
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-[#0A0C0F] text-white">
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <AdminToaster />
        <Suspense fallback={null}>
          <FlashToast />
        </Suspense>
      </div>
    );
  }

  let userEmail = "";
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userEmail = user?.email ?? "";
  } catch (e) {
    console.error("[admin-layout] auth unavailable:", e);
  }

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
      <AdminChrome unread={unread} userEmail={userEmail} logoutAction={logout}>
        {children}
      </AdminChrome>
      <AdminToaster />
      <Suspense fallback={null}>
        <FlashToast />
      </Suspense>
    </>
  );
}
