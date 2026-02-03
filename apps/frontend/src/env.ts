import { frontendEnvSchema } from "@smartfaktura/shared-types";

export const env = frontendEnvSchema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
});

if (import.meta.env.DEV) {
  console.log("Env loaded:", { VITE_API_URL: env.VITE_API_URL });
}
