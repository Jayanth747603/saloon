"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Scissors, WashingMachine, Droplets, SprayCan, HandMetal } from "lucide-react"

const servicesList = [
    {
        title: "Hair Wash & Treatment",
        desc: "Refreshing wash and care for stronger healthy hair.",
        icon: <Droplets className="w-6 h-6 text-gold" />,
    },
    {
        title: "Modern Styling",
        desc: "Trendy cuts tailored to your personality.",
        icon: <Scissors className="w-6 h-6 text-gold" />,
    },
    {
        title: "Hot Towel Shaves",
        desc: "Relax with smooth classic shaves.",
        icon: <WashingMachine className="w-6 h-6 text-gold" />,
    },
    {
        title: "Beard Trimming",
        desc: "Clean sharp beard trims.",
        icon: <SprayCan className="w-6 h-6 text-gold" />,
    },
    {
        title: "Classic Haircuts",
        desc: "Precision barbering with timeless style.",
        icon: <HandMetal className="w-6 h-6 text-gold" />,
    },
]

export default function Services() {
    return (
        <section id="services" className="py-24 bg-primary text-white relative">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] lg:h-[800px] w-full rounded-3xl overflow-hidden group"
                    >
                        <Image
                            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2670&auto=format&fit=crop"
                            alt="Barber Service"
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    </motion.div>

                    {/* Right - Services List */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="mb-12"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
                            <div className="w-20 h-1 bg-gold rounded-full" />
                        </motion.div>

                        <div className="space-y-6">
                            {servicesList.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group flex gap-6 p-6 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all duration-300"
                                >
                                    <div className="flex-shrink-0 w-14 h-14 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-gold/10 transition-colors">
                                        {service.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 group-hover:text-gold transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-text leading-relaxed">
                                            {service.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
