import { google } from "googleapis";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

async function testToken() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  try {
    console.log("Attempting to refresh access token...");
    const { credentials } = await oauth2Client.refreshAccessToken();
    console.log("Success! New access token acquired.");
    console.log("Expires at:", new Date(credentials.expiry_date || 0).toLocaleString());
  } catch (error: any) {
    console.error("Failed to refresh token:");
    console.error("Error Message:", error.message);
    if (error.response && error.response.data) {
      console.error("Error Data:", JSON.stringify(error.response.data, null, 2));
    }
  }
}

testToken();
