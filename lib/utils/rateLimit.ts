/**
 * Best-effort in-memory fixed-window rate limiter.
 *
 * NOTE: On serverless platforms (Vercel) memory is per-instance and resets on
 * cold start, so this is a speed bump, not a hard guarantee. For production-grade
 * limits back this with a shared store (Upstash Redis / Vercel KV).
 */

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

/** Extract the best-guess client IP from request headers (Vercel sets XFF). */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
