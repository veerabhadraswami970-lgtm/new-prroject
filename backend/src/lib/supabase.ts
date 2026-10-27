import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";
import { logger } from "./logger.js";

const isPlaceholderConfig =
  !env.SUPABASE_URL ||
  env.SUPABASE_URL.includes("placeholder") ||
  !env.SUPABASE_PUBLISHABLE_KEY ||
  env.SUPABASE_PUBLISHABLE_KEY.includes("placeholder");

// Prioritize server secret key if provided, otherwise fallback to publishable key
const apiKey = env.SUPABASE_SECRET_KEY && !env.SUPABASE_SECRET_KEY.includes("placeholder")
  ? env.SUPABASE_SECRET_KEY
  : env.SUPABASE_PUBLISHABLE_KEY;

export const supabaseServer: SupabaseClient | null = !isPlaceholderConfig
  ? createClient(env.SUPABASE_URL, apiKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    })
  : null;

if (isPlaceholderConfig) {
  logger.warn(
    "[Supabase] Running with placeholder configuration. Real database operations will require valid SUPABASE_URL and keys in .env."
  );
} else {
  logger.info("[Supabase] Supabase server client successfully initialized.");
}

export const isDatabaseConfigured = (): boolean => {
  return supabaseServer !== null;
};
