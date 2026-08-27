import { NextResponse } from "next/server"
import { insertEvent, getFreeBusy, STAFF_CALENDARS, getCalendarIdForStaff } from "@/lib/googleCalendar"
import { addMinutes, parseISO, isBefore, isAfter } from "date-fns"

const SLOT_DURATION_MINS = 30
const BUFFER_MINS = 10

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, service, timeSlot, staff } = body

        console.log(`[API/Book] New booking request: ${service} for ${name} at ${timeSlot} (Staff: ${staff})`)

        if (!name || !email || !service || !timeSlot) {
            return NextResponse.json({ error: "Missing required fields (name, email, service, timeSlot)" }, { status: 400 })
        }

        const startDateTime = parseISO(timeSlot)
        const endDateTime = addMinutes(startDateTime, SLOT_DURATION_MINS)
        const checkEndDateTime = addMinutes(endDateTime, BUFFER_MINS)

        let selectedStaffName = staff
        let selectedCalId = ""

        // Staff Assignment Logic
        if (!staff || staff === "Auto") {
            console.log("[API/Book] Auto-assigning staff...")
            // Find first available staff
            for (const [sName, calId] of Object.entries(STAFF_CALENDARS)) {
                if (!calId) continue
                
                const freeBusy = await getFreeBusy(startDateTime.toISOString(), checkEndDateTime.toISOString(), calId)
                const isBusy = (freeBusy.calendars?.[calId]?.busy || []).some((busy: any) => {
                    const busyStart = parseISO(busy.start)
                    const busyEnd = parseISO(busy.end)
                    return isBefore(startDateTime, busyEnd) && isAfter(checkEndDateTime, busyStart)
                })

                if (!isBusy) {
                    selectedStaffName = sName
                    selectedCalId = calId
                    break
                }
            }

            if (!selectedCalId) {
                return NextResponse.json({ error: "No staff available for this time slot. Please choose another time." }, { status: 400 })
            }
        } else {
            // Specific staff selected
            selectedCalId = getCalendarIdForStaff(staff)
            if (!selectedCalId) {
                return NextResponse.json({ error: `Staff ${staff} not found or calendar not configured.` }, { status: 400 })
            }

            // Real-time final availability check
            const freeBusy = await getFreeBusy(startDateTime.toISOString(), checkEndDateTime.toISOString(), selectedCalId)
            const isBusy = (freeBusy.calendars?.[selectedCalId]?.busy || []).some((busy: any) => {
                const busyStart = parseISO(busy.start)
                const busyEnd = parseISO(busy.end)
                return isBefore(startDateTime, busyEnd) && isAfter(checkEndDateTime, busyStart)
            })

            if (isBusy) {
                return NextResponse.json({ error: "This slot is already booked. Please choose another time." }, { status: 400 })
            }
        }

        console.log(`[API/Book] Assigning to ${selectedStaffName} (Calendar: ${selectedCalId})`)

        // Create the event in Google Calendar
        const bookingResponse = await insertEvent({
            title: `Haircut Booking: ${name}`,
            description: `Customer: ${name}\nPhone: ${phone || 'N/A'}\nService: ${service}\nAssigned Barber: ${selectedStaffName}`,
            startTime: startDateTime.toISOString(),
            endTime: endDateTime.toISOString(),
            attendeeEmail: email,
            attendeeName: name,
            calendarId: selectedCalId
        })

        console.log(`[API/Book] Success! Google Calendar Event ID: ${bookingResponse.id}`)
        
        return NextResponse.json({ 
            success: true, 
            bookingId: bookingResponse.id,
            staffName: selectedStaffName,
            source: 'GoogleCalendar'
        })

    } catch (error: any) {
        console.error("Google Calendar Booking API Error:", error)
        return NextResponse.json(
            { error: "Failed to book appointment.", details: error.message },
            { status: 500 }
        )
    }
}

