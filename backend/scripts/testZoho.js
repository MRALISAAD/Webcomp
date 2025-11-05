import { getZohoAccessToken } from "../src/utils/zoho.js";

(async () => {
  try {
    const token = await getZohoAccessToken();
    if (!token) {
      console.error("Unable to retrieve Zoho access token");
      process.exit(1);
    }
    console.log("Zoho access token retrieved successfully");
    process.exit(0);
  } catch (error) {
    console.error("Zoho test failed:", error.message);
    process.exit(1);
  }
})();
