import "./env-load";
import type { HealthResponse } from "@smartfaktura/shared-types";
import express from "express";
import { env } from "./env";

console.log("Env loaded:", { PORT: env.PORT });

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  const body: HealthResponse = { status: "SmartFaktura backend is alive", env: "valid" };
  res.json(body);
});

app.listen(env.PORT, () => {
  console.log(`Backend running on http://localhost:${env.PORT}`);
});
