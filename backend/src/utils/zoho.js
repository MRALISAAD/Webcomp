import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const {
  ZOHO_CLIENT_ID,
  ZOHO_CLIENT_SECRET,
  ZOHO_REFRESH_TOKEN,
  ZOHO_ACCOUNTS_URL,
  ZOHO_BASE_URL,
  ZOHO_MAIL_ADDRESS,
  ZOHO_MAIL_FROM_NAME
} = process.env;

export async function getZohoAccessToken() {
  const res = await axios.post(`${ZOHO_ACCOUNTS_URL}/oauth/v2/token`, null, {
    params: {
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token"
    }
  });

  const token = res.data?.access_token;
  if (!token) {
    throw new Error("Aucun access_token Zoho.");
  }

  return token;
}

export async function createZohoLead(form) {
  const token = await getZohoAccessToken();

  const utmDetails =
    form.utm && typeof form.utm === "object"
      ? Object.entries(form.utm)
          .filter(([, value]) => value)
          .map(([key, value]) => `${key}=${value}`)
          .join("|")
      : "";

  const descriptionParts = [
    `Type:${form.arrivalType}`,
    `Budget:${form.budget}`,
    `Message:${form.message || "-"}`
  ];

  if (utmDetails) {
    descriptionParts.push(`UTM:${utmDetails}`);
  }

  const payload = {
    data: [
      {
        Last_Name: form.fullName,
        Email: form.email,
        Phone: form.whatsapp,
        City: form.city,
        Lead_Source: "Website",
        Description: descriptionParts.join(" | "),
        Custom_Pack__c: form.pack,
        Arrival_Date__c: form.arrivalDate
      }
    ]
  };

  const r = await axios.post(`${ZOHO_BASE_URL}/Leads`, payload, {
    headers: { Authorization: `Zoho-oauthtoken ${token}` }
  });

  return r.data;
}

export async function sendZohoMail(to, fullName) {
  const token = await getZohoAccessToken();
  const mailBase = ZOHO_BASE_URL.replace("/crm/v2", "/mail/v1/messages");

  await axios.post(
    mailBase,
    {
      fromAddress: ZOHO_MAIL_ADDRESS,
      fromName: ZOHO_MAIL_FROM_NAME,
      toAddress: to,
      subject: "Nous avons bien reçu votre demande — Marhaban Canada",
      content: `
      <p>Bonjour ${fullName.split(" ")[0] || ""},</p>
      <p>Merci d’avoir contacté <strong>Marhaban Canada</strong>.
      Nous vous revenons sous 24h par WhatsApp ou e-mail.</p>
      <p><a href="https://marhabancanada.ca/packs">Voir les packs</a></p>
      <p>L’équipe Marhaban Canada 🇨🇦</p>`,
      mailFormat: "html"
    },
    { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
  );
}
