/// <reference types="node" />
import { z } from "zod";

z.object({
  VITE_API_URL: z.url(),
}).parse({
  VITE_API_URL: process.env.VITE_API_URL,
});
