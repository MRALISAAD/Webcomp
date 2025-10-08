"use strict";

const express = require("express");

const router = express.Router();

function healthHandler(req, res) {
  res.status(200).json({ status: "ok" });
}

router.get("/", healthHandler);

module.exports = router;
module.exports.healthHandler = healthHandler;
