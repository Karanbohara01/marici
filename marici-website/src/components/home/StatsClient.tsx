"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedNumber({ value, suffix = "" }: { value: string; suffix?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [displayValue, setDisplayValue] = useState("0");

    useEffect(() => {
        if (!isInView) return;

        const numericPart = value.replace(/[^0-9.]/g, "");
        const prefix = value.replace(/[0-9.]/g, "").replace("+", "");
        const hasPlus = value.includes("+");
        const hasPercent = value.includes("%");
        const targetNumber = parseFloat(numericPart);

        if (isNaN(targetNumber)) {
            setDisplayValue(value);
            return;
        }

        const duration = 2000;
        const steps = 60;
        const increment = targetNumber / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(current + increment, targetNumber);

            const isDecimal = numericPart.includes(".");
            const formatted = isDecimal
                ? current.toFixed(1)
                : Math.floor(current).toString();

            setDisplayValue(
                `${prefix}${formatted}${hasPercent ? "%" : ""}${hasPlus ? "+" : ""}${suffix}`
            );

            if (step >= steps) {
                setDisplayValue(value);
                clearInterval(timer);
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isInView, value, suffix]);

    return <span ref={ref}>{displayValue}</span>;
}

export default function StatsClient({ stats }: { stats: { value: string; label: string }[] }) {
    return (
        <section className="py-16 bg-background border-y border-slate-200 relative overflow-hidden">
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-blue-600/3 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`flex flex-col items-center lg:items-start text-center lg:text-left px-8 group cursor-default ${index !== stats.length - 1 ? "lg:border-r border-slate-200" : ""
                                }`}
                        >
                            <div className="text-[11px] font-jet-mono font-black uppercase tracking-[0.3em] text-blue-400 mb-4 group-hover:text-blue-300 transition-colors">
                                {stat.label}
                            </div>
                            <div className="text-3xl md:text-5xl font-display font-black text-foreground tracking-tighter uppercase leading-none group-hover:text-gradient transition-all duration-500">
                                <AnimatedNumber value={stat.value} />
                            </div>
                            <div className="mt-4 w-8 h-[2px] bg-blue-500/20 rounded-full group-hover:w-16 group-hover:bg-blue-500/40 transition-all duration-500"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
