import axios from "axios";

// 🧩 Étape 1 : colle ici ton code Zoho (après ?code=)
const code = "1000.81eb61cc94d3f0bd23fbf22ce54627d5.da5c7b8e3aa2b95f0d2ba70780afff91";

const data = new URLSearchParams({
  grant_type: "authorization_code",
  client_id: "1000.W8VSTDXMF5F08DYIN2HBKLFSC1BM7B",
  client_secret: "d1a418e18a63bcfe63f99d0e420730c30e9934caf8",
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
