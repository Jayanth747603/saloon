"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function About() {
    return (
        <section id="about" className="py-24 bg-light text-primary relative overflow-hidden w-full">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-gold font-semibold tracking-wider uppercase text-sm mb-4 block">
                        About Salona
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                        Barbershop grooming is more than just a service — it’s an experience.
                    </h2>
                    <p className="text-gray-600 text-lg">
                        At Salona, we combine traditional barber techniques with modern styling to create the perfect look for every client.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center relative">
                    {/* Left Image - Beard Trimming */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="group md:col-span-4 h-[280px] sm:h-[350px] md:h-[420px] relative rounded-3xl overflow-hidden shadow-xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2670&auto=format&fit=crop"
                            alt="Precision Beard Trimming"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Center Image - Haircut with Focus & Goals Overlay */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="group md:col-span-4 h-[340px] sm:h-[420px] md:h-[520px] relative rounded-3xl overflow-hidden shadow-2xl z-10 md:-mt-10"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2670&auto=format&fit=crop"
                            alt="Barber Cutting Hair with Comb and Scissors"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent pointer-events-none" />
                        
                        {/* Overlay Card matching Screenshot */}
                        <div className="absolute bottom-6 left-6 right-6 bg-[#121214]/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white shadow-2xl transition-transform duration-300 group-hover:translate-y-[-2px]">
                            <h3 className="text-lg md:text-xl font-bold mb-1.5 text-gold">Our Focus & Goals</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Deliver sharp cuts, relaxing shaves, and modern styles with exceptional service.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Image - Barbershop Interior */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="group md:col-span-4 h-[280px] sm:h-[350px] md:h-[420px] relative rounded-3xl overflow-hidden shadow-xl"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2674&auto=format&fit=crop"
                            alt="Classic Barbershop Interior"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
