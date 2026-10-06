"use client";

import { useState } from "react";
import StarBorder from "@/components/StarBorder";

type Status = "idle" | "sending" | "success" | "error";

const initial = { name: "", email: "", organization: "", needs: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const [firstErrorField, setFirstErrorField] = useState<string | null>(null);

  function set<K extends keyof typeof initial>(key: K, val: string) {
    setValues((v) => ({ ...v, [key]: val }));
    setFieldErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  }

  function validateLocal() {
    const errs: Record<string, string> = {};
    if (values.name.trim().length < 2) errs.name = "Nama minimal 2 karakter.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errs.email = "Email tidak valid.";
    if (values.needs.trim().length < 3) errs.needs = "Ceritakan kebutuhanmu.";
    if (values.message.trim().length < 20) errs.message = "Pesan minimal 20 karakter.";
    return errs;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");
    setFirstErrorField(null);

    const errs = validateLocal();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      setFirstErrorField(first);
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Gagal mengirim. Coba lagi.");
      }
      setStatus("success");
      setValues(initial);
    } catch (err) {
      setStatus("idle");
      setFormError(err instanceof Error ? err.message : "Gagal mengirim.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="py-10 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center"
      >
        <p className="text-emerald-300 font-semibold text-lg">Pesan terkirim. Terima kasih!</p>
        <p className="text-neutral-400 text-sm mt-2">
          Saya akan membalas via email secepatnya. Butuh cepat? Hubungi via WhatsApp.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a
            href="https://wa.me/6285648058508"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-full text-sm font-medium bg-white text-black hover:bg-cyan-300 transition"
          >
            Chat WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="px-6 py-2.5 rounded-full text-sm border border-white/20 text-neutral-300 hover:bg-white/10 transition"
          >
            Kirim lagi
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="divide-y divide-white/10" aria-describedby={formError ? "contact-error" : undefined}>
      <Field
        index="01"
        id="contact-name"
        label="What's your name?"
        placeholder="Your full name"
        value={values.name}
        error={fieldErrors.name}
        autoComplete="name"
        onChange={(v) => set("name", v)}
      />
      <Field
        index="02"
        id="contact-email"
        label="What's your email?"
        placeholder="you@email.com"
        value={values.email}
        error={fieldErrors.email}
        type="email"
        autoComplete="email"
        onChange={(v) => set("email", v)}
      />
      <Field
        index="03"
        id="contact-organization"
        label="Organization name?"
        placeholder="Company or brand (optional)"
        value={values.organization}
        error={fieldErrors.organization}
        autoComplete="organization"
        onChange={(v) => set("organization", v)}
      />
      <Field
        index="04"
        id="contact-needs"
        label="What do you need help with?"
        placeholder="e.g. Company website, mobile app, data dashboard"
        value={values.needs}
        error={fieldErrors.needs}
        onChange={(v) => set("needs", v)}
      />

      {/* MESSAGE */}
      <div className="py-10">
        <label htmlFor="contact-message" className="text-sm text-neutral-300 mb-3 block">
          05 &nbsp; Your message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Write your message here (min. 20 characters)..."
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          className="w-full bg-transparent text-sm outline-none resize-none placeholder:text-neutral-600 focus:placeholder:text-neutral-500 border-b border-transparent focus:border-cyan-500/50 transition pb-2"
        />
        {fieldErrors.message && (
          <p id="contact-message-error" role="alert" className="text-red-400 text-xs mt-2">
            {fieldErrors.message}
          </p>
        )}
      </div>

      {/* Honeypot: disembunyikan dari user */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {formError && (
        <p id="contact-error" role="alert" className="text-red-400 text-sm pt-6">
          {formError}{" "}
          <a href="https://wa.me/6285648058508" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-300">
            atau hubungi via WhatsApp
          </a>
        </p>
      )}
      {firstErrorField && Object.keys(fieldErrors).length > 0 && !formError && (
        <p className="sr-only" role="alert">
          Periksa kembali isian yang belum valid.
        </p>
      )}

      {/* SUBMIT */}
      <div className="pt-10 flex justify-end">
        <StarBorder type="submit" disabled={sending} color="#38bdf8" speed="7s" className="disabled:opacity-60">
          {sending ? "Sending..." : "Send It"}
        </StarBorder>
      </div>
    </form>
  );
}

function Field({
  index,
  id,
  label,
  placeholder,
  value,
  error,
  type = "text",
  autoComplete,
  onChange,
}: {
  index: string;
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="py-10">
      <label htmlFor={id} className="text-sm text-neutral-300 mb-3 block">
        {index} &nbsp; {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-600 border-b border-transparent focus:border-cyan-500/50 transition pb-2"
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-red-400 text-xs mt-2">
          {error}
        </p>
      )}
    </div>
  );
}
