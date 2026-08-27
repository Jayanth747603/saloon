require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function test() {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    try {
        console.log("Querying FreeBusy...");
        const res = await calendar.freebusy.query({
            requestBody: {
                timeMin: new Date().toISOString(),
                timeMax: new Date(Date.now() + 86400000).toISOString(),
                timeZone: process.env.NEXT_PUBLIC_SHOP_TIMEZONE || 'UTC',
                items: [{ id: process.env.GOOGLE_CALENDAR_ID }]
            }
        });
        console.log("Response:", JSON.stringify(res.data, null, 2));
    } catch (err) {
        console.error("Error Detail:", {
            message: err.message,
            response: err.response?.data
        });
    }
}
test();
