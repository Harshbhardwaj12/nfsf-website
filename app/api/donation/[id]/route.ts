import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/db/supabaseAdmin";
import { isValidCertId } from "@/lib/donation/validation";
import { rateLimit, clientIp } from "@/lib/utils/rateLimit";

export const dynamic = "force-dynamic";

/**
 * Returns a donor's own record for the thank-you page. The certificate_id acts
 * as an unguessable capability token (now cryptographically generated).
 */
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!rateLimit(`donation:${clientIp(req)}`, 30, 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  if (!isValidCertId(params.id)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // Mock mode: no database to read from. The thank-you page falls back to its
  // client-side cache, so a clean 404 here is expected (not an error).
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  // NOTE: email is intentionally NOT selected. The certificate_id acts as an
  // unguessable capability token but is printed on the (shareable) PDF and verify
  // URL, so anyone holding it must not be able to read the donor's email.
  const { data } = await getSupabaseAdmin()
    .from("donations")
    .select("donor_name,trees,amount,certificate_id,created_at,is_gift,recipient_name,occasion,tree_name,gift_message")
    .eq("certificate_id", params.id)
    .single();

  if (!data) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ donation: data });
}
