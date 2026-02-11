import { Router } from "express";
import { protectedChain, requireOwner } from "../middleware";

const router = Router();

router.use(...protectedChain);

router.get("/me", (req, res) => {
  res.json({
    user: req.user,
    session: { activeOrganizationId: req.activeOrganizationId },
    role: req.memberRole,
  });
});

// Owner-only: org settings (MVP: read-only; future: update org name, currency, etc.)
router.get("/org/settings", requireOwner, (req, res) => {
  res.json({
    organizationId: req.activeOrganizationId,
    role: req.memberRole,
  });
});

/**
 * Example: tenant-scoped query using req.tx.
 * All route handlers that read/write RLS-protected tables MUST use req.tx.
 * The transaction has app.current_organization_id set, so RLS policies apply.
 *
 * Example (for future routes):
 *   const customers = await req.tx!.select().from(schema.customers);
 *   // RLS automatically filters to the active organization
 */

export { router as protectedRouter };
