import { Router } from "express";
import { protectedChain } from "../middleware";

const router = Router();

router.use(...protectedChain);

router.get("/me", (req, res) => {
  res.json({
    user: req.user,
    session: { activeOrganizationId: req.activeOrganizationId },
  });
});

router.get("/tenant-context", (req, res) => {
  res.json({ organizationId: req.activeOrganizationId });
});

export { router as protectedRouter };
