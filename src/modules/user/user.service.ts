import { User } from "../../database/models/user.model";
import { AppError } from "../../shared/errors/app-error";
import { UpdateProfileRequest } from "./user.schema";

export class UserService {
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
}

export const userService = new UserService();
