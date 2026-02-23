"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const fallbackTestimonials = [
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
    const displayTestimonials = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : fallbackTestimonials;

    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/3 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
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
                        <h2 className="font-display font-black text-foreground leading-[0.9] tracking-tight uppercase">
                            Global Trust. <br />
                            <span className="text-gradient">Real Results.</span>
                        </h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-slate-500 max-w-md font-medium pb-2"
                    >
                        Hear from the leaders and innovators we&apos;ve partnered with to deliver transformative results.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayTestimonials.map((item: any, index: number) => {
                        const authorName = item.name || item.author || "Client";
                        const quote = item.content || item.quote || "";
                        const avatarUrl = item.avatarUrl || item.imageUrl;
                        const firstChar = authorName.charAt(0);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="glass-panel-hover p-10 flex flex-col group"
                            >
                                {/* Rating Stars */}
                                <div className="flex gap-1 mb-8">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-blue-400 fill-blue-400" />
                                    ))}
                                </div>

                                <p className="text-slate-600 mb-10 font-medium flex-grow">
                                    &ldquo;{quote.substring(0, 200)}{quote.length > 200 ? "..." : ""}&rdquo;
                                </p>

                                <div className="flex items-center gap-4 pt-8 border-t border-slate-200">
                                    {avatarUrl ? (
                                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 relative shrink-0">
                                            <Image
                                                src={avatarUrl}
                                                alt={authorName}
                                                fill
                                                sizes="48px"
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-sm text-slate-600 uppercase shadow-xs group-hover:bg-blue-100 group-hover:text-blue-600 transition-all duration-500 border border-slate-200 shrink-0">
                                            {firstChar}
                                        </div>
                                    )}
                                    <div>
                                        <div className="font-display font-black text-foreground uppercase tracking-tight">{authorName}</div>
                                        <div className="text-[10px] font-jet-mono font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{item.role || "Executive"}</div>
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
