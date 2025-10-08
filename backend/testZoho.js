const axios = require("axios");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

(async () => {
  try {
    console.log("🔍 Test de connexion Zoho CRM...");
    const baseUrl = (process.env.ZOHO_BASE_URL || "https://www.zohoapis.com/crm/v2").replace(/\/$/, "");
    const response = await axios.get(`${baseUrl}/users`, {
      headers: { Authorization: `Zoho-oauthtoken ${process.env.ZOHO_OAUTH_TOKEN}` },
    });
    console.log("✅ Connexion réussie ! Utilisateurs :", response.data.users?.length || "aucun");
  } catch (err) {
    console.error("❌ Erreur Zoho :", err.response?.data || err.message);
  }
})();
