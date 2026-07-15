import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createGachaEventItemSchema = z
  .object({
    itemId: z.coerce.number().int().positive(),
    dropRate: z.coerce.number().positive(),
  })
  .meta({
    id: "CreateGachaEventItemRequest",
  });

export const updateGachaEventItemSchema = z
  .object({
    itemId: z.coerce.number().int().positive().optional(),
    dropRate: z.coerce.number().positive().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  })
  .meta({
    id: "UpdateGachaEventItemRequest",
  });

export const gachaEventItemIdParamSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .meta({
    id: "GachaEventItemIdParam",
  });

export const gachaEventItemsParamsSchema = z
  .object({
    eventId: z.coerce.number().int().positive(),
  })
  .meta({
    id: "GachaEventItemsParams",
  });

export type CreateGachaEventItemRequest = z.infer<typeof createGachaEventItemSchema>;
export type UpdateGachaEventItemRequest = z.infer<typeof updateGachaEventItemSchema>;
export type GachaEventItemIdParam = z.infer<typeof gachaEventItemIdParamSchema>;
export type GachaEventItemsParams = z.infer<typeof gachaEventItemsParamsSchema>;
