import { fromNodeHeaders } from "better-auth/node";
import { sql } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";
import { auth } from "./auth";
import { db } from "./db";

function toHeaders(req: Request): Headers {
  return fromNodeHeaders(req.headers as Record<string, string | string[] | undefined>);
}

export async function sessionMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const headers = toHeaders(req);
    let session = await auth.api.getSession({ headers });
    if (session?.session && !session.session.activeOrganizationId) {
      const raw = await auth.api.listOrganizations({ headers });
      const list = Array.isArray(raw) ? raw : ((raw as { data?: { id: string }[] })?.data ?? []);
      if (list.length === 1) {
        await auth.api.setActiveOrganization({
          body: { organizationId: list[0].id },
          headers,
        });
        session = await auth.api.getSession({ headers });
      }
    }
    req.session = session ?? null;
    req.user = session?.user ?? null;
    req.activeOrganizationId = session?.session?.activeOrganizationId ?? null;
    next();
  } catch (err) {
    next(err);
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session?.user) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

export function requireTenant(req: Request, res: Response, next: NextFunction): void {
  if (!req.activeOrganizationId) {
    res.status(403).json({ error: "No active organization" });
    return;
  }
  next();
}

export async function tenantContextMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (req.activeOrganizationId) {
      await db.execute(
        sql`SELECT set_config('app.current_organization_id', ${req.activeOrganizationId}, true)`,
      );
    }
    next();
  } catch (err) {
    next(err);
  }
}

export const protectedChain = [
  sessionMiddleware,
  requireAuth,
  requireTenant,
  tenantContextMiddleware,
] as const;
