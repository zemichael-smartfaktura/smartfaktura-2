/**
 * Extend Express Request with session and tenant (set by middleware).
 */
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

declare global {
  namespace Express {
    interface Request {
      session?: SessionData | null;
      user?: SessionUser | null;
      activeOrganizationId?: string | null;
    }
  }
}
