import { z } from "zod";

export const backendEnvSchema = z.object({
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(32),
  BETTER_AUTH_URL: z.string().url(), // Backend's own URL (e.g. http://localhost:3001)
  CORS_ORIGIN: z.string().url(), // Frontend origin (e.g. http://localhost:5173)
});

export const frontendEnvSchema = z.object({
  VITE_API_URL: z.url(),
});

export type BackendEnv = z.infer<typeof backendEnvSchema>;
export type FrontendEnv = z.infer<typeof frontendEnvSchema>;
