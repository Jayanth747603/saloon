"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { insforge } from "@/lib/insforge"
import Sidebar from "@/components/admin/Sidebar"
import { Loader2, ShieldAlert } from "lucide-react"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const checkAuth = async () => {
            const { data, error } = await insforge.auth.getCurrentUser()
            
            if (data?.user) {
                setUser(data.user)
                // Restrict access specifically to Jayanth
                if (data.user.email === "aiagencyjay2005@gmail.com") {
                    setIsAuthorized(true)
                    if (pathname === "/admin/login") {
                        router.push("/admin/dashboard")
                    }
                } else {
                    setIsAuthorized(false)
                    // If logged in but not jayanth, logout and redirect
                    await insforge.auth.signOut()
                    router.push("/admin/login?error=unauthorized")
                }
            } else {
                setUser(null)
                setIsAuthorized(false)
                if (pathname !== "/admin/login") {
                    router.push("/admin/login")
                }
            }
            setLoading(false)
        }

        checkAuth()
    }, [pathname, router])

    if (loading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-primary">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 text-gold animate-spin" />
                    <p className="text-gold font-medium animate-pulse uppercase tracking-[0.2em] text-xs">Verifying Admin Access...</p>
                </div>
            </div>
        )
    }

    // Don't show sidebar on login page
    if (pathname === "/admin/login") {
        return <>{children}</>
    }

    // Protection for unauthorized access (extra layer)
    if (!isAuthorized && pathname !== "/admin/login") {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-primary p-8">
                <div className="max-w-md w-full bg-white/5 border border-white/10 p-10 rounded-[2.5rem] text-center">
                    <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
                    <p className="text-gray-400 mb-8">This dashboard is restricted to authorized personnel only. Please contact the administrator if you believe this is an error.</p>
                    <button 
                        onClick={() => router.push("/")}
                        className="w-full py-4 bg-white/5 text-white border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-primary">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                {children}
            </main>
        </div>
    )
}
