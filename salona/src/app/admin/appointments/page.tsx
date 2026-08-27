"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Search, 
    Filter, 
    Download, 
    MoreVertical, 
    Calendar,
    User,
    Clock,
    Scissors,
    Loader2,
    ChevronLeft,
    ChevronRight,
    SearchX,
    Phone,
    Mail,
    X,
    CheckCircle2,
    CalendarCheck,
    MapPin
} from "lucide-react"
import { format } from "date-fns"

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStaff, setSelectedStaff] = useState("All")
    const [selectedAppt, setSelectedAppt] = useState<any>(null)
    
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const res = await fetch("/api/calendar/list?days=30")
                const data = await res.json()
                if (data.success) {
                    setAppointments(data.events)
                }
            } catch (error) {
                console.error("Fetch appointments error:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchAppointments()
    }, [])

    const filteredAppointments = appointments.filter(appt => {
        const matchesSearch = appt.summary?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             appt.description?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStaff = selectedStaff === "All" || appt.staff === selectedStaff
        return matchesSearch && matchesStaff
    })

    const staffMembers = ["All", ...new Set(appointments.map(a => a.staff))]

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-100px)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-8 relative">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 font-heading tracking-tight">Booking Management</h1>
                    <p className="text-gray-400 text-sm">Review, track, and manage all salon appointments.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-2xl transition-all flex items-center gap-2 text-sm font-bold group">
                        <Download className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" /> Export Data
                    </button>
                    <button className="bg-gold text-primary px-6 py-3 rounded-2xl font-bold text-sm shadow-[0_10px_30px_rgba(201,163,106,0.2)] hover:bg-gold-hover transition-all">
                        + Manual Entry
                    </button>
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col lg:flex-row gap-4 p-2 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm">
                <div className="relative flex-1 group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-gold transition-colors w-5 h-5" />
                    <input 
                        type="text" 
                        placeholder="Search by client name, service, or barber..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-16 pr-6 text-white focus:outline-none focus:border-gold/50 transition-all placeholder:text-gray-600 focus:bg-white/[0.08]"
                    />
                </div>
                <div className="flex items-center gap-4 px-2">
                    <div className="relative min-w-[200px]">
                        <Filter className="absolute left-5 top-1/2 -translate-y-1/2 text-gold w-4 h-4 pointer-events-none" />
                        <select 
                            value={selectedStaff}
                            onChange={(e) => setSelectedStaff(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-10 text-white focus:outline-none focus:border-gold/50 appearance-none transition-all text-sm font-bold uppercase tracking-wider cursor-pointer"
                        >
                            {staffMembers.map(staff => (
                                <option key={staff} value={staff} className="bg-primary text-white">
                                    {staff === "All" ? "Filter: All Barbers" : `Barber: ${staff}`}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 border-l border-white/10 pl-3">
                            <ChevronRight className="w-4 h-4 text-gray-600 rotate-90" />
                        </div>
                    </div>
                </div>
            </div>

            {/* List Table */}
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-md">
                {filteredAppointments.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-500 text-[10px] uppercase tracking-[0.2em] font-black border-b border-white/5 bg-white/[0.03]">
                                    <th className="px-10 py-7">Client Detail</th>
                                    <th className="px-10 py-7">Service / Category</th>
                                    <th className="px-10 py-7">Professional</th>
                                    <th className="px-10 py-7">Schedule</th>
                                    <th className="px-10 py-7 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredAppointments.map((appt, i) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.03 }}
                                        key={appt.id} 
                                        onClick={() => setSelectedAppt(appt)}
                                        className="hover:bg-white/[0.05] transition-all group cursor-pointer active:scale-[0.99]"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center font-bold text-gold shrink-0 border border-gold/25 relative">
                                                    <User className="w-6 h-6" />
                                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-xl mb-1 group-hover:text-gold transition-colors">
                                                        {appt.summary?.split(':')[1]?.trim() || appt.summary}
                                                    </p>
                                                    <div className="flex items-center gap-3 text-gray-500 text-xs">
                                                        <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {appt.attendees?.[0]?.email ? "Available" : "No Email"}</span>
                                                        <span className="w-1 h-1 bg-white/10 rounded-full" />
                                                        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {appt.description?.includes("Phone") ? "Verified" : "Unknown"}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white group-hover:bg-gold/10 group-hover:border-gold/30 transition-all">
                                                <Scissors className="w-4 h-4 text-gold" />
                                                {appt.description?.match(/Service: (.*)/)?.[1] || "Full Grooming Session"}
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-[10px] font-black text-gold border border-gold/30 uppercase">
                                                    {appt.staff[0]}
                                                </div>
                                                <span className="text-white font-bold text-sm tracking-wide">{appt.staff}</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-white font-bold text-sm">
                                                    <Calendar className="w-4 h-4 text-gold" /> {format(new Date(appt.start), "MMM d, yyyy")}
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                                                    <Clock className="w-4 h-4 text-gold/60" /> {format(new Date(appt.start), "h:mm a")}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-green-500/20">
                                                <CheckCircle2 className="w-3 h-3" /> Confirmed
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="py-32 text-center bg-[radial-gradient(circle_at_center,rgba(201,163,106,0.05),transparent_70%)]">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                            <SearchX className="w-12 h-12 text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No Results Found</h3>
                        <p className="text-gray-500 text-base max-w-sm mx-auto font-medium">We couldn't find any appointments matching your current filters. Try refining your search or clearing the selection.</p>
                        <button 
                            onClick={() => {setSearchTerm(""); setSelectedStaff("All")}}
                            className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-gold font-bold text-sm rounded-2xl border border-gold/20 transition-all"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6">
                <p className="text-gray-500 text-sm font-semibold tracking-wide uppercase">
                    Records: <span className="text-gold">{filteredAppointments.length}</span> / {appointments.length} Total
                </p>
                <div className="flex items-center gap-2">
                    <button className="p-4 rounded-2xl border border-white/10 text-gray-600 disabled:opacity-30 bg-white/5">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="p-4 rounded-2xl border border-white/10 text-white hover:bg-gold hover:text-primary transition-all bg-white/5">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Appointment Detail Modal */}
            <AnimatePresence>
                {selectedAppt && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedAppt(null)}
                            className="absolute inset-0 bg-primary/90 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="w-full max-w-3xl bg-secondary border border-white/10 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden relative z-10"
                        >
                            <div className="p-10 md:p-14">
                                <button 
                                    onClick={() => setSelectedAppt(null)}
                                    className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-gray-400 hover:text-white transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>

                                <div className="flex flex-col md:flex-row gap-10 items-start">
                                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-[2.5rem] bg-gold flex items-center justify-center shrink-0 shadow-[0_20px_40px_rgba(201,163,106,0.3)]">
                                        <User className="w-12 h-12 md:w-16 md:h-16 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="px-4 py-1.5 bg-gold/10 text-gold text-[10px] font-black uppercase tracking-widest rounded-full border border-gold/20">
                                                Confirmed Session
                                            </span>
                                            <span className="px-4 py-1.5 bg-white/5 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10 flex items-center gap-2">
                                                <CalendarCheck className="w-3 h-3" /> ID: {selectedAppt.id.slice(0, 8)}
                                            </span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-heading">
                                            {selectedAppt.summary?.split(':')[1]?.trim() || selectedAppt.summary}
                                        </h2>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Client Contact</p>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-4 text-white hover:text-gold transition-colors group cursor-pointer">
                                                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-gold/50 transition-all">
                                                                <Mail className="w-5 h-5" />
                                                            </div>
                                                            <span className="font-semibold">{selectedAppt.attendees?.[0]?.email || "Not Provided"}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4 text-white hover:text-gold transition-colors group cursor-pointer">
                                                            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:border-gold/50 transition-all">
                                                                <Phone className="w-5 h-5" />
                                                            </div>
                                                            <span className="font-semibold">{selectedAppt.description?.match(/Phone: (.*)/)?.[1] || "Not Provided"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="space-y-2 pt-2">
                                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Location Info</p>
                                                    <div className="flex items-center gap-4 text-white">
                                                        <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                                                            <MapPin className="w-5 h-5" />
                                                        </div>
                                                        <span className="font-semibold text-sm leading-relaxed text-gray-300">Salona Luxury Barbershop<br/>12/A New Boston Tower, NYC</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white/5 rounded-[2rem] p-8 border border-white/10">
                                                <p className="text-[10px] font-black text-gold uppercase tracking-widest mb-6 border-b border-gold/20 pb-4">Session Portfolio</p>
                                                <div className="space-y-5">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400 text-sm font-medium">Service</span>
                                                        <span className="text-white font-bold">{selectedAppt.description?.match(/Service: (.*)/)?.[1] || "Grooming Service"}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400 text-sm font-medium">Specialist</span>
                                                        <span className="text-white font-bold">{selectedAppt.staff}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400 text-sm font-medium">Date</span>
                                                        <span className="text-white font-bold">{format(new Date(selectedAppt.start), "MMMM d, yyyy")}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-400 text-sm font-medium">Time</span>
                                                        <span className="text-white font-bold">{format(new Date(selectedAppt.start), "h:mm a")}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
                                                    <button className="flex-1 py-3 bg-red-500/10 text-red-500 text-xs font-black uppercase rounded-xl hover:bg-red-500 hover:text-white transition-all">
                                                        Cancel Entry
                                                    </button>
                                                    <button className="flex-1 py-3 bg-gold text-primary text-xs font-black uppercase rounded-xl hover:bg-gold-hover transition-all">
                                                        Reschedule
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}
