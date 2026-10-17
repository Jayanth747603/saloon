"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface GalleryImage {
    src: string
    alt: string
    span: string
    aspect: string
    label?: string
}

const galleryImages: GalleryImage[] = [
    {
        src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2670&auto=format&fit=crop",
        alt: "Client Receiving Precision Razor Shave",
        span: "md:col-span-2 md:row-span-2",
        aspect: "h-[260px] sm:h-[320px] md:h-full",
        label: "Precision Shave",
    },
    {
        src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2574&auto=format&fit=crop",
        alt: "Professional Barber Tools Flat Lay",
        span: "md:col-span-1 md:row-span-1",
        aspect: "h-[200px] sm:h-[250px] md:h-auto",
        label: "Pro Tools",
    },
    {
        src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2670&auto=format&fit=crop",
        alt: "Master Barber Cutting Hair with Scissors",
        span: "md:col-span-1 md:row-span-1",
        aspect: "h-[200px] sm:h-[250px] md:h-auto",
        label: "Scissors Cut",
    },
    {
        src: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=2670&auto=format&fit=crop",
        alt: "Luxury Vintage Barber Chair",
        span: "md:col-span-2 md:row-span-1",
        aspect: "h-[200px] sm:h-[250px] md:h-auto",
        label: "Vintage Chair",
    },
    {
        src: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=2674&auto=format&fit=crop",
        alt: "Barber Shop Mirror and Styling Station",
        span: "md:col-span-1 md:row-span-1",
        aspect: "h-[200px] sm:h-[250px] md:h-auto",
        label: "Styling Station",
    },
    {
        src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2674&auto=format&fit=crop",
        alt: "Classic Barbershop Interior with Chairs",
        span: "md:col-span-1 md:row-span-1",
        aspect: "h-[200px] sm:h-[250px] md:h-auto",
        label: "The Shop",
    },
]

export default function Gallery() {
    return (
        <section id="gallery" className="py-24 bg-light text-primary overflow-hidden w-full">
            <div className="container mx-auto px-4 md:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-gold font-semibold tracking-wider uppercase text-sm mb-4 block">
                        Portfolio
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h2>
                    <div className="w-20 h-1 bg-gold rounded-full mx-auto" />
                </motion.div>

                {/* Mobile: 2-column masonry-style grid | Desktop: bento grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-3 gap-3 md:gap-4 auto-rows-min">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className={`relative overflow-hidden rounded-2xl group ${image.span} ${image.aspect}`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                            {/* Hover overlay with label */}
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors duration-500" />
                            {image.label && (
                                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                                    <span className="inline-block text-xs font-bold uppercase tracking-widest text-gold border border-gold/40 bg-primary/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                                        {image.label}
                                    </span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
