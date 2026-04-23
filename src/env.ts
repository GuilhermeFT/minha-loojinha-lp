import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_PANEL_URL: z.string().optional(),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().optional(),
  GOOGLE_CLIENT_EMAIL: z.string(),
  SHEET_ID: z.string(),
  GOOGLE_PRIVATE_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env) as Env;
