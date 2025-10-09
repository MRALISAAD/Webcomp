"use strict";

const express = require("express");

const app = express();
const port = 5000;

app.get("/oauth/callback", (req, res) => {
  console.log("==== CALLBACK ARRIVED ====");
  console.log("query:", req.query);
  res.send("<h2>Code reçu — tu peux fermer cette fenêtre</h2>");
  // ne loggez pas de secrets ailleurs
});

app.listen(port, () => {
  console.log(
    `Callback catcher listening at http://localhost:${port}/oauth/callback`,
  );
});
