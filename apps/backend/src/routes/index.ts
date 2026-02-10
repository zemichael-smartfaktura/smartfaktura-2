import type { Express } from "express";
import { protectedRouter } from "./protected";
import { publicRouter } from "./public";

export function registerRoutes(app: Express): void {
  app.use("/", publicRouter);
  app.use("/api", protectedRouter);
}
