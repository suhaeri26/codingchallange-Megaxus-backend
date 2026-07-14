import { Router } from "express";


import { authController } from "./auth.controller";
import {
  loginSchema,
  registerSchema,
  resendVerificationSchema,
  verifyEmailQuerySchema,
} from "./auth.schema";
import { validateRequest } from "../../shared/middleware/validate-request";
import { authenticate } from "../../shared/middleware/auth.middleware";

const router = Router();

router.post(
  "/register",
  validateRequest({body:registerSchema}),
  authController.register.bind(authController),
);

router.post(
  "/login",
  validateRequest({body:loginSchema}),
  authController.login.bind(authController),
);

router.post(
  "/logout",
  authenticate,
  authController.logout.bind(authController),
);

router.get(
  "/me",
  authenticate,
  authController.me.bind(authController),
);

router.get(
  "/verify-email",
  validateRequest({ query: verifyEmailQuerySchema }),
  authController.verifyEmail.bind(authController),
);

router.post(
  "/resend-verification",
  validateRequest({ body: resendVerificationSchema }),
  authController.resendVerification.bind(
    authController,
  ),
);

export default router;