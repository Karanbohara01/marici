"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight, Building, User, Edit3, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactClient() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        phone: "",
        service: "Cloud Engineering",
        message: "",
    });

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
        <div className="min-h-screen bg-white pt-20">
            {/* Header Section */}
            <section className="relative py-12 overflow-hidden bg-white border-b border-gray-50">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl text-center">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8 justify-center"
                        >
                            <span></span>
                            Project Inquiry
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold mb-10 leading-none text-[#254796] tracking-tighter uppercase"
                        >
                            Let's start <br /><span className="text-[#254796]">something</span> big.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-800 leading-relaxed max-w-2xl mx-auto font-medium"
                        >
                            Whether you're looking for a technical audit or a full-scale digital transformation, our engineering team is ready to help.
                        </motion.p>
                    </div>
                </div>
            </section>

            <section className="py-12 container mx-auto px-6 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Contact Details Panel */}
                    <div className="lg:col-span-4 space-y-16">
                        <div className="space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="text-[10px] text-gray-800 font-bold mb-4 uppercase tracking-widest flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#254796]"></div>
                                    Location
                                </div>
                                <h4 className="text-xl font-bold text-[#254796] mb-2 uppercase tracking-tighter">Kathmandu HUB</h4>
                                <p className="text-gray-800 leading-relaxed font-medium">
                                    Marici Technology Pvt. Ltd.<br />
                                    Digital District, Kathmandu, Nepal
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="group"
                            >
                                <div className="text-[10px] text-gray-800 font-bold mb-4 uppercase tracking-widest flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#254796]"></div>
                                    Direct Connect
                                </div>
                                <h4 className="text-xl font-bold text-[#254796] mb-2 uppercase tracking-tighter">Voice & Support</h4>
                                <p className="text-gray-800 leading-relaxed font-medium">
                                    +977 (000) 000-0000<br />
                                    Active: 24/7 Support
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="group"
                            >
                                <div className="text-[10px] text-gray-800 font-bold mb-4 uppercase tracking-widest flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 bg-[#254796]"></div>
                                    Email
                                </div>
                                <h4 className="text-xl font-bold text-[#254796] mb-2 uppercase tracking-tighter">Engineering</h4>
                                <p className="text-gray-800 leading-relaxed font-medium">
                                    hello@marici.tech<br />
                                    support@marici.tech
                                </p>
                            </motion.div>
                        </div>

                        <div className="p-10 border border-gray-100 bg-gray-50/50 rounded-none relative overflow-hidden">
                            <p className="text-gray-800 text-sm italic leading-relaxed mb-6 font-medium relative z-10">
                                "The level of technical expertise Marici brings is unmatched in the region. They didn't just build an app; they built our future."
                            </p>
                            <p className="text-[#254796] font-bold uppercase tracking-widest text-[10px] relative z-10">— CTO, Vertex Innovations</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-8 border border-gray-100 p-12 bg-white rounded-none">
                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center h-full text-center py-20">
                                <div className="w-16 h-16 bg-[#254796] text-white flex items-center justify-center mb-8">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h3 className="text-4xl font-bold text-[#254796] mb-6 uppercase tracking-tighter">Inquiry Received.</h3>
                                <p className="text-gray-800 text-lg mb-12 max-w-sm leading-relaxed font-medium">
                                    Our specialists will review your requirements and reach out within 24 hours.
                                </p>
                                <button
                                    onClick={() => {
                                        setStatus("idle");
                                        setFormData({ ...formData, message: "" });
                                    }}
                                    className="btn-secondary h-14"
                                >
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {status === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-6 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest mb-8 text-center"
                                    >
                                        {errorMessage}
                                    </motion.div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-black text-lg font-medium placeholder:text-gray-200"
                                            placeholder="Pratik Bhusal "
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="email" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-black text-lg font-medium placeholder:text-gray-200"
                                            placeholder="pratik@marici.tech"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-3">
                                        <label htmlFor="company" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800">Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-black text-lg font-medium placeholder:text-gray-200"
                                            placeholder="Enterprise Inc."
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label htmlFor="phone" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-black text-lg font-medium placeholder:text-gray-200"
                                            placeholder="+977"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="service" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800">Core Domain</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-black text-lg font-medium appearance-none cursor-pointer"
                                    >
                                        <option>Web & Mobile Engineering</option>
                                        <option>AI & Machine Learning</option>
                                        <option>Cloud Infrastructure</option>
                                        <option>Data Engineering</option>
                                        <option>Enterprise Architecture</option>
                                        <option>Cybersecurity</option>
                                        <option>Other Inquiry</option>
                                    </select>
                                </div>

                                <div className="space-y-3">
                                    <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-800">Project Brief</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-0 py-4 bg-transparent border-b border-gray-100 focus:border-black outline-none transition-all text-black text-lg font-medium resize-none placeholder:text-gray-200"
                                        placeholder="Outline your vision..."
                                    />
                                </div>

                                <div className="pt-8">
                                    <button
                                        type="submit"
                                        disabled={status === "loading"}
                                        className="btn-primary w-full h-16 flex items-center justify-center gap-4"
                                    >
                                        {status === "loading" ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                Send Message
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
