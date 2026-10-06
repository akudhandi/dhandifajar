import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  href,
  icon: Icon,
  accent,
}: {
  label: string;
  value: number | string;
  href: string;
  icon: LucideIcon;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-white/8 bg-white/[0.03] p-5 hover:border-cyan-400/30 hover:bg-white/[0.05] transition"
    >
      <div className="flex items-center justify-between mb-4">
        <span className={`w-9 h-9 rounded-xl flex items-center justify-center border ${accent}`}>
          <Icon size={17} />
        </span>
        <span className="text-xs text-neutral-500 group-hover:text-cyan-300 transition">Kelola →</span>
      </div>
      <p className="text-3xl font-bold tracking-tight text-white">{value}</p>
      <p className="text-[13px] text-neutral-400 mt-1">{label}</p>
    </Link>
  );
}
