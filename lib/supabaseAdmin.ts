import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _admin: SupabaseClient | null = null;

/**
 * True when the server is configured to talk to Supabase (both the URL and the
 * service-role key are present). When false, the app runs in MOCK mode: the
 * donation flow generates certificates without touching a database, so the flow
 * can be tested locally without secrets. Production sets these env vars, so the
 * real database path is always used there.
 */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

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
