"use client";

import Link from "next/link";
import { Pencil, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/portfolio";
import { Card, CardBody, EmptyState, StatusBadge } from "@/components/admin/ui";
import { SearchInput, FilterChips, Pagination, DeleteButton, useTableData } from "@/components/admin/ui-client";

const TYPE_FILTERS = [
  { value: "all", label: "Semua" },
  { value: "web", label: "Web" },
  { value: "mobile", label: "Mobile" },
  { value: "research", label: "Research" },
  { value: "software", label: "Software" },
  { value: "database", label: "Database" },
  { value: "networking", label: "Networking" },
];

export function ProjectsTable({
  rows,
  deleteProject,
}: {
  rows: Project[];
  deleteProject: (formData: FormData) => Promise<void>;
}) {
  const { query, setQuery, filter, setFilter, page, setPage, totalPages, pageRows, total } =
    useTableData(rows, {
      searchKeys: ["name", "slug", "role", "year"],
      filterFn: (r, f) => r.type === f,
    });

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col gap-3 mb-5">
          <SearchInput value={query} onChange={setQuery} placeholder="Cari project..." />
          <FilterChips value={filter} onChange={setFilter} options={TYPE_FILTERS} />
        </div>

        {pageRows.length === 0 ? (
          <EmptyState text={rows.length === 0 ? "Belum ada project. Tambahkan yang pertama." : "Tidak ada hasil untuk pencarian ini."} />
        ) : (
          <div className="overflow-x-auto -mx-1">
            <table className="w-full text-sm min-w-[640px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.1em] text-neutral-500 border-b border-white/8">
                  <th className="font-medium pb-3 pr-4">Project</th>
                  <th className="font-medium pb-3 pr-4">Tipe</th>
                  <th className="font-medium pb-3 pr-4">Status</th>
                  <th className="font-medium pb-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {pageRows.map((p) => (
                  <tr key={p.id} className="group hover:bg-white/[0.02] transition">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 bg-white/[0.04] flex items-center justify-center shrink-0">
                          {p.cover_url ? (
                            <img src={p.cover_url} alt="" className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <span className="font-black text-neutral-600">{p.name.charAt(0)}</span>
                          )}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium text-white truncate">{p.name}</span>
                          <span className="block text-xs text-neutral-500 font-mono truncate">/{p.slug} • {p.year}</span>
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <StatusBadge tone="violet">{p.type}</StatusBadge>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="flex gap-1.5 flex-wrap">
                        {p.visible ? <StatusBadge tone="green">visible</StatusBadge> : <StatusBadge tone="gray">hidden</StatusBadge>}
                        {p.featured && <StatusBadge tone="cyan">featured</StatusBadge>}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <div className="flex justify-end gap-1.5">
                        <a
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Lihat ${p.name}`}
                          className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition"
                        >
                          <ExternalLink size={14} />
                        </a>
                        <Link
                          href={`/admin/projects?edit=${p.id}`}
                          aria-label={`Edit ${p.name}`}
                          className={cn("p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition")}
                        >
                          <Pencil size={14} />
                        </Link>
                        <DeleteButton action={deleteProject} id={p.id} itemName={p.name} small />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
      </CardBody>
    </Card>
  );
}
