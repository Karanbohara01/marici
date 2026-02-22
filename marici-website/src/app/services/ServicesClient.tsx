"use client";

import { motion, Variants } from "framer-motion";
import { MonitorSmartphone, Cpu, Brain, Database, ShieldCheck, Cloud, Code, BarChart, Server } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const allServices = [
    {
        title: "Web & Mobile Engineering",
        description: "High-performance, scalable web applications and intuitive mobile apps built with modern frameworks like Next.js, React Native, and Flutter. We focus on delivering progressive web apps and native applications that provide seamless user experiences across all devices.",
        icon: MonitorSmartphone,
        href: "/services/engineering",
        features: ["Custom Web Apps", "iOS & Android Development", "PWA Strategy"]
    },
    {
        title: "AI & Machine Learning",
        description: "Intelligent solutions that drive business value. From predictive analytics to generative AI, automating workflows and enhancing decision making. We integrate LLMs and computer vision to turn your data into a strategic asset.",
        icon: Brain,
        href: "/services/ai",
        features: ["Generative AI Models", "Predictive Analytics", "NLP Integration"]
    },
    {
        title: "Cloud Infrastructure",
        description: "Resilient cloud architectures on AWS, Azure, and GCP. Guaranteeing high availability, auto-scaling, and secure data sovereignty. We manage complete migrations and optimize cloud spend while ensuring 99.99% uptime.",
        icon: Cloud,
        href: "/services/cloud",
        features: ["Cloud Migration", "DevOps & CI/CD", "Cost Optimization"]
    },
    {
        title: "Data Engineering & Analytics",
        description: "Scalable data pipelines, warehousing, and analytics solutions to uncover actionable insights from your enterprise data. We build robust ETL processes and beautiful BI dashboards.",
        icon: Database,
        href: "/services/data",
        features: ["Data Warehousing", "Real-time Processing", "Business Intelligence"]
    },
    {
        title: "Enterprise Architecture",
        description: "Microservices, API gateways, and distributed systems designed for massive scale and future-proof extensibility. Transform legacy monoliths into agile, independent services.",
        icon: Cpu,
        href: "/services/architecture",
        features: ["Microservices Design", "API Development", "Legacy Modernization"]
    },
    {
        title: "Cybersecurity & Compliance",
        description: "End-to-end security audits, DevSecOps integration, and robust compliance architectures protecting your digital assets against modern threats.",
        icon: ShieldCheck,
        href: "/services/security",
        features: ["Penetration Testing", "Compliance Auditing", "Zero Trust Architecture"]
    },
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

export default function ServicesClient({ initialServices = [] }: { initialServices?: any[] }) {
    const displayServices = initialServices.length > 0 ? initialServices : allServices;

    const IconMapping: Record<string, any> = {
        MonitorSmartphone, Cpu, Brain, Database, ShieldCheck, Cloud, Server, BarChart, Code
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-32">
            {/* Header Section */}
            <section className="relative py-20 overflow-hidden bg-primary dark:bg-slate-950 text-white rounded-b-[3rem] mx-4 md:mx-12 mb-20 shadow-xl">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                <div className="container mx-auto px-6 md:px-12 relative z-10 text-center max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
                    >
                        Digital Capabilities. <br />
                        <span className="text-gradient">Engineered for Scale.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed"
                    >
                        We combine deep technical expertise with strategic vision to deliver solutions that drive measurable business transformation.
                    </motion.p>
                </div>
            </section>

            {/* Services List */}
            <section className="container mx-auto px-6 md:px-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10"
                >
                    {displayServices.map((service: any, index: number) => {
                        const Icon = IconMapping[service.icon] || MonitorSmartphone;
                        const features = service.features || ["Custom Solutions", "Expert Implementation", "Dedicated Support"];
                        return (
                            <motion.div key={index} variants={itemVariants}>
                                <div className="group h-full flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-colors duration-500" />

                                    <div className="relative z-10 flex-grow">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center text-primary dark:text-accent group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-slate-100 dark:border-slate-800/50">
                                                <Icon className="w-8 h-8" strokeWidth={1.5} />
                                            </div>
                                        </div>

                                        <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-6 group-hover:text-accent transition-colors">
                                            {service.title}
                                        </h2>

                                        <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-lg">
                                            {service.description}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-10">
                                            {features.map((feature: string, i: number) => (
                                                <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded-full font-medium">
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative z-10 pt-8 border-t border-slate-100 dark:border-slate-800 mt-auto">
                                        <Link
                                            href={service.href || `/services`}
                                            className="inline-flex items-center gap-2 font-semibold text-primary dark:text-white group-hover:text-accent transition-colors"
                                        >
                                            Explore Service details
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </section>
        </div>
    );
}
