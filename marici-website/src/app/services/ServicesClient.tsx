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
        <div className="min-h-screen bg-white pt-20">
            {/* Header Section */}
            <section className="relative py-12 overflow-hidden bg-white border-b border-gray-50">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-[#254796]"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#254796]">Solutions Portfolio</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-8xl font-bold mb-10 tracking-tighter text-[#254796] leading-none uppercase"
                        >
                            Enterprise <br /><span className="text-[#254796]">capabilities</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl md:text-2xl text-gray-800 leading-relaxed max-w-2xl font-medium"
                        >
                            We combine deep technical expertise with strategic vision to deliver solutions that drive measurable business transformation.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Services List */}
            <section className="py-12 container mx-auto px-6 max-w-7xl relative z-20 pb-24">
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
                                    className="group block h-full bg-white border border-gray-100 p-12 rounded-none hover:border-black transition-all duration-500 relative overflow-hidden shadow-sm hover:shadow-xl"
                                >
                                    <div className="relative z-10 h-full flex flex-col">
                                        <div className="w-12 h-12 flex items-center justify-center text-gray-400 mb-10 group-hover:text-[#254796] transition-colors">
                                            <Icon className="w-8 h-8" strokeWidth={1} />
                                        </div>

                                        <h2 className="text-3xl font-bold text-[#254796] mb-6 uppercase tracking-tighter group-hover:text-black transition-colors">
                                            {service.title}
                                        </h2>

                                        <p className="text-gray-800 text-lg leading-relaxed mb-10 flex-grow font-medium">
                                            {service.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-12">
                                            {features.map((feature: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-gray-50 text-gray-800 text-[11px] font-bold uppercase tracking-widest border border-gray-100 group-hover:border-blue-100 group-hover:text-[#254796] transition-colors">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4 text-gray-800 font-bold uppercase tracking-[0.2em] text-[11px] group-hover:text-black transition-colors">
                                            Explore Solution
                                            <div className="w-10 h-[1px] bg-gray-200 group-hover:w-16 group-hover:bg-black transition-all"></div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}

                    {initialServices.length === 0 && (
                        <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 italic text-gray-400">
                            No services currently listed. Update from Admin dashboard.
                        </div>
                    )}
                </motion.div>
            </section>
        </div>
    );
}
