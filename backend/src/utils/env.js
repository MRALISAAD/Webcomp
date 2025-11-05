import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 8080,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET,
  ZOHO_REFRESH_TOKEN: process.env.ZOHO_REFRESH_TOKEN,
  ZOHO_API_URL: process.env.ZOHO_API_URL || "https://www.zohoapis.ca/crm/v2",
  ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL || "https://accounts.zohocloud.ca",
  ZOHO_MODULE: process.env.ZOHO_MODULE || "LeadsWeb",
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: Number(process.env.SMTP_PORT) || 465,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  INTERNAL_NOTIF_EMAIL: process.env.INTERNAL_NOTIF_EMAIL,
  FROM_NAME: process.env.FROM_NAME || "Marhaban Canada",
  N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_DB: process.env.MONGO_DB || "marhaban",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};
