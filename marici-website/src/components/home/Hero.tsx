"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Mouse } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface Slide {
    _id?: string;
    title: string;
    subtitle: string;
    imageUrl?: string;
    ctaText: string;
    ctaLink: string;
}

const defaultSlides: Slide[] = [
    {
        title: "Architecting Digital Infrastructure",
        subtitle: "We engineer high-performance software systems and cloud architectures that drive the world's most innovative enterprises forward.",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
        ctaText: "Start Scaling",
        ctaLink: "/contact",
    },
    {
        title: "Precision AI & Intelligence",
        subtitle: "Unlocking business potential with advanced machine learning models and data-driven insights tailored for your enterprise.",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
        ctaText: "View Solutions",
        ctaLink: "/services/ai",
    }
];

export default function Hero({ initialSlides }: { initialSlides?: Slide[] }) {
    const slides = initialSlides && initialSlides.length > 0 ? initialSlides : defaultSlides;
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 10000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "20%" : "-20%",
            opacity: 0,
            scale: 1.1
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? "20%" : "-20%",
            opacity: 0,
            scale: 1.1
        })
    };

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900 pt-20">
            {/* Carousel Background Images */}
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={`bg-${current}`}
                    custom={direction}
                    variants={{
                        enter: { opacity: 0, scale: 1.1 },
                        center: { opacity: 0.4, scale: 1 },
                        exit: { opacity: 0, scale: 0.95 }
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 z-0"
                >
                    {slides[current].imageUrl ? (
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${slides[current].imageUrl})` }}
                        />
                    ) : (
                        <div className="absolute inset-0 bg-slate-900" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 via-slate-900/20 to-slate-900/60" />
                </motion.div>
            </AnimatePresence>

            {/* Mesh Gradients Overlay */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <motion.div
                    className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/20 rounded-full blur-[120px]"
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-full blur-[150px]"
                    animate={{
                        x: [0, -70, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.05] mix-blend-overlay"></div>
            </div>

            <div className="container mx-auto px-6 relative z-20 max-w-7xl">
                <div className="flex flex-col items-center">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={current}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 100, damping: 20 },
                                opacity: { duration: 0.8 },
                                scale: { duration: 0.8 }
                            }}
                            className="w-full flex flex-col items-center"
                        >


                            <div className="max-w-4xl text-center">
                                <h1 className="text-6xl md:text-8xl font-outfit font-black tracking-tight text-white mb-8 leading-[0.95]">
                                    {slides[current].title.split(" ").map((word, i) => (
                                        <span key={i} className={word.toLowerCase() === "digital" || word.toLowerCase() === "ai" ? "text-gradient bg-linear-to-br from-blue-400 via-indigo-400 to-violet-400" : ""}>
                                            {word}{" "}
                                        </span>
                                    ))}
                                    <span className="text-blue-500">.</span>
                                </h1>

                                <p className="text-lg md:text-xl text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
                                    {slides[current].subtitle}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Link href={slides[current].ctaLink || "#"} className="btn-primary group !bg-blue-600 hover:!bg-blue-500 border-none shadow-blue-900/40">
                                        {slides[current].ctaText}
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                    <Link href="/work" className="btn-secondary !bg-white/10 !text-white !border-white/20 hover:!bg-white/20 backdrop-blur-md">
                                        Explore Solutions
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 container mx-auto px-6 max-w-7xl pointer-events-none flex justify-between">
                <button
                    onClick={prevSlide}
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-blue-400 hover:bg-white/10 transition-all pointer-events-auto group active:scale-90 backdrop-blur-sm"
                >
                    <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
                </button>
                <button
                    onClick={nextSlide}
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-blue-400 hover:bg-white/10 transition-all pointer-events-auto group active:scale-90 backdrop-blur-sm"
                >
                    <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > current ? 1 : -1);
                            setCurrent(i);
                        }}
                        className={`h-2 transition-all duration-300 rounded-full ${i === current ? "w-12 bg-blue-500" : "w-2 bg-white/20 hover:bg-white/40"
                            }`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 scroll-indicator">
                <Mouse className="w-5 h-5 text-slate-500" strokeWidth={1.5} />
                <div className="w-[1px] h-8 bg-gradient-to-b from-slate-500 to-transparent"></div>
            </div>
        </section>
    );
}
