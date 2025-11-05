import express from "express";
import { getStatus, getApiInfo } from "../controllers/status.controller.js";

const router = express.Router();

/**
 * GET /api/status
 * Health check endpoint - no rate limiting
 */
router.get("/status", getStatus);

/**
 * GET /api/info
 * API information endpoint
 */
router.get("/info", getApiInfo);

export default router;

