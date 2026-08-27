const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function testRefresh() {
  console.log("--- Testing Manual Token Refresh ---");
  try {
    const params = new URLSearchParams();
    params.append('client_id', process.env.GOOGLE_CLIENT_ID);
    params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET);
    params.append('refresh_token', process.env.GOOGLE_REFRESH_TOKEN);
    params.append('grant_type', 'refresh_token');

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params
    });

    const data = await response.json();
    if (response.ok) {
      console.log("SUCCESS: New access token received!");
      console.log("Access Token starts with:", data.access_token.substring(0, 10) + "...");
      console.log("Expires in:", data.expires_in, "seconds");
    } else {
      console.error("FAILURE:", data);
    }
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

testRefresh();
