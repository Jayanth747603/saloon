"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function Testimonials() {
    return (
        <section className="py-24 bg-primary relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-paper p-10 md:p-16 rounded-3xl border border-white/5 hover:-translate-y-2 transition-transform duration-500 shadow-2xl relative text-center">
                        {/* Quote Icon */}
                        <div className="text-gold text-6xl font-serif absolute top-8 left-8 opacity-20">
                            "
                        </div>

                        <div className="flex justify-center mb-8">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg key={star} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <blockquote className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-10">
                            Exceptional service, clean cuts, and a welcoming barbershop atmosphere always.
                        </blockquote>

                        <div className="flex items-center justify-center gap-4">
                            <div className="w-14 h-14 relative rounded-full overflow-hidden border-2 border-gold/30">
                                <Image
                                    src="https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=2564&auto=format&fit=crop"
                                    alt="Michael Anderson"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="text-left">
                                <div className="font-semibold text-white tracking-wide">Michael Anderson</div>
                                <div className="text-gold text-sm tracking-wider uppercase">VIP Guest</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
