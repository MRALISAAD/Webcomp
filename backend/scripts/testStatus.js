import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: new URL("../.env", import.meta.url) });

const baseUrl = (process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}`).replace(/\/$/, "");

async function run() {
  const url = `${baseUrl}/api/status`;
  process.stdout.write(`🔍 Checking ${url} ... `);

  const response = await axios.get(url, { timeout: Number(process.env.STATUS_TIMEOUT ?? 5000) });
  if (response.status !== 200 || response.data?.status !== "ok") {
    throw new Error(`Unexpected payload: HTTP ${response.status} / status=${response.data?.status}`);
  }

  console.log("OK");
  console.log(JSON.stringify(response.data, null, 2));
}

run().catch((error) => {
  console.error("\n❌ Status check failed:", error.message);
  process.exit(1);
});
