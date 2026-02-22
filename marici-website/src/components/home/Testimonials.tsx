"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "Marici Technology completely transformed our legacy architecture. Their engineering team delivered a highly available, scalable system that reduced costs by 40%.",
        author: "Sarah Jenkins",
        role: "CTO, FinTech Innovators",
    },
    {
        quote: "The AI algorithms integrated into our platform by Marici have personalized our user experience dramatically, leading to a 300% increase in engagement.",
        author: "David Chen",
        role: "VP of Product, Retail Solutions",
    },
    {
        quote: "From initial concept to deployment, their team was incredibly professional. The mobile app they built is flawless, fast, and exactly what we envisioned.",
        author: "Elena Rodriguez",
        role: "Founder, HealthSync Mobile",
    },
];

export default function Testimonials({ initialTestimonials }: { initialTestimonials?: any[] }) {
    const displayTestimonials = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : testimonials;

    return (
        <section className="py-24 bg-slate-950 relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="section-label"
                        >
                            <span></span>
                            Our Impact
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-outfit font-black text-white leading-tight tracking-tight uppercase">
                            Global Trust. <br />
                            <span className="text-gradient">Real Results.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayTestimonials.map((item: any, index: number) => {
                        const authorName = item.name || item.author || "Client";
                        const quote = item.content || item.quote || "";
                        const firstChar = authorName.charAt(0);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="glass-panel p-10 flex flex-col group hover:border-blue-500/20 transition-all duration-500"
                            >
                                <div className="mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                                        <Quote className="w-5 h-5 fill-current" />
                                    </div>
                                </div>
                                <p className="text-lg text-slate-300 mb-10 leading-relaxed font-medium flex-grow">
                                    &ldquo;{quote.substring(0, 180)}{quote.length > 180 ? "..." : ""}&rdquo;
                                </p>
                                <div className="flex items-center gap-4 pt-8 border-t border-slate-800">
                                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-sm text-slate-100 uppercase shadow-xs group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-all duration-500 border border-slate-700/50">
                                        {firstChar}
                                    </div>
                                    <div>
                                        <div className="font-outfit font-black text-white uppercase tracking-tight">{authorName}</div>
                                        <div className="text-[10px] font-jet-mono font-black text-slate-500 uppercase tracking-[0.2em] mt-1">{item.role || "Executive"}</div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
