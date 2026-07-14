
import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
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