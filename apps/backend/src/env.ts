import { z } from "zod";

const schema = z.object({
  PORT: z.coerce.number().default(3001),
});

export type Env = z.infer<typeof schema>;

export const env = schema.parse(process.env);
