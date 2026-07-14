import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { env } from "../../config/env";
import { AppError } from "../errors/app-error";
import { sendError } from "../http/response"
import { logger } from "../utils/logger";

const formatZodError = (
  error: ZodError,
): Array<{ path: string; message: string }> => {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ZodError) {
logger.warn(
  {
    errors: formatZodError(error),
  },
  "Validation failed"
);
    sendError(res, "Validation failed", 400, formatZodError(error));
    return;
  }

  if (error instanceof AppError) {
logger.warn(
{
      message: error.message,
      statusCode: error.statusCode,
    },
  "Business error"
);
    sendError(res, error.message, error.statusCode);
    return;
  }

logger.error(
  {
    err: error,
    stack:
      env.NODE_ENV === "development" && error instanceof Error
        ? error.stack
        : undefined,
  },
  "Unhandled error"
);

  sendError(res, "Internal server error", 500);
};