import express from "express";
import { createZohoLead, sendZohoMail } from "../utils/zoho.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const required = ["fullName", "email", "whatsapp", "consent"];

    for (const field of required) {
      if (!req.body?.[field]) {
        return res.status(400).json({ success: false, message: `Champ manquant: ${field}` });
      }
    }

    const leadRes = await createZohoLead(req.body);

    try {
      await sendZohoMail(req.body.email, req.body.fullName);
    } catch (mailErr) {
      console.warn("Zoho mail skipped:", mailErr.message);
    }

    res.json({ success: true, message: "Lead créé + mail envoyé", data: leadRes });
  } catch (err) {
    console.error("Zoho error:", err.response?.data || err.message);
    res
      .status(500)
      .json({ success: false, message: err.response?.data?.message || err.message });
  }
});

export default router;
