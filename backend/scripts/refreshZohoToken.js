import { getZohoAccessToken } from "../src/utils/zoho.js";

(async () => {
  try {
    const token = await getZohoAccessToken();
    console.log("New Zoho access token:", token);
    process.exit(0);
  } catch (error) {
    console.error("Failed to refresh Zoho token:", error.message);
    process.exit(1);
  }
})();
