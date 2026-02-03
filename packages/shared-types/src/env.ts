import { z } from "zod";

export const backendEnvSchema = z.object({
  PORT: z.coerce.number().default(3001),
});

export const frontendEnvSchema = z.object({
  VITE_API_URL: z.url(),
});

export type BackendEnv = z.infer<typeof backendEnvSchema>;
export type FrontendEnv = z.infer<typeof frontendEnvSchema>;
