"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Calendar as CalendarIcon, Clock, User, Mail, Scissors, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react"
import { format, addDays, isSameDay } from "date-fns"

interface BookingModalProps {
    isOpen: boolean
    onClose: () => void
    initialStaff?: string
}

export default function BookingModal({ isOpen, onClose, initialStaff = "Auto" }: BookingModalProps) {
    const [step, setStep] = useState<1 | 2>(1)
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [availableSlots, setAvailableSlots] = useState<string[]>([])
    const [isLoadingSlots, setIsLoadingSlots] = useState(false)

    // Form State
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        phone: "",
        service: "Classic Haircut",
        staff: "Auto"
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [assignedStaff, setAssignedStaff] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const staffOptions = ["Auto", "Amit", "Rahul", "Sameer"]
    const services = ["Classic Haircut", "Beard Trimming", "Hot Towel Shave", "Modern Styling", "Hair Wash & Treatment"]

    // Sync initialStaff with formData when modal opens
    useEffect(() => {
        if (isOpen) {
            const validStaff = typeof initialStaff === "string" && initialStaff.trim() && initialStaff !== "[object Object]"
                ? initialStaff
                : "Auto"
            setFormData(prev => ({ ...prev, staff: validStaff }))
            setStep(1) // Reset to step 1
            setSuccess(false) // Reset success state
        }
    }, [isOpen, initialStaff])

    // Fetch Available Slots when Date changes
    useEffect(() => {
        if (!isOpen) return

        const fetchSlots = async () => {
            setIsLoadingSlots(true)
            setSelectedSlot(null)
            setErrorMsg("")
            try {
                const dateStr = format(selectedDate, "yyyy-MM-dd")
                const currentStaff = typeof formData.staff === "string" && formData.staff.trim() && formData.staff !== "[object Object]" ? formData.staff : "Auto"
                const staffParam = currentStaff !== "Auto" ? `&staff=${encodeURIComponent(currentStaff)}` : ""
                const res = await fetch(`/api/calendar/available?date=${dateStr}${staffParam}`)
                const data = await res.json()
                if (!res.ok) {
                    if (data.setupRequired) {
                        setErrorMsg(data.error || "Google Calendar Integration is almost ready! Please check your Calendar ID in the environment variables.")
                        return
                    }
                    throw new Error(data.error || "Failed to fetch slots")
                }
                setAvailableSlots(data.availableSlots || [])
            } catch (err: any) {
                console.error("Error fetching slots", err)
                setErrorMsg(err.message || "An unexpected error occurred.")
            } finally {
                setIsLoadingSlots(false)
            }
        }

        fetchSlots()
    }, [selectedDate, formData.staff, isOpen])

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedSlot) return

        setIsSubmitting(true)
        setErrorMsg("")

        try {
            const safeStaff = typeof formData.staff === "string" && formData.staff.trim() && formData.staff !== "[object Object]"
                ? formData.staff
                : "Auto"

            const payload = {
                name: String(formData.name || "").trim(),
                email: String(formData.email || "").trim(),
                phone: String(formData.phone || "").trim(),
                service: String(formData.service || "Classic Haircut"),
                staff: safeStaff,
                timeSlot: selectedSlot
            }

            const res = await fetch("/api/calendar/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.error || "Booking failed")

            if (data.staffName) setAssignedStaff(data.staffName)
            setSuccess(true)
        } catch (err: any) {
            setErrorMsg(err.message || "An unexpected error occurred")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Generate date chips for the next 7 days
    const dateOptions = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i))

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            transition: { type: "spring" as const, damping: 25, stiffness: 300 } 
        },
        exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
    }

    const stepVariants = {
        initial: { opacity: 0, x: 20 },
        animate: { 
            opacity: 1, 
            x: 0, 
            transition: { duration: 0.4, ease: "easeOut" as const } 
        },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md"
                    />
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 z-[101] m-auto max-w-xl w-[95%] h-fit max-h-[95vh] bg-primary border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                    >
                        {/* Glass Gradient Header */}
                        <div className="relative p-8 border-b border-white/10 bg-gradient-to-r from-primary via-primary/95 to-primary/90">
                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(201,163,106,0.1),transparent_60%)]" />
                            <div className="relative flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold font-heading text-white tracking-tight">
                                        {success ? "Success!" : "Reserve Your Session"}
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">
                                        {success ? "Your appointment is confirmed" : "Choose your service and pick a slot"}
                                    </p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="group text-gray-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-3 rounded-full border border-white/5 hover:border-white/20"
                                >
                                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>
                        </div>

                        {/* Content Scroll Area */}
                        <div className="p-8 overflow-y-auto custom-scrollbar bg-primary/50">
                            <AnimatePresence mode="wait">
                                {success ? (
                                    <motion.div
                                        key="success"
                                        variants={stepVariants}
                                        initial="initial"
                                        animate="animate"
                                        className="text-center py-12"
                                    >
                                        <div className="relative w-24 h-24 mx-auto mb-8">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                                                className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
                                            />
                                            <motion.div
                                                initial={{ scale: 0, rotate: -45 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.3 }}
                                                className="relative w-full h-full bg-green-500/10 border border-green-500/30 text-green-500 rounded-full flex items-center justify-center"
                                            >
                                                <CheckCircle2 className="w-12 h-12" />
                                            </motion.div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Appointment Scheduled</h3>
                                        <p className="text-gray-400 mb-10 max-w-sm mx-auto leading-relaxed">
                                            We've secured your <span className="text-gold font-medium">{formData.service}</span> with <span className="text-gold font-medium">{assignedStaff || formData.staff}</span> on <span className="text-white font-medium">{format(new Date(selectedSlot!), "MMMM d 'at' h:mm a")}</span>.
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="group bg-gold hover:bg-gold-hover text-primary font-bold px-10 py-4 rounded-2xl transition-all flex items-center gap-2 mx-auto active:scale-95 shadow-[0_8px_20px_rgba(201,163,106,0.2)]"
                                        >
                                            Done <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </motion.div>
                                ) : (
                                    <>
                                        {/* Step 1: Select Time */}
                                        {step === 1 && (
                                            <motion.div
                                                key="step1"
                                                variants={stepVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                            >
                                                {/* Service Selection - Moved to Step 1 */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                                    <div>
                                                        <h3 className="text-gold font-semibold mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                            <Scissors className="w-4 h-4" /> 1. Select Service
                                                        </h3>
                                                        <div className="relative">
                                                            <select
                                                                className="w-full bg-paper border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-gold/50 appearance-none transition-colors"
                                                                value={formData.service}
                                                                onChange={e => setFormData({ ...formData, service: e.target.value })}
                                                            >
                                                                {services.map(s => <option key={s} value={s}>{s}</option>)}
                                                            </select>
                                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                                <ChevronRight className="w-4 h-4 rotate-90" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <h3 className="text-gold font-semibold mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                            <User className="w-4 h-4" /> 2. Select Staff
                                                        </h3>
                                                        <div className="relative">
                                                            <select
                                                                className="w-full bg-paper border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-gold/50 appearance-none transition-colors"
                                                                value={formData.staff}
                                                                onChange={e => setFormData({ ...formData, staff: e.target.value })}
                                                            >
                                                                {staffOptions.map(s => <option key={s} value={s}>{s === "Auto" ? "Auto (First Available)" : s}</option>)}
                                                            </select>
                                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                                                <ChevronRight className="w-4 h-4 rotate-90" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-8">
                                                    <h3 className="text-gold font-semibold mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                        <CalendarIcon className="w-4 h-4" /> 3. Select a Date
                                                    </h3>

                                                    {/* Premium Horizontal Date Scroller */}
                                                    <div className="flex gap-4 overflow-x-auto pb-6 -mx-2 px-2 custom-scrollbar">
                                                        {dateOptions.map((date, i) => {
                                                            const isSelected = isSameDay(selectedDate, date)
                                                            return (
                                                                <button
                                                                    key={i}
                                                                    onClick={() => setSelectedDate(date)}
                                                                    className={`flex flex-col items-center justify-center min-w-[70px] h-[90px] rounded-2xl border transition-all duration-300 ${isSelected
                                                                        ? "bg-gold border-gold text-primary shadow-[0_10px_20px_rgba(201,163,106,0.3)] scale-105"
                                                                        : "bg-white/5 border-white/10 text-white hover:border-gold/30 hover:bg-white/10"
                                                                        }`}
                                                                >
                                                                    <span className={`text-[10px] uppercase font-bold mb-1 ${isSelected ? "text-primary/70" : "text-gray-500"}`}>
                                                                        {format(date, "EEE")}
                                                                    </span>
                                                                    <span className="text-2xl font-bold tracking-tighter">
                                                                        {format(date, "d")}
                                                                    </span>
                                                                </button>
                                                            )
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="mb-10">
                                                    <h3 className="text-gold font-semibold mb-5 flex items-center gap-2 text-sm uppercase tracking-wider">
                                                        <Clock className="w-4 h-4" /> 4. Available Time Slots
                                                    </h3>

                                                    {errorMsg ? (
                                                        <div className="py-10 px-6 text-center bg-red-500/5 border border-red-500/20 text-red-400 rounded-2xl mb-6">
                                                            <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                                                                <AlertCircle className="w-6 h-6" />
                                                            </div>
                                                            <p className="font-bold text-white mb-1 uppercase text-xs tracking-widest leading-none">Status</p>
                                                            <p className="text-sm opacity-90 leading-relaxed mb-4">{errorMsg}</p>
                                                            <button 
                                                                onClick={() => setSelectedDate(new Date(selectedDate))}
                                                                className="text-xs text-red-400 underline underline-offset-4 hover:text-red-300"
                                                            >
                                                                Try again
                                                            </button>
                                                        </div>
                                                    ) : isLoadingSlots ? (
                                                        <div className="py-16 text-center">
                                                            <div className="w-10 h-10 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto mb-4" />
                                                            <p className="text-gray-500 text-sm animate-pulse">Scanning availability...</p>
                                                        </div>
                                                    ) : availableSlots.length === 0 ? (
                                                        <div className="py-12 text-center bg-white/5 border border-white/10 text-gray-400 rounded-2xl mb-6">
                                                            <Clock className="w-8 h-8 mx-auto mb-3 opacity-20" />
                                                            <p className="text-sm">No slots available on this date.</p>
                                                            <p className="text-xs mt-1 opacity-60">Please choose another day.</p>
                                                        </div>
                                                    ) : (
                                                        <div className="grid grid-cols-3 gap-3">
                                                            {availableSlots.map((slotISO) => {
                                                                const isSelected = selectedSlot === slotISO
                                                                return (
                                                                    <button
                                                                        key={slotISO}
                                                                        onClick={() => setSelectedSlot(slotISO)}
                                                                        className={`py-4 rounded-xl border transition-all duration-300 font-bold text-sm ${isSelected
                                                                            ? "bg-gold border-gold text-primary shadow-[0_8px_15px_rgba(201,163,106,0.3)]"
                                                                            : "bg-paper border-white/5 text-white hover:border-gold/40 hover:bg-white/5 active:scale-95"
                                                                            }`}
                                                                    >
                                                                        {format(new Date(slotISO), "h:mm a")}
                                                                    </button>
                                                                )
                                                            })}
                                                        </div>
                                                    )}
                                                </div>

                                                <button
                                                    disabled={!selectedSlot}
                                                    onClick={() => setStep(2)}
                                                    className="w-full bg-gold text-primary font-bold py-5 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gold-hover transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
                                                >
                                                    Continue to Details <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* Step 2: Contact Info */}
                                        {step === 2 && (
                                            <motion.div
                                                key="step2"
                                                variants={stepVariants}
                                                initial="initial"
                                                animate="animate"
                                                exit="exit"
                                            >
                                                <form onSubmit={handleBookingSubmit}>
                                                    {errorMsg && (
                                                        <div className="p-4 mb-8 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm flex items-center gap-3">
                                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                                            {errorMsg}
                                                        </div>
                                                    )}

                                                    <div className="space-y-6 mb-10">
                                                        {/* Service Selection removed from here as it's now in Step 1 */}

                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                            <div>
                                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                                    <User className="w-3.5 h-3.5 text-gold" /> Full Name
                                                                </label>
                                                                <input
                                                                    required
                                                                    type="text"
                                                                    className="w-full bg-paper border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-gold/50 placeholder:text-gray-600 transition-colors"
                                                                    placeholder="Enter your name"
                                                                    value={formData.name}
                                                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                                />
                                                            </div>

                                                            <div>
                                                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                                    <Mail className="w-3.5 h-3.5 text-gold" /> Email Address
                                                                </label>
                                                                <input
                                                                    required
                                                                    type="email"
                                                                    className="w-full bg-paper border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-gold/50 placeholder:text-gray-600 transition-colors"
                                                                    placeholder="you@email.com"
                                                                    value={formData.email}
                                                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                                                <Clock className="w-3.5 h-3.5 text-gold" /> Phone Number
                                                            </label>
                                                            <input
                                                                required
                                                                type="tel"
                                                                className="w-full bg-paper border border-white/10 rounded-2xl py-4 px-5 text-white focus:outline-none focus:border-gold/50 placeholder:text-gray-600 transition-colors"
                                                                placeholder="+91 XXXXX XXXXX"
                                                                value={formData.phone}
                                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => setStep(1)}
                                                            className="w-1/3 bg-white/5 text-white font-bold py-5 rounded-2xl hover:bg-white/10 border border-white/5 transition-all active:scale-95"
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={isSubmitting}
                                                            className="w-2/3 bg-gold text-primary font-bold py-5 rounded-2xl disabled:opacity-30 flex items-center justify-center gap-2 hover:bg-gold-hover transition-all active:scale-95 shadow-[0_10px_20px_rgba(201,163,106,0.2)]"
                                                        >
                                                            {isSubmitting ? (
                                                                <>
                                                                    <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                                                    Securing Slot...
                                                                </>
                                                            ) : (
                                                                "Confirm Booking"
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            </motion.div>
                                        )}
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer / Selected Summary */}
                        {!success && (
                            <div className="p-6 bg-paper border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gold/10 rounded-lg">
                                        <Scissors className="w-5 h-5 text-gold" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase font-bold leading-none mb-1">Service Selection</p>
                                        <p className="text-sm font-semibold text-white">{formData.service}</p>
                                    </div>
                                </div>
                                {selectedSlot && (
                                    <div className="text-right">
                                        <p className="text-[10px] text-gray-500 uppercase font-bold leading-none mb-1">Appointment</p>
                                        <p className="text-sm font-semibold text-gold">{format(new Date(selectedSlot), "MMM d, h:mm a")}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
