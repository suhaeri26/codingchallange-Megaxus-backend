import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const drawGachaSchema = z
  .object({
    eventId: z.coerce.number().int().positive(),
  })
  .meta({
    id: "DrawGachaRequest",
  });

export type DrawGachaRequest = z.infer<typeof drawGachaSchema>;
