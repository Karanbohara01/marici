"use client";

import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

export default function ServiceDetailsClient({ service }: { service: any }) {
    // Dynamically get the icon component
    const Icon = (LucideIcons as any)[service.icon] || LucideIcons.MonitorSmartphone;

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden border-b border-gray-50">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <Link
                        href="/services"
                        className="inline-flex items-center text-gray-400 hover:text-[#254796] transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Back to Solutions</span>
                    </Link>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#254796] mb-10 shadow-sm border border-gray-100"
                        >
                            <Icon className="w-8 h-8" strokeWidth={1.5} />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter text-[#254796] uppercase"
                        >
                            {service.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-800 leading-relaxed font-medium"
                        >
                            {service.description}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#254796] mb-12 flex items-center gap-4">
                                <span className="w-12 h-[1px] bg-[#254796]"></span>
                                Core Capabilities
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-gray-50/50 p-10 border border-gray-100 group hover:border-[#254796] transition-all duration-500">
                                        <CheckCircle2 className="w-6 h-6 text-[#254796] mb-6" />
                                        <h4 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-tighter">Enterprise Standard {i}</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            We deliver high-availability systems engineered for institutional scale and rigorous performance requirements.
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <div className="bg-[#254796] p-12 text-white">
                                <h3 className="text-3xl font-bold mb-8 uppercase tracking-tighter leading-none">Ready to <br />Transform?</h3>
                                <p className="text-blue-100 mb-10 text-lg leading-relaxed">
                                    Consult with our engineering leads to architect your next digital leap.
                                </p>
                                <Link
                                    href="/contact"
                                    className="block w-full text-center py-5 bg-white text-[#254796] font-bold uppercase tracking-widest text-xs hover:bg-gray-100 transition-colors"
                                >
                                    Start Collaboration
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
