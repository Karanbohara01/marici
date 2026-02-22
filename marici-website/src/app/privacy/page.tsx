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
            <div className="min-h-screen flex items-center justify-center bg-slate-950">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 selection:bg-blue-500/30 selection:text-white">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-blue-500 origin-left z-[110]"
                style={{ scaleX }}
            />

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 overflow-hidden bg-slate-950 border-b border-slate-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.08),transparent)] pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-10"
                        >
                            <Scale className="w-3.5 h-3.5" />
                            Security & Transparency
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] text-white tracking-tighter uppercase"
                        >
                            Privacy <br /><span className="text-gradient">Standards</span>.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl font-medium"
                        >
                            How we architect trust through precision data management and uncompromising security protocols.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-24 bg-slate-950">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                        {/* Sidebar Navigation */}
                        <aside className="lg:col-span-3 hidden lg:block">
                            <div className="sticky top-40 space-y-12">
                                <div>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-8">Navigation</h3>
                                    <nav className="space-y-4">
                                        {tocItems.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToSection(item.id)}
                                                className={`flex items-center group w-full text-left py-1 text-xs tracking-widest uppercase transition-all ${activeSection === item.id ? "text-blue-400 font-black" : "text-slate-500 hover:text-white"
                                                    }`}
                                            >
                                                <ChevronRight className={`w-3.5 h-3.5 mr-3 transition-transform ${activeSection === item.id ? "rotate-90 text-blue-400" : "group-hover:translate-x-1"
                                                    }`} />
                                                {item.title}
                                            </button>
                                        ))}
                                    </nav>
                                </div>

                                <div className="p-8 glass-panel group">
                                    <div className="w-12 h-12 bg-slate-950 rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-slate-800">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <h4 className="text-[11px] font-black text-white mb-4 uppercase tracking-widest">Need Clarity?</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium">
                                        Our security architecture lead can provide technical deep-dives into our encryption protocols.
                                    </p>
                                    <a href="mailto:privacy@maricitech.com" className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] hover:text-white transition-colors">
                                        Email DPO →
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
                                className="glass-panel p-8 md:p-20 relative overflow-hidden"
                            >
                                <div className="flex flex-wrap gap-12 mb-20 pb-16 border-b border-slate-900">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                                            <Eye className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Scope</div>
                                            <div className="text-base font-black text-white uppercase tracking-tight">Global Ops</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                                            <Globe className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Jurisdiction</div>
                                            <div className="text-base font-black text-white uppercase tracking-tight">International</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-invert prose-2xl max-w-none 
                                    prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
                                    prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-10
                                    prose-strong:text-white prose-strong:font-bold
                                    prose-li:text-slate-300 prose-li:mb-4"
                                >
                                    <ReactMarkdown
                                        components={{
                                            h2: ({ node, ...props }) => {
                                                const id = props.children?.toString().toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
                                                return <h2 id={id} className="text-4xl pt-16 pb-6 border-b border-slate-900 mb-10 mt-20" {...props} />;
                                            },
                                            h1: ({ node, ...props }) => <h1 className="text-5xl font-black mb-16" {...props} />,
                                            p: ({ node, ...props }) => <p className="font-medium text-xl text-slate-200 mb-10" {...props} />
                                        }}
                                    >
                                        {content}
                                    </ReactMarkdown>
                                </div>

                                <div className="mt-24 pt-16 border-t border-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-10">
                                    <div className="flex items-center gap-5 text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">
                                        <ShieldCheck className="w-6 h-6 text-blue-500" />
                                        Certified Security Active
                                    </div>
                                    <div className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                                        Last Verified: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                </div>

                                {/* Background glow accent */}
                                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
                            </motion.div>
                        </main>
                    </div>
                </div>
            </section>
        </div>
    );
}
