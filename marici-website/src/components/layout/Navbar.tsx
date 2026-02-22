"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronRight } from "lucide-react";

export default function Navbar({ settings }: { settings: any }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [mobileMenuOpen]);

    const navLinks = [
        { name: "Services", href: "/services" },
        { name: "Portfolio", href: "/work" },
        { name: "Insights", href: "/blog" },
        { name: "About", href: "/about" },
    ];

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    return (
        <>
            <header
                className={`fixed top-0 w-full z-50 transition-all duration-500 navbar-glow ${scrolled
                    ? "bg-slate-950/80 backdrop-blur-xl border-b border-transparent border-gradient scrolled py-3"
                    : "bg-transparent border-b border-transparent py-5"
                    }`}
            >
                <div className="container mx-auto px-6 flex items-center justify-between max-w-7xl">
                    {/* Logo with smooth size transition */}
                    <Link href="/" className="flex items-center gap-3 shrink-0 group">
                        <motion.img
                            src="/logo.png"
                            alt="Marici Technology"
                            className="w-auto object-contain brightness-110 transition-all duration-500"
                            style={{ height: scrolled ? 56 : 72 }}
                        />
                    </Link>

                    {/* Desktop Nav — glass pill */}
                    <nav className="hidden lg:flex items-center ml-12 mr-auto">
                        <div className="nav-glass-pill flex items-center gap-1 px-2 py-1.5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`nav-link relative flex items-center gap-2 px-5 py-2 text-[12px] font-display font-bold uppercase tracking-[0.2em] rounded-xl transition-all duration-300 ${isActive(link.href)
                                        ? "text-blue-400 bg-blue-500/[0.08]"
                                        : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                                        }`}
                                >
                                    {/* Active dot indicator */}
                                    {isActive(link.href) && (
                                        <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                            <span className="absolute w-1.5 h-1.5 rounded-full bg-blue-400 pulse-dot" />
                                        </span>
                                    )}
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </nav>

                    {/* Desktop Action Buttons */}
                    <div className="hidden lg:flex items-center gap-6 shrink-0">
                        <Link
                            href="/contact"
                            className={`nav-link text-[12px] font-bold uppercase tracking-[0.2em] transition-colors ${isActive("/contact") ? "text-blue-400" : "text-slate-300 hover:text-white"
                                }`}
                        >
                            Contact
                        </Link>
                        <Link
                            href="/services"
                            className="btn-cta group"
                        >
                            Get Started
                            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden relative z-50 text-white p-2.5 rounded-xl hover:bg-white/10 transition-all duration-300"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {mobileMenuOpen ? (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Menu className="w-6 h-6" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>
                </div>
            </header>

            {/* Full-Screen Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="mobile-nav-overlay grid-bg"
                    >
                        {/* Spacer for the fixed header */}
                        <div className="h-24 shrink-0" />

                        {/* Nav Links — centered */}
                        <div className="flex-1 flex flex-col justify-center px-8 -mt-12">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{
                                        delay: index * 0.08,
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={`group flex items-center justify-between py-5 text-2xl font-display font-bold tracking-wide transition-all duration-300 ${isActive(link.href)
                                            ? "text-blue-400 mobile-link-active"
                                            : "text-slate-100 hover:text-white hover:translate-x-2"
                                            }`}
                                    >
                                        <span className="flex items-center gap-4">
                                            {isActive(link.href) && (
                                                <span className="w-2 h-2 rounded-full bg-blue-400 pulse-dot" />
                                            )}
                                            {link.name}
                                        </span>
                                        <ChevronRight className={`w-5 h-5 transition-all duration-300 ${isActive(link.href)
                                            ? "text-blue-400 opacity-100"
                                            : "text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-slate-400"
                                            }`} />
                                    </Link>
                                    {index < navLinks.length - 1 && (
                                        <div className="h-px bg-gradient-to-r from-slate-800 via-slate-700/50 to-transparent" />
                                    )}
                                </motion.div>
                            ))}

                            {/* Contact link */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.08, duration: 0.4 }}
                                className="mt-2"
                            >
                                <div className="h-px bg-gradient-to-r from-slate-800 via-slate-700/50 to-transparent mb-2" />
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`group flex items-center justify-between py-5 text-2xl font-display font-bold tracking-wide transition-all duration-300 ${isActive("/contact")
                                        ? "text-blue-400 mobile-link-active"
                                        : "text-slate-100 hover:text-white hover:translate-x-2"
                                        }`}
                                >
                                    <span className="flex items-center gap-4">
                                        {isActive("/contact") && (
                                            <span className="w-2 h-2 rounded-full bg-blue-400 pulse-dot" />
                                        )}
                                        Contact
                                    </span>
                                    <ChevronRight className={`w-5 h-5 transition-all duration-300 ${isActive("/contact")
                                        ? "text-blue-400 opacity-100"
                                        : "text-slate-600 opacity-0 group-hover:opacity-100"
                                        }`} />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Bottom CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (navLinks.length + 1) * 0.08, duration: 0.4 }}
                            className="px-8 pb-10 shrink-0"
                        >
                            <Link
                                href="/services"
                                onClick={() => setMobileMenuOpen(false)}
                                className="btn-cta w-full text-center justify-center py-4 text-sm"
                            >
                                Get Started
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <p className="text-center text-slate-500 text-xs mt-4 tracking-wide">
                                Building the future, one pixel at a time
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
