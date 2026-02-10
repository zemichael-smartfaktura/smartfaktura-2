import "./env-load";
import type { HealthResponse } from "@smartfaktura/shared-types";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./auth";
import { env } from "./env";

console.log("Env loaded:", { PORT: env.PORT });

const app = express();

// CORS: allow frontend origin and credentials (cookies)
app.use(
  cors({
    origin: env.BETTER_AUTH_URL,
    credentials: true,
  }),
);

// Better Auth first — do NOT use express.json() before it (docs: or client API gets stuck)
app.use("/auth", (req, res) => toNodeHandler(auth)(req, res));

// JSON only for app routes (after auth handler)
app.use(express.json());

// Health (no auth)
app.get("/health", (_req, res) => {
  const body: HealthResponse = { status: "SmartFaktura backend is alive", env: "valid" };
  res.json(body);
});

// Protected: get current session (401 if no session)
app.get("/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers as Record<string, string | string[] | undefined>),
  });
  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  res.json({
    user: session.user,
    session: { activeOrganizationId: session.session?.activeOrganizationId },
  });
});

app.listen(env.PORT, () => {
  console.log(`Backend running on http://localhost:${env.PORT}`);
});
