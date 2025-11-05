import express from "express";
import { createLead } from "../controllers/leads.controller.js";
import { validate } from "../middleware/validate.js";
import { leadSchema } from "../schemas/lead.schema.js";

const router = express.Router();

router.post("/", validate(leadSchema), createLead);

export default router;
