import type { HealthResponse } from "@smartfaktura/shared-types";
import { Router } from "express";

const router = Router();

router.get("/health", (_req, res) => {
  const body: HealthResponse = { status: "SmartFaktura backend is alive", env: "valid" };
  res.json(body);
});

export { router as publicRouter };
