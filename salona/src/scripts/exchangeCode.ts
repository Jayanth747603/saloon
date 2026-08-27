import { google } from "googleapis"
import * as dotenv from "dotenv"
import fs from "fs"
import path from "path"

// Load env vars from .env.local
const envPath = path.resolve(process.cwd(), ".env.local")
dotenv.config({ path: envPath })

const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const redirectUri = "https://developers.google.com/oauthplayground"

async function exchange() {
    const authCode = process.argv[2]

    if (!authCode) {
        console.error("ERROR: Please provide the authorization code as an argument.")
        console.log("Usage: npx ts-node src/scripts/exchangeCode.ts YOUR_AUTH_CODE")
        process.exit(1)
    }

    if (!clientId || !clientSecret) {
        console.error("ERROR: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not found in .env.local")
        process.exit(1)
    }

    const oauth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
    )

    try {
        console.log("Exchanging code for tokens...")
        const { tokens } = await oauth2Client.getToken(authCode)
        
        if (!tokens.refresh_token) {
            console.error("\nERROR: No refresh token returned.")
            console.log("This happens if the code was already used or you didn't click 'Exchange' in the playground.")
            console.log("Try generating a NEW code and make sure to use 'Offline' access.")
            process.exit(1)
        }

        console.log("Success! New Refresh Token received.")
        
        // Update .env.local
        let envContent = fs.readFileSync(envPath, "utf8")
        const refreshTokenRegex = /^GOOGLE_REFRESH_TOKEN=.*$/m
        
        if (refreshTokenRegex.test(envContent)) {
            envContent = envContent.replace(refreshTokenRegex, `GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`)
        } else {
            envContent += `\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`
        }

        fs.writeFileSync(envPath, envContent)
        console.log("Updated GOOGLE_REFRESH_TOKEN in .env.local")

    } catch (err: any) {
        console.error("Error exchanging code:", err.message)
        if (err.response && err.response.data) {
            console.error(JSON.stringify(err.response.data, null, 2))
        }
    }
}

exchange()
