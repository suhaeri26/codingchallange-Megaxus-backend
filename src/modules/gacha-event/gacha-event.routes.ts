import { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import { validateRequest } from "../../shared/middleware/validate-request";
import { gachaEventController } from "./gacha-event.controller";
import {
  createGachaEventSchema,
  gachaEventIdParamSchema,
  updateGachaEventSchema,
} from "./gacha-event.schema";

const router = Router();

router.get("/", gachaEventController.list.bind(gachaEventController));
router.get(
  "/:id",
  validateRequest({ params: gachaEventIdParamSchema }),
  gachaEventController.getById.bind(gachaEventController),
);
router.post(
  "/",
  authenticate,
  validateRequest({ body: createGachaEventSchema }),
  gachaEventController.create.bind(gachaEventController),
);
router.patch(
  "/:id",
  authenticate,
  validateRequest({ params: gachaEventIdParamSchema }),
  validateRequest({ body: updateGachaEventSchema }),
  gachaEventController.update.bind(gachaEventController),
);
router.delete(
  "/:id",
  authenticate,
  validateRequest({ params: gachaEventIdParamSchema }),
  gachaEventController.remove.bind(gachaEventController),
);

export default router;
