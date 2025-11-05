import axios from "axios";
import { env } from "./env.js";
import { logger } from "./logger.js";

export async function notifyN8n(event, payload) {
  if (!env.N8N_WEBHOOK_URL) return;

  try {
    await axios.post(env.N8N_WEBHOOK_URL, {
      event,
      timestamp: new Date().toISOString(),
      payload,
    });
    logger.info(`n8n.webhook.sent event=${event}`);
  } catch (error) {
    logger.warn(`n8n.webhook.failed event=${event} message=${error.message}`);
  }
}
