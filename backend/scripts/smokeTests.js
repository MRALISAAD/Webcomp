import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const baseUrl = (process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}`).replace(/\/$/, "");
const adminUser = process.env.ADMIN_USER || "marhaban";
const adminPass = process.env.ADMIN_PASS || "securepassword";
const adminAuth = Buffer.from(`${adminUser}:${adminPass}`).toString("base64");

function log(step, status, detail = "") {
  const emoji = status === "ok" ? "✅" : "❌";
  console.log(`${emoji} ${step}${detail ? ` — ${detail}` : ""}`);
}

async function testStatus() {
  const { status, data } = await axios.get(`${baseUrl}/api/status`);
  if (status !== 200 || data.status !== "ok") {
    throw new Error(`Status route invalid (status=${status})`);
  }
}

async function testLeadSuccess() {
  const payload = {
    fullName: "Samira QA",
    email: `samira.qa+${Date.now()}@marhabancanada.ca`,
    phone: "+15145550000",
    pack: "premium",
    message: "Test API automatique",
    locale: "fr",
    source: "smoke-test",
    arrivalDate: new Date().toISOString().slice(0, 10),
    city: "Montréal",
    country: "Canada",
  };
  const { status, data } = await axios.post(`${baseUrl}/api/leads`, payload);
  if (status !== 201 || !data.success || !data.leadId) {
    throw new Error("Lead success payload incorrect");
  }
}

async function testLeadValidation() {
  const payload = { fullName: "Erreur", pack: "essential" };
  try {
    await axios.post(`${baseUrl}/api/leads`, payload);
    throw new Error("Validation lead devrait échouer");
  } catch (error) {
    if (error.response?.status !== 422) {
      throw new Error(`Validation attendue (422) mais reçu ${error.response?.status || error.message}`);
    }
  }
}

async function testContact() {
  const payload = {
    fullName: "Nora QA",
    email: `nora.qa+${Date.now()}@marhabancanada.ca`,
    phone: "+15145550111",
    subject: "Demande test",
    message: "Je souhaite confirmer vos disponibilités.",
    preferredLanguage: "fr",
    pack: "comfort",
  };
  const { status, data } = await axios.post(`${baseUrl}/api/contact`, payload);
  if (status !== 201 || !data.success) {
    throw new Error("Contact route invalide");
  }
}

async function testFaq() {
  const { status, data } = await axios.get(`${baseUrl}/api/faq`);
  const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : null;
  if (status !== 200 || !items) {
    throw new Error("FAQ devrait retourner une liste (items)");
  }
}

async function testMetrics() {
  const { status, data } = await axios.get(`${baseUrl}/api/admin/metrics`, {
    headers: { Authorization: `Basic ${adminAuth}` },
  });
  if (status !== 200 || typeof data.requestsTotal === "undefined") {
    throw new Error("Metrics route invalide");
  }
}

const suite = [
  ["GET /api/status", testStatus],
  ["POST /api/leads (succès)", testLeadSuccess],
  ["POST /api/leads (validation)", testLeadValidation],
  ["POST /api/contact", testContact],
  ["GET /api/faq", testFaq],
  ["GET /api/admin/metrics", testMetrics],
];

async function run() {
  let failures = 0;
  log("Base", "ok", baseUrl);
  for (const [label, fn] of suite) {
    try {
      await fn();
      log(label, "ok");
    } catch (error) {
      failures += 1;
      log(label, "fail", error.message);
    }
  }

  if (failures > 0) {
    console.error(`\n❌ ${failures} test(s) ont échoué`);
    process.exit(1);
  }

  console.log("\n✅ Tous les tests API sont passés");
}

run().catch((err) => {
  console.error("❌ Erreur fatale", err.message);
  process.exit(1);
});
