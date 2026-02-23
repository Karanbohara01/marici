"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Globe, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const values = [
    {
        title: "Innovation First",
        description: "We constantly research and adopt emerging technologies to keep our clients ahead of the curve.",
        icon: Zap,
    },
    {
        title: "Client Centricity",
        description: "Your business objectives drive our engineering decisions. We measure our success solely by yours.",
        icon: Users,
    },
    {
        title: "Uncompromising Quality",
        description: "From code architecture to visual design, we maintain the highest industry standards of excellence.",
        icon: Target,
    },
    {
        title: "Global Perspective",
        description: "Operating across continents, we bring diverse insights and scalable solutions to every project.",
        icon: Globe,
    },
];

export default function AboutClient({ team }: { team: any[] }) {
    return (
        <div className="min-h-screen bg-background">
            {/* Story Section */}
            <section className="relative pt-28 pb-12 overflow-hidden bg-background border-b border-slate-200">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Our Story</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-8 text-foreground tracking-tighter uppercase"
                        >
                            Engineering for <br /><span className="text-gradient">ambition</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-400 max-w-3xl font-normal"
                        >
                            Marici Technology was founded on a singular premise: that enterprise-grade software should be as beautiful as it is powerful. We bridge the gap between complex engineering and human-centric design.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-slate-50 relative overflow-hidden border-b border-slate-200">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-label mb-8 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Principles</span>
                        </motion.div>
                        <h2 className="text-foreground mb-6 tracking-tighter uppercase">Code of Conduct<span className="text-blue-600">.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-200">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-12 transition-all hover:bg-blue-50 group bg-background ${index !== values.length - 1 ? "lg:border-r border-slate-200" : ""}`}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-200">
                                    <value.icon className="w-7 h-7" strokeWidth={1} />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-4 uppercase tracking-tighter group-hover:text-blue-600 transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-slate-500 text-base leading-relaxed font-medium">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-32 bg-background relative overflow-hidden">
                {/* Section Depth Glow */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="section-label mb-8"
                            >
                                <span></span>
                                Leadership
                            </motion.div>
                            <h2 className="text-foreground mb-6 tracking-tighter uppercase leading-[0.9]">
                                Executive <br />
                                <span className="text-gradient">Council.</span>
                            </h2>
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-slate-400 max-w-md font-medium pb-2"
                        >
                            Our leadership team brings decades of combined experience in engineering, design, and strategic operations.
                        </motion.p>
                    </div>

                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${team.length <= 2 ? 'lg:justify-center' : ''}`}>
                        {team.length > 0 ? team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group relative"
                            >
                                <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col hover:border-blue-200 transition-all duration-300">
                                    <div className="relative overflow-hidden aspect-square mb-5 rounded-xl border border-slate-100 bg-slate-100">
                                        <Image
                                            src={member.imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"}
                                            alt={member.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                        />
                                    </div>

                                    <div className="flex-grow">
                                        <div className="text-[10px] text-blue-800 font-jet-mono font-bold mb-2 uppercase tracking-widest flex items-center gap-2">
                                            <span className="w-5 h-[1px] bg-blue-800/40"></span>
                                            {member.role}
                                        </div>
                                        <h3 className="text-foreground text-base font-bold mb-2 uppercase tracking-tight">
                                            {member.name}
                                        </h3>
                                        {member.bio && (
                                            <p className="text-slate-500 text-xs leading-relaxed mb-4 font-medium line-clamp-2">
                                                {member.bio}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                                        {member.socialLinks?.linkedin && (
                                            <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-800 transition-colors">
                                                <Linkedin className="w-4 h-4" strokeWidth={1.5} />
                                            </a>
                                        )}
                                        {member.socialLinks?.twitter && (
                                            <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-800 transition-colors">
                                                <Twitter className="w-4 h-4" strokeWidth={1.5} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center py-24 text-slate-400 uppercase text-xs font-jet-mono font-black tracking-[0.4em] bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                                COUNCIL STATUS: PENDING ARCHITECTURE
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
