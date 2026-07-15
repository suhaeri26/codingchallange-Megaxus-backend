import { Op } from "sequelize";

import { sequelize } from "../../database/sequelize";
import { EmailVerification } from "../../database/models/email-verification.model";
import { User } from "../../database/models/user.model";

import { env } from "../../config/env";
import { AppError } from "../../shared/errors/app-error";
import { mailerService } from "../../shared/mailer/smtp";
import {
  generateAccessToken,
} from "../../shared/utils/jwt";
import {
  hashPassword,
  comparePassword,
} from "../../shared/utils/password";

import {
  LoginRequest,
  RegisterRequest,
  ResendVerificationRequest,
  VerifyEmailRequest,
} from "./auth.schema";
import { generateVerificationToken } from "../../shared/utils/crypto";

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export class AuthService {
  async register(
    payload: RegisterRequest,
  ): Promise<void> {
    const existingUser = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    if (existingUser) {
      throw new AppError("Email already registered.", 409);
    }

    const hashedPassword = await hashPassword(
      payload.password,
    );

    const user = await sequelize.transaction(async (transaction) => {
      const user = await User.create(
        {
          name: payload.name,
          email: payload.email,
          password: hashedPassword,
          isVerified: !env.EMAIL_VERIFICATION_ENABLED,
        },
        {
          transaction,
        },
      );

      if (env.EMAIL_VERIFICATION_ENABLED) {
        const verificationToken = generateVerificationToken();

        await EmailVerification.create(
          {
            userId: user.id,
            token: verificationToken,
            expiredAt: new Date(Date.now() + 1000 * 60 * 15),
          },
          {
            transaction,
          },
        );

        await mailerService.sendEmailVerification(user.email, verificationToken);
      }

      return user;
    });
  }

  async login(
    payload: LoginRequest,
  ): Promise<LoginResponse> {
    const user = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new AppError(
        "Invalid email or password.",
        401,
      );
    }

    const isValidPassword =
      await comparePassword(
        payload.password,
        user.password,
      );

    if (!isValidPassword) {
      throw new AppError(
        "Invalid email or password.",
        401,
      );
    }

    if (env.EMAIL_VERIFICATION_ENABLED && !user.isVerified) {
      throw new AppError(
        "Please verify your email first.",
        403,
      );
    }

    const accessToken =
      generateAccessToken(user.get({ plain: true }));

    return {
      accessToken,
      user,
    };
  }

  async me(
    userId: number,
  ): Promise<User> {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError(
        "User not found.",
        404,
      );
    }

    return user;
  }

  async verifyEmail(
    payload: VerifyEmailRequest,
  ): Promise<void> {
    if (!env.EMAIL_VERIFICATION_ENABLED) {
      return;
    }

    const verification =
      await EmailVerification.findOne({
        where: {
          token: payload.token,
          verifiedAt: null,
        },
        include: [
          {
            association: "user",
          },
        ],
      });

    if (!verification) {
      throw new AppError(
        "Verification token not found.",
        404,
      );
    }

    if (verification.verifiedAt) {
      throw new AppError(
        "Verification token has already been used.",
        400,
      );
    }

    if (
      verification.expiredAt.getTime() <
      Date.now()
    ) {
      throw new AppError(
          "Verification token has expired.",
          400,
      );
    }

    await sequelize.transaction(
      async (transaction) => {
        await User.update(
          {
            isVerified: true,
          },
          {
            where: {
              id: verification.userId,
            },
            transaction,
          },
        );

        await verification.update(
          {
            verifiedAt: new Date(),
          },
          {
            transaction,
          },
        );
      },
    );
  }
  async resendVerification(
    payload: ResendVerificationRequest,
  ): Promise<void> {
    if (!env.EMAIL_VERIFICATION_ENABLED) {
      return;
    }

    const user = await User.findOne({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new AppError(
        "User not found.",
        404,
      );
    }

    if (user.isVerified) {
      throw new AppError(
        "Email has already been verified.",
        400,
      );
    }

    const verificationToken =
      generateVerificationToken();

    await sequelize.transaction(
      async (transaction) => {
        await EmailVerification.destroy({
          where: {
            userId: user.id,
            verifiedAt: null,
          },
          transaction,
        });

        await EmailVerification.create(
          {
            userId: user.id,
            token: verificationToken,
            expiredAt: new Date(
              Date.now() + 1000 * 60 * 15,
            ),
          },
          {
            transaction,
          },
        );
      },
    );

    await mailerService.sendEmailVerification(
      user.email,
      verificationToken,
    );
  }
}

export const authService = new AuthService();