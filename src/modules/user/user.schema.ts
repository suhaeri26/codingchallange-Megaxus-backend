import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const updateProfileSchema = z
  .object({
    name: z.string().trim().min(3).max(255).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  })
  .meta({
    id: "UpdateProfileRequest",
  });

export const adjustCoinsParamsSchema = z
  .object({
    userId: z.coerce.number().int().positive(),
  })
  .meta({
    id: "AdjustCoinsParams",
  });

export const adjustCoinsSchema = z
  .object({
    amount: z.coerce.number().int(),
  })
  .refine((data) => data.amount !== 0, {
    message: "Amount cannot be zero.",
  })
  .meta({
    id: "AdjustCoinsRequest",
  });

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;
export type AdjustCoinsRequest = z.infer<typeof adjustCoinsSchema>;
export type AdjustCoinsParams = z.infer<typeof adjustCoinsParamsSchema>;
