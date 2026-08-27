import { NextResponse } from "next/server"
import { calendar, ensureAuthenticated, STAFF_CALENDARS } from "@/lib/googleCalendar"
import { startOfDay, endOfDay, addDays } from "date-fns"

export async function GET(request: Request) {
    try {
        await ensureAuthenticated()
        const { searchParams } = new URL(request.url)
        const days = parseInt(searchParams.get("days") || "7")
        
        const timeMin = startOfDay(new Date()).toISOString()
        const timeMax = endOfDay(addDays(new Date(), days)).toISOString()

        const allEvents: any[] = []

        // Fetch events from all configured staff calendars
        for (const [staffName, calId] of Object.entries(STAFF_CALENDARS)) {
            if (!calId) continue

            const response = await calendar.events.list({
                calendarId: calId,
                timeMin,
                timeMax,
                singleEvents: true,
                orderBy: 'startTime',
            })

            const events = (response.data.items || []).map(event => ({
                id: event.id,
                summary: event.summary,
                description: event.description,
                start: event.start?.dateTime || event.start?.date,
                end: event.end?.dateTime || event.end?.date,
                staff: staffName,
                attendees: event.attendees,
            }))

            allEvents.push(...events)
        }

        // Sort all events by start time
        allEvents.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

        return NextResponse.json({ 
            success: true, 
            events: allEvents,
            count: allEvents.length
        })

    } catch (error: any) {
        console.error("API/Calendar/List Error:", error)
        return NextResponse.json(
            { error: "Failed to fetch appointments.", details: error.message },
            { status: 500 }
        )
    }
}
