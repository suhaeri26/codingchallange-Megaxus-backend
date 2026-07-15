import { registry } from "../../docs/registry";
import { updateProfileSchema } from "./user.schema";

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
