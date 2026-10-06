import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema, sanitize } from "@/lib/contact-validation";
import { getClientIp, isRateLimited } from "@/lib/ratelimit";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  // 1. Rate limit: 5/menit/IP (gratis, in-memory)
  const ip = getClientIp(req);
  const { limited, retryAfterSec } = isRateLimited(`contact:${ip}`);
  if (limited) {
    return NextResponse.json(
      { ok: false, error: `Terlalu banyak percobaan. Coba lagi dalam ${retryAfterSec} detik.` },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  // 2. Parse + validasi
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body harus JSON." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { ok: false, error: first?.message ?? "Data tidak valid.", field: first?.path?.[0] },
      { status: 400 }
    );
  }

  // Honeypot terisi = spam, balas sukses palsu agar bot tidak tahu
  if (parsed.data.website) {
    return NextResponse.json({ ok: true, message: "Pesan terkirim." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  // Tanpa custom domain: wajib pakai onboarding@resend.dev dan hanya bisa ke email akun sendiri
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY / CONTACT_TO_EMAIL belum diset");
    return NextResponse.json(
      { ok: false, error: "Server belum dikonfigurasi. Hubungi via WhatsApp/Email langsung." },
      { status: 500 }
    );
  }

  const name = sanitize(parsed.data.name);
  const email = sanitize(parsed.data.email);
  const organization = sanitize(parsed.data.organization ?? "");
  const needs = sanitize(parsed.data.needs);
  const message = sanitize(parsed.data.message);

  // 3. Simpan ke inbox admin (best-effort: kegagalan DB tidak menggagalkan email)
  try {
    const { isServiceConfigured, createServiceClient } = await import(
      "@/lib/supabase/service"
    );
    if (isServiceConfigured()) {
      const db = createServiceClient();
      const { error: dbError } = await db.from("messages").insert({
        name,
        email,
        organization,
        needs,
        message,
      });
      if (dbError) console.error("[contact] DB insert gagal:", dbError.message);
    }
  } catch (e) {
    console.error("[contact] DB insert gagal:", e);
  }

  // 4. Kirim via Resend
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `Portfolio: ${needs} — ${name}`,
      html: `
        <div style="font-family:sans-serif;line-height:1.6;color:#111">
          <h2>Pesan baru dari portfolio</h2>
          <p><b>Nama:</b> ${escapeHtml(name)}</p>
          <p><b>Email:</b> ${escapeHtml(email)}</p>
          <p><b>Organisasi:</b> ${escapeHtml(organization || "-")}</p>
          <p><b>Kebutuhan:</b> ${escapeHtml(needs)}</p>
          <hr/>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        </div>
      `,
      text: `Nama: ${name}\nEmail: ${email}\nOrganisasi: ${organization || "-"}\nKebutuhan: ${needs}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      // Kasus umum mode test: "You can only send to your own email"
      return NextResponse.json(
        { ok: false, error: "Gagal mengirim email. Coba lagi atau hubungi via WhatsApp." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, message: "Pesan terkirim. Terima kasih!" });
  } catch (e) {
    console.error("[contact] unexpected:", e);
    return NextResponse.json({ ok: false, error: "Terjadi kesalahan server." }, { status: 500 });
  }
}
