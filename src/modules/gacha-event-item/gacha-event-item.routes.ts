import { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import { requireAdmin } from "../../shared/middleware/admin.middleware";
import { validateRequest } from "../../shared/middleware/validate-request";
import { gachaEventItemController } from "./gacha-event-item.controller";
import {
  createGachaEventItemSchema,
  gachaEventItemIdParamSchema,
  gachaEventItemsParamsSchema,
  updateGachaEventItemSchema,
} from "./gacha-event-item.schema";

const router = Router();

router.get(
  "/:eventId/items",
  validateRequest({ params: gachaEventItemsParamsSchema }),
  gachaEventItemController.list.bind(gachaEventItemController),
);
router.post(
  "/:eventId/items",
  authenticate,
  requireAdmin,
  validateRequest({ params: gachaEventItemsParamsSchema }),
  validateRequest({ body: createGachaEventItemSchema }),
  gachaEventItemController.create.bind(gachaEventItemController),
);
router.patch(
  "/items/:id",
  authenticate,
  requireAdmin,
  validateRequest({ params: gachaEventItemIdParamSchema }),
  validateRequest({ body: updateGachaEventItemSchema }),
  gachaEventItemController.update.bind(gachaEventItemController),
);
router.delete(
  "/items/:id",
  authenticate,
  requireAdmin,
  validateRequest({ params: gachaEventItemIdParamSchema }),
  gachaEventItemController.remove.bind(gachaEventItemController),
);

export default router;
