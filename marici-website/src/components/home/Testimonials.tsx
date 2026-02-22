"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "Marici Technology completely transformed our legacy architecture. Their cloud engineering team delivered a highly available, scalable system that reduced our operational costs by 40%.",
        author: "Sarah Jenkins",
        role: "CTO, FinTech Innovators",
    },
    {
        quote: "The AI algorithms integrated into our platform by Marici have personalized our user experience dramatically, leading to a 300% increase in user engagement within the first quarter.",
        author: "David Chen",
        role: "VP of Product, Global Retail Solutions",
    },
    {
        quote: "From initial concept to deployment, their team was incredibly professional. The mobile app they built is flawless, fast, and exactly what we envisioned for our clients.",
        author: "Elena Rodriguez",
        role: "Founder, HealthSync Mobile",
    },
];

export default function Testimonials({ initialTestimonials }: { initialTestimonials?: any[] }) {
    const displayTestimonials = initialTestimonials && initialTestimonials.length > 0 ? initialTestimonials : testimonials;

    return (
        <section className="py-12 bg-white relative overflow-hidden border-t border-gray-50 font-sans">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-label"
                    >
                        <span></span>
                        Validation
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-bold text-[#254796] leading-none tracking-tighter uppercase max-w-4xl">
                        Client <br />
                        <span className="text-[#254796]">Testimonials.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayTestimonials.map((item: any, index: number) => {
                        const authorName = item.name || item.author || "Client";
                        const quote = item.content || item.quote || "";
                        const firstChar = authorName.charAt(0);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-gray-100 p-12 transition-all hover:border-gray-900 group"
                            >
                                <div className="text-4xl text-[#254796] mb-8 font-serif leading-none opacity-20">"</div>
                                <p className="text-xl text-gray-800 mb-10 leading-relaxed font-medium italic">
                                    {quote}
                                </p>
                                <div className="flex items-center gap-5 pt-8 border-t border-gray-50">
                                    <div className="w-10 h-10 bg-gray-50 flex items-center justify-center font-bold text-xs text-black border border-gray-100 uppercase">
                                        {firstChar}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm text-black uppercase tracking-wider">{authorName}</div>
                                        <div className="text-[11px] font-bold text-gray-800 uppercase tracking-widest mt-1">{item.role || "Executive"}</div>
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
