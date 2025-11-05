import axios from "axios";
import nodemailer from "nodemailer";
import Airtable from "airtable";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log("📂 Chargement des variables d'environnement...");
const requiredEnv = [
  "SMTP_HOST",
  "SMTP_USER",
  "SMTP_PASS",
  "AIRTABLE_API_KEY",
  "AIRTABLE_BASE_ID",
  "AIRTABLE_TABLE_NAME",
  "SLACK_BOT_TOKEN",
  "OPENAI_API_KEY",
];

// Vérifie que toutes les variables essentielles existent
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`❌ Variable manquante dans .env : ${key}`);
  }
}

console.log("🔍 Test des connexions...\n");

// ------------------ TEST SMTP ------------------
const testSMTP = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.verify();
    console.log("✅ SMTP Zoho OK");
  } catch (err) {
    console.error("❌ Erreur SMTP :", err.message);
  }
};

// ------------------ TEST AIRTABLE ------------------
const testAirtable = async () => {
  try {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
      process.env.AIRTABLE_BASE_ID
    );
    await base(process.env.AIRTABLE_TABLE_NAME)
      .select({ maxRecords: 1 })
      .firstPage();
    console.log("✅ Airtable OK");
  } catch (err) {
    console.error("❌ Erreur Airtable :", err.message);
  }
};

// ------------------ TEST SLACK ------------------
const testSlack = async () => {
  try {
    const res = await axios.post(
      "https://slack.com/api/auth.test",
      {},
      { headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` } }
    );
    if (res.data.ok) console.log("✅ Slack OK");
    else console.error("❌ Erreur Slack :", res.data.error);
  } catch (err) {
    console.error("❌ Erreur Slack :", err.message);
  }
};

// ------------------ TEST OPENAI ------------------
const testOpenAI = async () => {
  try {
    const res = await axios.get("https://api.openai.com/v1/models", {
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    });
    if (res.status === 200) {
      console.log(`✅ OpenAI OK (${res.data.data.length} modèles disponibles)`);
    }
  } catch (err) {
    console.error(
      "❌ Erreur OpenAI :",
      err.response?.status,
      err.response?.data?.error?.message || err.message
    );
  }
};

// ------------------ Lancement ------------------
Promise.all([testSMTP(), testAirtable(), testSlack(), testOpenAI()]).then(() =>
  console.log("\n🚀 Vérification terminée.")
);
