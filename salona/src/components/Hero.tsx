"use client"

import { motion, type Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useBooking } from "./BookingProvider"

export default function Hero() {
    const { openBookingModal } = useBooking()

    const textVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
    }

    return (
        <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden bg-primary">
            {/* Background Image Setup for Mobile & Right Side Desktop */}
            <div className="absolute inset-0 z-0 lg:w-[55%] lg:left-auto lg:right-0">
                <motion.div
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2672&auto=format&fit=crop"
                        alt="Barber Grooming"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Gradients to blend image cleanly into background */}
                    <div className="absolute inset-0 bg-primary/80 lg:bg-transparent" />
                    <div className="hidden lg:block absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-primary to-transparent" />
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <div className="lg:w-1/2 max-w-2xl">
                    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-6">
                        <motion.span
                            variants={textVariants}
                            className="inline-block py-1.5 px-4 rounded-full bg-gold/10 text-gold border border-gold/20 text-sm font-medium tracking-wide uppercase"
                        >
                            -5% off your first visit
                        </motion.span>

                        <motion.h1 variants={textVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            Sharp cuts
                            <br />
                            <span className="text-gold">Smooth shaves</span>
                            <br />
                            Timeless style
                        </motion.h1>

                        <motion.p variants={textVariants} className="text-gray-text text-lg md:text-xl max-w-lg font-light leading-relaxed">
                            Experience modern barbering where classic craftsmanship meets contemporary style.
                        </motion.p>

                        <motion.div variants={textVariants} className="flex items-center space-x-2 text-white pb-4">
                            <div className="flex text-gold">
                                {"★★★★★".split("").map((star, i) => <span key={i}>{star}</span>)}
                            </div>
                            <span className="font-semibold ml-2">4.9</span>
                            <span className="text-gray-text text-sm ml-2">Loved by 10,000+ satisfied clients.</span>
                        </motion.div>

                        <motion.div variants={textVariants} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <button
                                onClick={() => openBookingModal()}
                                className="bg-gold text-primary px-8 py-3.5 rounded-full font-medium text-center hover:bg-gold-hover hover:shadow-[0_0_20px_rgba(201,163,106,0.4)] transition-all duration-300"
                            >
                                Book Appointment
                            </button>
                            <Link
                                href="#contact"
                                className="border border-white/20 text-white px-8 py-3.5 rounded-full font-medium text-center hover:bg-white/5 transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
