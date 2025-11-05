import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { testSMTP } from "../src/utils/mailer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("🔧 Vérification de la connexion SMTP Zoho...");
console.log(`Host: ${process.env.SMTP_HOST}`);
console.log(`User: ${process.env.SMTP_USER}`);

try {
  await testSMTP();
} catch {
  process.exit(1);
}
