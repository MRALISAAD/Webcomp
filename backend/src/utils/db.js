import { logger } from "./logger.js";
import { env } from "./env.js";

let mongooseClient = null;

export async function connectDB() {
  if (!env.MONGO_URI) {
    logger.warn("mongo.disabled missing MONGO_URI");
    return;
  }

  if (!mongooseClient) {
    try {
      const mongooseModule = await import("mongoose");
      mongooseClient = mongooseModule.default;
    } catch (error) {
      logger.error("mongo.missing_dependency install mongoose to enable database support", { error: error.message });
      return;
    }
  }

  try {
    await mongooseClient.connect(env.MONGO_URI, {
      dbName: env.MONGO_DB || "marhaban",
    });
    logger.info("mongo.connected");
  } catch (error) {
    logger.error(`mongo.connection_failed ${error.message}`);
    logger.warn("mongo.disabled continuing without database connection");
  }
}
