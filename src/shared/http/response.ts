import { Response } from "express";

export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  meta?: PaginationMeta;
};

type ErrorResponse = {
  success: false;
  message: string;
  errors?: unknown;
};

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200,
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
  errors?: unknown,
): Response<ErrorResponse> => {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors === undefined ? {} : { errors }),
  });
};

export const sendPaginatedSuccess = <T>(
  res: Response,
  data: T,
  meta: PaginationMeta,
  message = "Success",
  statusCode = 200,
): Response<SuccessResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    meta,
    data,
  });
};