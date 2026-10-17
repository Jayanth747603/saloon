"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useBooking } from "./BookingProvider"

const teamMembers = [
    {
        name: "Amit",
        role: "Master Barber",
        specialty: "Classic Cuts & Fades",
        experience: "12 yrs exp.",
        // Professional male barber portrait - confident pose
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop&face",
    },
    {
        name: "Rahul",
        role: "Styling Expert",
        specialty: "Beard Sculpting & Design",
        experience: "9 yrs exp.",
        // Stylish male professional portrait
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=2600&auto=format&fit=crop",
    },
    {
        name: "Sameer",
        role: "Grooming Specialist",
        specialty: "Hot Towel & Skin Care",
        experience: "7 yrs exp.",
        // Another professional male portrait
        image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=2560&auto=format&fit=crop",
    },
]

export default function Team() {
    const { openBookingModal } = useBooking()

    return (
        <section id="team" className="py-24 bg-primary text-white border-t border-white/5 overflow-hidden w-full">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="group relative cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative h-[380px] sm:h-[400px] md:h-[460px] w-full rounded-3xl overflow-hidden mb-4 border border-white/5 shadow-2xl">
                                <Image
                                    src={member.image}
                                    alt={`${member.name} - ${member.role} at Salona Barbershop`}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover object-top group-hover:scale-110 transition-transform duration-1000 ease-in-out"
                                />

                                {/* Always-visible bottom gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                {/* Experience badge - always visible top right */}
                                <div className="absolute top-4 right-4">
                                    <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/70 border border-white/15 text-gold backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        {member.experience}
                                    </span>
                                </div>

                                {/* Bottom info - slides up on hover */}
                                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col items-center text-center">
                                    {/* Role badge */}
                                    <span className="inline-block px-4 py-1.5 bg-gold text-primary text-[10px] font-bold uppercase tracking-widest rounded-full mb-2 shadow-[0_4px_10px_rgba(201,163,106,0.3)] translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                                        {member.role}
                                    </span>
                                    {/* Name */}
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                        {member.name}
                                    </h3>
                                    {/* Specialty - hidden by default, visible on hover */}
                                    <p className="text-gray-300 text-xs tracking-wide mb-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        {member.specialty}
                                    </p>
                                    {/* Book button */}
                                    <button
                                        onClick={() => openBookingModal(member.name)}
                                        className="opacity-0 group-hover:opacity-100 bg-white/10 hover:bg-gold hover:text-primary border border-white/20 hover:border-gold text-white text-sm font-bold py-2.5 px-7 rounded-full transition-all duration-300 backdrop-blur-md active:scale-95 translate-y-3 group-hover:translate-y-0"
                                        style={{ transitionDelay: "150ms" }}
                                    >
                                        Book with {member.name}
                                    </button>
                                </div>
                            </div>

                            {/* Below card label (visible when not hovered) */}
                            <div className="text-center group-hover:opacity-0 transition-opacity duration-300 pb-2">
                                <h3 className="text-lg font-semibold mb-0.5">{member.name}</h3>
                                <p className="text-gray-text text-xs uppercase tracking-widest">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
