import app from "./app.js";
import { env } from "./config/env.js";
import { registerAssociations } from "./database/assotiation/index.js";
import { connectDatabase } from "./database/sequelize.js";
import { logger } from "./shared/utils/logger.js";

const PORT = env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    registerAssociations();
    await connectDatabase();

    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error({
        err: error instanceof Error ? error.message : "Unknown error",
      },
      "Application startup failed", 
    );
    process.exit(1);
  }
};

void startServer();