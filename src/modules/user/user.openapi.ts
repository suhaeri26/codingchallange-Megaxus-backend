import { registry } from "../../docs/registry";
import { adjustCoinsParamsSchema, adjustCoinsSchema, updateProfileSchema } from "./user.schema";

registry.registerPath({
  method: "get",
  path: "/users",
  tags: ["User"],
  summary: "Get all users",
  security: [{ cookieAuth: [] }],
  responses: {
    200: {
      description: "Users fetched successfully",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/users/me",
  tags: ["User"],
  summary: "Get current user profile",
  security: [{ cookieAuth: [] }],
  responses: {
    200: {
      description: "Profile fetched successfully",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/users/me/coin-transactions",
  tags: ["User"],
  summary: "Get current user coin transaction history",
  security: [{ cookieAuth: [] }],
  responses: {
    200: {
      description: "Coin transactions fetched successfully",
    },
  },
});

registry.registerPath({
  method: "patch",
  path: "/users/me",
  tags: ["User"],
  summary: "Update current user profile",
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateProfileSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Profile updated successfully",
    },
  },
});

registry.registerPath({
  method: "patch",
  path: "/users/{userId}/coins",
  tags: ["User"],
  summary: "Admin adjust user coins",
  security: [{ cookieAuth: [] }],
  request: {
    params: adjustCoinsParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: adjustCoinsSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Coins updated successfully",
    },
  },
});
