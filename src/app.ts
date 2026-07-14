import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./middlewares/logger.js";
import { swaggerMiddleware } from "./docs/swagger.js";
import { openApiDocument } from "./docs/openapi.js";
import { errorHandler } from "./shared/middleware/error-handler";
import { notFoundHandler } from "./shared/middleware/not-found";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
// 🔥 middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(httpLogger);

// 🔥 routes
app.get("/", (req, res) => {
  req.log.info("Root hit");
  res.json({ message: "API is running" });
});

app.use("/docs", ...swaggerMiddleware);
app.get("/openapi.json", (req, res) => {
  res.json(openApiDocument);
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;