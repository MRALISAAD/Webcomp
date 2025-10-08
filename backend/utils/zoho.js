const axios = require("axios");

const REQUIRED_VARS = ["ZOHO_BASE_URL", "ZOHO_OAUTH_TOKEN", "ZOHO_MODULE"];

function validateZohoConfig() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Configuration Zoho manquante : ${missing.join(", ")}`);
  }
}

function buildDescription(data) {
  const lines = [
    `Projet: ${data.project}`,
    data.arrivalDate ? `Arrivée: ${data.arrivalDate}` : null,
    data.city ? `Ville actuelle: ${data.city}` : null,
    data.whatsapp ? `WhatsApp: ${data.whatsapp}` : null,
    data.needs?.length ? `Besoins: ${data.needs.join(", ")}` : null,
    data.message ? `Message: ${data.message}` : null,
  ].filter(Boolean);

  return lines.join(" | ");
}

async function createZohoLead(leadData) {
  validateZohoConfig();

  const baseUrl = process.env.ZOHO_BASE_URL.replace(/\/$/, "");
  const moduleName = process.env.ZOHO_MODULE;

  const payload = {
    data: [leadData],
    trigger: ["workflow"],
  };

  const response = await axios.post(`${baseUrl}/${moduleName}`, payload, {
    headers: {
      Authorization: `Zoho-oauthtoken ${process.env.ZOHO_OAUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    timeout: 15000,
  });

  return response.data;
}

module.exports = {
  buildDescription,
  createZohoLead,
};
