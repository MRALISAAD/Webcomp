import dotenv from "dotenv";
import app from "./app.js";
import { env } from "./utils/env.js";
import { logger } from "./utils/logger.js";
import { checkEnv } from "./utils/checkEnv.js";
import { connectDB } from "./utils/db.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

// Validate environment variables
try {
  checkEnv();
} catch (error) {
  logger.error(`env.validation.failed: ${error.message}`);
  logger.warn("app.starting.anyway");
}

// Connect to database (optional, graceful fallback)
await connectDB();

// Error handling middleware - must be last
app.use(notFound);
app.use(errorHandler);

const PORT = env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`🚀 Server ready on http://localhost:${PORT}`);
  logger.info(`🌍 Environment: ${env.NODE_ENV}`);
});
