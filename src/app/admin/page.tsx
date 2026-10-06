import Link from "next/link";
import { FolderKanban, Inbox, Briefcase, Layers, ArrowRight, Plus } from "lucide-react";
import { requireAdmin } from "@/lib/admin-guard";
import { isServiceConfigured, createServiceClient } from "@/lib/supabase/service";
import { PageHeader, Card, CardBody, EmptyState } from "@/components/admin/ui";
import { StatCard } from "@/components/admin/stat-card";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  await requireAdmin();
  if (!isServiceConfigured()) {
    return (
      <>
        <PageHeader title="Dashboard" subtitle="Ringkasan konten portfolio." />
        <Card>
          <CardBody>
            <EmptyState
              title="Service key belum diset"
              text="Tambahkan SUPABASE_SERVICE_ROLE_KEY ke env lalu restart server untuk melihat data."
            />
          </CardBody>
        </Card>
      </>
    );
  }
  const db = createServiceClient();
  const [projects, unread, experiences, tech] = await Promise.all([
    db.from("projects").select("id", { count: "exact", head: true }),
    db.from("messages").select("id", { count: "exact", head: true }).eq("is_read", false),
    db.from("experiences").select("id", { count: "exact", head: true }),
    db.from("tech_stack").select("id", { count: "exact", head: true }),
  ]);
  const recent = await db
    .from("messages")
    .select("id,name,email,needs,created_at,is_read")
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Pantau dan kelola semua konten portfolio. Perubahan tampil di web publik max ~60 detik."
        actions={
          <Link
            href="/admin/projects?new=1"
            className="inline-flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-xl bg-white text-black hover:bg-cyan-300 transition active:scale-[0.98]"
          >
            <Plus size={15} /> Project baru
          </Link>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4 mb-6">
        <StatCard label="Projects" value={projects.count ?? 0} href="/admin/projects" icon={FolderKanban} accent="bg-cyan-400/10 border-cyan-400/20 text-cyan-300" />
        <StatCard label="Pesan belum dibaca" value={unread.count ?? 0} href="/admin/messages?filter=unread" icon={Inbox} accent="bg-violet-400/10 border-violet-400/20 text-violet-300" />
        <StatCard label="Experiences" value={experiences.count ?? 0} href="/admin/experiences" icon={Briefcase} accent="bg-emerald-400/10 border-emerald-400/20 text-emerald-300" />
        <StatCard label="Tech stack" value={tech.count ?? 0} href="/admin/tech-stack" icon={Layers} accent="bg-amber-400/10 border-amber-400/20 text-amber-300" />
      </div>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
              Pesan terbaru
            </h2>
            <Link href="/admin/messages" className="inline-flex items-center gap-1 text-[13px] text-cyan-300 hover:text-cyan-200 transition">
              Buka inbox <ArrowRight size={14} />
            </Link>
          </div>
          {!recent.data || recent.data.length === 0 ? (
            <EmptyState text="Belum ada pesan masuk dari contact form." />
          ) : (
            <ul className="divide-y divide-white/[0.06]">
              {recent.data.map((m) => (
                <li key={m.id}>
                  <Link href="/admin/messages" className="flex items-center gap-3 py-3 group">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${m.is_read ? "bg-neutral-700" : "bg-cyan-400"}`} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-white truncate group-hover:text-cyan-200 transition">
                        {m.name} <span className="text-neutral-500 font-normal">• {m.email}</span>
                      </span>
                      <span className="block text-xs text-neutral-500 truncate mt-0.5">{m.needs}</span>
                    </span>
                    <span className="text-[11px] text-neutral-600 whitespace-nowrap hidden sm:block">
                      {new Date(m.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardBody>
      </Card>
    </>
  );
}
