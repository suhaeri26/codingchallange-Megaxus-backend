import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3)
      .max(255),

    email: z
      .string()
      .trim()
      .email()
      .max(255),

    password: z
      .string()
      .min(8)
      .max(255),
  })
  .meta({
    id: "RegisterRequest",
  });

export type RegisterRequest = z.infer<typeof registerSchema>;

export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email()
      .max(255),

    password: z
      .string()
      .min(8)
      .max(255)
  })
  .meta({
    id: "LoginRequest",
  });

export type LoginRequest = z.infer<typeof loginSchema>;

export const verifyEmailQuerySchema = z
  .object({
    token: z.string().min(1),
  })
  .meta({
    id: "VerifyEmailQuery",
  });

export type VerifyEmailRequest = z.infer<
  typeof verifyEmailQuerySchema
>;

export const resendVerificationSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email()
      .max(255),
  })
  .meta({
    id: "ResendVerificationRequest",
  });

export type ResendVerificationRequest = z.infer<
  typeof resendVerificationSchema
>;