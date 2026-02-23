"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
        <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
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
                        <div className="absolute inset-0 bg-background" />
                    )}
                    <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/10 to-background/40" />
                </motion.div>
            </AnimatePresence>

            {/* Mesh Gradients Overlay - Simplified for speed */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
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
                                <h1 className="text-foreground mb-8">
                                    {slides[current].title.split(" ").map((word, i) => (
                                        <span key={i} className={word.toLowerCase() === "digital" || word.toLowerCase() === "ai" ? "text-gradient" : ""}>
                                            {word}{" "}
                                        </span>
                                    ))}
                                    <span className="text-blue-500">.</span>
                                </h1>

                                <p className="text-slate-600 mb-8 max-w-2xl mx-auto font-normal">
                                    {slides[current].subtitle}
                                </p>

                                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                    <Link href={slides[current].ctaLink || "#"} className="btn-primary group !bg-blue-600 hover:!bg-blue-500 border-none shadow-blue-900/40">
                                        {slides[current].ctaText}
                                    </Link>
                                    <Link href="/work" className="btn-secondary text-base px-10 py-4">
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

            {/* Scroll Indicator - Simplified */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 scroll-indicator opacity-50">
                <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
            </div>
        </section>
    );
}
