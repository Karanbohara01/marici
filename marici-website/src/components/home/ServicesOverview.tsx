"use client";

import { motion, Variants } from "framer-motion";
import { MonitorSmartphone, Cpu, Brain, Database, ShieldCheck, Cloud, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "Custom Software",
        description: "Bespoke digital solutions engineered for high performance and seamless scalability.",
        icon: MonitorSmartphone,
        href: "/services/software-development",
        tag: "Core"
    },
    {
        title: "Cloud & DevOps",
        description: "Modernizing infrastructure with automated CI/CD and resilient cloud architectures.",
        icon: Cloud,
        href: "/services/cloud-devops",
        tag: "Infra"
    },
    {
        title: "AI & Intelligence",
        description: "Unlocking business potential with advanced machine learning and data-driven insights.",
        icon: Brain,
        href: "/services/ai",
        tag: "Inno"
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function ServicesOverview({ initialServices }: { initialServices?: any[] }) {
    // Only use the first 3 services for the overview to keep it clean, unless provided otherwise
    const displayServices = initialServices && initialServices.length > 0
        ? initialServices.slice(0, 3)
        : services;

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-blue-900/10 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            <span></span>
                            Our Expertise
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-outfit font-black text-white leading-tight tracking-tight uppercase">
                            Enterprise-Grade <br />
                            <span className="text-gradient">Capabilities.</span>
                        </h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link href="/services" className="btn-secondary group">
                            Full Portfolio
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {displayServices.map((service, index) => {
                        const iconMap: any = { MonitorSmartphone, Cpu, Brain, Database, ShieldCheck, Cloud };
                        let IconComponent = Cpu;
                        if (typeof service.icon === 'string' && iconMap[service.icon]) {
                            IconComponent = iconMap[service.icon];
                        } else if (typeof service.icon === 'object' || typeof service.icon === 'function') {
                            IconComponent = service.icon;
                        }

                        return (
                            <motion.div key={index} variants={itemVariants} className="group">
                                <Link
                                    href={service.href || `/services/${service.slug || service._id}`}
                                    className="block h-full glass-panel p-10 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 group"
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-10">
                                            <div className="w-14 h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-700/50">
                                                <IconComponent className="w-7 h-7" strokeWidth={1.5} />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 px-3 py-1 rounded-full bg-slate-800/30 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors border border-slate-700/30">
                                                {service.tag || "Solution"}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-outfit font-black text-white mb-4 uppercase tracking-tight group-hover:text-blue-400 transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-slate-400 text-base mb-10 leading-relaxed flex-grow font-medium">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-300 group-hover:text-blue-400 transition-all">
                                            View Solution
                                            <div className="h-px flex-1 bg-slate-800 group-hover:bg-blue-400/30 transition-all"></div>
                                            <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </section>
    );
}
