import { Request, Response } from "express";
import { sendSuccess } from "../../shared/http/response";
import { AdjustCoinsRequest, UpdateProfileRequest } from "./user.schema";
import { userService } from "./user.service";

export class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await userService.getAllUsers();

    sendSuccess(res, users, "Users fetched successfully.");
  }

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

  async getCoinTransactions(req: Request, res: Response): Promise<void> {
    const transactions = await userService.getCoinTransactions(req.user!.id);

    sendSuccess(res, transactions, "Coin transactions fetched successfully.");
  }

  async adjustCoins(
    req: Request<{ userId: string }, unknown, AdjustCoinsRequest>,
    res: Response,
  ): Promise<void> {
    const targetUserId = Number(req.params.userId);
    const user = await userService.adjustCoins(req.user!.id, targetUserId, req.body);

    sendSuccess(res, user, "Coins updated successfully.");
  }
}

export const userController = new UserController();
