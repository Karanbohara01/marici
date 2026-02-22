"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Globe, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";

const team = [
    {
        name: "Alex Sterling",
        role: "Chief Executive Officer",
        imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        bio: "Former VP at Fortune 500 tech firms with a vision for digital-first enterprises.",
    },
    {
        name: "Priya Patel",
        role: "Chief Technology Officer",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        bio: "AI architect and distributed systems expert leading our core engineering teams.",
    },
    {
        name: "Marcus Johnson",
        role: "Head of Design",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
        bio: "Award-winning UX/UI designer focused on creating intuitive, human-centric interfaces.",
    },
    {
        name: "Sarah Lin",
        role: "VP of Product Strategy",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
        bio: "Product visionary translating complex market needs into elegant digital solutions.",
    },
];

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

export default function AboutClient({ initialTeam = [] }: { initialTeam?: any[] }) {
    const displayTeam = initialTeam.length > 0 ? initialTeam : team;

    return (
        <div className="min-h-screen bg-background pt-24 pb-32">
            {/* Hero Section */}
            <section className="container mx-auto px-6 md:px-12 mb-32">
                <div className="max-w-4xl">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block"
                    >
                        About Marici Technology
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-heading text-5xl md:text-7xl font-bold mb-8 leading-[1.1]"
                    >
                        Architecting the next <br className="hidden md:block" />
                        generation of <span className="text-gradient">digital experiences.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-light"
                    >
                        Founded on the principle that exceptional technology requires exceptional design. We are a collective of engineers, designers, and strategists building scalable software for ambitious brands worldwide.
                    </motion.p>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-24 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="mb-16">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-foreground/10">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-12 border-r border-b border-foreground/10"
                            >
                                <div className="w-12 h-12 flex items-center justify-center text-foreground mb-12">
                                    <value.icon className="w-8 h-8" strokeWidth={1} />
                                </div>
                                <h3 className="text-xs font-bold tracking-[0.3em] uppercase mb-6 opacity-40">
                                    0{index + 1} / {value.title}
                                </h3>
                                <p className="text-lg leading-relaxed font-light opacity-70">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-32 bg-background">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="text-center max-w-2xl mx-auto mb-20">
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Leadership Team
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Meet the visionaries driving our technical excellence and operational strategy.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-y md:divide-y-0 border-t border-b border-l border-r border-foreground/10">
                        {displayTeam.map((member: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="group p-10 flex flex-col justify-between h-[500px]"
                            >
                                <div>
                                    <h3 className="text-3xl font-heading font-black tracking-tighter mb-2 group-hover:opacity-40 transition-opacity">
                                        {member.name}
                                    </h3>
                                    <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-50 mb-8">{member.role}</p>
                                </div>

                                <div className="relative aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src={member.imageUrl || member.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 25vw"
                                        className="object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                                    />
                                </div>

                                <p className="mt-8 text-sm opacity-60 leading-relaxed font-light line-clamp-2">
                                    {member.bio || "Building the next generation of software with precision and dedication."}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
