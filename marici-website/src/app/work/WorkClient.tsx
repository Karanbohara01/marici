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
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950">
            {/* Header Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-950">
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
                            className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] text-white tracking-tight uppercase"
                        >
                            Engineering <br />
                            <span className="text-gradient">Innovations</span>.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl font-medium"
                        >
                            Architecting robust solutions that solve critical technical challenges
                            for enterprises worldwide.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="container mx-auto px-6 max-w-7xl py-12 pb-32">
                <div className="grid grid-cols-1 gap-24">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project._id || index}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                href={project.link || "#"}
                                className="group flex flex-col lg:flex-row gap-12 lg:gap-20"
                            >
                                {/* Project Image Container */}
                                <div className="lg:w-3/5 relative aspect-[16/10] lg:aspect-auto lg:h-[600px] overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 shadow-premium group-hover:shadow-2xl transition-all duration-700">
                                    <Image
                                        src={project.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"}
                                        alt={project.title}
                                        fill
                                        className="object-cover scale-100 group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-700" />

                                    {/* Project Badge */}
                                    <div className="absolute top-8 left-8 z-20">
                                        <div className="px-5 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 shadow-xl flex items-center gap-2.5">
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                            <span className="text-[10px] font-jet-mono font-black uppercase tracking-[0.2em] text-white">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hover Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-transform duration-500">
                                            <ExternalLink className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>

                                {/* Project Content */}
                                <div className="lg:w-2/5 flex flex-col justify-center py-4">
                                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 tracking-tight group-hover:text-blue-400 transition-colors leading-[1.1] uppercase">
                                        {project.title}
                                    </h2>

                                    {project.description && (
                                        <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium">
                                            {project.description}
                                        </p>
                                    )}

                                    {project.tags && project.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2.5 mb-12">
                                            {project.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-4 py-1.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-slate-400 text-[10px] font-jet-mono font-black uppercase tracking-widest group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center gap-4 text-[11px] font-jet-mono font-black uppercase tracking-[0.4em] text-slate-300 group-hover:text-blue-400 transition-colors group">
                                        Exploration
                                        <div className="h-px w-12 bg-slate-800 group-hover:w-20 group-hover:bg-blue-400 transition-all duration-500"></div>
                                        <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 bg-slate-900/50 border-t border-slate-900 border-dashed relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight uppercase leading-none">
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

