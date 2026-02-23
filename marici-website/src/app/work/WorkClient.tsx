"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2, Sparkles, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Project = {
    _id: string;
    title: string;
    slug: string;
    category: string;
    imageUrl: string;
    link: string;
    order: number;
    description?: string;
    tags?: string[];
};

export default function WorkClient() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <section className="relative pt-32 pb-12 overflow-hidden bg-background border-b border-slate-200">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, 20, 0],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[150px]"
                        animate={{
                            x: [0, -40, 0],
                            y: [0, -30, 0],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Portfolio of Excellence</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="mb-10 text-foreground tracking-tight uppercase"
                        >
                            Engineering <br />
                            <span className="text-gradient">Innovations</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-slate-500 max-w-2xl font-medium"
                        >
                            Architecting robust solutions that solve critical technical challenges
                            for enterprises worldwide.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="container mx-auto px-6 max-w-7xl py-12 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id || index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                href={project.link || "#"}
                                className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-blue-200 hover:shadow-md transition-all duration-300"
                            >
                                {/* Project Image */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                                    <Image
                                        src={project.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop"}
                                        alt={project.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <div className="px-3 py-1 rounded-lg bg-slate-950/75 backdrop-blur-sm flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-5">
                                    <h2 className="text-base font-bold text-foreground uppercase tracking-tight mb-2 group-hover:text-blue-800 transition-colors">
                                        {project.title}
                                    </h2>

                                    {project.description && (
                                        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                                            {project.description}
                                        </p>
                                    )}

                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.tags.slice(0, 4).map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-2 py-1 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wide"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-blue-800 pt-3 border-t border-slate-100">
                                        View Project
                                        <ArrowRight className="w-3.5 h-3.5 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-slate-50 border-t border-slate-200 border-dashed relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                    <h3 className="text-foreground mb-10 tracking-tight uppercase leading-none">
                        Ready to build your <br />
                        <span className="text-gradient">next breakthrough?</span>
                    </h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link href="/contact" className="btn-primary">
                            Inquire Now
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/services" className="btn-secondary">
                            Our Solutions
                        </Link>
                    </div>
                </div>
                {/* Background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            </section>
        </div>
    );
}

