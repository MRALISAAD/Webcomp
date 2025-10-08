"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const Demande = require("../models/Demande");
const authMiddleware = require("../middleware/authMiddleware");
const logger = require("../utils/logger");

const router = express.Router();

async function loginHandler(req, res) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      errors: [
        {
          field: !username ? "username" : "password",
          message: "Identifiants requis.",
        },
      ],
    });
  }

  try {
    const admin = await Admin.findOne({ username: username.toLowerCase() });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Identifiants invalides." });
    }

    const passwordMatch = await admin.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Identifiants invalides." });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    return res.status(200).json({ success: true, token });
  } catch (error) {
    logger.error("Erreur lors de la connexion admin", error);
    return res.status(500).json({
      success: false,
      message: "Impossible de traiter la demande pour le moment.",
    });
  }
}

async function listDemandesHandler(req, res) {
  try {
    const demandes = await Demande.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ success: true, data: demandes });
  } catch (error) {
    logger.error("Erreur lors de la récupération des demandes", error);
    return res
      .status(500)
      .json({ success: false, message: "Une erreur est survenue lors de la récupération des demandes." });
  }
}

router.post("/login", loginHandler);
router.get("/demandes", authMiddleware, listDemandesHandler);

module.exports = router;
module.exports.loginHandler = loginHandler;
module.exports.listDemandesHandler = listDemandesHandler;
