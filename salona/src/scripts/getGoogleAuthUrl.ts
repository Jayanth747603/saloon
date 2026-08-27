import { google } from "googleapis"
import * as dotenv from "dotenv"
import path from "path"

// Load env vars from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const redirectUri = "https://developers.google.com/oauthplayground"

if (!clientId || !clientSecret) {
    console.error("ERROR: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not found in .env.local")
    process.exit(1)
}

const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
)

// Generate a url that asks permissions for Google Calendar scope
const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // Required to receive a refresh token
    scope: ["https://www.googleapis.com/auth/calendar.events"],
    prompt: "consent", // Force to re-prompt to ensure we get a refresh token
})

console.log("\n=============================================")
console.log("To setup Google Calendar Integration, please follow these steps:")
console.log("=============================================\n")
console.log("1. Open the following URL in your browser:")
console.log("\n" + url + "\n")
console.log("2. Sign in with the Google Account that holds the Salona Calendar.")
console.log("3. Accept the permissions (You may need to bypass the 'Unverified App' warning since this is in development).")
console.log("4. You will be redirected to the OAuth2 Playground.")
console.log("5. In step 2 of the playground, CLICK the 'Exchange authorization code for tokens' button.")
console.log("6. COPY the 'Refresh token' value.")
console.log("7. Paste that refresh token into your `.env.local` file under `GOOGLE_REFRESH_TOKEN` or use the exchange script.")
console.log("\n=============================================\n")
