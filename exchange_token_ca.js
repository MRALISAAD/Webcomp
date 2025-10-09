"use strict";

const axios = require("axios");
const querystring = require("querystring");

const TOKEN_ENDPOINT = "https://accounts.zohocloud.ca/oauth/v2/token";
const REQUIRED_VARS = ["8M3R4DK3OB2OXS8QDYZ2VGN86YW6LJ", "2b155ec6926a21166b2fb183cf6182acfc452ec027", "https://accounts.zohocloud.ca", "1000.d7e513de283f0287873fe58ca7860ba9.d3d5e23a68e38ef2676b5a4f875e314b"];

function readConfig() {
  const missing = REQUIRED_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(", ")}`;
    throw new Error(message);
  }

  return {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    code: process.env.AUTH_CODE,
  };
}

async function exchangeCodeForTokens(config) {
  const payload = querystring.stringify({
    grant_type: "authorization_code",
    client_id: config.client_id,
    client_secret: config.client_secret,
    redirect_uri: config.redirect_uri,
    code: config.code,
  });

  const response = await axios.post(TOKEN_ENDPOINT, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    timeout: 15000,
  });

  return response.data;
}

async function main() {
  try {
    const config = readConfig();
    const data = await exchangeCodeForTokens(config);
    const { access_token, refresh_token, expires_in, expires_in_sec } = data;

    console.log("access_token:", access_token || "<not provided>");
    console.log("refresh_token:", refresh_token || "<not provided>");
    console.log("expires_in:", expires_in || expires_in_sec || "<not provided>");
  } catch (error) {
    if (error.isAxiosError && error.response) {
      console.error("Token exchange failed with status:", error.response.status);
      console.error("Error payload:", JSON.stringify(error.response.data, null, 2));
      process.exitCode = 1;
      return;
    }

    console.error("Token exchange failed:", error.message);
    process.exitCode = 1;
  }
}

main();
