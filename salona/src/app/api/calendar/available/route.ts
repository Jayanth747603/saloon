import { NextResponse } from "next/server"
import { getFreeBusy, getCalendarIdForStaff, STAFF_CALENDARS } from "@/lib/googleCalendar"
import { parseISO, isBefore, isAfter, addMinutes } from "date-fns"
import { fromZonedTime } from "date-fns-tz"

const SHOP_TIMEZONE = process.env.NEXT_PUBLIC_SHOP_TIMEZONE || "Asia/Kolkata"
const SLOT_DURATION_MINS = 30
const BUFFER_MINS = 10
const SHOP_START_HOUR = 9 // 9 AM
const SHOP_END_HOUR = 19  // 7 PM (Extended for salon)

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const dateParam = searchParams.get("date") // Expects YYYY-MM-DD
        const staffParam = searchParams.get("staff") // Amit, Rahul, Sameer, or Auto

        console.log(`[API/Available] Checking availability for date: ${dateParam}, staff: ${staffParam}`)

        if (!dateParam) {
            return NextResponse.json({ error: "Date parameter is required (YYYY-MM-DD)" }, { status: 400 })
        }

        const startOfDayZoned = fromZonedTime(`${dateParam}T00:00:00`, SHOP_TIMEZONE)
        const endOfDayZoned = fromZonedTime(`${dateParam}T23:59:59`, SHOP_TIMEZONE)

        // Determine which calendars to check
        let calendarIds: string[] = []
        if (staffParam && staffParam !== "Auto" && STAFF_CALENDARS[staffParam]) {
            calendarIds = [STAFF_CALENDARS[staffParam]!]
        } else {
            // Check all staff calendars for "Auto" or if no staff selected
            calendarIds = Object.values(STAFF_CALENDARS).filter(Boolean) as string[]
        }

        if (calendarIds.length === 0) {
            return NextResponse.json({ error: "No valid staff calendars found" }, { status: 400 })
        }

        // Fetch busy periods from all relevant calendars
        // We do separate calls for simplicity, or we could update getFreeBusy to take an array
        const busyDataPerCalendar: Record<string, any[]> = {}
        
        for (const calId of calendarIds) {
            const freeBusyData = await getFreeBusy(
                startOfDayZoned.toISOString(),
                endOfDayZoned.toISOString(),
                calId
            )
            busyDataPerCalendar[calId] = freeBusyData.calendars?.[calId]?.busy || []
        }

        // Generate all possible slots
        let currentSlot = fromZonedTime(`${dateParam}T${String(SHOP_START_HOUR).padStart(2, '0')}:00:00`, SHOP_TIMEZONE)
        const endOfDayLimit = fromZonedTime(`${dateParam}T${String(SHOP_END_HOUR).padStart(2, '0')}:00:00`, SHOP_TIMEZONE)

        const now = new Date()
        let availableSlots: string[] = []

        while (isBefore(currentSlot, endOfDayLimit)) {
            const slotEnd = addMinutes(currentSlot, SLOT_DURATION_MINS)
            const slotEndWithBuffer = addMinutes(slotEnd, BUFFER_MINS)

            // Make sure the slot isn't in the past
            if (isAfter(currentSlot, now)) {
                // For a slot to be available:
                // If specific staff selected: must be free in their calendar
                // If "Auto" selected: must be free in AT LEAST ONE staff calendar
                
                let isSlotAvailable = false
                
                if (staffParam && staffParam !== "Auto") {
                    // Check specific staff
                    const calId = calendarIds[0]
                    const busyIntervals = busyDataPerCalendar[calId]
                    const isBusy = busyIntervals.some((busy: any) => {
                        const busyStart = parseISO(busy.start)
                        const busyEnd = parseISO(busy.end)
                        return isBefore(currentSlot, busyEnd) && isAfter(slotEndWithBuffer, busyStart)
                    })
                    isSlotAvailable = !isBusy
                } else {
                    // "Auto" - check if any staff is free
                    isSlotAvailable = calendarIds.some(calId => {
                        const busyIntervals = busyDataPerCalendar[calId]
                        const isBusy = busyIntervals.some((busy: any) => {
                            const busyStart = parseISO(busy.start)
                            const busyEnd = parseISO(busy.end)
                            return isBefore(currentSlot, busyEnd) && isAfter(slotEndWithBuffer, busyStart)
                        })
                        return !isBusy
                    })
                }

                if (isSlotAvailable) {
                    availableSlots.push(currentSlot.toISOString())
                }
            }

            currentSlot = addMinutes(currentSlot, SLOT_DURATION_MINS)
        }

        console.log(`[API/Available] Final Available Slots found: ${availableSlots.length}`)
        
        return NextResponse.json({ 
            availableSlots,
            source: 'GoogleCalendar'
        })

    } catch (error: any) {
        console.error("Google Calendar Availability API Error:", error)
        return NextResponse.json(
            { error: "Failed to check availability.", details: error.message },
            { status: 500 }
        )
    }
}
