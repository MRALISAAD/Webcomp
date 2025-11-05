import axios from "axios";
import { logger } from "../utils/logger.js";

const ACCOUNTS_URL = process.env.ZOHO_ACCOUNTS_URL;
const CLIENT_ID = process.env.ZOHO_CLIENT_ID;
const CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;

export async function getAccessToken() {
  try {
    const params = new URLSearchParams({
      refresh_token: REFRESH_TOKEN,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "refresh_token",
    });

    const { data } = await axios.post(`${ACCOUNTS_URL}/oauth/v2/token`, params);
    if (!data.access_token) {
      logger.error(`zoho.token.missing_response ${JSON.stringify(data)}`);
      throw new Error("Token non trouvé dans la réponse Zoho");
    }

    logger.info("zoho.token.refreshed");
    return data.access_token;
  } catch (err) {
    logger.error(`zoho.token.error ${err.message}`);
    throw new Error("Impossible d'obtenir un access token Zoho.");
  }
}
