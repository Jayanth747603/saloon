"use client"

import Link from "next/link"
import { Phone, Mail, MapPin, Send } from "lucide-react"

export default function Footer() {
    return (
        <footer id="contact" className="bg-primary text-gray-300 border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-8">

                {/* Newsletter Section */}
                <div className="bg-paper p-8 md:p-12 rounded-3xl border border-white/5 mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px]" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-3">Get 5% off through subscribe.</h3>
                            <p className="text-gray-400">Join our newsletter to receive grooming tips and exclusive offers.</p>
                        </div>

                        <form className="flex w-full relative" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full bg-primary/50 border border-white/10 rounded-full py-4 pl-6 pr-32 text-white focus:outline-none focus:border-gold/50 transition-colors placeholder:text-gray-500"
                                required
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 bg-gold hover:bg-gold-hover text-primary p-2 px-6 rounded-full font-medium transition-colors flex items-center justify-center"
                            >
                                <div className="hidden sm:block">Subscribe</div>
                                <Send className="w-4 h-4 sm:hidden" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Col */}
                    <div className="lg:col-span-1">
                        <Link href="#home" className="text-3xl font-heading font-bold tracking-wider text-white block mb-6">
                            SALONA<span className="text-gold">.</span>
                        </Link>
                        <p className="text-gray-text leading-relaxed mb-6">
                            Stay sharp stay confident – classic cuts and modern grooming.
                        </p>
                    </div>

                    {/* Links Col 1 */}
                    <div>
                        <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'About', 'Gallery', 'Services', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase()}`} className="text-gray-text hover:text-gold transition-colors block w-fit">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Col */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-semibold text-lg mb-6">Contact Us</h4>
                        <div className="space-y-4">
                            <a href="tel:+12345678900" className="flex items-start gap-4 text-gray-text hover:text-white transition-colors group">
                                <div className="bg-white/5 p-3 rounded-full group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="pt-2">+123 456 789 00</div>
                            </a>

                            <a href="mailto:info@salona.com" className="flex items-start gap-4 text-gray-text hover:text-white transition-colors group">
                                <div className="bg-white/5 p-3 rounded-full group-hover:bg-gold/10 group-hover:text-gold transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="pt-2">info@salona.com</div>
                            </a>

                            <div className="flex items-start gap-4 text-gray-text group">
                                <div className="bg-white/5 p-3 rounded-full">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="pt-2">
                                    12/A New Boston Tower<br />
                                    NYC, US
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Salona Luxury Barbershop. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
                        <Link href="/admin" className="text-gold hover:text-white transition-all font-bold border border-gold/30 px-3 py-1 rounded-lg bg-gold/5">Admin Portal</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
