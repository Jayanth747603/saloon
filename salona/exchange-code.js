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

async function exchange() {
    const authCode = "4/0Aci98E-0Eqb1WHDLkk8ADlZm3JsMPTXeI2tFINIKcbIm9047C_JRZxeYC0hA2lznGd8EIw";
    const oauth2Client = new google.auth.OAuth2(
        envVars.GOOGLE_CLIENT_ID,
        envVars.GOOGLE_CLIENT_SECRET,
        "urn:ietf:wg:oauth:2.0:oob"
    );

    try {
        const { tokens } = await oauth2Client.getToken(authCode);
        console.log("Tokens received:");
        console.log(JSON.stringify(tokens, null, 2));

        if (tokens.refresh_token) {
            console.log("\nUpdate GOOGLE_REFRESH_TOKEN in .env.local with:");
            console.log(tokens.refresh_token);
        } else {
            console.log("\nNo refresh token returned. This might happen if the code was already used or access was not requested with 'offline' type.");
        }
    } catch (err) {
        console.error("Error exchanging code:", err.message);
        if (err.response && err.response.data) {
            console.error(JSON.stringify(err.response.data, null, 2));
        }
    }
}

exchange();
