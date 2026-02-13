import { fromNodeHeaders } from "better-auth/node";
import { sql } from "drizzle-orm";
import type { NextFunction, Request, Response } from "express";
import { auth } from "./auth";
import { db } from "./db";

function toHeaders(req: Request): Headers {
  return fromNodeHeaders(req.headers as Record<string, string | string[] | undefined>);
}

/**
 * Session middleware — resolves session, activeOrganizationId, and memberRole
 * entirely through better-auth's API (no direct DB queries for auth data).
 */
export async function sessionMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const headers = toHeaders(req);
    let session = await auth.api.getSession({ headers });

    // If session exists but no active org, check if user has exactly one org and set it
    if (session?.session && !session.session.activeOrganizationId) {
      const orgs = await auth.api.listOrganizations({ headers });
      const list = Array.isArray(orgs) ? orgs : [];
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

    // Resolve member role through the plugin (requires an active org)
    if (req.activeOrganizationId) {
      const member = await auth.api.getActiveMemberRole({ headers });
      req.memberRole = member?.role ?? null;
    } else {
      req.memberRole = null;
    }

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

export function requireOwner(req: Request, res: Response, next: NextFunction): void {
  if (req.memberRole !== "owner") {
    res.status(403).json({ error: "Owner access required" });
    return;
  }
  next();
}

/**
 * Tenant context middleware — wraps the request in a Drizzle transaction with
 * app.current_organization_id set, so RLS policies work correctly.
 *
 * Route handlers must use req.tx (not the global db) for all tenant-scoped queries.
 * The transaction commits when the response finishes and rolls back on error.
 */
export function tenantContextMiddleware(req: Request, res: Response, next: NextFunction): void {
  if (!req.activeOrganizationId) {
    next();
    return;
  }

  const orgId = req.activeOrganizationId as string; // guaranteed by requireTenant before this middleware
  db.transaction(async (tx) => {
    await tx.execute(sql`SELECT set_config('app.current_organization_id', ${orgId}, true)`);
    req.tx = tx as unknown as typeof db;

    // Keep the transaction open until the response finishes
    await new Promise<void>((resolve, reject) => {
      res.on("finish", resolve);
      res.on("close", resolve);
      res.on("error", reject);
      next();
    });
  }).catch(next);
}

export const protectedChain = [
  sessionMiddleware,
  requireAuth,
  requireTenant,
  tenantContextMiddleware,
] as const;
