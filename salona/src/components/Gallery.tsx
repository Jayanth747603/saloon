"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Sparkles, Maximize2, ChevronLeft, ChevronRight, X, Calendar, Eye, Scissors } from "lucide-react"
import { useBooking } from "./BookingProvider"

interface GalleryItem {
    id: string
    src: string
    alt: string
    title: string
    category: "haircuts" | "beards" | "tools" | "lounge"
    categoryLabel: string
    tag: string
    description: string
    span: string
    aspect: string
}

const galleryItems: GalleryItem[] = [
    {
        id: "razor-shave",
        src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=1600&auto=format&fit=crop",
        alt: "Client Receiving Royal Hot Towel Shave",
        title: "Royal Straight Razor Shave",
        category: "beards",
        categoryLabel: "Beard & Shave",
        tag: "Signature Ritual",
        description: "Old-world straight edge razor shave infused with eucalyptus steam towels and cold-pressed botanical oils.",
        span: "col-span-2 sm:col-span-2 md:col-span-2 md:row-span-2",
        aspect: "h-[320px] sm:h-[380px] md:h-full min-h-[380px]",
    },
    {
        id: "skin-fade",
        src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=1600&auto=format&fit=crop",
        alt: "Master Barber Cutting Modern Fade",
        title: "Precision Zero Drop Fade",
        category: "haircuts",
        categoryLabel: "Haircuts",
        tag: "Modern Fade",
        description: "Seamless skin taper paired with a micro-textured top for effortless natural volume.",
        span: "col-span-1 sm:col-span-1 md:col-span-1 md:row-span-1",
        aspect: "h-[240px] sm:h-[280px] md:h-[280px]",
    },
    {
        id: "pro-tools",
        src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1600&auto=format&fit=crop",
        alt: "Professional Barber Tools and Scissors",
        title: "Artisan Instrument Flatlay",
        category: "tools",
        categoryLabel: "Artisan Craft",
        tag: "Pro Equipment",
        description: "Japanese forged steel shears, gold magnetic-motor clippers, and hand-turned badger bristle brushes.",
        span: "col-span-1 sm:col-span-1 md:col-span-1 md:row-span-1",
        aspect: "h-[240px] sm:h-[280px] md:h-[280px]",
    },
    {
        id: "scissor-sculpt",
        src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1600&auto=format&fit=crop",
        alt: "Master Barber Cutting Hair with Scissors",
        title: "Handcrafted Shear Work",
        category: "haircuts",
        categoryLabel: "Haircuts",
        tag: "Shear Sculpting",
        description: "Point-cutting and precision scissor-over-comb architecture tailored to individual skull profiles.",
        span: "col-span-1 sm:col-span-1 md:col-span-1 md:row-span-2",
        aspect: "h-[300px] sm:h-[340px] md:h-full min-h-[360px]",
    },
    {
        id: "shop-interior",
        src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1600&auto=format&fit=crop",
        alt: "Classic Barbershop Interior with Vintage Chairs",
        title: "The Gentlemen's Sanctuary",
        category: "lounge",
        categoryLabel: "Shop Ambiance",
        tag: "Heritage Lounge",
        description: "Hand-quilted vintage leather Belmont chairs set amidst ambient amber sconces and walnut trims.",
        span: "col-span-2 sm:col-span-2 md:col-span-2 md:row-span-1",
        aspect: "h-[240px] sm:h-[280px] md:h-[280px]",
    },
    {
        id: "beard-sculpt",
        src: "https://images.unsplash.com/photo-1512690459411-b9245aed614b?q=80&w=1600&auto=format&fit=crop",
        alt: "Beard Sculpting and Beard Oil Detailing",
        title: "Architectural Beard Shaping",
        category: "beards",
        categoryLabel: "Beard & Shave",
        tag: "Beard Sculpt",
        description: "Crisp symmetrical cheek lines, neck taper gradient, and organic argan balm hydration.",
        span: "col-span-1 sm:col-span-1 md:col-span-1 md:row-span-1",
        aspect: "h-[240px] sm:h-[280px] md:h-[280px]",
    },
    {
        id: "hot-lather",
        src: "https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?q=80&w=1600&auto=format&fit=crop",
        alt: "Hot Shaving Foam and Straight Razor",
        title: "Warm Sandalwood Lather",
        category: "beards",
        categoryLabel: "Beard & Shave",
        tag: "Warm Lather",
        description: "Whipped lather applied at exact soothing temperatures to open pores and soften follicles.",
        span: "col-span-1 sm:col-span-1 md:col-span-1 md:row-span-1",
        aspect: "h-[240px] sm:h-[280px] md:h-[280px]",
    },
    {
        id: "classic-taper",
        src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=1600&auto=format&fit=crop",
        alt: "Clean Razor Part and Classic Taper Haircut",
        title: "Executive Taper & Side Part",
        category: "haircuts",
        categoryLabel: "Haircuts",
        tag: "Executive Cut",
        description: "Clean low taper with an etched side contour and natural matte finish clay.",
        span: "col-span-1 sm:col-span-1 md:col-span-1 md:row-span-1",
        aspect: "h-[240px] sm:h-[280px] md:h-[280px]",
    },
    {
        id: "mirror-station",
        src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1600&auto=format&fit=crop",
        alt: "Barbershop Mirror and Styling Station",
        title: "Private Grooming Suite",
        category: "lounge",
        categoryLabel: "Shop Ambiance",
        tag: "Vanity Station",
        description: "High-CRI daylight balanced mirror stations ensuring absolute precision under true lighting.",
        span: "col-span-1 sm:col-span-1 md:col-span-1 md:row-span-1",
        aspect: "h-[240px] sm:h-[280px] md:h-[280px]",
    },
]

const categories = [
    { id: "all", label: "All Works" },
    { id: "haircuts", label: "Haircuts & Fades" },
    { id: "beards", label: "Beard & Shaves" },
    { id: "tools", label: "Artisan Tools" },
    { id: "lounge", label: "Shop Ambiance" },
] as const

type CategoryId = (typeof categories)[number]["id"]

export default function Gallery() {
    const { openBookingModal } = useBooking()
    const [selectedCategory, setSelectedCategory] = useState<CategoryId>("all")
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

    const filteredImages = selectedCategory === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === selectedCategory)

    const handleOpenLightbox = (index: number) => {
        setLightboxIndex(index)
    }

    const handleCloseLightbox = useCallback(() => {
        setLightboxIndex(null)
    }, [])

    const handlePrevLightbox = useCallback(() => {
        setLightboxIndex((prev) => {
            if (prev === null) return null
            return prev === 0 ? filteredImages.length - 1 : prev - 1
        })
    }, [filteredImages.length])

    const handleNextLightbox = useCallback(() => {
        setLightboxIndex((prev) => {
            if (prev === null) return null
            return prev === filteredImages.length - 1 ? 0 : prev + 1
        })
    }, [filteredImages.length])

    // Keyboard navigation for Lightbox
    useEffect(() => {
        if (lightboxIndex === null) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleCloseLightbox()
            if (e.key === "ArrowLeft") handlePrevLightbox()
            if (e.key === "ArrowRight") handleNextLightbox()
        }

        window.addEventListener("keydown", handleKeyDown)
        // Prevent background scrolling while modal is open
        document.body.style.overflow = "hidden"

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "auto"
        }
    }, [lightboxIndex, handleCloseLightbox, handlePrevLightbox, handleNextLightbox])

    const currentLightboxItem = lightboxIndex !== null ? filteredImages[lightboxIndex] : null

    return (
        <section id="gallery" className="py-24 bg-primary text-white relative overflow-hidden w-full border-t border-white/5">
            {/* Subtle background luxury lighting glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[450px] bg-gold/10 blur-[140px] rounded-full" />
            <div className="pointer-events-none absolute bottom-0 right-0 w-[500px] h-[350px] bg-gold/5 blur-[120px] rounded-full" />

            <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(201,163,106,0.15)]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Masterwork Portfolio</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white">
                        Our <span className="text-gold italic font-serif">Gallery</span>
                    </h2>
                    
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full mx-auto mb-5" />
                    
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        Step inside the world of Salona. Witness the precision, artisanal artistry, and refined aesthetic captured in every cut, shave, and detail.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
                >
                    {categories.map((cat) => {
                        const isActive = selectedCategory === cat.id
                        const count = cat.id === "all" 
                            ? galleryItems.length 
                            : galleryItems.filter(i => i.category === cat.id).length

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`relative px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                                    isActive
                                        ? "text-primary font-semibold shadow-[0_4px_20px_rgba(201,163,106,0.35)]"
                                        : "text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-gold/30"
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeFilterPill"
                                        className="absolute inset-0 bg-gold rounded-full -z-0"
                                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{cat.label}</span>
                                <span
                                    className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                                        isActive
                                            ? "bg-primary/20 text-primary font-bold"
                                            : "bg-white/10 text-gray-400"
                                    }`}
                                >
                                    {count}
                                </span>
                            </button>
                        )
                    })}
                </motion.div>

                {/* Animated Bento Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-min"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((image, index) => (
                            <motion.div
                                layout
                                key={image.id}
                                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.05,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                onClick={() => handleOpenLightbox(index)}
                                className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-gold/60 transition-all duration-500 shadow-xl hover:shadow-[0_12px_35px_rgba(201,163,106,0.22)] bg-paper ${image.span} ${image.aspect}`}
                            >
                                {/* Image */}
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />

                                {/* Ambient dark-to-transparent gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/10 group-hover:from-black/95 group-hover:via-black/50 transition-all duration-500" />

                                {/* Subtle gold tint on hover */}
                                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/10 transition-colors duration-500 pointer-events-none" />

                                {/* Top Badge & Expand Icon */}
                                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                                    <span className="text-[10px] font-bold tracking-widest uppercase text-gold bg-primary/80 backdrop-blur-md border border-gold/40 px-2.5 py-1 rounded-full shadow-sm">
                                        {image.tag}
                                    </span>
                                    <div className="w-8 h-8 rounded-full bg-primary/80 backdrop-blur-md border border-white/20 text-white group-hover:text-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 shadow-md">
                                        <Maximize2 className="w-3.5 h-3.5" />
                                    </div>
                                </div>

                                {/* Bottom Info: Title, Description, and CTA */}
                                <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-5 z-10 flex flex-col justify-end transform transition-transform duration-500">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[11px] font-medium text-gold/90 uppercase tracking-wider">
                                            {image.categoryLabel}
                                        </span>
                                    </div>

                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white group-hover:text-gold transition-colors duration-300 leading-snug mb-1">
                                        {image.title}
                                    </h3>

                                    <p className="text-xs text-gray-300/90 line-clamp-2 md:line-clamp-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden sm:block">
                                        {image.description}
                                    </p>

                                    <div className="mt-2.5 flex items-center gap-2 text-[11px] text-gold font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Eye className="w-3.5 h-3.5" />
                                        <span>Click to inspect details</span>
                                    </div>
                                </div>

                                {/* Corner gold accent tick */}
                                <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute bottom-1 right-1 w-3 h-[2px] bg-gold" />
                                    <div className="absolute bottom-1 right-1 w-[2px] h-3 bg-gold" />
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom Interactive CTA Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-paper via-white/[0.04] to-paper border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-gold/10 blur-[90px] rounded-full pointer-events-none" />
                    
                    <div className="max-w-xl">
                        <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-1">
                            Ready for your signature look?
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            Transform Your Style With Our Master Barbers
                        </h4>
                        <p className="text-gray-400 text-sm">
                            Every cut is a masterwork. Reserve your chair today for an unmatched personal grooming experience.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            onClick={() => openBookingModal()}
                            className="bg-gold hover:bg-gold-hover text-primary font-bold px-7 py-3 rounded-full text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(201,163,106,0.35)] hover:shadow-[0_6px_25px_rgba(201,163,106,0.5)] active:scale-95 flex items-center gap-2 cursor-pointer"
                        >
                            <Calendar className="w-4 h-4" />
                            <span>Book Appointment</span>
                        </button>
                        <a
                            href="#services"
                            className="bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-gold/40 font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
                        >
                            <Scissors className="w-4 h-4 text-gold" />
                            <span>View All Services</span>
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Lightbox Fullscreen Modal */}
            <AnimatePresence>
                {lightboxIndex !== null && currentLightboxItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-6 md:p-10"
                        onClick={handleCloseLightbox}
                    >
                        {/* Modal Dialog Content (Click inside won't close) */}
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.92, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-5xl w-full max-h-[92vh] bg-paper border border-white/15 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col md:flex-row"
                        >
                            {/* Close Button */}
                            <button
                                onClick={handleCloseLightbox}
                                aria-label="Close dialog"
                                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-gold hover:text-primary text-white border border-white/20 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg active:scale-90"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Canvas Container */}
                            <div className="relative w-full md:w-3/5 h-[320px] sm:h-[420px] md:h-[580px] bg-black flex items-center justify-center overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentLightboxItem.id}
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.96 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full"
                                    >
                                        <Image
                                            src={currentLightboxItem.src}
                                            alt={currentLightboxItem.alt}
                                            fill
                                            priority
                                            className="object-contain md:object-cover"
                                            sizes="(max-width: 768px) 100vw, 60vw"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Prev / Next Arrows */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handlePrevLightbox()
                                    }}
                                    aria-label="Previous image"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-gold hover:text-primary text-white border border-white/20 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg active:scale-90 z-20"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleNextLightbox()
                                    }}
                                    aria-label="Next image"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-gold hover:text-primary text-white border border-white/20 transition-all duration-200 flex items-center justify-center cursor-pointer shadow-lg active:scale-90 z-20"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>

                                {/* Photo counter indicator */}
                                <div className="absolute bottom-3 left-4 z-20 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-gray-300">
                                    {lightboxIndex + 1} / {filteredImages.length}
                                </div>
                            </div>

                            {/* Details Sidebar */}
                            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-paper border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto max-h-[300px] md:max-h-[580px]">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 border border-gold/30 px-3 py-1 rounded-full">
                                            {currentLightboxItem.tag}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">
                                            • {currentLightboxItem.categoryLabel}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                        {currentLightboxItem.title}
                                    </h3>

                                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                                        {currentLightboxItem.description}
                                    </p>

                                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 mb-6">
                                        <div className="text-xs text-gold font-semibold uppercase tracking-wider mb-1">
                                            Service Highlights
                                        </div>
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Tailored consultation, hot lather treatment, straight razor precision, premium styling products, and complimentary beverage included.
                                        </p>
                                    </div>
                                </div>

                                {/* CTA Action */}
                                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                                    <button
                                        onClick={() => {
                                            handleCloseLightbox()
                                            openBookingModal()
                                        }}
                                        className="w-full bg-gold hover:bg-gold-hover text-primary font-bold py-3.5 px-6 rounded-2xl text-sm transition-all duration-300 shadow-[0_4px_20px_rgba(201,163,106,0.3)] hover:shadow-[0_6px_25px_rgba(201,163,106,0.45)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        <span>Book This Style</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
