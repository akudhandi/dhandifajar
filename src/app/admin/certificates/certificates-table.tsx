"use client";

import Link from "next/link";
import { Pencil, ExternalLink } from "lucide-react";
import type { Certificate } from "@/types/portfolio";
import { Card, CardBody, EmptyState, StatusBadge } from "@/components/admin/ui";
import { SearchInput, FilterChips, Pagination, DeleteButton, useTableData } from "@/components/admin/ui-client";

export function CertificatesTable({
  rows,
  remove,
}: {
  rows: Certificate[];
  remove: (formData: FormData) => Promise<void>;
}) {
  const { query, setQuery, filter, setFilter, page, setPage, totalPages, pageRows, total } =
    useTableData(rows, {
      searchKeys: ["title", "issuer", "year"],
      filterFn: (r, f) => (f === "visible" ? r.visible : !r.visible),
    });

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <SearchInput value={query} onChange={setQuery} placeholder="Cari sertifikat..." />
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
          <EmptyState text={rows.length === 0 ? "Belum ada sertifikat. Selama kosong, halaman Projects menampilkan kartu arsip Drive." : "Tidak ada hasil untuk pencarian ini."} />
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {pageRows.map((c) => (
              <li key={c.id} className="flex items-center gap-3 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">{c.title}</p>
                  <p className="text-xs text-neutral-500 truncate mt-0.5">{c.issuer} • {c.year}</p>
                </div>
                {c.visible ? <StatusBadge tone="green">visible</StatusBadge> : <StatusBadge tone="gray">hidden</StatusBadge>}
                <div className="flex gap-1.5 shrink-0">
                  {(c.credential_url || c.file_url) && (
                    <a href={c.credential_url ?? c.file_url ?? "#"} target="_blank" rel="noreferrer" aria-label="Buka" className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <Link href={`/admin/certificates?edit=${c.id}`} aria-label={`Edit ${c.title}`} className="p-2 rounded-lg border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition">
                    <Pencil size={14} />
                  </Link>
                  <DeleteButton action={remove} id={c.id} itemName={c.title} small />
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
