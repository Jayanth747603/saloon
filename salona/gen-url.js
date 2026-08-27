const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

const envPath = path.resolve(__dirname, ".env.local");
const envVars = fs.readFileSync(envPath, "utf8").split("\n").reduce((acc, line) => {
    if (line.trim().startsWith("#") || !line.trim() || !line.includes("=")) return acc;
    const [key, ...values] = line.split("=");
    let val = values.join("=").trim();
    if (val.startsWith("\"") && val.endsWith("\"")) val = val.slice(1, -1);
    acc[key.trim()] = val;
    return acc;
}, {});

const clientId = envVars.GOOGLE_CLIENT_ID;
const clientSecret = envVars.GOOGLE_CLIENT_SECRET;
const redirectUri = "https://developers.google.com/oauthplayground";

if (!clientId || !clientSecret) {
    console.error("ERROR: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET not found in .env.local");
    process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
);

const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
    prompt: "consent",
});

console.log(url);
