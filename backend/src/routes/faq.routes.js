import express from "express";
import { getFaq } from "../controllers/faq.controller.js";

const router = express.Router();

router.get("/", getFaq);

export default router;

