"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence, type Variants } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Testimonial {
    id: number
    name: string
    role: string
    service?: string
    quote: string
    rating: number
    avatar: string
    ringGradient: string
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Michael Anderson",
        role: "VIP GUEST",
        service: "Signature Haircut & Beard Sculpt",
        quote: "Exceptional service, clean cuts, and a welcoming barbershop atmosphere always.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=2564&auto=format&fit=crop",
        ringGradient: "bg-gradient-to-tr from-cyan-400 via-indigo-500 to-amber-300 shadow-[0_0_15px_rgba(99,102,241,0.5)]",
    },
    {
        id: 2,
        name: "Marcus Sterling",
        role: "REGULAR CLIENT",
        service: "Traditional Hot Towel Shave",
        quote: "The attention to detail is unmatched. The hot towel shave and precision scissor cuts are easily the best in the city.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
        ringGradient: "bg-gradient-to-tr from-amber-400 via-yellow-500 to-orange-400 shadow-[0_0_15px_rgba(201,163,106,0.5)]",
    },
    {
        id: 3,
        name: "David Chen",
        role: "VIP GUEST",
        service: "Skin Fade & Beard Styling",
        quote: "From the moment you walk in, you're treated like royalty. Sharp lines, perfect fade, and incredible hospitality.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
        ringGradient: "bg-gradient-to-tr from-emerald-400 via-teal-500 to-amber-300 shadow-[0_0_15px_rgba(20,184,166,0.5)]",
    },
    {
        id: 4,
        name: "Julian Brooks",
        role: "EXECUTIVE MEMBER",
        service: "Executive Styling & Facial Care",
        quote: "Found my go-to barbershop for life. The master barbers truly know their craft. Always leave feeling confident and looking top tier.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop",
        ringGradient: "bg-gradient-to-tr from-blue-400 via-indigo-400 to-gold shadow-[0_0_15px_rgba(96,165,250,0.5)]",
    },
    {
        id: 5,
        name: "Anthony Rossi",
        role: "VERIFIED PATRON",
        service: "Classic Scissor Cut & Wash",
        quote: "A true masterclass in modern barbering. Clean aesthetic, flawless beard shape, and an atmosphere you look forward to returning to.",
        rating: 5,
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop",
        ringGradient: "bg-gradient-to-tr from-rose-400 via-purple-500 to-gold shadow-[0_0_15px_rgba(244,63,94,0.5)]",
    },
]

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isPaused, setIsPaused] = useState(false)

    const nextSlide = useCallback(() => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, [])

    const prevSlide = useCallback(() => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }, [])

    const goToSlide = (index: number) => {
        if (index === currentIndex) return
        setDirection(index > currentIndex ? 1 : -1)
        setCurrentIndex(index)
    }

    // Auto-advance every 5 seconds unless hovered
    useEffect(() => {
        if (isPaused) return
        const timer = setInterval(() => {
            nextSlide()
        }, 5000)
        return () => clearInterval(timer)
    }, [isPaused, nextSlide])

    const current = testimonials[currentIndex]

    const slideVariants: Variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? 60 : -60,
            opacity: 0,
            scale: 0.96,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.45,
                ease: "easeOut",
            },
        },
        exit: (dir: number) => ({
            zIndex: 0,
            x: dir < 0 ? 60 : -60,
            opacity: 0,
            scale: 0.96,
            transition: {
                duration: 0.35,
                ease: "easeIn",
            },
        }),
    }

    return (
        <section id="testimonials" className="py-24 bg-primary relative overflow-hidden w-full">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 -right-24 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -left-24 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 max-w-2xl mx-auto"
                >
                    <span className="text-gold font-semibold tracking-wider uppercase text-sm mb-3 block">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        What Our Clients Say
                    </h2>
                    <div className="w-20 h-1 bg-gold rounded-full mx-auto" />
                </motion.div>

                {/* Carousel Container */}
                <div
                    className="max-w-4xl mx-auto relative"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Navigation Buttons (Desktop) */}
                    <div className="hidden sm:flex justify-between items-center absolute inset-y-0 -left-6 -right-6 z-20 pointer-events-none">
                        <button
                            onClick={prevSlide}
                            aria-label="Previous testimonial"
                            className="pointer-events-auto w-12 h-12 rounded-full bg-[#18181b]/80 hover:bg-gold border border-white/10 hover:border-gold text-white hover:text-primary transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-md active:scale-90"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Next testimonial"
                            className="pointer-events-auto w-12 h-12 rounded-full bg-[#18181b]/80 hover:bg-gold border border-white/10 hover:border-gold text-white hover:text-primary transition-all duration-300 flex items-center justify-center shadow-lg backdrop-blur-md active:scale-90"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Animated Testimonial Card */}
                    <div className="relative min-h-[380px] sm:min-h-[340px] md:min-h-[320px] flex items-center">
                        <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                                key={current.id}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x < -40 || info.velocity.x < -300) {
                                        nextSlide()
                                    } else if (info.offset.x > 40 || info.velocity.x > 300) {
                                        prevSlide()
                                    }
                                }}
                                className="w-full cursor-grab active:cursor-grabbing"
                            >
                                <div className="bg-[#141416]/95 backdrop-blur-xl p-8 sm:p-12 md:p-14 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative text-center">
                                    {/* Quote Icon */}
                                    <div className="text-zinc-500/40 text-5xl md:text-6xl font-serif absolute top-6 left-8 select-none pointer-events-none">
                                        &ldquo;
                                    </div>

                                    {/* 5 Stars */}
                                    <div className="flex justify-center mb-6">
                                        <div className="flex gap-1.5 text-gold">
                                            {[...Array(current.rating)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className="w-5 h-5 fill-gold drop-shadow-[0_2px_8px_rgba(201,163,106,0.4)]"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Testimonial Quote */}
                                    <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-white leading-relaxed mb-8 max-w-2xl mx-auto tracking-tight">
                                        {current.quote}
                                    </blockquote>

                                    {/* Client Details */}
                                    <div className="flex items-center justify-center gap-4">
                                        {/* Avatar with Glow Ring matching Screenshot */}
                                        <div className={`p-0.5 rounded-full ${current.ringGradient}`}>
                                            <div className="w-14 h-14 relative rounded-full overflow-hidden bg-black/40">
                                                <Image
                                                    src={current.avatar}
                                                    alt={current.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div className="text-left">
                                            <div className="font-bold text-white tracking-wide text-base md:text-lg">
                                                {current.name}
                                            </div>
                                            <div className="text-gold text-xs font-semibold tracking-widest uppercase">
                                                {current.role}
                                            </div>
                                            {current.service && (
                                                <div className="text-gray-400 text-xs mt-0.5 hidden sm:block">
                                                    {current.service}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Mobile Navigation Arrows */}
                    <div className="flex sm:hidden justify-center items-center gap-4 mt-6">
                        <button
                            onClick={prevSlide}
                            aria-label="Previous testimonial"
                            className="w-10 h-10 rounded-full bg-[#18181b] border border-white/10 text-white flex items-center justify-center active:scale-95"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextSlide}
                            aria-label="Next testimonial"
                            className="w-10 h-10 rounded-full bg-[#18181b] border border-white/10 text-white flex items-center justify-center active:scale-95"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Pagination Indicator Dots */}
                    <div className="flex justify-center items-center gap-2.5 mt-8">
                        {testimonials.map((_, index) => {
                            const isActive = index === currentIndex
                            return (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    aria-label={`Go to slide ${index + 1}`}
                                    className={`transition-all duration-300 rounded-full ${
                                        isActive
                                            ? "w-8 h-2.5 bg-gold shadow-[0_0_12px_rgba(201,163,106,0.8)]"
                                            : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
                                    }`}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
