"use client";

import { motion, Variants } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import { ArrowRight, MonitorSmartphone } from "lucide-react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ServicesClient({ initialServices = [] }: { initialServices?: any[] }) {
    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <section className="relative pt-28 pb-12 overflow-hidden bg-background border-b border-slate-200">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Solutions Portfolio</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-10 text-foreground tracking-tighter uppercase"
                        >
                            Enterprise <br /><span className="text-gradient">capabilities</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-500 max-w-2xl font-medium"
                        >
                            We combine deep technical expertise with strategic vision to deliver solutions that drive measurable business transformation.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section className="py-20 container mx-auto px-6 max-w-7xl relative z-20 pb-32">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                >
                    {initialServices.map((service: any, index: number) => {
                        const Icon = (LucideIcons as any)[service.icon] || MonitorSmartphone;
                        const features = service.features || ["Institutional Scale", "Edge Architecture", "Secure Data"];

                        return (
                            <motion.div key={index} variants={itemVariants} className="h-full">
                                <Link
                                    href={`/services/${service.slug}`}
                                    className="group block h-full bg-white border border-slate-200 p-12 rounded-2xl hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-premium"
                                >
                                    <div className="relative z-10 h-full flex flex-col">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-200">
                                            <Icon className="w-7 h-7" strokeWidth={1} />
                                        </div>

                                        <h2 className="text-foreground mb-6 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                                            {service.title}
                                        </h2>

                                        <p className="text-slate-500 leading-relaxed mb-10 flex-grow font-medium">
                                            {service.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2.5 mb-12">
                                            {features.map((feature: string, i: number) => (
                                                <span key={i} className="px-4 py-1.5 rounded-xl bg-slate-100 text-slate-500 text-[10px] font-jet-mono font-black uppercase tracking-widest border border-slate-200 group-hover:border-blue-500/20 group-hover:text-blue-600 transition-all">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4 text-slate-400 font-bold uppercase tracking-[0.2em] text-[11px] group-hover:text-blue-600 transition-colors">
                                            Explore Solution
                                            <div className="w-10 h-[1px] bg-slate-200 group-hover:w-16 group-hover:bg-blue-400 transition-all"></div>
                                            <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}

                    {initialServices.length === 0 && (
                        <div className="col-span-full py-40 text-center border-2 border-dashed border-slate-800 rounded-2xl italic text-slate-500 font-jet-mono uppercase tracking-widest text-xs">
                            No solutions identified. Verify architecture status.
                        </div>
                    )}
                </motion.div>
            </section>
        </div>
    );
}
