import express from "express";
import { postContact } from "../controllers/contact.controller.js";
import { validate } from "../middleware/validate.js";
import { contactSchema } from "../schemas/contact.schema.js";

const router = express.Router();

router.post("/", validate(contactSchema), postContact);

export default router;
