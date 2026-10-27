import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z
    .string()
    .default("5000")
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0 && val <= 65535, {
      message: "PORT must be an integer between 1 and 65535",
    }),
  FRONTEND_URL: z.string().url().default("http://localhost:5173"),
  SUPABASE_URL: z.string().url().or(z.string().min(1)),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  SUPABASE_SECRET_KEY: z.string().optional().default(""),
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .default("900000")
    .transform((val) => parseInt(val, 10)),
  RATE_LIMIT_MAX_REQUESTS: z
    .string()
    .default("100")
    .transform((val) => parseInt(val, 10)),
  JSON_BODY_LIMIT: z.string().default("20kb"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace"]).default("info"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  // Never expose raw secrets or values in errors
  const missingOrInvalid = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(", ");
  console.error(`[Configuration Error] Invalid environment variables: ${missingOrInvalid}`);
  if (process.env.NODE_ENV !== "test") {
    process.exit(1);
  }
}

export const env = parsedEnv.success
  ? parsedEnv.data
  : {
      NODE_ENV: "test" as const,
      PORT: 5000,
      FRONTEND_URL: "http://localhost:5173",
      SUPABASE_URL: "https://placeholder-project.supabase.co",
      SUPABASE_PUBLISHABLE_KEY: "placeholder-publishable-key",
      SUPABASE_SECRET_KEY: "placeholder-secret-key",
      RATE_LIMIT_WINDOW_MS: 900000,
      RATE_LIMIT_MAX_REQUESTS: 100,
      JSON_BODY_LIMIT: "20kb",
      LOG_LEVEL: "info" as const,
    };
