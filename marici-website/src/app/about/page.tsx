"use client";

import { motion } from "framer-motion";
import { Users, Target, Zap, Globe, Github, Linkedin, Twitter, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const team = [
    {
        name: "Alex Sterling",
        role: "Chief Executive Officer",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        bio: "Former VP at Fortune 500 tech firms with a vision for digital-first enterprises.",
    },
    {
        name: "Priya Patel",
        role: "Chief Technology Officer",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
        bio: "AI architect and distributed systems expert leading our core engineering teams.",
    },
    {
        name: "Marcus Johnson",
        role: "Head of Design",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
        bio: "Award-winning UX/UI designer focused on creating intuitive, human-centric interfaces.",
    },
    {
        name: "Sarah Lin",
        role: "VP of Product Strategy",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
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

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white pt-16">
            {/* Hero Section */}
            <section className="relative py-12 overflow-hidden bg-white border-b border-gray-50">


                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8"
                        >
                            <span></span>
                            Our Story
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold mb-10 leading-none text-[#254796] tracking-tighter uppercase"
                        >
                            Engineering for <br /><span className="text-[#254796]">ambition</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-800 leading-relaxed max-w-3xl font-medium"
                        >
                            Marici Technology was founded on a singular premise: that enterprise-grade software should be as beautiful as it is powerful. We bridge the gap between complex engineering and human-centric design.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-12 bg-white relative overflow-hidden border-b border-gray-50">
                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            <span></span>
                            Principles
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-bold text-[#254796] mb-6 tracking-tighter uppercase">Code of Conduct<span className="text-[#254796]">.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`p-12 transition-all hover:bg-gray-50 group bg-white ${index !== values.length - 1 ? "border-r border-gray-100" : ""}`}
                            >
                                <div className="w-12 h-12 flex items-center justify-center text-gray-500 mb-10 group-hover:text-[#254796] transition-colors">
                                    <value.icon className="w-8 h-8" strokeWidth={1} />
                                </div>
                                <h3 className="text-xl font-bold text-[#254796] mb-4 uppercase tracking-tighter hover:text-black transition-colors">
                                    {value.title}
                                </h3>
                                <p className="text-gray-800 text-base leading-relaxed font-medium">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            <span></span>
                            Leadership
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-bold text-[#254796] mb-8 tracking-tighter uppercase">
                            Executive <span className="text-[#254796]">Council.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] mb-8 border border-gray-100 grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                        className="object-cover scale-100 group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-[#254796]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-2xl font-bold text-[#254796] mb-2 uppercase tracking-tighter group-hover:text-black transition-colors">
                                    {member.name}
                                </h3>
                                <div className="text-[11px] text-gray-800 font-bold mb-6 uppercase tracking-widest">{member.role}</div>
                                <p className="text-gray-800 text-base leading-relaxed mb-6 font-medium">
                                    {member.bio}
                                </p>
                                <div className="flex gap-4">
                                    {[Linkedin, Twitter].map((Icon, idx) => (
                                        <a key={idx} href="#" className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest hover:text-black transition-colors">
                                            <Icon className="w-3 h-3" />
                                            {idx === 0 ? "LN" : "TW"}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
