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

export type UpdateProfileRequest = z.infer<typeof updateProfileSchema>;
