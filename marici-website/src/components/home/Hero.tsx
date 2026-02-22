"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-white pt-12">


            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                <div className="flex justify-center">
                    <div className="max-w-3xl text-center">


                        <motion.h1
                            className="text-6xl md:text-8xl font-accent font-bold tracking-tighter text-[#254796] mb-10 leading-[0.9] uppercase"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <span className="text-[#254796]">Architecting</span> <br />
                            <span className="text-[#254796]">Digital</span> Future<span className="text-[#254796]">.</span>
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl text-gray-800 mb-12 leading-relaxed max-w-xl mx-auto font-display font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            Precision-engineered solutions for the next generation of enterprise technology. We build the architecture that powers innovation.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <Link
                                href="/contact"
                                className="btn-primary w-full sm:w-auto h-12 px-10"
                            >
                                Start Project
                            </Link>
                            <Link
                                href="/work"
                                className="btn-secondary w-full sm:w-auto h-12 px-10"
                            >
                                View Work
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
