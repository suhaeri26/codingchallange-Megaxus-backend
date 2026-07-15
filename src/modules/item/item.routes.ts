import { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import { validateRequest } from "../../shared/middleware/validate-request";
import { itemController } from "./item.controller";
import {
  createItemSchema,
  itemIdParamSchema,
  updateItemSchema,
} from "./item.schema";

const router = Router();

router.get("/", itemController.list.bind(itemController));
router.get(
  "/:id",
  validateRequest({ params: itemIdParamSchema }),
  itemController.getById.bind(itemController),
);
router.post(
  "/",
  authenticate,
  validateRequest({ body: createItemSchema }),
  itemController.create.bind(itemController),
);
router.patch(
  "/:id",
  authenticate,
  validateRequest({ params: itemIdParamSchema }),
  validateRequest({ body: updateItemSchema }),
  itemController.update.bind(itemController),
);
router.delete(
  "/:id",
  authenticate,
  validateRequest({ params: itemIdParamSchema }),
  itemController.remove.bind(itemController),
);

export default router;
