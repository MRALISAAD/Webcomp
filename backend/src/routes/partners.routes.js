import express from "express";
import { sendZohoLead } from "../utils/zoho.js";
import { sendInternalEmail } from "../services/mailService.js";
import { env } from "../utils/env.js";
import { logger } from "../utils/logger.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name = "", company = "", email = "", message = "" } = req.body || {};

  if (!name.trim() || !email.trim()) {
    return res.status(400).json({ success: false, message: "Nom et email sont requis." });
  }

  try {
    const segments = name.trim().split(/\s+/);
    const firstName = segments.shift() || "Partenaire";
    const lastName = segments.length ? segments.join(" ") : firstName;

    await sendZohoLead(
      {
        First_Name: firstName,
        Last_Name: lastName,
        Email: email.trim(),
        Company: company.trim() || "Partenaire Marhaban",
        Description: message?.trim() || "-",
        Lead_Source: "Partner Form",
        Lead_Status: "New"
      },
      "Leads"
    );

    const html = `
      <h3>Nouvelle demande partenaire</h3>
      <p><strong>Nom :</strong> ${name.trim()}</p>
      <p><strong>Entreprise :</strong> ${company?.trim() || "Non précisé"}</p>
      <p><strong>Email :</strong> ${email.trim()}</p>
      <p><strong>Message :</strong><br/>${(message || "-").replace(/\n/g, "<br/>")}</p>
    `;

    await sendInternalEmail({
      to: env.INTERNAL_NOTIF_EMAIL || env.SMTP_USER || "support@marhaban-canada.ca",
      subject: "Nouvelle demande de partenariat",
      html
    });

    logger.info(`partner.request.success email=${email.trim()}`);
    return res.status(200).json({ success: true, message: "Demande envoyée avec succès." });
  } catch (error) {
    logger.error(`partner.request.error ${error.message}`);
    return res.status(500).json({ success: false, message: "Erreur lors de l’envoi." });
  }
});

export default router;
