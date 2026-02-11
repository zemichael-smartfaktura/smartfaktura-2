/**
 * Extend Express Request with session, tenant, role, and transactional DB (set by middleware).
 */
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import type * as schema from "../db/schema";

export type SessionUser = { id: string; name: string; email: string; [k: string]: unknown };
export type SessionData = {
  session: {
    id: string;
    userId: string;
    activeOrganizationId?: string | null;
    [k: string]: unknown;
  };
  user: SessionUser;
};

/** Transaction-scoped DB with tenant context (app.current_organization_id set). */
export type TenantDb = NodePgDatabase<typeof schema>;

declare global {
  namespace Express {
    interface Request {
      session?: SessionData | null;
      user?: SessionUser | null;
      activeOrganizationId?: string | null;
      memberRole?: string | null;
      /** Drizzle transaction with RLS tenant context set. Use this for all tenant-scoped queries. */
      tx?: TenantDb;
    }
  }
}
