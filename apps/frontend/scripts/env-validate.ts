/// <reference types="node" />
import { frontendEnvSchema } from "@smartfaktura/shared-types";

frontendEnvSchema.parse({
  VITE_API_URL: process.env.VITE_API_URL,
});
