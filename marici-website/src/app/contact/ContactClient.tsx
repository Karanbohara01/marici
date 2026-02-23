"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, Building, User, Edit3, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContactClient({ settings }: { settings: any }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "Cloud Engineering",
        message: "",
    });

    // ... rest of state and handlers ...
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus("success");
            } else {
                throw new Error(result.error || "Failed to submit form");
            }
        } catch (error: any) {
            console.error("Submission error:", error);
            setStatus("error");
            setErrorMessage(error.message || "An unexpected error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-background">
            {/* Header Section */}
            <section className="relative pt-28 pb-12 overflow-hidden bg-background border-b border-slate-200">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl text-center">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8 justify-center flex items-center gap-4 mx-auto"
                        >
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Project Inquiry</span>
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mb-8 text-foreground tracking-tighter uppercase leading-[0.95]"
                        >
                            Let's start <br /><span className="text-gradient">something</span> big.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-slate-500 leading-relaxed max-w-2xl mx-auto font-medium"
                        >
                            Whether you're looking for a technical audit or a full-scale digital transformation, our engineering team is ready to help.
                        </motion.p>
                    </div>
                </div>
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            </section>

            <section className="py-24 container mx-auto px-6 max-w-7xl relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Contact Details Panel */}
                    <div className="lg:col-span-4 space-y-16">
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="text-[11px] text-slate-400 font-bold mb-6 uppercase tracking-[0.2em] flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    Location
                                </div>
                                <h4 className="text-base font-bold text-foreground mb-3 uppercase tracking-tight">Kathmandu HUB</h4>
                                <p className="text-slate-500 leading-relaxed font-medium text-sm">
                                    Marici Technology Pvt. Ltd.<br />
                                    {settings?.address || "Digital District, Kathmandu, Nepal"}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="group"
                            >
                                <div className="text-[11px] text-slate-400 font-bold mb-6 uppercase tracking-[0.2em] flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    Direct Connect
                                </div>
                                <h4 className="text-base font-bold text-foreground mb-3 uppercase tracking-tight">Voice & Support</h4>
                                <p className="text-slate-500 leading-relaxed font-medium text-sm">
                                    {settings?.phone || "+977 (000) 000-0000"}<br />
                                    {settings?.whatsappNumber ? `WhatsApp: ${settings.whatsappNumber}` : "Active: 24/7 Support"}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="group"
                            >
                                <div className="text-[11px] text-slate-400 font-bold mb-6 uppercase tracking-[0.2em] flex items-center gap-4">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    Email
                                </div>
                                <h4 className="text-base font-bold text-foreground mb-3 uppercase tracking-tight">Engineering</h4>
                                <p className="text-slate-500 leading-relaxed font-medium text-sm">
                                    {settings?.email || "hello@marici.tech"}<br />
                                    support@marici.tech
                                </p>
                            </motion.div>
                        </div>

                        <div className="p-12 glass-panel relative overflow-hidden group">
                            <p className="text-slate-600 text-lg italic leading-relaxed mb-8 font-medium relative z-10">
                                "The level of technical expertise Marici brings is unmatched in the region. They didn't just build an app; they built our future."
                            </p>
                            <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[11px] relative z-10">— CTO, Vertex Innovations</p>
                            {/* Decorative accent */}
                            <div className="absolute top-0 right-0 w-2 h-full bg-blue-500/20" />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8 glass-panel p-12 md:p-16 relative">
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-24">
                                <div className="w-24 h-24 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-full flex items-center justify-center mb-10">
                                    <CheckCircle2 className="w-12 h-12" />
                                </div>
                                <h3 className="text-foreground mb-6 uppercase tracking-tighter">Inquiry Received.</h3>
                                <p className="text-slate-500 mb-10 max-w-sm leading-relaxed font-medium">
                                    Our specialists will review your requirements and reach out within 24 hours.
                                </p>
                                <button
                                    onClick={() => {
                                        setStatus("idle");
                                        setFormData({ ...formData, message: "" });
                                    }}
                                    className="btn-secondary px-12 h-16"
                                >
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-12">
                                {status === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-6 bg-red-400/5 border border-red-400/20 text-red-400 text-[11px] font-bold uppercase tracking-widest mb-10 text-center rounded-xl"
                                    >
                                        {errorMessage}
                                    </motion.div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-0 py-4 bg-transparent border-b border-slate-300 focus:border-blue-500 outline-none transition-all text-foreground text-sm font-medium placeholder:text-slate-300"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-0 py-4 bg-transparent border-b border-slate-300 focus:border-blue-500 outline-none transition-all text-foreground text-sm font-medium placeholder:text-slate-300"
                                            placeholder="john@marici.tech"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-4">
                                        <label htmlFor="company" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-0 py-4 bg-transparent border-b border-slate-300 focus:border-blue-500 outline-none transition-all text-foreground text-sm font-medium placeholder:text-slate-300"
                                            placeholder="Enterprise Inc."
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-0 py-4 bg-transparent border-b border-slate-300 focus:border-blue-500 outline-none transition-all text-foreground text-sm font-medium placeholder:text-slate-300"
                                            placeholder="+977"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label htmlFor="service" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Core Domain</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-0 py-4 bg-transparent border-b border-slate-300 focus:border-blue-500 outline-none transition-all text-foreground text-sm font-medium appearance-none cursor-pointer"
                                    >
                                        <option className="bg-slate-900">Web & Mobile Engineering</option>
                                        <option className="bg-slate-900">AI & Machine Learning</option>
                                        <option className="bg-slate-900">Cloud Infrastructure</option>
                                        <option className="bg-slate-900">Data Engineering</option>
                                        <option className="bg-slate-900">Enterprise Architecture</option>
                                        <option className="bg-slate-900">Cybersecurity</option>
                                        <option className="bg-slate-900">Other Inquiry</option>
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Project Brief</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-0 py-4 bg-transparent border-b border-slate-300 focus:border-blue-500 outline-none transition-all text-foreground text-sm font-medium resize-none placeholder:text-slate-300"
                                        placeholder="Outline your vision..."
                                    />
                                </div>

                                <div className="pt-10">
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="btn-primary w-full flex items-center justify-center gap-3 group"
                                    >
                                        {status === "loading" ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            <>
                                                Send Message
                                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                        {/* Decorative background glow */}
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
                    </div>
                </div>
            </section>
        </div>
    );
}
