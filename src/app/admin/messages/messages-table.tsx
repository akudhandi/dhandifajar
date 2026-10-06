"use client";

import { useState } from "react";
import { MailOpen, Mail, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import type { Message } from "@/types/portfolio";
import { cn } from "@/lib/utils";
import { Card, CardBody, EmptyState, StatusBadge } from "@/components/admin/ui";
import { SearchInput, FilterChips, Pagination, DeleteButton, useTableData } from "@/components/admin/ui-client";

export function MessagesTable({
  rows,
  toggleRead,
  deleteMessage,
}: {
  rows: Message[];
  toggleRead: (formData: FormData) => Promise<void>;
  deleteMessage: (formData: FormData) => Promise<void>;
}) {
  const { query, setQuery, filter, setFilter, page, setPage, totalPages, pageRows, total } =
    useTableData(rows, {
      searchKeys: ["name", "email", "organization", "needs", "message"],
      filterFn: (r, f) => (f === "unread" ? !r.is_read : r.is_read),
    });
  const [expanded, setExpanded] = useState<string | null>(null);

  async function handleToggle(id: string, is_read: boolean) {
    const fd = new FormData();
    fd.set("id", id);
    fd.set("is_read", String(is_read));
    try {
      await toggleRead(fd);
      toast.success(is_read ? "Ditandai belum dibaca." : "Ditandai sudah dibaca.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal memperbarui.");
    }
  }

  return (
    <Card>
      <CardBody>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <SearchInput value={query} onChange={setQuery} placeholder="Cari nama, email, isi pesan..." />
          <FilterChips
            value={filter}
            onChange={setFilter}
            options={[
              { value: "all", label: "Semua" },
              { value: "unread", label: "Belum dibaca" },
              { value: "read", label: "Sudah dibaca" },
            ]}
          />
        </div>

        {pageRows.length === 0 ? (
          <EmptyState text={rows.length === 0 ? "Belum ada pesan masuk dari contact form." : "Tidak ada hasil untuk pencarian ini."} />
        ) : (
          <ul className="divide-y divide-white/[0.06] -mx-1">
            {pageRows.map((m) => {
              const isOpen = expanded === m.id;
              return (
                <li key={m.id} className="py-1">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : m.id)}
                    className="w-full text-left rounded-xl px-3 py-3 hover:bg-white/[0.03] transition flex items-start gap-3"
                  >
                    <span className={cn("w-2 h-2 rounded-full shrink-0 mt-1.5", m.is_read ? "bg-neutral-700" : "bg-cyan-400")} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 flex-wrap">
                        <span className={cn("text-sm", m.is_read ? "text-neutral-300" : "text-white font-semibold")}>{m.name}</span>
                        {!m.is_read && <StatusBadge tone="cyan">baru</StatusBadge>}
                      </span>
                      <span className="block text-xs text-neutral-500 truncate mt-0.5">
                        {m.email} • {m.organization || "-"} • {m.needs}
                      </span>
                      {isOpen && (
                        <span className="block text-sm text-neutral-300 whitespace-pre-wrap leading-relaxed mt-3 rounded-xl bg-black/40 border border-white/8 p-3.5">
                          {m.message}
                        </span>
                      )}
                    </span>
                    <span className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-neutral-600 whitespace-nowrap hidden md:block">
                        {new Date(m.created_at).toLocaleString("id-ID", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <ChevronDown size={15} className={cn("text-neutral-500 transition-transform", isOpen && "rotate-180")} />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="flex items-center gap-2 px-3 pb-3 pl-8 flex-wrap" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`mailto:${m.email}`}
                        className="text-xs font-medium px-3.5 py-2 rounded-lg bg-white text-black hover:bg-cyan-300 transition"
                      >
                        Balas email
                      </a>
                      <button
                        type="button"
                        onClick={() => handleToggle(m.id, m.is_read)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg border border-white/10 text-neutral-300 hover:bg-white/[0.06] transition"
                      >
                        {m.is_read ? <><Mail size={13} /> Tandai belum dibaca</> : <><MailOpen size={13} /> Tandai dibaca</>}
                      </button>
                      <DeleteButton action={deleteMessage} id={m.id} itemName={`Pesan dari ${m.name}`} small />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        <Pagination page={page} totalPages={totalPages} total={total} onChange={setPage} />
      </CardBody>
    </Card>
  );
}
