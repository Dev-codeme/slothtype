import { createClient } from "@supabase/supabase-js";

export const client = createClient(import.meta.env.VITE_URL, import.meta.env.VITE_API_KEY)