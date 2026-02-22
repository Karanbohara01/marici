"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar({ settings }: { settings: any }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Portfolio", href: "/work" },
        { name: "Insights", href: "/blog" },
        { name: "About", href: "/about" },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/95 border-b border-gray-100 py-4"
                : "bg-transparent border-b border-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 shrink-0">
                    <img
                        src="/logo.png"
                        alt="Marici Technology"
                        className="h-20 w-auto object-contain"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8 ml-16 mr-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-[12px] font-display font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-colors relative group"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Action Buttons */}
                <div className="hidden lg:flex items-center gap-8 shrink-0">
                    <Link
                        href="/contact"
                        className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-600 hover:text-black transition-colors"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/services"
                        className="btn-primary"
                    >
                        Start
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-black"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Content */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="lg:hidden absolute top-full left-0 w-full border-t border-gray-100 bg-white shadow-2xl"
                    >
                        <div className="px-6 py-10 flex flex-col gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900 border-b border-gray-50 pb-4"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/contact" className="text-sm font-bold uppercase tracking-[0.3em] text-gray-600">Contact</Link>
                            <Link href="/services" className="btn-primary w-full text-center">Start</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
