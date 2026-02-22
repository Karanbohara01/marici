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
        <div className="min-h-screen bg-slate-950 pt-20">
            {/* Story Section */}
            <section className="relative py-20 overflow-hidden bg-slate-950 border-b border-slate-900">
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
                            className="text-6xl md:text-8xl font-bold mb-10 leading-none text-white tracking-tighter uppercase"
                        >
                            Engineering for <br /><span className="text-gradient">ambition</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-slate-300 leading-relaxed max-w-3xl font-medium"
                        >
                            Marici Technology was founded on a singular premise: that enterprise-grade software should be as beautiful as it is powerful. We bridge the gap between complex engineering and human-centric design.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-slate-950 relative overflow-hidden border-b border-slate-900">
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
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter uppercase">Code of Conduct<span className="text-blue-400">.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-900">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-12 transition-all hover:bg-slate-900/40 group bg-slate-950 ${index !== values.length - 1 ? "lg:border-r border-slate-900" : ""}`}
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-700/50">
                                    <value.icon className="w-7 h-7" strokeWidth={1} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-slate-400 text-base leading-relaxed font-medium">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-label mb-8 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Leadership</span>
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase">
                            Executive <span className="text-gradient">Council.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {team.length > 0 ? team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative overflow-hidden bg-slate-900 aspect-[4/5] mb-8 border border-slate-800 rounded-2xl shadow-premium">
                                    <Image
                                        src={member.imageUrl || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tighter group-hover:text-blue-400 transition-colors">
                                    {member.name}
                                </h3>
                                <div className="text-[10px] text-blue-400 font-jet-mono font-black mb-6 uppercase tracking-[0.2em]">{member.role}</div>
                                {member.bio && (
                                    <p className="text-slate-400 text-base leading-relaxed mb-6 font-medium line-clamp-3">
                                        {member.bio}
                                    </p>
                                )}
                                <div className="flex gap-4">
                                    {member.socialLinks?.linkedin && (
                                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-jet-mono font-bold text-slate-500 uppercase tracking-widest hover:text-blue-400 transition-colors">
                                            <Linkedin className="w-3.5 h-3.5" />
                                            LN
                                        </a>
                                    )}
                                    {member.socialLinks?.twitter && (
                                        <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-jet-mono font-bold text-slate-500 uppercase tracking-widest hover:text-blue-400 transition-colors">
                                            <Twitter className="w-3.5 h-3.5" />
                                            TW
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        )) : (
                            <div className="col-span-full text-center py-20 text-slate-600 uppercase text-xs font-jet-mono font-black tracking-[0.3em] bg-slate-900/20 rounded-2xl border border-dashed border-slate-800">
                                COUNCIL STATUS: UNAVAILABLE
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
