/**
 * Express app: health, Better Auth mount, protected routes (session + tenant).
 */
import "./env-load";
import type { HealthResponse } from "@smartfaktura/shared-types";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./auth";
import { env } from "./env";
import { protectedChain } from "./middleware";

console.log("Env loaded:", { PORT: env.PORT });

const app = express();

app.use(
  cors({
    origin: env.BETTER_AUTH_URL,
    credentials: true,
  }),
);

// Better Auth first — do NOT use express.json() before it (client API can get stuck)
app.use("/auth", (req, res) => toNodeHandler(auth)(req, res));

app.use(express.json());

app.get("/health", (_req, res) => {
  const body: HealthResponse = { status: "SmartFaktura backend is alive", env: "valid" };
  res.json(body);
});

app.get("/me", ...protectedChain, (req, res) => {
  res.json({
    user: req.user,
    session: { activeOrganizationId: req.activeOrganizationId },
  });
});

app.get("/tenant-context", ...protectedChain, (req, res) => {
  res.json({ organizationId: req.activeOrganizationId });
});

app.listen(env.PORT, () => {
  console.log(`Backend running on http://localhost:${env.PORT}`);
});
