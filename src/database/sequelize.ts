import { Sequelize } from "sequelize";
import { databaseConfig } from "../config/database";
import { logger } from "../shared/utils/logger";

export const sequelize = new Sequelize(databaseConfig);

export const connectDatabase = async (): Promise<void> => {
  await sequelize.authenticate();

  // const tables = await sequelize.getQueryInterface().showAllTables();

  // const isFreshInstall = tables.length === 0;
  const isFreshInstall = false;

  if (isFreshInstall) {
    await sequelize.sync({ alter: true });

    // await seedDefaultAdmin();
  }
  logger.info("Database connection established");
};