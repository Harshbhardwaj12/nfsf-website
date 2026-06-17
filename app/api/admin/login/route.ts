import { NextResponse, type NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";
import { COOKIE_NAME, SESSION_TTL_SECONDS, createSession } from "@/lib/adminSession";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export async function POST(req: NextRequest) {
  // Brute-force protection: 5 attempts per IP per 5 minutes.
  if (!rateLimit(`login:${clientIp(req)}`, 5, 5 * 60 * 1000)) {
    console.warn(`[security] admin login rate-limit hit from ${clientIp(req)}`);
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      { status: 429 }
    );
  }

  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type." }, { status: 415 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const username = typeof b?.username === "string" ? b.username : "";
  const password = typeof b?.password === "string" ? b.password : "";

  const expectedUser = process.env.ADMIN_USERNAME || "admin";
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedPass) {
    return NextResponse.json(
      { error: "Admin authentication is not configured on the server." },
      { status: 500 }
    );
  }

  // Constant-time comparison to avoid timing/account-enumeration leaks.
  const okUser = safeEqual(username, expectedUser);
  const okPass = safeEqual(password, expectedPass);
  if (!okUser || !okPass) {
    console.warn(`[security] failed admin login from ${clientIp(req)}`);
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 }
    );
  }

  let token: string;
  try {
    token = await createSession();
  } catch {
    return NextResponse.json(
      { error: "Admin authentication is not configured on the server." },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}
