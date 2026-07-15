import { Request, Response } from "express";
import { sendSuccess } from "../../shared/http/response";
import { UpdateProfileRequest } from "./user.schema";
import { userService } from "./user.service";

export class UserController {
  async getProfile(req: Request, res: Response): Promise<void> {
    const user = await userService.getProfile(req.user!.id);

    sendSuccess(res, user);
  }

  async updateProfile(
    req: Request<unknown, unknown, UpdateProfileRequest>,
    res: Response,
  ): Promise<void> {
    const user = await userService.updateProfile(req.user!.id, req.body);

    sendSuccess(res, user, "Profile updated successfully.");
  }
}

export const userController = new UserController();
