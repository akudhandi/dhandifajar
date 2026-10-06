"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// ---------- Search input ----------
export function SearchInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="relative min-w-0 flex-1 sm:max-w-xs">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Cari..."}
        className="w-full rounded-xl border border-white/10 bg-[#0D1117] pl-9 pr-8 py-2.5 text-sm text-white placeholder:text-neutral-600 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Hapus pencarian"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

// ---------- Generic client-side table state ----------
export function useTableData<T>(
  rows: T[],
  opts: {
    searchKeys: (keyof T)[];
    filterFn?: (row: T, filter: string) => boolean;
    perPage?: number;
  }
) {
  const [query, setQueryState] = useState("");
  const [filter, setFilterState] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = opts.perPage ?? 8;

  function setQuery(v: string) {
    setQueryState(v);
    setPage(1);
  }

  function setFilter(v: string) {
    setFilterState(v);
    setPage(1);
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter !== "all" && opts.filterFn && !opts.filterFn(r, filter)) return false;
      if (!q) return true;
      return opts.searchKeys.some((k) =>
        String(r[k] ?? "").toLowerCase().includes(q)
      );
    });
  }, [rows, query, filter, opts]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * perPage, safePage * perPage);

  return { query, setQuery, filter, setFilter, page: safePage, setPage, totalPages, pageRows, total: filtered.length };
}

// ---------- Pagination ----------
export function Pagination({
  page,
  totalPages,
  total,
  onChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) {
    return <p className="text-xs text-neutral-500">{total} data</p>;
  }
  return (
    <div className="flex items-center justify-between gap-3 pt-4">
      <p className="text-xs text-neutral-500">
        Halaman {page} dari {totalPages} • {total} data
      </p>
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          aria-label="Halaman sebelumnya"
          className="p-2 rounded-lg border border-white/10 text-neutral-300 hover:bg-white/[0.06] disabled:opacity-40 transition"
        >
          <ChevronLeft size={15} />
        </button>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="Halaman berikutnya"
          className="p-2 rounded-lg border border-white/10 text-neutral-300 hover:bg-white/[0.06] disabled:opacity-40 transition"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

// ---------- Filter chips ----------
export function FilterChips({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            "text-xs font-medium px-3.5 py-2 rounded-full border transition whitespace-nowrap",
            value === o.value
              ? "bg-white text-black border-white"
              : "border-white/10 text-neutral-400 hover:bg-white/[0.06] hover:text-white"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ---------- Delete with custom dialog (no window.confirm) ----------
export function DeleteButton({
  action,
  id,
  itemName,
  small,
}: {
  action: (formData: FormData) => Promise<void>;
  id: string;
  itemName?: string;
  small?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleConfirm() {
    const fd = new FormData();
    fd.set("id", id);
    setPending(true);
    try {
      await action(fd);
      toast.success("Data dihapus.");
      setOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Gagal menghapus.");
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Hapus data"
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border border-red-400/20 bg-red-400/[0.07] text-red-300 hover:bg-red-400/15 transition disabled:opacity-50",
          small ? "p-2" : "text-xs font-medium px-3.5 py-2"
        )}
      >
        <Trash2 size={14} />
        {!small && "Hapus"}
      </button>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => !pending && setOpen(false)}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#11151B] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 rounded-xl bg-red-400/10 border border-red-400/20 flex items-center justify-center mb-4">
              <Trash2 size={18} className="text-red-300" />
            </div>
            <h3 className="font-semibold text-white">Hapus data ini?</h3>
            <p className="text-sm text-neutral-400 mt-1.5">
              {itemName ? (
                <><span className="text-white font-medium">{itemName}</span> akan dihapus permanen. </>
              ) : (
                <>Data akan dihapus permanen. </>
              )}
              Tindakan tidak bisa dibatalkan.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                disabled={pending}
                onClick={() => setOpen(false)}
                className="text-sm px-4 py-2.5 rounded-xl border border-white/10 text-neutral-300 hover:bg-white/[0.06] transition disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={pending}
                onClick={handleConfirm}
                className="text-sm font-semibold px-4 py-2.5 rounded-xl bg-red-500 text-white hover:bg-red-400 transition disabled:opacity-60"
              >
                {pending ? "Menghapus..." : "Ya, hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---------- Submit with pending state ----------
export function PendingButton({ label }: { label: string }) {
  const [pending, setPending] = useState(false);
  return (
    <button
      type="submit"
      disabled={pending}
      onClick={() => setPending(true)}
      className="text-sm font-semibold px-6 py-2.5 rounded-xl bg-white text-black hover:bg-cyan-300 transition active:scale-[0.98] disabled:opacity-60"
    >
      {pending ? "Menyimpan..." : label}
    </button>
  );
}

// ---------- Toast for ?saved=1 / ?error=msg after server-action redirects ----------
export function FlashToast() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const saved = searchParams.get("saved");
    const error = searchParams.get("error");
    if (saved) toast.success("Perubahan tersimpan.");
    else if (error) toast.error(decodeURIComponent(error));
    else return;
    const url = new URL(window.location.href);
    url.searchParams.delete("saved");
    url.searchParams.delete("error");
    router.replace(`${pathname}${url.search ? url.search : ""}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
