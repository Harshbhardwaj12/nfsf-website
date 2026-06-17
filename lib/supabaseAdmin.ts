import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _admin: SupabaseClient | null = null;

/**
 * Server-only Supabase client using the SERVICE ROLE key.
 * This key bypasses Row Level Security — NEVER import this from a client
 * component or expose it to the browser. Only use it inside route handlers
 * (app/api/**) and server components.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!_admin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      throw new Error(
        "Missing Supabase server env vars: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required."
      );
    }
    _admin = createClient(url, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return _admin;
}
