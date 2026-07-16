import { Request, Response } from "express";

import { sendSuccess } from "../../shared/http/response";

import { authService } from "./auth.service";
import {
  LoginRequest,
  RegisterRequest,
  ResendVerificationRequest,
  VerifyEmailRequest,
} from "./auth.schema";

export class AuthController {
  async register(
    req: Request<unknown, unknown, RegisterRequest>,
    res: Response,
  ): Promise<void> {
    await authService.register(req.body);

    sendSuccess(
      res,
      null,
      "Register successful. Please check your email to verify your account.",
      201,
    );
  }

  async login(
    req: Request<unknown, unknown, LoginRequest>,
    res: Response,
  ): Promise<void> {
    const result = await authService.login(req.body);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 2,
    });

    sendSuccess(
      res,
      result.user,
      "Login successful.",
    );
  }

  async logout(
    _req: Request,
    res: Response,
  ): Promise<void> {
    res.clearCookie("accessToken");

    sendSuccess(
      res,
      null,
      "Logout successful.",
    );
  }

  async me(
    req: Request,
    res: Response,
  ): Promise<void> {
    const user = await authService.me(req.user!.id);

    sendSuccess(
      res,
      user,
    );
  }

  async verifyEmail(
    req: Request<
      unknown,
      unknown,
      unknown,
      VerifyEmailRequest
    >,
    res: Response,
  ): Promise<void> {
    await authService.verifyEmail(req.query);

    sendSuccess(
      res,
      null,
      "Email verified successfully.",
    );
  }

  async resendVerification(
    req: Request<
      unknown,
      unknown,
      ResendVerificationRequest
    >,
    res: Response,
  ): Promise<void> {
    await authService.resendVerification(
      req.body,
    );

    sendSuccess(
      res,
      null,
      "Verification email sent successfully.",
    );
  }
}

export const authController =
  new AuthController();