const { google } = require("googleapis")
const fs = require("fs")

const envVars = fs.readFileSync(".env.local", "utf8").split("\n").reduce((acc, line) => {
    if (line.trim().startsWith("#") || !line.trim()) return acc
    const [key, ...values] = line.split("=")
    let val = values.join("=").trim()
    if (val.startsWith("\"") && val.endsWith("\"")) val = val.slice(1, -1)
    acc[key.trim()] = val
    return acc
}, {})

async function testCalendar() {
    console.log("CLIENT ID:", envVars.GOOGLE_CLIENT_ID ? "Set" : "Not Set")
    // console.log("CLIENT SECRET:", envVars.GOOGLE_CLIENT_SECRET ? "Set" : "Not Set")
    // console.log("REFRESH TOKEN:", envVars.GOOGLE_REFRESH_TOKEN ? "Set" : "Not Set")
    console.log("CALENDAR ID:", envVars.GOOGLE_CALENDAR_ID)

    try {
        const oauth2Client = new google.auth.OAuth2(
            envVars.GOOGLE_CLIENT_ID,
            envVars.GOOGLE_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        )

        oauth2Client.setCredentials({
            refresh_token: envVars.GOOGLE_REFRESH_TOKEN,
        })

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        try {
            const userInfo = await oauth2.userinfo.get();
            console.log("AUTHENTICATED AS:", userInfo.data.email);
        } catch(e) {
            console.log("Could not fetch user info");
        }

        const calendar = google.calendar({ version: "v3", auth: oauth2Client })

        const res = await calendar.freebusy.query({
            requestBody: {
                timeMin: new Date().toISOString(),
                timeMax: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
                timeZone: "UTC",
                items: [{ id: envVars.GOOGLE_CALENDAR_ID }],
            },
        })

        console.log("SUCCESS:", JSON.stringify(res.data, null, 2))
    } catch (err) {
        console.error("ERROR MESSAGE:", err.message)
        if (err.response && err.response.data) {
             console.error("RESPONSE ERROR:", JSON.stringify(err.response.data, null, 2))
        }
    }
}

testCalendar()
