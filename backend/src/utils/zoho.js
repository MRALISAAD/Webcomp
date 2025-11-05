import axios from "axios";
import { env } from "./env.js";

export async function getZohoAccessToken() {
  const res = await axios.post(`${env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`, null, {
    params: {
      refresh_token: env.ZOHO_REFRESH_TOKEN,
      client_id: env.ZOHO_CLIENT_ID,
      client_secret: env.ZOHO_CLIENT_SECRET,
      grant_type: "refresh_token"
    }
  });

  const token = res.data?.access_token;
  if (!token) {
    throw new Error("Aucun access_token Zoho.");
  }

  return token;
}

export async function sendZohoLead(data, moduleName = "Leads") {
  const token = await getZohoAccessToken();
  const baseUrl = (env.ZOHO_API_URL || "https://www.zohoapis.ca/crm/v2").replace(/\/$/, "");
  const module = moduleName || "Leads";

  const response = await axios.post(
    `${baseUrl}/${module}`,
    { data: [data] },
    {
      headers: { Authorization: `Zoho-oauthtoken ${token}` }
    }
  );

  const details = response.data?.data?.[0];
  if (!details || details.status !== "success") {
    throw new Error(`Zoho CRM error: ${JSON.stringify(response.data)}`);
  }

  return details;
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

  const r = await axios.post(`${env.ZOHO_API_URL}/Leads`, payload, {
    headers: { Authorization: `Zoho-oauthtoken ${token}` }
  });

  return r.data;
}

export async function sendZohoMail(to, fullName) {
  const token = await getZohoAccessToken();
  const mailBase = env.ZOHO_API_URL.replace("/crm/v2", "/mail/v1/messages");

  await axios.post(
    mailBase,
    {
      fromAddress: env.ZOHO_MAIL_ADDRESS,
      fromName: env.ZOHO_MAIL_FROM_NAME,
      toAddress: to,
      subject: "Nous avons bien reçu votre demande — Marhaban Canada",
      content: `
      <p>Bonjour ${fullName.split(" ")[0] || ""},</p>
      <p>Merci d'avoir contacté <strong>Marhaban Canada</strong>.
      Nous vous revenons sous 24h par WhatsApp ou e-mail.</p>
      <p><a href="https://marhabancanada.ca/packs">Voir les packs</a></p>
      <p>L'équipe Marhaban Canada 🇨🇦</p>`,
      mailFormat: "html"
    },
    { headers: { Authorization: `Zoho-oauthtoken ${token}` } }
  );
}

export async function insertLeadInZoho(leadData) {
  try {
    const accessToken = await getZohoAccessToken();
    const baseUrl = (env.ZOHO_API_URL || "https://www.zohoapis.ca/crm/v2").replace(/\/$/, "");
    const moduleName = env.ZOHO_MODULE || "LeadsWeb";
    const fullName = leadData.fullName || leadData.name || "Client Marhaban";
    const names = fullName.trim().split(" ");
    const lastName = names.length ? names[names.length - 1] : "Client";
    const firstName = names.length > 1 ? names.slice(0, -1).join(" ") : fullName;
    const packLabel = leadData.packLabel || leadData.pack || "Essentiel";
    
    const utmDetails = leadData.utm && typeof leadData.utm === "object"
      ? Object.entries(leadData.utm)
          .filter(([, value]) => value)
          .map(([key, value]) => `${key}=${value}`)
          .join("|")
      : "";

    const descriptionParts = [
      `Pack: ${packLabel}`,
      `Message: ${leadData.message || "-"}`,
    ];
    
    if (leadData.arrivalDate) descriptionParts.push(`Arrival: ${leadData.arrivalDate}`);
    if (leadData.airport) descriptionParts.push(`Airport: ${leadData.airport}`);
    if (leadData.city) descriptionParts.push(`City: ${leadData.city}`);
    if (leadData.people) descriptionParts.push(`People: ${leadData.people}`);
    if (utmDetails) descriptionParts.push(`UTM: ${utmDetails}`);

    const record = {
      Company: "Marhaban Canada",
      Full_Name: fullName,
      Last_Name: lastName,
      First_Name: firstName,
      Email: leadData.email,
      Phone: leadData.phone,
      Lead_Source: leadData.source || "Site Web Marhaban",
      Description: descriptionParts.join(" | "),
      Pack: packLabel,
      Pack_choisi: packLabel,
      Custom_Pack__c: leadData.pack || packLabel,
      Arrival_Date__c: leadData.arrivalDate || null,
      City: leadData.city || null,
      preferred_language: leadData.locale || "fr",
      Country: leadData.country || "Canada",
    };

    const payload = {
      data: [Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined && value !== null))],
      trigger: ["workflow"],
    };

    const response = await axios.post(
      `${baseUrl}/${moduleName}`,
      payload,
      {
        headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
      }
    );

    const zohoId = response.data?.data?.[0]?.details?.id;
    return { id: zohoId, ...response.data?.data?.[0] };
  } catch (err) {
    const logger = (await import("./logger.js")).logger;
    logger.error(`Zoho CRM Lead erreur: ${err.message}`);
    if (err.response?.data) {
      logger.error(`Zoho response: ${JSON.stringify(err.response.data)}`);
    }
    throw err;
  }
}

export async function fetchFaqFromZoho() {
  // Optional: Fetch FAQs from Zoho
  // This can be implemented later if needed
  return null;
}
