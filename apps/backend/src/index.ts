/**
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

app.use(
  cors({
    origin: env.BETTER_AUTH_URL,
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
  const message = err instanceof Error ? err.message : "Internal server error";
  res.status(500).json({ error: message });
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
