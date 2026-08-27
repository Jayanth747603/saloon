"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useBooking } from "./BookingProvider"

export default function Navbar() {
    const { openBookingModal } = useBooking()
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Services", href: "#services" },
        { name: "Gallery", href: "#gallery" },
        { name: "Team", href: "#team" },
        { name: "Contact", href: "#contact" },
    ]

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-primary/90 backdrop-blur-md py-4 shadow-lg shadow-black/20" : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                {/* Logo */}
                <Link href="#home" className="text-2xl font-heading font-bold tracking-wider text-white">
                    SALONA<span className="text-gold">.</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white/80 hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link href="/admin" className="text-gold/60 hover:text-gold text-[10px] font-bold uppercase tracking-widest border border-gold/20 px-3 py-1 rounded-md transition-all">
                        Admin
                    </Link>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <button
                        onClick={() => openBookingModal()}
                        className="bg-gold text-primary px-6 py-2.5 rounded-full font-medium hover:bg-gold-hover hover:shadow-[0_0_15px_rgba(201,163,106,0.4)] transition-all duration-300"
                    >
                        Book Appointment
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white hover:text-gold transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-primary/95 backdrop-blur-lg border-t border-white/10 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-6 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white/80 hover:text-gold transition-colors text-lg font-medium tracking-wide"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false)
                                    openBookingModal()
                                }}
                                className="bg-gold text-primary text-center px-6 py-3 mt-4 rounded-full font-medium"
                            >
                                Book Appointment
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
