const express = require("express");
const { z } = require("zod");
const { createZohoLead, buildDescription } = require("../utils/zoho");
const { sendAutoReply, sendAdminNotification } = require("../utils/mailer");

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  city: z.string().optional(),
  project: z.enum(["Études", "Travail", "Immigration permanente", "Regroupement familial"]),
  arrivalDate: z.string().optional(),
  needs: z.array(z.string()).optional(),
  message: z.string().optional(),
  marhababot: z.string().optional(),
});

const router = express.Router();

async function handleContact(req, res) {
  try {
    if (req.body.marhababot) {
      return res.status(200).json({ message: "Merci !" });
    }

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Champs invalides", details: parsed.error.flatten() });
    }

    const data = parsed.data;
    const [lastName, ...rest] = data.fullName.trim().split(/\s+/);
    const firstName = rest.join(" ");

    const leadPayload = {
      Last_Name: lastName || data.fullName,
      First_Name: firstName || undefined,
      Email: data.email,
      Phone: data.whatsapp || undefined,
      City: data.city || undefined,
      Description: buildDescription(data),
      Lead_Source: "Site Web",
      Country: "Canada",
      Project_Type: data.project,
      Arrival_Date: data.arrivalDate || undefined,
      Needs: data.needs?.length ? data.needs.join(", ") : undefined,
    };

    let zohoResponse;
    try {
      zohoResponse = await createZohoLead(leadPayload);
    } catch (zohoError) {
      const status = zohoError.response?.status || 502;
      const detail = zohoError.response?.data || zohoError.message;
      console.error("❌ Contact error (Zoho):", detail);
      return res.status(status).json({ error: "Erreur serveur", detail });
    }

    void Promise.allSettled([sendAutoReply(data), sendAdminNotification(data)]).then((results) => {
      results
        .filter((result) => result.status === "rejected")
        .forEach((result) => {
          console.error("Email error:", result.reason?.message || result.reason);
        });
    });

    const leadResult = zohoResponse?.data?.[0];
    const leadId = leadResult?.details?.id;

    return res.status(200).json({
      ok: true,
      message: "Merci ! On t'écrit sous 24h pour t'accompagner.",
      lead_id: leadId || null,
    });
  } catch (err) {
    console.error("❌ Contact error:", err.message);
    return res.status(500).json({ error: "Erreur serveur", detail: err.message });
  }
}

router.post("/", handleContact);

module.exports = router;
module.exports.handleContact = handleContact;
module.exports.schema = schema;
