import { sequelize } from "../../database/sequelize";
import { CoinTransaction, CoinTransactionType } from "../../database/models/coin-transaction.model";
import { User, UserRole } from "../../database/models/user.model";
import { AppError } from "../../shared/errors/app-error";
import { AdjustCoinsRequest, UpdateProfileRequest } from "./user.schema";

export class UserService {
  async getAllUsers(): Promise<User[]> {
    return User.findAll({
      order: [["createdAt", "DESC"]],
    });
  }

  async getProfile(userId: number): Promise<User> {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user;
  }

  async updateProfile(
    userId: number,
    payload: UpdateProfileRequest,
  ): Promise<User> {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (payload.name !== undefined) {
      user.name = payload.name;
    }

    await user.save();

    return user;
  }

  async getCoinTransactions(userId: number): Promise<CoinTransaction[]> {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return CoinTransaction.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  }

  async adjustCoins(
    adminUserId: number,
    targetUserId: number,
    payload: AdjustCoinsRequest,
  ): Promise<User> {
    const admin = await User.findByPk(adminUserId);

    if (!admin) {
      throw new AppError("Admin user not found.", 404);
    }

    if (admin.role !== UserRole.ADMIN) {
      throw new AppError("Only admins can adjust coins.", 403);
    }

    const targetUser = await User.findByPk(targetUserId);

    if (!targetUser) {
      throw new AppError("Target user not found.", 404);
    }

    const balanceBefore = targetUser.coins;
    const balanceAfter = balanceBefore + payload.amount;

    if (balanceAfter < 0) {
      throw new AppError("User coins cannot go below zero.", 400);
    }

    await sequelize.transaction(async (transaction) => {
      targetUser.coins = balanceAfter;
      await targetUser.save({ transaction });

      await CoinTransaction.create(
        {
          userId: targetUser.id,
          type: CoinTransactionType.ADMIN_ADJUSTMENT,
          amount: payload.amount,
          balanceBefore,
          balanceAfter,
          gachaLogId: null,
        },
        { transaction },
      );
    });

    return targetUser;
  }
}

export const userService = new UserService();
