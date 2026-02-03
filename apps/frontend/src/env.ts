import { z } from "zod";

const schema = z.object({
  VITE_API_URL: z.string().url(),
});

export type Env = z.infer<typeof schema>;

export const env = schema.parse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
});

if (import.meta.env.DEV) {
  console.log("Env loaded:", { VITE_API_URL: env.VITE_API_URL });
}
