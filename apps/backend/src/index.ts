import express from "express";
import type { HealthResponse } from "@smartfaktura/shared-types";

const app = express();
app.use(express.json());

const PORT = process.env.PORT ?? 3001;

app.get("/health", (_req, res) => {
  const body: HealthResponse = { status: "SmartFaktura backend is alive" };
  res.json(body);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
