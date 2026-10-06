import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---- Design tokens (terpusat agar konsisten) ----
// bg app: #0A0C0F | panel: white/[0.03] border white/8 | aksen: cyan-400

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl md:text-[28px] font-semibold tracking-tight text-white">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-neutral-400 mt-1.5 max-w-xl">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-white/8 bg-white/[0.03] shadow-[0_1px_0_rgba(255,255,255,0.04)_inset] overflow-hidden",
        className
      )}
    >
      {children}
    </section>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("p-5 md:p-6", className)}>{children}</div>;
}

export function SectionTitle({
  children,
  aside,
}: {
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 mb-4">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
        {children}
      </h2>
      {aside}
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
  className,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={cn("block min-w-0", className)}>
      <span className="text-[13px] font-medium text-neutral-300">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <span className="text-xs text-neutral-500 mt-1.5 block">{hint}</span>}
    </label>
  );
}

export const inputCls =
  "w-full rounded-xl border border-white/10 bg-[#0D1117] px-3.5 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15";

export function StatusBadge({
  tone,
  children,
}: {
  tone: "green" | "cyan" | "violet" | "amber" | "red" | "gray";
  children: ReactNode;
}) {
  const tones: Record<string, string> = {
    green: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    cyan: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
    violet: "bg-violet-400/10 text-violet-300 border-violet-400/20",
    amber: "bg-amber-400/10 text-amber-300 border-amber-400/20",
    red: "bg-red-400/10 text-red-300 border-red-400/20",
    gray: "bg-white/5 text-neutral-400 border-white/10",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border whitespace-nowrap",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  title,
  text,
  action,
}: {
  title?: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="text-center py-12 px-6">
      <div className="mx-auto w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
        <span className="w-2 h-2 rounded-full bg-neutral-600" />
      </div>
      {title && <p className="font-medium text-white text-sm mb-1">{title}</p>}
      <p className="text-neutral-500 text-sm max-w-sm mx-auto">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-[13px] font-semibold px-4 py-2.5 rounded-xl bg-white text-black hover:bg-cyan-300 transition active:scale-[0.98]"
    >
      {children}
    </a>
  );
}

export function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-[13px] font-medium px-4 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/[0.06] hover:text-white transition"
    >
      {children}
    </a>
  );
}
