"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  FolderKanban,
  Briefcase,
  Layers,
  Award,
  UserRound,
  Globe,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/messages", label: "Messages", icon: Inbox, badgeKey: "unread" as const },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/experiences", label: "Experiences", icon: Briefcase },
  { href: "/admin/tech-stack", label: "Tech Stack", icon: Layers },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
  { href: "/admin/profile", label: "Profile", icon: UserRound },
];

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/messages": "Messages",
  "/admin/projects": "Projects",
  "/admin/experiences": "Experiences",
  "/admin/tech-stack": "Tech Stack",
  "/admin/certificates": "Certificates",
  "/admin/profile": "Profile",
  "/admin/login": "Login",
};

function NavContent({
  pathname,
  unread,
  onNavigate,
  logoutAction,
  userEmail,
}: {
  pathname: string;
  unread: number | null;
  onNavigate?: () => void;
  logoutAction: () => Promise<void>;
  userEmail: string;
}) {
  return (
    <div className="flex flex-col h-full">
      <Link href="/admin" onClick={onNavigate} className="flex items-center gap-2.5 px-2 py-1 mb-6">
        <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-black text-black text-sm">
          d
        </span>
        <span>
          <span className="block font-bold tracking-wide text-sm text-white leading-none">ADMIN</span>
          <span className="block text-[11px] text-neutral-500 mt-1">portfolio CMS</span>
        </span>
      </Link>

      <nav className="space-y-1 flex-1">
        {nav.map((n) => {
          const active = n.exact ? pathname === n.href : pathname.startsWith(n.href);
          const Icon = n.icon;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition group",
                active
                  ? "bg-white/[0.08] text-white shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] border border-white/10"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
              )}
            >
              <Icon size={17} className={active ? "text-cyan-300" : "text-neutral-500 group-hover:text-neutral-300"} />
              <span className="flex-1">{n.label}</span>
              {n.badgeKey === "unread" && unread !== null && unread > 0 && (
                <span className="min-w-5 h-5 px-1.5 rounded-full bg-cyan-400 text-black text-[11px] font-bold flex items-center justify-center">
                  {unread > 99 ? "99+" : unread}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="pt-4 mt-4 border-t border-white/8 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-neutral-400 hover:text-white hover:bg-white/[0.04] transition"
        >
          <Globe size={17} className="text-neutral-500" />
          View site
        </a>
        <div className="flex items-center gap-3 px-3 py-2">
          <span className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[11px] font-bold text-neutral-300">
            {(userEmail?.[0] ?? "A").toUpperCase()}
          </span>
          <span className="flex-1 text-xs text-neutral-500 truncate">{userEmail}</span>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-neutral-400 hover:text-red-300 hover:bg-red-400/10 transition"
          >
            <LogOut size={17} />
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminChrome({
  children,
  unread,
  userEmail,
  logoutAction,
}: {
  children: React.ReactNode;
  unread: number | null;
  userEmail: string;
  logoutAction: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = titles[pathname] ?? "Admin";

  return (
    <div className="min-h-screen bg-[#0A0C0F] text-white">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[260px] border-r border-white/8 bg-[#0D1117]/80 backdrop-blur p-4">
        <NavContent pathname={pathname} unread={unread} logoutAction={logoutAction} userEmail={userEmail} />
      </aside>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[280px] bg-[#0D1117] border-r border-white/10 p-4 overflow-y-auto">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Tutup menu"
                className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white transition"
              >
                <X size={16} />
              </button>
            </div>
            <NavContent pathname={pathname} unread={unread} onNavigate={() => setOpen(false)} logoutAction={logoutAction} userEmail={userEmail} />
          </aside>
        </div>
      )}

      <div className="lg:pl-[260px] min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0A0C0F]/85 backdrop-blur">
          <div className="flex items-center gap-3 px-4 md:px-8 py-3.5">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Buka menu"
              className="lg:hidden p-2 rounded-lg border border-white/10 text-neutral-300 hover:bg-white/[0.06] transition"
            >
              <Menu size={17} />
            </button>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-500">Admin</p>
              <h1 className="text-[15px] font-semibold text-white leading-tight truncate">{title}</h1>
            </div>
          </div>
        </header>
        <main className="px-4 md:px-8 py-6 md:py-8 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
