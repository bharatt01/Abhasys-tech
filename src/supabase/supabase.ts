import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eozrjdcpklgbpngjwhop.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_riBhXOHI3joo7cAEFwf7FQ_wAHFcZ5F";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);