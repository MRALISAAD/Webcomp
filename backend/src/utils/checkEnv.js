import { env } from "./env.js";
import { logger } from "./logger.js";

const REQUIRED_KEYS = [
  "ZOHO_CLIENT_ID",
  "ZOHO_CLIENT_SECRET",
  "ZOHO_REFRESH_TOKEN",
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
];

export function checkEnv() {
  const missing = REQUIRED_KEYS.filter((key) => !env[key]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}
