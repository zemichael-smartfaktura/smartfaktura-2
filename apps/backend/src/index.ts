/**
 * Backend-only change: verify only backend build + Render deploy (no frontend/Vercel).
 * Express app: CORS, Better Auth, public/protected routes, 404, error handler.
 */
import "./env-load";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { auth } from "./auth";
import { pool } from "./db/client";
import { env } from "./env";
import { registerRoutes } from "./routes";

const app = express();

// Allow CORS_ORIGIN(s) and any Vercel preview (*.vercel.app)
function allowedOrigin(origin: string | undefined): boolean {
  if (!origin) return false;
  try {
    const parsed = new URL(origin);
    if (parsed.origin === env.CORS_ORIGIN) return true;
    if (parsed.hostname.endsWith(".vercel.app")) return true;
    return false;
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin: (origin, cb) => cb(null, allowedOrigin(origin)),
    credentials: true,
  }),
);

// Better Auth first — do NOT use express.json() before it (client API can get stuck)
app.use("/auth", (req, res) => toNodeHandler(auth)(req, res));

app.use(express.json());

registerRoutes(app);

// 404 handler — must be after all routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

// Global error handler — must be the last middleware (4 args required)
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[ERROR]", err);
  // Never leak internal error details to the client
  res.status(500).json({ error: "Internal server error" });
});

const server = app.listen(env.PORT, () => {
  console.log(`Backend running on http://localhost:${env.PORT}`);
});

// Graceful shutdown — close server + DB pool
function shutdown(signal: string) {
  console.log(`\n${signal} received — shutting down…`);
  server.close(() => {
    pool
      .end()
      .then(() => process.exit(0))
      .catch(() => process.exit(1));
  });
}
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
