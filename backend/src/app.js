import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { apiLimiter } from "./middleware/rateLimit.js";
import leadsRouter from "./routes/leads.routes.js";
import faqRoutes from "./routes/faq.routes.js";
import contactRouter from "./routes/contact.routes.js";
import statusRouter from "./routes/status.routes.js";
import partnersRouter from "./routes/partners.routes.js";
import { httpLogger } from "./middleware/logger.js";
import n8nRouter from "./routes/n8n.routes.js";
import { requestCounter } from "./middleware/requestCounter.js";
import { env } from "./utils/env.js";

const app = express();
app.set("trust proxy", 1);

const allowedOrigins = env.CORS_ORIGIN
  ? env.CORS_ORIGIN.split(",").map((origin) => origin.trim()).filter(Boolean)
  : true;

app.use(helmet());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use((req, res, next) => {
  res.setHeader("Cache-Control", req.path.startsWith("/assets") ? "public, max-age=31536000, immutable" : "no-store");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  return next();
});
app.use(requestCounter);
app.use(httpLogger);

// API Routes
app.use("/api", statusRouter); // Status routes without rate limiting
app.use("/api/leads", apiLimiter, leadsRouter);
app.use("/api/contact", apiLimiter, contactRouter);
app.use("/api/partners", apiLimiter, partnersRouter);
app.use("/api/faq", faqRoutes);
app.use("/api", apiLimiter, n8nRouter);

export default app;
