import { NextFunction, Request, Response } from "express";
import { UserRole } from "../../database/models/user.model";
import { AppError } from "../errors/app-error";

export function requireAdmin(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (req.user?.role !== UserRole.ADMIN) {
    next(new AppError("Forbidden.", 403));
    return;
  }

  next();
}
