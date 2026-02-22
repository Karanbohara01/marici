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
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
        );
    }

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
                            Legal
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold mb-10 leading-none text-[#254796] tracking-tighter uppercase"
                        >
                            Terms <br /><span className="text-[#254796]">Of Service</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-800 leading-relaxed max-w-3xl font-medium"
                        >
                            The framework for our professional partnership.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="prose prose-lg prose-blue max-w-none 
                            prose-headings:text-[#254796] prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-bold
                            prose-p:text-gray-800 prose-p:font-medium
                            prose-li:text-gray-800 prose-li:font-medium
                            prose-strong:text-black prose-strong:font-bold"
                    >
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 pt-10 border-t border-gray-100 flex items-center gap-4 text-gray-400 font-mono text-xs uppercase tracking-widest"
                    >
                        <FileText className="w-5 h-5" />
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
