import { createClient } from "@supabase/supabase-js";

// Access environment variables
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Supabase URL and/or Anon Key are missing in environment variables"
  );
}

// Initialize the Supabase client with environment variables
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
