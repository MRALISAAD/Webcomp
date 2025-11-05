import express from "express";
import { logger } from "../utils/logger.js";

const router = express.Router();

// Simple webhook forward/ack for n8n orchestration
router.post("/n8n", async (req, res) => {
  try {
    const payload = req.body || {};
    logger.info("n8n.webhook.received");
    // No-op: This endpoint exists to be targeted by n8n Webhook node if needed
    return res.status(200).json({ ok: true, received: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
});

export default router;

