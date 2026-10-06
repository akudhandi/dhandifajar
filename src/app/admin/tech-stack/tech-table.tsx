"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import type { TechItem } from "@/types/portfolio";
import { TechIcon } from "@/components/TechIcon";
import { Card, CardBody, EmptyState, StatusBadge } from "@/components/admin/ui";
import { SearchInput, FilterChips, Pagination, DeleteButton, useTableData } from "@/components/admin/ui-client";

export function TechTable({
  rows,
  remove,
}: {
  rows: TechItem[];
  remove: (formData: FormData) => Promise<void>;
}) {
  const { query, setQuery, filter, setFilter, page, setPage, totalPages, pageRows, total } =
    useTableData(rows, {
      searchKeys: ["title", "icon_key"],
      filterFn: (r, f) => (f === "visible" ? r.visible : !r.visible),
    });

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <SearchInput value={query} onChange={setQuery} placeholder="Cari tech..." />
          <FilterChips
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "Semua" },
              { value: "visible", label: "Visible" },
              { value: "hidden", label: "Hidden" },
            ]}
          />
        </div>
        {pageRows.length === 0 ? (
          <EmptyState text={rows.length === 0 ? "Belum ada tech." : "Tidak ada hasil untuk pencarian ini."} />
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pageRows.map((t) => (
              <li key={t.id} className="rounded-xl border border-white/8 bg-black/30 p-4 flex items-center gap-3 hover:border-white/15 transition">
                <span className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-xl shrink-0">
                  <TechIcon iconKey={t.icon_key} color={t.color} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-white truncate">{t.title}</span>
                  <span className="block text-[11px] text-neutral-500 font-mono truncate mt-0.5">{t.icon_key}</span>
                </span>
                {t.visible ? <StatusBadge tone="green">visible</StatusBadge> : <StatusBadge tone="gray">hidden</StatusBadge>}
                <span className="flex gap-1.5 shrink-0">
                  <Link href={`/admin/tech-stack?edit=${t.id}`} aria-label={`Edit ${t.title}`} className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition">
                    <Pencil size={14} />
                  </Link>
                  <DeleteButton action={remove} id={t.id} itemName={t.title} small />
                </span>
              </li>
            ))}
          </ul>
        )}
        <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
      </CardBody>
    </Card>
  );
}
