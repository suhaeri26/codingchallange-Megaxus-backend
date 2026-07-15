import { registry } from "../../docs/registry";
import { drawGachaSchema } from "./gacha.schema";

registry.registerPath({
  method: "post",
  path: "/gacha/draw",
  tags: ["Gacha"],
  summary: "Draw a gacha item",
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: drawGachaSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Gacha draw completed",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/gacha/history",
  tags: ["Gacha"],
  summary: "Get gacha history",
  security: [{ cookieAuth: [] }],
  responses: {
    200: {
      description: "History fetched successfully",
    },
  },
});
