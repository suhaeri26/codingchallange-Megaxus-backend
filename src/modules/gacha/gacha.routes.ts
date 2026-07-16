import { Router } from "express";
import { requireAdmin } from "../../shared/middleware/admin.middleware";
import { authenticate } from "../../shared/middleware/auth.middleware";
import { validateRequest } from "../../shared/middleware/validate-request";
import { gachaController } from "./gacha.controller";
import { drawGachaSchema } from "./gacha.schema";

const router = Router();

router.post(
  "/draw",
  authenticate,
  validateRequest({ body: drawGachaSchema }),
  gachaController.draw.bind(gachaController),
);
router.get("/history", authenticate, gachaController.history.bind(gachaController));
router.get("/admin/history", authenticate, requireAdmin, gachaController.adminHistory.bind(gachaController));

export default router;
