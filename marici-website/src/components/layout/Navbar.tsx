"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar({ settings }: { settings: any }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

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
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? "bg-slate-950/80 backdrop-blur-xl border-b border-transparent py-4 border-gradient"
                : "bg-transparent border-b border-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 shrink-0">
                    <img
                        src="/logo.png"
                        alt="Marici Technology"
                        className="h-20 w-auto object-contain brightness-110"
                    />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-10 ml-16 mr-auto">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`nav-link text-[12px] font-display font-bold uppercase tracking-[0.2em] transition-colors ${pathname.startsWith(link.href)
                                ? "text-blue-400"
                                : "text-slate-300 hover:text-blue-400"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Action Buttons */}
                <div className="hidden lg:flex items-center gap-8 shrink-0">
                    <Link
                        href="/contact"
                        className={`nav-link text-[12px] font-bold uppercase tracking-[0.2em] transition-colors ${pathname === "/contact" ? "text-blue-400" : "text-slate-300 hover:text-blue-400"
                            }`}
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
                    className="lg:hidden text-white p-2 rounded-xl hover:bg-slate-800/50 transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu Content */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:hidden overflow-hidden border-t border-slate-800 bg-slate-950/98 backdrop-blur-2xl"
                    >
                        <div className="px-6 py-10 flex flex-col gap-2">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.08, duration: 0.3 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`block py-4 text-sm font-bold uppercase tracking-[0.3em] border-b border-slate-800/50 transition-colors ${pathname.startsWith(link.href) ? "text-blue-400" : "text-slate-100 hover:text-blue-400"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.08, duration: 0.3 }}
                                className="pt-4"
                            >
                                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold uppercase tracking-[0.3em] text-slate-300 hover:text-blue-400 transition-colors">Contact</Link>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (navLinks.length + 1) * 0.08, duration: 0.3 }}
                                className="pt-6"
                            >
                                <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full text-center">Start</Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
