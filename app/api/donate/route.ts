import { NextResponse, type NextRequest } from "next/server";
import { randomBytes } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { validateDonation, PRICE_PER_TREE } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rateLimit";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!rateLimit(`donate:${clientIp(req)}`, 10, 60 * 1000)) {
    console.warn(`[security] donate rate-limit hit from ${clientIp(req)}`);
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again." },
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

  // Honeypot — legitimate clients leave the "company" field empty.
  if (typeof (body as any)?.company === "string" && (body as any).company.trim() !== "") {
    console.warn(`[security] honeypot triggered on /api/donate from ${clientIp(req)}`);
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const result = validateDonation(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, email, trees } = result.value;
  // Amount is computed on the server — never trust a client-sent amount.
  const amount = trees * PRICE_PER_TREE;

  // Certificate ID generated server-side with cryptographic randomness.
  const yyyymmdd = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = randomBytes(5).toString("hex").toUpperCase(); // 10 hex chars
  const certificate_id = `NFSF-${yyyymmdd}-${rand}`;

  const { error } = await getSupabaseAdmin()
    .from("donations")
    .insert([{ donor_name: name, email, trees, amount, certificate_id }] as any);

  if (error) {
    return NextResponse.json(
      { error: "Could not record your donation. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ certificate_id });
}
