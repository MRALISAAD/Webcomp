import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const data = new URLSearchParams({
  grant_type: "refresh_token",
  client_id: process.env.ZOHO_CLIENT_ID,
  client_secret: process.env.ZOHO_CLIENT_SECRET,
  refresh_token: process.env.ZOHO_REFRESH_TOKEN,
});

try {
  const res = await axios.post(`${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`, data);
  console.log("✅ Réponse Zoho :", res.data);
} catch (e) {
  console.error("❌ Erreur :", e.response?.data || e.message);
}
