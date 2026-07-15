import jwt from "jsonwebtoken";
import { env } from "../../config/env";
import type { StringValue } from "ms";
import { User, UserAttributes } from "../../database/models";

export const generateAccessToken = (payload: UserAttributes): string => {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as StringValue,
  });
};

export const verifyAccessToken = (token: string): User => {
  return jwt.verify(token, env.JWT_SECRET) as User;
};