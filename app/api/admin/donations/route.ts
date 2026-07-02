import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, verifySession } from "@/lib/auth/adminSession";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/db/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!(await verifySession(token))) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  // Mock mode: no database, so there are no stored donations to list.
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ donations: [] });
  }

  const { data, error } = await getSupabaseAdmin()
    .from("donations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to load donations." }, { status: 500 });
  }

  return NextResponse.json({ donations: data });
}
