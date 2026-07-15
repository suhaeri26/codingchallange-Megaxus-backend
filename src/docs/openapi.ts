
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import "../modules/auth/auth.openapi"
import "../modules/gacha/gacha.openapi"
import "../modules/gacha-event/gacha-event.openapi"
import "../modules/gacha-event-item/gacha-event-item.openapi"
import "../modules/user/user.openapi"
import "../modules/item/item.openapi"
import { registry } from "./registry";

const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiDocument = generator.generateDocument({
  openapi: "3.0.0",

  info: {
    title: "Ghaca API",
    version: "1.0.0",
    description: "Human Resource Information System API",
  },

  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local development",
    },
    {
      url: "/",
      description: "Staging server",
    },
    {
      url: "/",
      description: "Production server",
    },
  ],
});