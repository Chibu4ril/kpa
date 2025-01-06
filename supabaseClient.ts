import { createClient as supabaseClient } from "@supabase/supabase-js";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase URL or Anon Key");
  }

  return supabaseClient(supabaseUrl, supabaseAnonKey);
};
