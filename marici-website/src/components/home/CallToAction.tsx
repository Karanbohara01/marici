"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Rocket } from "lucide-react";

export default function CallToAction() {
    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Animated gradient blobs */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[150px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-6 max-w-5xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="glass-panel p-12 md:p-14 text-center glow-blue-subtle"
                >
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-widest mb-10">
                        Start Your Journey
                    </div>

                    <h2 className="font-display font-black text-foreground leading-[0.95] tracking-tight uppercase mb-8">
                        Let&apos;s Build Something<br />
                        <span className="text-gradient">Exceptional</span>
                    </h2>

                    <p className="text-slate-500 max-w-2xl mx-auto mb-12 font-medium">
                        From concept to deployment, our engineering team is ready to transform your boldest ideas into high-performance digital reality.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/contact"
                            className="btn-primary group text-base px-10 py-4"
                        >
                            Get in Touch
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/work"
                            className="btn-secondary text-base px-10 py-4"
                        >
                            View Our Work
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
