import express from "express";
import cors from "cors";
import helmet from "helmet";
import { httpLogger } from "./middlewares/logger.js";
import { swaggerMiddleware } from "./docs/swagger.js";
import { openApiDocument } from "./docs/openapi.js";
import { errorHandler } from "./shared/middleware/error-handler";
import { notFoundHandler } from "./shared/middleware/not-found";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import gachaEventRoutes from "./modules/gacha-event/gacha-event.routes.js";
import gachaEventItemRoutes from "./modules/gacha-event-item/gacha-event-item.routes.js";
import gachaRoutes from "./modules/gacha/gacha.routes.js";
import itemRoutes from "./modules/item/item.routes.js";
import "./modules/auth/auth.openapi.js";
import "./modules/user/user.openapi.js";
import "./modules/gacha-event/gacha-event.openapi.js";
import "./modules/gacha-event-item/gacha-event-item.openapi.js";
import "./modules/gacha/gacha.openapi.js";
import "./modules/item/item.openapi.js";

const app = express();

app.use(cookieParser());
// 🔥 middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  credentials: true,
}));
app.use(helmet());
app.use(express.json());
app.use(httpLogger);

// 🔥 routes
app.get("/", (req, res) => {
  req.log.info("Root hit");
  res.json({ message: "API is running" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/events", gachaEventRoutes);
app.use("/events", gachaEventItemRoutes);
app.use("/gacha", gachaRoutes);
app.use("/items", itemRoutes);

app.use("/docs", ...swaggerMiddleware);
app.get("/openapi.json", (req, res) => {
  res.json(openApiDocument);
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;