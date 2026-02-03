import { backendEnvSchema } from "@smartfaktura/shared-types";

export const env = backendEnvSchema.parse(process.env);
