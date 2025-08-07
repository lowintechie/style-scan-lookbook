import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Debug logging to help identify the issue
console.log("SUPABASE_URL:", SUPABASE_URL);
console.log(
  "SUPABASE_PUBLISHABLE_KEY:",
  SUPABASE_PUBLISHABLE_KEY ? "Set" : "Not set"
);

if (!SUPABASE_URL) {
  throw new Error("VITE_SUPABASE_URL environment variable is not set");
}

if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error(
    "VITE_SUPABASE_PUBLISHABLE_KEY environment variable is not set"
  );
}

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
