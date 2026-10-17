"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar, Mail } from "lucide-react"
import { useBooking } from "./BookingProvider"

export default function BookingCTA() {
    const { openBookingModal } = useBooking()

    return (
        <section id="booking" className="relative py-24 md:py-32 bg-primary flex items-center justify-center overflow-hidden w-full">
            {/* Parallax Background Image Setup */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2672&auto=format&fit=crop')] bg-cover bg-center md:bg-fixed opacity-30 mix-blend-luminosity scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-primary/40" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <span className="inline-block py-1.5 px-4 rounded-full bg-gold/10 text-gold border border-gold/20 text-sm font-medium tracking-wide uppercase mb-6 flex items-center justify-center gap-2 w-fit mx-auto">
                        <Calendar className="w-4 h-4" /> Call To Action
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-10 leading-tight">
                        Book your spot today & step out looking your best.
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                        <button
                            onClick={() => openBookingModal()}
                            className="bg-gold text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gold-hover hover:shadow-[0_0_20px_rgba(201,163,106,0.3)] transition-all duration-300 w-full sm:w-auto cursor-pointer"
                        >
                            Book Your Slot
                        </button>
                        <a
                            href="mailto:info@salona.com"
                            className="group flex items-center justify-center gap-3 border border-white/20 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white/5 transition-all duration-300 w-full sm:w-auto"
                        >
                            <Mail className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                            info@salona.com
                        </a>
                    </div>

                    <p className="text-gray-text hover:text-white transition-colors duration-300">
                        Book your slot through <span className="text-white border-b border-white/30 pb-0.5 font-medium cursor-pointer hover:border-gold hover:text-gold transition-colors">Google Calendar</span> or <span className="text-white border-b border-white/30 pb-0.5 font-medium cursor-pointer hover:border-gold hover:text-gold transition-colors">Apple Calendar</span>
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
