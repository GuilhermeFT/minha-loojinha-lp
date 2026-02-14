import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_URL: z.string(),
  NEXT_PUBLIC_CHECKOUT_URL: z.string().optional().default(""),
  GOOGLE_CLIENT_EMAIL: z.string(),
  SHEET_ID: z.string(),
  GOOGLE_PRIVATE_KEY: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env) as Env;
