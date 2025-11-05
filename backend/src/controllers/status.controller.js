import { env } from "../utils/env.js";
import { logger } from "../utils/logger.js";
import { getRequestCount } from "../middleware/requestCounter.js";

/**
 * Health check endpoint
 * Returns server status, environment info, and API version
 */
export async function getStatus(req, res) {
  try {
    res.set("Cache-Control", "no-store, max-age=0");
    const healthStatus = {
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      version: "1.0.0",
      services: {
        api: "operational",
        zoho: env.ZOHO_CLIENT_ID ? "configured" : "not_configured",
        email: env.SMTP_HOST ? "configured" : "not_configured",
        mongodb: env.MONGO_URI ? "configured" : "optional",
      },
      requestsServed: getRequestCount(),
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
      },
    };

    logger.info("health.check.success");
    return res.status(200).json(healthStatus);
  } catch (error) {
    logger.error(`health.check.error ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * API information endpoint
 * Returns API details and available endpoints
 */
export async function getApiInfo(req, res) {
  const apiInfo = {
    name: "Marhaban Canada API",
    version: "1.0.0",
    description: "Welcome platform API for newcomers to Canada",
    endpoints: {
      leads: "POST /api/leads - Create a new lead in Zoho CRM",
      contact: "POST /api/contact - Send contact form message",
      faq: "GET /api/faq - Get frequently asked questions",
      status: "GET /api/status - Health check and system status",
      info: "GET /api/info - API information and endpoints",
    },
    documentation: {
      postman: "https://marhabancanada.ca/api/docs",
      swagger: "Coming soon",
    },
    contact: {
      email: "contact@marhabancanada.ca",
      website: "https://marhabancanada.ca",
    },
  };

  return res.status(200).json(apiInfo);
}

