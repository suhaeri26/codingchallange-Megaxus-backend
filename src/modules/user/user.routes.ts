import { Router } from "express";
import { authenticate } from "../../shared/middleware/auth.middleware";
import { validateRequest } from "../../shared/middleware/validate-request";
import { userController } from "./user.controller";
import { updateProfileSchema } from "./user.schema";

const router = Router();

router.get("/me", authenticate, userController.getProfile.bind(userController));
router.patch(
  "/me",
  authenticate,
  validateRequest({ body: updateProfileSchema }),
  userController.updateProfile.bind(userController),
);

export default router;
