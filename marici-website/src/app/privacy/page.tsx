"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Loader2, ShieldCheck, ChevronRight, Scale, Lock, Eye, Globe } from "lucide-react";

export default function PrivacyPolicyPage() {
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("");
    const contentRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                if (data && data.privacyPolicy) {
                    setContent(data.privacyPolicy);
                } else {
                    setContent("# Privacy Policy\n\nCommitment to your privacy is a core value at Marici Technology. Our privacy policy is currently being updated. Please check back soon.");
                }
            } catch (error) {
                console.error("Failed to fetch privacy policy", error);
            }
            setLoading(false);
        };
        fetchSettings();
    }, []);

    // Extract headings for Table of Contents
    const tocItems = content
        .split("\n")
        .filter(line => line.startsWith("## "))
        .map(line => ({
            title: line.replace("## ", "").replace(/^\d+\.\s*/, ""),
            id: line.replace("## ", "").toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-")
        }));

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="h-10 w-10 text-[#254796] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] selection:bg-[#254796] selection:text-white">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-[#254796] origin-left z-50"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 overflow-hidden bg-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#eef2ff,transparent)] pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#254796] text-[10px] font-bold uppercase tracking-widest mb-8"
                        >
                            <Scale className="w-3 h-3" />
                            Legal Transparency
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] text-gray-900 tracking-tighter uppercase"
                        >
                            Privacy <br /><span className="text-[#254796]">Standards</span>.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl font-light"
                        >
                            How we architect trust through precision data management and uncompromising security protocols.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Sidebar Navigation */}
                        <aside className="lg:col-span-3 hidden lg:block">
                            <div className="sticky top-32 space-y-8">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Documentation</h3>
                                    <nav className="space-y-1">
                                        {tocItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToSection(item.id)}
                                                className={`flex items-center group w-full text-left py-2 text-sm transition-all ${activeSection === item.id ? "text-[#254796] font-bold" : "text-gray-500 hover:text-gray-900"
                                                    }`}
                                            >
                                                <ChevronRight className={`w-3 h-3 mr-2 transition-transform ${activeSection === item.id ? "rotate-90 text-[#254796]" : "group-hover:translate-x-1"
                                                    }`} />
                                                {item.title}
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-[#254796] mb-4">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-tight">Need Clarity?</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed mb-4 font-medium">
                                        Our legal engineering lead can provide technical deep-dives into our encryption and storage architectures.
                                    </p>
                                    <a href="mailto:privacy@maricitech.com" className="text-xs font-bold text-[#254796] uppercase tracking-widest hover:underline">
                                        Email DPO
                                    </a>
                                </div>
                            </div>
                        </aside>

                        {/* Content Card */}
                        <main className="lg:col-span-9">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-3xl border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)] p-8 md:p-16"
                            >
                                <div className="flex flex-wrap gap-8 mb-16 pb-12 border-b border-gray-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#254796]">
                                            <Eye className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Scope</div>
                                            <div className="text-sm font-bold text-gray-900">Global Operations</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                                            <Globe className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Jurisdiction</div>
                                            <div className="text-sm font-bold text-gray-900">International Law</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-lg prose-blue max-w-none 
                                    prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tighter prose-headings:uppercase
                                    prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-8
                                    prose-strong:text-gray-900 prose-strong:font-bold
                                    prose-li:text-gray-600 prose-li:mb-2"
                                >
                                    <ReactMarkdown
                                        components={{
                                            h2: ({ node, ...props }) => {
                                                const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                                                return <h2 id={id} className="text-3xl pt-8 pb-4 border-b border-gray-50 mb-8 mt-16" {...props} />;
                                            },
                                            h1: ({ node, ...props }) => <h1 className="text-4xl mb-12" {...props} />,
                                            p: ({ node, ...props }) => <p className="font-medium text-lg text-gray-700 mb-8" {...props} />
                                        }}
                                    >
                                        {content}
                                    </ReactMarkdown>
                                </div>

                                <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-4 text-gray-400 font-mono text-[10px] uppercase tracking-[0.2em]">
                                        <ShieldCheck className="w-5 h-5" />
                                        Certified Security Protocols Active
                                    </div>
                                    <div className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                                        Last Verified: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                </div>
                            </motion.div>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}
