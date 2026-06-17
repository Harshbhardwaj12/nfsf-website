import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { isValidCertId } from "@/lib/validation";
import { rateLimit, clientIp } from "@/lib/rateLimit";

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

  const { data } = await getSupabaseAdmin()
    .from("donations")
    .select("donor_name,email,trees,amount,certificate_id,created_at")
    .eq("certificate_id", params.id)
    .single();

  if (!data) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({ donation: data });
}
