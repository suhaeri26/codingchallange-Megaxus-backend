import { Sequelize } from "sequelize";
import { databaseConfig } from "../config/database.js";
import { logger } from "../shared/utils/logger.js";
import { seedDefaultAdmin } from "./seeders/default-admin.seed.js";

export const sequelize = new Sequelize(databaseConfig);

export const connectDatabase = async (): Promise<void> => {
  await sequelize.authenticate();

  const isFreshInstall = false;

  if (isFreshInstall) {
    await sequelize.sync({ alter: true });
  }

  logger.info("Database connection established");
};