import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charge ton .env à la racine du backend
dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("🔧 Test SMTP automatique pour Zoho Mail...");
console.log(`User: ${process.env.SMTP_USER}`);
console.log(`Mot de passe chargé: ${process.env.SMTP_PASS ? "✅ Oui" : "❌ Non"}`);

// Liste des serveurs Zoho à tester
const SERVERS = [
  { host: "smtp.zoho.ca", label: "🇨🇦  Zoho Canada" },
  { host: "smtp.zoho.com", label: "🌍  Zoho Global" },
];

async function testSMTPServer(host) {
  const transporter = nodemailer.createTransport({
    host,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    connectionTimeout: 10000,
    greetingTimeout: 5000,
    logger: false,
    debug: false,
  });

  console.log(`\n🧪 Test de connexion → ${host} ...`);
  try {
    const info = await transporter.sendMail({
      from: `"Marhaban Canada" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `✅ Test SMTP sur ${host}`,
      text: `Connexion SMTP réussie sur ${host} !`,
    });
    console.log(`✅ Succès : email envoyé via ${host} (ID: ${info.messageId})`);
  } catch (err) {
    console.error(`❌ Échec sur ${host} →`, err.message);
  }
}

(async () => {
  if (!process.env.SMTP_PASS || !process.env.SMTP_USER) {
    console.error("⚠️  Variables SMTP_USER ou SMTP_PASS manquantes dans ton .env !");
    process.exit(1);
  }

  for (const { host, label } of SERVERS) {
    console.log(`\n=== ${label} ===`);
    await testSMTPServer(host);
  }

  console.log("\n🔍 Test terminé — regarde ci-dessus quel serveur a fonctionné.");
})();
