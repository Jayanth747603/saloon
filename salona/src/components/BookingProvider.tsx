"use client"

import React, { createContext, useContext, useState } from "react"
import BookingModal from "./BookingModal"

interface BookingContextType {
    openBookingModal: (staffName?: string) => void
    closeBookingModal: () => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedStaff, setSelectedStaff] = useState<string>("Auto")

    const openBookingModal = (staffName?: string | unknown) => {
        if (typeof staffName === "string" && staffName.trim() && staffName !== "[object Object]") {
            setSelectedStaff(staffName)
        } else {
            setSelectedStaff("Auto")
        }
        setIsOpen(true)
    }
    
    const closeBookingModal = () => setIsOpen(false)

    return (
        <BookingContext.Provider value={{ openBookingModal, closeBookingModal }}>
            {children}
            <BookingModal 
                isOpen={isOpen} 
                onClose={closeBookingModal} 
                initialStaff={selectedStaff}
            />
        </BookingContext.Provider>
    )
}

export function useBooking() {
    const context = useContext(BookingContext)
    if (context === undefined) {
        throw new Error("useBooking must be used within a BookingProvider")
    }
    return context
}
