"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminPage() {
    const router = useRouter()
    
    useEffect(() => {
        router.push("/admin/dashboard")
    }, [router])

    return (
        <div className="h-screen w-screen bg-primary flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
        </div>
    )
}
