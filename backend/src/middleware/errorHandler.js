import { env } from "../utils/env.js";
import { logger } from "../utils/logger.js";

export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  let status = err.status || 500;
  let message = err.message || "Internal Server Error";
  const publicMessage = err.publicMessage;
  let details;

  if (err.isJoi && err.details) {
    status = 422;
    message = "Validation error";
    details = err.details.map(({ message: msg, path }) => ({
      message: msg,
      path,
    }));
  } else if (err.name === "ZodError" && err.issues) {
    status = 422;
    message = "Validation error";
    details = err.issues.map(({ message: msg, path }) => ({
      message: msg,
      path,
    }));
  }

  logger.error(`app.error status=${status} message=${message}`);

  res.status(status).json({
    error: publicMessage ?? message,
    ...(details && { details }),
    ...(env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}
