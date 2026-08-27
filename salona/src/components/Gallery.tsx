"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const galleryImages = [
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2670&auto=format&fit=crop", span: "md:col-span-2 md:row-span-2", aspect: "aspect-[4/5] md:aspect-auto h-[300px] md:h-full" },
    { src: "https://images.unsplash.com/photo-1621644026880-9111cbb00af9?q=80&w=2574&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1", aspect: "aspect-square h-[300px] md:h-auto" },
    { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2670&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1", aspect: "aspect-square h-[300px] md:h-auto" },
    { src: "https://images.unsplash.com/photo-1593702275687-f8b402bf1ee5?q=80&w=2670&auto=format&fit=crop", span: "md:col-span-2 md:row-span-1", aspect: "aspect-[2/1] h-[300px] md:h-auto" },
    { src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2674&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1", aspect: "aspect-square h-[300px] md:h-auto" },
    { src: "https://images.unsplash.com/photo-1512496015851-a1dcaf6731ad?q=80&w=2574&auto=format&fit=crop", span: "md:col-span-1 md:row-span-1", aspect: "aspect-square h-[300px] md:h-auto" },
]

export default function Gallery() {
    return (
        <section id="gallery" className="py-24 bg-light text-primary">
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

                <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 auto-rows-min">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`relative overflow-hidden rounded-2xl group ${image.span} ${image.aspect}`}
                        >
                            <Image
                                src={image.src}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                            {/* Optional overlay effect */}
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
