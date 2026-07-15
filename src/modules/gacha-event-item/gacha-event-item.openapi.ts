import { registry } from "../../docs/registry";
import {
  createGachaEventItemSchema,
  gachaEventItemIdParamSchema,
  gachaEventItemsParamsSchema,
  updateGachaEventItemSchema,
} from "./gacha-event-item.schema";

registry.registerPath({
  method: "get",
  path: "/events/{eventId}/items",
  tags: ["Gacha Event Item"],
  summary: "List items for a gacha event",
  request: {
    params: gachaEventItemsParamsSchema,
  },
  responses: {
    200: {
      description: "Items fetched successfully",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/events/{eventId}/items",
  tags: ["Gacha Event Item"],
  summary: "Add item to gacha event",
  security: [{ cookieAuth: [] }],
  request: {
    params: gachaEventItemsParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: createGachaEventItemSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Item added successfully",
    },
  },
});

registry.registerPath({
  method: "patch",
  path: "/events/items/{id}",
  tags: ["Gacha Event Item"],
  summary: "Update gacha event item",
  security: [{ cookieAuth: [] }],
  request: {
    params: gachaEventItemIdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updateGachaEventItemSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Item updated successfully",
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/events/items/{id}",
  tags: ["Gacha Event Item"],
  summary: "Delete gacha event item",
  security: [{ cookieAuth: [] }],
  request: {
    params: gachaEventItemIdParamSchema,
  },
  responses: {
    200: {
      description: "Item deleted successfully",
    },
  },
});
