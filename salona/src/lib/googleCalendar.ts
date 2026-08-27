import { google } from "googleapis"

// Instantiate the OAuth2 client using the credentials from `.env.local`
const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:3000/api/auth/callback/google" // Redirect URI (not strictly needed since we use a refresh token)
)

// Set the initial refresh token
if (process.env.GOOGLE_REFRESH_TOKEN) {
    oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    })
}

// Track token expiry locally
let tokenExpiryTime: number | null = null;

/**
 * Manually refresh the access token using the POST endpoint.
 */
async function manualRefreshAccessToken() {
    console.log("[Google Auth] Refreshing access token manually...");
    
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REFRESH_TOKEN) {
        throw new Error("Missing OAuth2 credentials in .env.local");
    }

    const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
            grant_type: "refresh_token",
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error("[Google Auth] Refresh failed:", data);
        throw new Error(`Failed to refresh Google access token: ${data.error_description || data.error}`);
    }

    // Update the client and our local expiry tracker
    oauth2Client.setCredentials({
        access_token: data.access_token,
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN, // Always reuse
    });

    tokenExpiryTime = Date.now() + (data.expires_in * 1000);
    console.log("[Google Auth] Access token refreshed successfully.");
    
    return data.access_token;
}

/**
 * Ensures the OAuth2 client has a valid access token before making an API call.
 */
export async function ensureAuthenticated() {
    // Refresh if we don't have an expiry time or if it's within 60 seconds of expiring
    const isExpired = !tokenExpiryTime || (Date.now() + 60000 > tokenExpiryTime);
    
    if (isExpired) {
        await manualRefreshAccessToken();
    }
}

// Instantiate the calendar API client natively
export const calendar = google.calendar({ version: "v3", auth: oauth2Client })

/// Helper Functions

/**
 * Get raw Free/Busy intervals for a given date range on the configured calendar.
 */
export async function getFreeBusy(timeMin: string, timeMax: string, calendarId?: string) {
    await ensureAuthenticated();
    const response = await calendar.freebusy.query({
        requestBody: {
            timeMin,
            timeMax,
            timeZone: process.env.NEXT_PUBLIC_SHOP_TIMEZONE || 'Asia/Kolkata',
            items: [{ id: calendarId || process.env.GOOGLE_CALENDAR_ID }]
        }
    });
    
    // The response structured as: 
    // calendars: { "calendar_id": { busy: [ { start, end } ] } }
    return response.data;
}

/**
 * Insert a calendar event bypassing "event types" entirely.
 */
export async function insertEvent(data: {
    title: string;
    description: string;
    startTime: string; // ISO String
    endTime: string;   // ISO String
    attendeeEmail: string;
    attendeeName: string;
    calendarId?: string;
}) {
    await ensureAuthenticated();
    const event = {
        summary: data.title,
        description: data.description,
        start: {
            dateTime: data.startTime,
            timeZone: process.env.NEXT_PUBLIC_SHOP_TIMEZONE || 'America/New_York',
        },
        end: {
            dateTime: data.endTime,
            timeZone: process.env.NEXT_PUBLIC_SHOP_TIMEZONE || 'America/New_York',
        },
        attendees: [
            { email: data.attendeeEmail, displayName: data.attendeeName }
        ],
        reminders: {
            useDefault: true,
        },
    };

    const response = await calendar.events.insert({
        calendarId: data.calendarId || process.env.GOOGLE_CALENDAR_ID,
        requestBody: event,
        sendUpdates: 'all' // send email to attendee
    });

    return response.data;
}

/**
 * Staff Calendar ID mapping
 */
export const STAFF_CALENDARS: Record<string, string | undefined> = {
    "Amit": process.env.AMIT_CALENDAR_ID,
    "Rahul": process.env.RAHUL_CALENDAR_ID,
    "Sameer": process.env.SAMEER_CALENDAR_ID,
};

/**
 * Helper to get the correct calendar ID for a staff member
 */
export function getCalendarIdForStaff(staffName: string): string {
    const id = STAFF_CALENDARS[staffName];
    if (!id) {
        // Fallback to primary if staff not found or "Auto"
        return process.env.GOOGLE_CALENDAR_ID || "";
    }
    return id;
}
