import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error";
import { verifyAccessToken } from "../utils/jwt";

export async function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const token = req.cookies.accessToken;

  if (!token) {
    return next(
      new AppError(
        "Unauthorized.",
        401,
      ),
    );
  }

  const payload = verifyAccessToken(token);

  req.user = payload;

  next();
}