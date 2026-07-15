import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const createItemSchema = z
  .object({
    name: z.string().trim().min(1).max(255),
    description: z.string().trim().max(1000).nullable().optional(),
    imageUrl: z.string().trim().max(500).nullable().optional(),
  })
  .meta({
    id: "CreateItemRequest",
  });

export const updateItemSchema = z
  .object({
    name: z.string().trim().min(1).max(255).optional(),
    description: z.string().trim().max(1000).nullable().optional(),
    imageUrl: z.string().trim().max(500).nullable().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required.",
  })
  .meta({
    id: "UpdateItemRequest",
  });

export const itemIdParamSchema = z
  .object({
    id: z.coerce.number().int().positive(),
  })
  .meta({
    id: "ItemIdParam",
  });

export type CreateItemRequest = z.infer<typeof createItemSchema>;
export type UpdateItemRequest = z.infer<typeof updateItemSchema>;
export type ItemIdParam = z.infer<typeof itemIdParamSchema>;
