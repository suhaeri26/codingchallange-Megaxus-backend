import { registry } from "../../docs/registry";
import {
  createGachaEventSchema,
  gachaEventIdParamSchema,
  updateGachaEventSchema,
} from "./gacha-event.schema";

registry.registerPath({
  method: "get",
  path: "/events",
  tags: ["Gacha Event"],
  summary: "List gacha events",
  responses: {
    200: {
      description: "Events fetched successfully",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/events/{id}",
  tags: ["Gacha Event"],
  summary: "Get gacha event by id",
  request: {
    params: gachaEventIdParamSchema,
  },
  responses: {
    200: {
      description: "Event fetched successfully",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/events",
  tags: ["Gacha Event"],
  summary: "Create gacha event",
  security: [{ cookieAuth: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createGachaEventSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Event created successfully",
    },
  },
});

registry.registerPath({
  method: "patch",
  path: "/events/{id}",
  tags: ["Gacha Event"],
  summary: "Update gacha event",
  security: [{ cookieAuth: [] }],
  request: {
    params: gachaEventIdParamSchema,
    body: {
      content: {
        "application/json": {
          schema: updateGachaEventSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Event updated successfully",
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/events/{id}",
  tags: ["Gacha Event"],
  summary: "Delete gacha event",
  security: [{ cookieAuth: [] }],
  request: {
    params: gachaEventIdParamSchema,
  },
  responses: {
    200: {
      description: "Event deleted successfully",
    },
  },
});
