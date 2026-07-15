import { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import { requireAdmin } from "../../shared/middleware/admin.middleware";
import { validateRequest } from "../../shared/middleware/validate-request";
import { userController } from "./user.controller";
import { adjustCoinsParamsSchema, adjustCoinsSchema, updateProfileSchema } from "./user.schema";

const router = Router();

router.get("/", authenticate, requireAdmin, userController.getAllUsers.bind(userController));
router.get("/me", authenticate, userController.getProfile.bind(userController));
router.get(
  "/me/coin-transactions",
  authenticate,
  userController.getCoinTransactions.bind(userController),
);
router.patch(
  "/me",
  authenticate,
  validateRequest({ body: updateProfileSchema }),
  userController.updateProfile.bind(userController),
);
router.patch(
  "/:userId/coins",
  authenticate,
  requireAdmin,
  validateRequest({ params: adjustCoinsParamsSchema }),
  validateRequest({ body: adjustCoinsSchema }),
  userController.adjustCoins.bind(userController),
);

export default router;
