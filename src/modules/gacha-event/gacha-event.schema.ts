import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createGachaEventSchema = z
  .object({
    name: z.string().trim().min(1).max(255),
    description: z.string().trim().max(1000).nullable().optional(),
    isActive: z.boolean().optional(),
  })
  .meta({
    id: "CreateGachaEventRequest",
  });

export const updateGachaEventSchema = z
  .object({
    name: z.string().trim().min(1).max(255).optional(),
    description: z.string().trim().max(1000).nullable().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  })
  .meta({
    id: "UpdateGachaEventRequest",
  });

export const gachaEventIdParamSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .meta({
    id: "GachaEventIdParam",
  });

export type CreateGachaEventRequest = z.infer<typeof createGachaEventSchema>;
export type UpdateGachaEventRequest = z.infer<typeof updateGachaEventSchema>;
export type GachaEventIdParam = z.infer<typeof gachaEventIdParamSchema>;
