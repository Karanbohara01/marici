"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

export default function ServiceDetailsClient({ service }: { service: any }) {
    // Dynamically get the icon component
    const Icon = (LucideIcons as any)[service.icon] || LucideIcons.MonitorSmartphone;

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden border-b border-slate-200 bg-background">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <Link
                        href="/services"
                        className="inline-flex items-center text-slate-400 hover:text-blue-600 transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Back to Solutions</span>
                    </Link>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-20 h-20 bg-slate-100 backdrop-blur-xl rounded-3xl flex items-center justify-center text-blue-600 mb-12 shadow-2xl border border-slate-200"
                        >
                            <Icon className="w-10 h-10" strokeWidth={1} />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-10 tracking-tighter text-foreground uppercase leading-[0.9]"
                        >
                            {service.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-3xl"
                        >
                            {service.description}
                        </motion.p>
                    </div>
                </div>

                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* Content Section */}
            <section className="py-32 container mx-auto px-6 max-w-7xl relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="section-label mb-16 flex items-center gap-6">
                                <span className="w-16 h-[1px] bg-blue-400"></span>
                                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Core Capabilities</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {(service.capabilities && service.capabilities.length > 0
                                    ? service.capabilities
                                    : [1, 2, 3, 4]
                                ).map((item: any, i: number) => (
                                    <div key={i} className="glass-panel p-12 group hover:border-blue-500/30 transition-all duration-500">
                                        <CheckCircle2 className="w-8 h-8 text-blue-500 mb-8" />
                                        <h4 className="text-2xl font-bold text-foreground mb-6 uppercase tracking-tight">
                                            {item.title || `Enterprise Standard ${i + 1}`}
                                        </h4>
                                        <p className="text-slate-500 leading-relaxed font-medium">
                                            {item.description || "We deliver high-availability systems engineered for institutional scale and rigorous performance requirements."}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-40">
                            <div className="bg-white border border-slate-200 p-12 rounded-3xl relative overflow-hidden group shadow-sm">
                                <div className="relative z-10">
                                    <h3 className="text-4xl font-black text-foreground mb-8 uppercase tracking-tight leading-[0.9]">Ready to <br /><span className="text-blue-600">Transform?</span></h3>
                                    <p className="text-slate-500 mb-12 text-lg leading-relaxed font-medium">
                                        Consult with our engineering leads to architect your next digital leap.
                                    </p>
                                    <Link
                                        href="/contact"
                                        className="btn-primary w-full flex items-center justify-center gap-4 py-5"
                                    >
                                        Inquire Now
                                        <LucideIcons.ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                                {/* Decorative line */}
                                <div className="absolute top-0 right-0 w-24 h-[1px] bg-blue-500/50" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
