"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Clock, Briefcase, X, Upload, Loader2, CheckCircle2 } from "lucide-react";

export default function CareersClient({ careers }: { careers: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
    });
    const [resume, setResume] = useState<File | null>(null);

    const handleOpenModal = (job: any) => {
        setSelectedJob(job);
        setIsModalOpen(true);
        setSubmitted(false);
        setError("");
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            coverLetter: "",
        });
        setResume(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!resume) {
            setError("Please upload your resume");
            return;
        }

        setSubmitting(true);
        setError("");

        try {
            const data = new FormData();
            data.append("jobId", selectedJob._id);
            data.append("fullName", formData.fullName);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("coverLetter", formData.coverLetter);
            data.append("resume", resume);

            const res = await fetch("/api/applications", {
                method: "POST",
                body: data,
            });

            if (!res.ok) {
                const result = await res.json();
                throw new Error(result.message || "Failed to submit application");
            }

            setSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-950 pt-20">
            {/* Header Section */}
            <section className="relative py-20 overflow-hidden bg-slate-950 border-b border-slate-900">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8 flex items-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Join the Mission</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-10 leading-[0.9] text-white tracking-tighter uppercase"
                        >
                            Build the <span className="text-gradient">future</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-slate-300 leading-relaxed max-w-3xl font-medium"
                        >
                            We're looking for architects, engineers, and visionaries ready to redefine what's possible in enterprise technology.
                        </motion.p>
                    </div>
                </div>
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
            </section>

            <div className="container mx-auto px-6 max-w-7xl py-20 pb-32">
                <div className="space-y-6">
                    {careers.map((job, index) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group glass-panel p-10 md:p-12 hover:border-blue-500/30 transition-all duration-300"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
                                <div className="space-y-8">
                                    <div className="flex flex-wrap items-center gap-8 text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                                        <span className="bg-slate-800/50 px-4 py-1.5 border border-slate-700/50 rounded-lg text-blue-400">{job.department}</span>
                                        <span className="flex items-center gap-2.5"><MapPin className="w-4 h-4 text-blue-500" /> {job.location}</span>
                                        <span className="flex items-center gap-2.5"><Clock className="w-4 h-4 text-blue-500" /> {job.type}</span>
                                    </div>
                                    <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors uppercase leading-none">
                                        {job.title}
                                    </h2>
                                    <p className="text-slate-400 text-lg leading-relaxed max-w-3xl font-medium">
                                        {job.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleOpenModal(job)}
                                    className="btn-primary whitespace-nowrap px-12 h-18 flex items-center justify-center gap-6 group/btn"
                                >
                                    Apply for Role
                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {careers.length === 0 && (
                    <div className="py-40 text-center border border-dashed border-slate-800 rounded-3xl bg-slate-900/10">
                        <Briefcase className="w-12 h-12 text-slate-800 mx-auto mb-8" strokeWidth={1} />
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">No active vacancies.</h3>
                        <p className="text-slate-600 mt-4 text-[11px] uppercase font-bold tracking-widest">Positions will be listed soon</p>
                    </div>
                )}

                <div className="mt-20 p-12 md:p-20 bg-slate-900/40 border border-slate-800 rounded-3xl relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="max-w-2xl text-center lg:text-left">
                            <h3 className="text-5xl md:text-7xl font-black tracking-tighter mb-10 text-white uppercase leading-none">Unlisted <br /><span className="text-gradient">roles.</span></h3>
                            <p className="text-xl text-slate-300 mb-0 leading-relaxed font-medium">
                                Exceptional talent doesn't always wait for an opening. If you believe your skills can accelerate our mission, connect with us directly.
                            </p>
                        </div>

                        <a href="mailto:careers@marici.com" className="btn-secondary h-18 px-16 flex items-center justify-center gap-6 group/btn">
                            General Inquiry
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </a>
                    </div>
                    {/* Background accent */}
                    <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
                </div>
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 shadow-3xl border border-slate-800 rounded-3xl flex flex-col"
                        >
                            <div className="sticky top-0 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 p-8 md:p-10 flex items-center justify-between z-10">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase leading-none mb-4">Apply for Position</h2>
                                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-400">{selectedJob?.title} — {selectedJob?.location}</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-full transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 md:p-12">
                                {submitted ? (
                                    <div className="py-24 text-center space-y-10">
                                        <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto border border-blue-500/20">
                                            <CheckCircle2 className="w-12 h-12 text-blue-500" />
                                        </div>
                                        <div>
                                            <h3 className="text-4xl font-black tracking-tighter text-white uppercase mb-6">Application Sent!</h3>
                                            <p className="text-slate-400 font-medium max-w-md mx-auto text-lg leading-relaxed">
                                                Thank you for your interest in joining Marici. Our team will review your profile and get back to you soon.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="btn-primary px-16 h-16"
                                        >
                                            Return to Careers
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-12">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 block">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-base text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium placeholder:text-slate-700"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 block">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-base text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium placeholder:text-slate-700"
                                                    placeholder="example@email.com"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 block">Phone Number</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-base text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium placeholder:text-slate-700"
                                                    placeholder="+977 98XXXXXXXX"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 block">Resume (PDF)</label>
                                                <div className="relative">
                                                    <input
                                                        required
                                                        type="file"
                                                        accept=".pdf"
                                                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-base flex items-center justify-between text-slate-400 font-medium">
                                                        <span className="truncate pr-4">{resume ? resume.name : "Choose PDF file..."}</span>
                                                        <Upload className="w-5 h-5 flex-shrink-0 text-blue-500" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 block">Cover Letter / Note</label>
                                            <textarea
                                                rows={6}
                                                value={formData.coverLetter}
                                                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-5 text-base text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all font-medium resize-none placeholder:text-slate-700"
                                                placeholder="Tell us why you're a great fit for this specific challenge..."
                                            />
                                        </div>

                                        {error && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-red-400 text-xs font-bold uppercase tracking-widest bg-red-400/5 p-5 border border-red-400/20 rounded-xl flex items-center gap-4"
                                            >
                                                <X className="w-5 h-5" /> {error}
                                            </motion.p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="btn-primary w-full h-18 flex items-center justify-center gap-6 text-xl"
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="w-6 h-6 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Application
                                                    <ArrowRight className="w-6 h-6" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
