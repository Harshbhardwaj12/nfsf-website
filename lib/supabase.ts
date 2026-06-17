// Shared Donation type. The browser no longer talks to Supabase directly —
// all database access goes through server-side API routes (app/api/**) using
// the service-role key (see lib/supabaseAdmin.ts).

export interface Donation {
  id: string;
  donor_name: string;
  email: string;
  trees: number;
  amount: number;
  certificate_id: string;
  created_at: string;
}
