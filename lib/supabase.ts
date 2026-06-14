import { createClient } from "@supabase/supabase-js";

export interface Donation {
  id: string;
  donor_name: string;
  email: string;
  trees: number;
  amount: number;
  certificate_id: string;
  created_at: string;
}

let _client: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return _client;
}
