import swaggerUi from "swagger-ui-express";

import { openApiDocument } from "./openapi";

export const swaggerMiddleware = [
  swaggerUi.serve,
  swaggerUi.setup(openApiDocument, {
    swaggerOptions: {
      withCredentials: true,
    }}),
];