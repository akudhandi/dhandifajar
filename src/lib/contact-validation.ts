import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().trim().toLowerCase().email("Email tidak valid").max(254),
  organization: z.string().trim().max(120).optional().default(""),
  needs: z.string().trim().min(3, "Ceritakan kebutuhanmu").max(200),
  message: z.string().trim().min(20, "Pesan minimal 20 karakter").max(5000),
  // Honeypot anti-spam: harus kosong
  website: z.string().max(0, "Spam terdeteksi").optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;

export function sanitize(str: string) {
  return str.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim();
}
