"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
    Users, 
    Calendar, 
    TrendingUp, 
    Clock, 
    ExternalLink,
    ChevronRight,
    Loader2,
    CheckCircle2,
    CalendarDays
} from "lucide-react"
import { format, isToday, isFuture } from "date-fns"

export default function DashboardPage() {
    const [appointments, setAppointments] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [stats, setStats] = useState({
        total: 0,
        today: 0,
        upcoming: 0,
        staffActive: 0
    })

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const res = await fetch("/api/calendar/list?days=14")
                const data = await res.json()
                if (data.success) {
                    const events = data.events
                    setAppointments(events)
                    
                    // Calculate stats
                    setStats({
                        total: events.length,
                        today: events.filter((e: any) => isToday(new Date(e.start))).length,
                        upcoming: events.filter((e: any) => isFuture(new Date(e.start))).length,
                        staffActive: new Set(events.map((e: any) => e.staff)).size
                    })
                }
            } catch (error) {
                console.error("Dashboard fetch error:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    const statCards = [
        { name: "Total Bookings", value: stats.total, icon: Calendar, color: "text-blue-400", bg: "bg-blue-400/10" },
        { name: "Today's Appointments", value: stats.today, icon: Clock, color: "text-gold", bg: "bg-gold/10" },
        { name: "Upcoming Sessions", value: stats.upcoming, icon: TrendingUp, color: "text-green-400", bg: "bg-green-400/10" },
        { name: "Active Barbers", value: stats.staffActive, icon: Users, color: "text-purple-400", bg: "bg-purple-400/10" },
    ]

    if (isLoading) {
        return (
            <div className="h-[calc(100vh-100px)] flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gold animate-spin" />
            </div>
        )
    }

    return (
        <div className="space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-white mb-2 font-heading">Dashboard Overview</h1>
                <p className="text-gray-400">Welcome back! Here's what's happening at Salona today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={stat.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/[0.08] transition-all group"
                    >
                        <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">{stat.name}</p>
                        <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Appointments */}
                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden">
                    <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <CalendarDays className="text-gold w-6 h-6" /> Recent Appointments
                        </h3>
                        <button className="text-gold text-sm font-bold hover:underline flex items-center gap-1 group">
                            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-gray-500 text-[10px] uppercase tracking-widest font-bold border-b border-white/5">
                                    <th className="px-8 py-5">Customer</th>
                                    <th className="px-8 py-5">Barber</th>
                                    <th className="px-8 py-5">Time</th>
                                    <th className="px-8 py-5 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {appointments.slice(0, 5).map((appt) => (
                                    <tr key={appt.id} className="hover:bg-white/[0.03] transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center font-bold text-gold text-xs">
                                                    {appt.summary?.split(':')[1]?.trim().split(' ')[0]?.charAt(0) || appt.summary?.charAt(0) || "C"}
                                                </div>
                                                <div>
                                                    <p className="text-white font-semibold text-sm">{appt.summary?.split(':')[1]?.trim() || appt.summary}</p>
                                                    <p className="text-gray-500 text-[10px] font-bold mt-0.5 uppercase tracking-wider">
                                                        {appt.description?.match(/Service: (.*)/)?.[1] || "Grooming Service"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 bg-gold/10 text-gold text-[10px] font-bold uppercase rounded-full border border-gold/20">
                                                {appt.staff}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-white text-sm font-medium">{format(new Date(appt.start), "MMM d")}</p>
                                            <p className="text-gray-500 text-xs">{format(new Date(appt.start), "h:mm a")}</p>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 text-gray-500 hover:text-white transition-colors">
                                                <ExternalLink className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions / Activity */}
                <div className="space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
                        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full py-4 px-6 bg-gold text-primary font-bold rounded-2xl hover:bg-gold-hover transition-all text-sm shadow-[0_10px_20px_rgba(201,163,106,0.1)] flex items-center justify-between group">
                                New Appointment <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full py-4 px-6 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-sm flex items-center justify-between group">
                                Manage Services <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="w-full py-4 px-6 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all text-sm flex items-center justify-between group">
                                Team Settings <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gold/20 to-primary border border-gold/20 rounded-[2.5rem] p-8 relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        <CheckCircle2 className="w-12 h-12 text-gold mb-6 relative z-10" />
                        <h4 className="text-lg font-bold text-white mb-2 relative z-10">System Status</h4>
                        <p className="text-gray-400 text-sm mb-6 relative z-10">All Google Calendars are synced and active. Real-time booking is healthy.</p>
                        <div className="flex items-center gap-2 relative z-10">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Connected</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
