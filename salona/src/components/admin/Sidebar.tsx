"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
    LayoutDashboard, 
    Calendar, 
    Users, 
    Scissors, 
    Settings, 
    LogOut,
    ScissorsLineDashed,
    ChevronLeft
} from "lucide-react"
import { insforge } from "@/lib/insforge"
import { useRouter } from "next/navigation"

const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "Appointments", icon: Calendar, href: "/admin/appointments" },
    { name: "Staff", icon: Users, href: "/admin/staff" },
    { name: "Services", icon: Scissors, href: "/admin/services" },
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await insforge.auth.signOut()
            router.push("/admin/login")
        } catch (error) {
            console.error("Logout error:", error)
        }
    }

    return (
        <aside className="w-72 h-screen bg-primary border-r border-white/5 flex flex-col sticky top-0">
            {/* Logo Section */}
            <div className="p-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(201,163,106,0.3)]">
                    <ScissorsLineDashed className="text-primary w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-white leading-none">SALONA</h1>
                    <p className="text-[10px] text-gold font-bold tracking-[0.2em] uppercase mt-1">Admin Panel</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={`group flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                                isActive 
                                ? "bg-gold text-primary shadow-[0_10px_20px_rgba(201,163,106,0.2)]" 
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-gold group-hover:scale-110 transition-transform"}`} />
                            <span className="font-semibold text-sm">{item.name}</span>
                            {isActive && (
                                <motion.div 
                                    layoutId="active-pill"
                                    className="ml-auto w-1.5 h-1.5 bg-primary rounded-full"
                                />
                            )}
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <Link 
                    href="/admin/settings"
                    className="flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
                >
                    <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
                    <span className="font-medium text-sm">Settings</span>
                </Link>
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all group"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium text-sm">Sign Out</span>
                </button>
            </div>

            {/* User Info Card */}
            <div className="m-4 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/50 to-gold flex items-center justify-center font-bold text-primary">
                    AD
                </div>
                <div className="overflow-hidden">
                    <p className="text-xs font-bold text-white truncate">Administrator</p>
                    <p className="text-[10px] text-gray-500 truncate">Salona Management</p>
                </div>
            </div>
        </aside>
    )
}
