import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Donation {
  id: string;
  donor_name: string;
  email: string;
  trees: number;
  amount: number;
  certificate_id: string;
  created_at: string;
}
