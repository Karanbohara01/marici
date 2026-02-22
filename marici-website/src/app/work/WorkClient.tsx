"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        title: "GlobalFin Enterprise Portal",
        category: "Web Engineering & Cloud",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
        slug: "globalfin-portal",
        description: "A high-performance banking dashboard handling millions of daily transactions with sub-second latency.",
        tags: ["Next.js", "Node.js", "AWS AWS"],
    },
    {
        title: "Aura Health App",
        category: "Mobile App Development",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
        slug: "aura-health",
        description: "AI-driven wellness companion tracking vital metrics and providing personalized health insights.",
        tags: ["React Native", "TensorFlow", "Firebase"],
    },
    {
        title: "Nexus Supply Chain",
        category: "Digital Transformation",
        imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
        slug: "nexus-supply",
        description: "Complete overhaul of legacy logistics systems into a modernized, real-time tracking platform.",
        tags: ["Vue.js", "Python", "GCP"],
    },
    {
        title: "RetailAI Recommendation Engine",
        category: "AI & Machine Learning",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
        slug: "retail-ai",
        description: "Deep learning models that increased e-commerce cross-sells by 45% within three months.",
        tags: ["PyTorch", "FastAPI", "PostgreSQL"],
    },
];

export default function WorkClient({ initialProjects = [] }: { initialProjects?: any[] }) {
    const displayProjects = initialProjects.length > 0 ? initialProjects : projects;
    return (
        <div className="min-h-screen bg-background pt-24 pb-32">
            {/* Header */}
            <section className="container mx-auto px-6 md:px-12 mb-20 text-center max-w-4xl">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block"
                >
                    Our Portfolio
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-heading text-5xl md:text-7xl font-bold mb-6"
                >
                    Selected Works
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-600 dark:text-slate-400"
                >
                    A showcase of our most ambitious projects, demonstrating engineering excellence and impactful design.
                </motion.p>
            </section>

            {/* Projects Grid */}
            <section className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                    {displayProjects.map((project: any, index: number) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="group"
                        >
                            <Link href={`/work/${project.slug}`} className="block">
                                {/* Image Container */}
                                <div className="relative overflow-hidden aspect-[16/10] mb-8 bg-foreground/5 border border-foreground/10 transition-all duration-500 group-hover:border-foreground/20">
                                    <Image
                                        src={project.imageUrl || project.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"}
                                        alt={project.title}
                                        fill
                                        priority={index < 2}
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-[1.01] group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-background/5 group-hover:bg-transparent transition-colors duration-500" />
                                </div>

                                {/* Content */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                                            {project.category}
                                        </span>
                                        <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                                    </div>
                                    <h2 className="text-4xl font-heading font-black tracking-tighter uppercase leading-[0.9]">
                                        {project.title}
                                    </h2>
                                    <p className="text-foreground/60 line-clamp-2 leading-relaxed font-light max-w-xl text-lg">
                                        {project.description || "Engineering digital products with precision and uncompromising design excellence."}
                                    </p>
                                    <div className="flex flex-wrap gap-4 pt-2">
                                        {(project.tags || ["Engineering", "Design", "Strategy"]).map((tag: string, i: number) => (
                                            <span key={i} className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-30 group-hover:opacity-100 transition-opacity">
                                                {tag}
                                            </span>
                                        ))}
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
