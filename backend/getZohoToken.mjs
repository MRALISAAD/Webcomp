import axios from "axios";

// 🧩 Étape 1 : colle ici ton code Zoho (après ?code=)
const code = process.argv[2] ?? process.env.ZOHO_AUTH_CODE; // usage : node getZohoToken.mjs <code>

const data = new URLSearchParams({
  grant_type: "authorization_code",
  client_id: process.env.ZOHO_CLIENT_ID,
  client_secret: process.env.ZOHO_CLIENT_SECRET,
  redirect_uri: "http://localhost:8080/api/zoho/callback",
  code,
});

(async () => {
  console.log("🔁 Requête vers Zoho pour échanger le code contre un refresh_token...");
  try {
    const res = await axios.post("https://accounts.zohocloud.ca/oauth/v2/token", data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log("✅ Réponse Zoho complète :");
    console.log(JSON.stringify(res.data, null, 2));

    if (res.data.refresh_token) {
      console.log("\n🎟️ Ton nouveau REFRESH TOKEN Zoho :");
      console.log(res.data.refresh_token);
      console.log("\n➡️ Copie-le dans ton fichier .env :");
      console.log("ZOHO_REFRESH_TOKEN=" + res.data.refresh_token);
    } else {
      console.warn("⚠️ Pas de refresh_token reçu. Vérifie que tu as mis access_type=offline dans l’URL d’autorisation.");
    }
  } catch (err) {
    console.error("❌ Erreur Zoho :", err.response?.data || err.message);
  }
})();
