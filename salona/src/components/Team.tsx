"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useBooking } from "./BookingProvider"

const teamMembers = [
    {
        name: "Amit",
        role: "Master Barber",
        image: "https://images.unsplash.com/photo-1621605815844-4315354be50e?q=80&w=2680&auto=format&fit=crop",
    },
    {
        name: "Rahul",
        role: "Styling Expert",
        image: "https://images.unsplash.com/photo-1541535881962-3bb380b08458?q=80&w=2682&auto=format&fit=crop",
    },
    {
        name: "Sameer",
        role: "Grooming Specialist",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop",
    },
]

export default function Team() {
    const { openBookingModal } = useBooking()

    return (
        <section id="team" className="py-24 bg-primary text-white border-t border-white/5">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 max-w-2xl mx-auto"
                >
                    <span className="text-gold font-semibold tracking-wider uppercase text-sm mb-4 block">
                        Meet The Experts
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Barbers</h2>
                    <div className="w-20 h-1 bg-gold rounded-full mx-auto mb-6" />
                    <p className="text-gray-text text-lg">
                        Master craftsmen dedicated to perfecting your look with precision and care.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative h-[450px] w-full rounded-2xl overflow-hidden mb-6 border border-white/5">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                                />

                                {/* Gradient Overlay for Text Readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Interactive Overlay */}
                                <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex flex-col items-center text-center">
                                    <span className="inline-block px-4 py-1.5 bg-gold text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 shadow-[0_4px_10px_rgba(201,163,106,0.3)]">
                                        {member.role}
                                    </span>
                                    <h3 className="text-3xl font-bold text-white mb-6 font-heading">{member.name}</h3>
                                    
                                    <button
                                        onClick={() => openBookingModal(member.name)}
                                        className="opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-gold hover:text-primary border border-white/20 hover:border-gold text-white font-bold py-3 px-8 rounded-full transition-all duration-300 backdrop-blur-md active:scale-95"
                                    >
                                        Book with {member.name}
                                    </button>
                                </div>
                            </div>

                            {/* Below Image Info (Visible by Default) */}
                            <div className="text-center group-hover:opacity-0 transition-opacity duration-300">
                                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                <p className="text-gray-text text-sm uppercase tracking-widest">{member.role}</p>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
