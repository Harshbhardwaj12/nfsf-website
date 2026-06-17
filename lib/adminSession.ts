/**
 * Stateless, signed admin session token (HMAC-SHA256).
 * Uses the Web Crypto API so it works in BOTH the Edge runtime (middleware)
 * and the Node runtime (route handlers).
 */

export const COOKIE_NAME = "nfsf_admin";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function b64urlEncode(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str: string): Uint8Array {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function getKey(): Promise<CryptoKey> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set.");
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret) as unknown as BufferSource,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

/** Create a signed session token for an authenticated admin. */
export async function createSession(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = b64urlEncode(
    new TextEncoder().encode(JSON.stringify({ role: "admin", exp }))
  );
  const key = await getKey();
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload) as unknown as BufferSource
  );
  return `${payload}.${b64urlEncode(new Uint8Array(sig))}`;
}

/** Verify a session token. Returns false on any tampering, expiry, or error. */
export async function verifySession(token: string | undefined | null): Promise<boolean> {
  try {
    if (!token) return false;
    const [payload, sig] = token.split(".");
    if (!payload || !sig) return false;
    const key = await getKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      b64urlDecode(sig) as unknown as BufferSource,
      new TextEncoder().encode(payload) as unknown as BufferSource
    );
    if (!valid) return false;
    const data = JSON.parse(new TextDecoder().decode(b64urlDecode(payload)));
    if (data.role !== "admin") return false;
    if (typeof data.exp !== "number" || data.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
