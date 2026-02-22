"use client";

import { motion, Variants } from "framer-motion";
import { MonitorSmartphone, Cpu, Brain, Database, ShieldCheck, Cloud, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
    {
        title: "Custom Software Development",
        description: "End-to-end software solutions tailored to your business needs, built with modern tech stacks for scalability.",
        icon: MonitorSmartphone,
        href: "/services/software-development",
    },
    {
        title: "Cloud & DevOps",
        description: "Seamless cloud migration, infrastructure optimization, and automated CI/CD pipelines to accelerate your delivery.",
        icon: Cloud,
        href: "/services/cloud-devops",
    },
    {
        title: "AI & Machine Learning",
        description: "Intelligent AI models and data-driven insights to automate processes and unlock new business capabilities.",
        icon: Brain,
        href: "/services/ai",
    },
    {
        title: "Data Engineering",
        description: "Robust data pipelines and analytics platforms to help you make informed decisions across your organization.",
        icon: Database,
        href: "/services/data-engineering",
    },
    {
        title: "Enterprise Architecture",
        description: "Strategic technology consulting to align your IT infrastructure with your long-term business goals.",
        icon: Cpu,
        href: "/services/architecture",
    },
    {
        title: "Cybersecurity Services",
        description: "Comprehensive security audits, compliance, and threat protection to safeguard your digital assets.",
        icon: ShieldCheck,
        href: "/services/security",
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ServicesOverview({ initialServices }: { initialServices?: any[] }) {
    const displayServices = initialServices && initialServices.length > 0 ? initialServices : services;

    return (
        <section className="py-12 bg-white relative overflow-hidden border-t border-gray-50">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-label"
                    >
                        <span></span>
                        Expertise
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold text-[#254796] leading-none tracking-tighter uppercase max-w-4xl">
                        Precision-engineered <br />
                        <span className="text-[#254796]">capabilities.</span>
                    </h2>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                            <motion.div key={index} variants={itemVariants}>
                                <Link
                                    href={service.href || `/services/${service.slug || service._id}`}
                                    className="group block h-full bg-white border border-gray-100 p-12 rounded-none hover:border-gray-900 transition-all duration-300 relative"
                                >
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="w-12 h-12 flex items-center justify-center text-gray-500 mb-10 group-hover:text-[#254796] transition-colors">
                                            <IconComponent className="w-8 h-8" strokeWidth={1} />
                                        </div>

                                        <h3 className="text-2xl font-bold text-[#254796] mb-4 uppercase tracking-tighter group-hover:text-black transition-colors">
                                            {service.title}
                                        </h3>

                                        <p className="text-gray-800 text-base mb-10 leading-relaxed flex-grow font-medium">
                                            {service.description}
                                        </p>

                                        <div className="flex items-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800 group-hover:text-black transition-colors">
                                            View Solution
                                            <span className="w-6 h-[1px] bg-gray-200 ml-4 origin-left transition-all group-hover:w-10 group-hover:bg-[#254796]"></span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>

                <div className="mt-8 border-t border-gray-50 pt-8 flex justify-end items-center">
                    <Link href="/services" className="inline-flex items-center gap-4 text-black font-bold uppercase tracking-widest text-[11px] group">
                        Explore Full Stack
                        <div className="w-12 h-[2px] bg-[#254796] group-hover:w-20 transition-all"></div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
