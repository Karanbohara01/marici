"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

export default function Footer({ settings }: { settings: any }) {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Company: [
            { name: "About Us", href: "/about" },
            { name: "Our Work", href: "/work" },
            { name: "Services", href: "/services" },
            { name: "Careers", href: "/careers" },
        ],
        Insights: [
            { name: "Blog", href: "/blog" },
            { name: "Case Studies", href: "/work" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
        ],
        Connect: [
            { name: "LinkedIn", href: settings?.linkedinUrl || "#", icon: Linkedin },
            { name: "Twitter", href: settings?.twitterUrl || "#", icon: Twitter },
            { name: "Instagram", href: settings?.instagramUrl || "#", icon: Instagram },
            { name: "Facebook", href: settings?.facebookUrl || "#", icon: Facebook },
        ],
    };

    return (
        <footer className="bg-white border-t border-gray-100 pt-12 pb-10 font-sans overflow-hidden relative">


            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-5">
                        <Link href="/" className="inline-block mb-10">
                            <img
                                src="/logo.png"
                                alt="Marici Technology"
                                className="h-20 w-auto object-contain"
                            />
                        </Link>
                        <h3 className="text-3xl md:text-5xl font-accent font-bold text-[#254796] leading-none tracking-tighter uppercase mb-12 max-w-sm">
                            Ready to build <br />
                            <span className="text-[#254796]">something real?</span>
                        </h3>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-4 text-black font-bold uppercase tracking-[0.2em] text-[13px] group"
                        >
                            Get in touch
                            <div className="w-12 h-[2px] bg-[#254796] group-hover:w-20 transition-all"></div>
                        </Link>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-12">
                        {Object.entries(footerLinks).map(([title, links]) => (
                            <div key={title}>
                                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#254796] mb-8 font-bold">
                                    {title}
                                </div>
                                <ul className="space-y-4">
                                    {links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-[13px] font-display font-bold uppercase tracking-wider text-gray-800 hover:text-black transition-colors flex items-center gap-1 group"
                                            >
                                                {link.name}
                                                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="font-mono text-[11px] font-bold text-gray-900 uppercase tracking-widest text-center w-full">
                        © {currentYear} Marici Technology Pvt. Ltd.
                    </div>

                </div>
            </div>
        </footer>
    );
}
