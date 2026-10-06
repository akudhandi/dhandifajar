"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import type { Experience } from "@/types/portfolio";
import { Card, CardBody, EmptyState, StatusBadge } from "@/components/admin/ui";
import { SearchInput, FilterChips, Pagination, DeleteButton, useTableData } from "@/components/admin/ui-client";

export function ExperiencesTable({
  rows,
  remove,
}: {
  rows: Experience[];
  remove: (formData: FormData) => Promise<void>;
}) {
  const { query, setQuery, filter, setFilter, page, setPage, totalPages, pageRows, total } =
    useTableData(rows, {
      searchKeys: ["title", "role", "type", "year_range"],
      filterFn: (r, f) => (f === "visible" ? r.visible : !r.visible),
    });

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <SearchInput value={query} onChange={setQuery} placeholder="Cari experience..." />
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
          <EmptyState text={rows.length === 0 ? "Belum ada experience." : "Tidak ada hasil untuk pencarian ini."} />
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {pageRows.map((e) => (
              <li key={e.id} className="flex items-center gap-3 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{e.title}</p>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">
                    {e.role} • {e.year_range} • {e.type}
                  </p>
                </div>
                {e.visible ? <StatusBadge tone="green">visible</StatusBadge> : <StatusBadge tone="gray">hidden</StatusBadge>}
                <div className="flex gap-1.5 shrink-0">
                  <Link href={`/admin/experiences?edit=${e.id}`} aria-label={`Edit ${e.title}`} className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition">
                    <Pencil size={14} />
                  </Link>
                  <DeleteButton action={remove} id={e.id} itemName={e.title} small />
                </div>
              </li>
            ))}
          </ul>
        )}
        <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
      </CardBody>
    </Card>
  );
}
