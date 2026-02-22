"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
    {
        title: "Global FinTech Platform",
        category: "Enterprise Architecture",
        description: "Architected a high-frequency trading platform handling $2B+ daily volume with sub-millisecond latency on a distributed hybrid cloud.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        tags: ["Distributed Systems", "Go", "Kafka", "AWS"],
        href: "/work/fintech-platform",
        featured: true,
    },
    {
        title: "AI Healthcare Assistant",
        category: "Machine Learning",
        description: "Developed a HIPAA-compliant generative AI diagnostic tool reducing physician documentation time by 45%.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
        tags: ["LLM", "Python", "TensorFlow", "Azure Health"],
        href: "/work/health-ai",
    },
    {
        title: "Supply Chain Analytics Dashboard",
        category: "Data Engineering",
        description: "Built a real-time data warehouse and BI interface processing millions of IoT events per second across global logistics networks.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        tags: ["Snowflake", "React", "Node.js", "IoT"],
        href: "/work/supply-chain",
    },
    {
        title: "E-Commerce Microservices Migration",
        category: "Cloud Engineering",
        description: "Successfully strangled a monolithic legacy application into 50+ microservices yielding 99.999% uptime during Black Friday.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
        tags: ["Kubernetes", "Docker", "Java Spring", "GCP"],
        href: "/work/ecommerce",
    },
];

export default function WorkClient() {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Header Section */}
            <section className="relative py-12 overflow-hidden bg-white border-b border-gray-50">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8"
                        >
                            <span></span>
                            Case Studies
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold mb-10 leading-none text-[#254796] tracking-tighter uppercase"
                        >
                            Engineering <br /><span className="text-[#254796]">excellence</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-800 leading-relaxed max-w-3xl font-medium"
                        >
                            Explore how we've solved complex technical challenges for the world's most ambitious organizations.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="container mx-auto px-6 max-w-7xl py-12 pb-16">
                <div className="space-y-12">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link
                                href={project.href}
                                className="group flex flex-col lg:flex-row bg-white border border-gray-100 rounded-none overflow-hidden hover:border-black transition-all duration-500"
                            >
                                <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-[550px] overflow-hidden bg-gray-50 grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover scale-100 group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-[#254796]/5 group-hover:opacity-0 transition-opacity" />
                                </div>

                                <div className="lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                                    <div className="mb-10 flex items-center justify-between">
                                        <div className="text-[11px] text-gray-800 font-bold uppercase tracking-widest">{project.category}</div>
                                    </div>

                                    <h2 className="text-4xl lg:text-6xl font-bold text-[#254796] mb-8 tracking-tighter group-hover:text-black transition-colors leading-[0.9] uppercase">
                                        {project.title}
                                    </h2>

                                    <p className="text-gray-800 text-lg leading-relaxed mb-10 font-medium">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-12">
                                        {project.tags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                className="px-3 py-1 bg-gray-50 text-gray-800 text-[11px] font-bold uppercase tracking-widest border border-gray-100 group-hover:border-blue-100 group-hover:text-[#254796] transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex items-center gap-4 text-gray-800 font-bold uppercase tracking-[0.2em] text-[11px] group-hover:text-black transition-colors">
                                        Read Case Study
                                        <div className="w-10 h-[1px] bg-gray-200 group-hover:w-16 group-hover:bg-black transition-all"></div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
