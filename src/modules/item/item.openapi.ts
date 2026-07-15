import { registry } from "../../docs/registry";
import { createItemSchema, itemIdParamSchema, updateItemSchema } from "./item.schema";

registry.registerPath({
  method: "get",
  path: "/items",
  tags: ["Item"],
  summary: "List items",
  responses: {
    200: {
      description: "Items fetched successfully",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/items/{id}",
  tags: ["Item"],
  summary: "Get item by id",
  request: {
    params: itemIdParamSchema,
  },
  responses: {
    200: {
      description: "Item fetched successfully",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/items",
  tags: ["Item"],
  summary: "Create item",
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createItemSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Item created successfully",
    },
  },
});

registry.registerPath({
  method: "patch",
  path: "/items/{id}",
  tags: ["Item"],
  summary: "Update item",
  security: [{ cookieAuth: [] }],
  request: {
    params: itemIdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updateItemSchema,
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
  path: "/items/{id}",
  tags: ["Item"],
  summary: "Delete item",
  security: [{ cookieAuth: [] }],
  request: {
    params: itemIdParamSchema,
  },
  responses: {
    200: {
      description: "Item deleted successfully",
    },
  },
});
