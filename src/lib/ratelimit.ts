// In-memory rate limit sederhana, cukup untuk portfolio low-traffic.
// Tanpa Redis/Upstash agar tetap Rp 0. Reset otomatis saat server restart/deploy.

const hits = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000; // 1 menit
const MAX_HITS = 5; // 5 submit / menit / IP

export function isRateLimited(key: string): { limited: boolean; retryAfterSec: number } {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, retryAfterSec: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_HITS) {
    return { limited: true, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { limited: false, retryAfterSec: 0 };
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
