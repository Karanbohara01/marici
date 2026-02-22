"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Loader2, FileText } from "lucide-react";

export default function TermsOfServicePage() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                if (data && data.termsOfService) {
                    setContent(data.termsOfService);
                } else {
                    setContent("# Terms of Service\n\nWelcome to Marici Technology. Our terms of service are currently being updated. By continuing to use our platform, you agree to abide by our professional standards of conduct.");
                }
            } catch (error) {
                console.error("Failed to fetch terms of service", error);
            }
            setLoading(false);
        };
        fetchSettings();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-24">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden bg-slate-950 border-b border-slate-900">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Legal Architecture</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] text-white tracking-tighter uppercase"
                        >
                            Terms <br /><span className="text-gradient">Of Service</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-slate-300 leading-relaxed max-w-3xl font-medium"
                        >
                            The framework for our professional partnership and shared engineering standards.
                        </motion.p>
                    </div>
                </div>
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            </section>

            {/* Content Section */}
            <section className="py-32 bg-slate-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-invert prose-2xl max-w-none 
                            prose-headings:text-white prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black
                            prose-p:text-slate-300 prose-p:font-medium prose-p:leading-relaxed
                            prose-li:text-slate-300 prose-li:font-medium
                            prose-strong:text-white prose-strong:font-bold
                            prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-100"
                    >
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-32 pt-12 border-t border-slate-900 flex items-center gap-6 text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]"
                    >
                        <FileText className="w-5 h-5 text-blue-500" />
                        LATEST REVISION: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
