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
        <main className="min-h-screen bg-white pt-20">
            {/* Header Section */}
            <section className="relative py-12 overflow-hidden bg-white border-b border-gray-50">
                <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="section-label mb-8"
                        >
                            <span></span>
                            Join the Mission
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold mb-10 leading-none text-[#254796] tracking-tighter uppercase"
                        >
                            Build the <span className="text-[#254796]">future</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-800 leading-relaxed max-w-3xl font-medium"
                        >
                            We're looking for architects, engineers, and visionaries ready to redefine what's possible in enterprise technology.
                        </motion.p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 max-w-7xl py-12 pb-12">
                <div className="space-y-4">
                    {careers.map((job, index) => (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="group bg-white border border-gray-100 p-8 md:p-10 rounded-none hover:border-black transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
                                <div className="space-y-6">
                                    <div className="flex flex-wrap items-center gap-6 text-[11px] text-gray-800 font-bold uppercase tracking-widest">
                                        <span className="bg-gray-50 px-3 py-1 border border-gray-100">{job.department}</span>
                                        <span className="flex items-center gap-2 text-gray-800"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                        <span className="flex items-center gap-2 text-gray-800"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-[#254796] group-hover:text-black transition-colors uppercase leading-none">
                                        {job.title}
                                    </h2>
                                    <p className="text-gray-800 text-lg leading-relaxed max-w-3xl font-medium">
                                        {job.description}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleOpenModal(job)}
                                    className="btn-primary whitespace-nowrap px-10 h-16 flex items-center justify-center gap-4"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {careers.length === 0 && (
                    <div className="py-40 text-center border border-dashed border-gray-100">
                        <Briefcase className="w-12 h-12 text-gray-200 mx-auto mb-6" strokeWidth={1} />
                        <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest">No active vacancies.</h3>
                        <p className="text-gray-600 mt-2 text-[10px] uppercase font-bold">Positions will be listed soon</p>
                    </div>
                )}

                <div className="mt-12 p-10 md:p-16 bg-white border border-gray-100 rounded-none relative overflow-hidden group">
                    <div className="relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-2xl">
                            <h3 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-[#254796] uppercase leading-none">Unlisted <br /><span className="text-[#254796]">roles.</span></h3>
                            <p className="text-xl text-gray-800 mb-0 leading-relaxed font-medium">
                                Exceptional talent doesn't always wait for an opening. If you believe your skills can accelerate our mission, connect with us directly.
                            </p>
                        </div>

                        <a href="mailto:careers@marici.com" className="btn-secondary h-16 px-12 flex items-center justify-center gap-4 group/btn">
                            General Inquiry
                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl border border-gray-100"
                        >
                            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 md:p-8 flex items-center justify-between z-10">
                                <div>
                                    <h2 className="text-2xl md:text-4xl font-bold tracking-tighter text-[#254796] uppercase leading-none mb-2">Apply for Position</h2>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{selectedJob?.title} — {selectedJob?.location}</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-50 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 md:p-8">
                                {submitted ? (
                                    <div className="py-20 text-center space-y-6">
                                        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                                            <CheckCircle2 className="w-10 h-10 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold tracking-tighter text-[#254796] uppercase mb-4">Application Sent!</h3>
                                            <p className="text-gray-600 font-medium max-w-md mx-auto">
                                                Thank you for your interest in joining Marici. Our team will review your profile and get back to you soon.
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="btn-primary px-12 h-14"
                                        >
                                            Close Window
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                    className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black transition-all font-medium"
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black transition-all font-medium"
                                                    placeholder="example@email.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block">Phone Number</label>
                                                <input
                                                    required
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black transition-all font-medium"
                                                    placeholder="+977 98XXXXXXXX"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block">Resume (PDF)</label>
                                                <div className="relative">
                                                    <input
                                                        required
                                                        type="file"
                                                        accept=".pdf,.doc,.docx"
                                                        onChange={(e) => setResume(e.target.files?.[0] || null)}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                    />
                                                    <div className="w-full bg-gray-50 border-none p-4 text-sm flex items-center justify-between text-gray-500 font-medium">
                                                        <span>{resume ? resume.name : "Choose file..."}</span>
                                                        <Upload className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 block">Cover Letter / Note</label>
                                            <textarea
                                                rows={4}
                                                value={formData.coverLetter}
                                                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                                                className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black transition-all font-medium resize-none"
                                                placeholder="Tell us why you're a great fit..."
                                            />
                                        </div>

                                        {error && (
                                            <p className="text-red-500 text-xs font-bold uppercase tracking-widest bg-red-50 p-4 border border-red-100 flex items-center gap-3">
                                                <X className="w-4 h-4" /> {error}
                                            </p>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="btn-primary w-full h-16 flex items-center justify-center gap-4 text-lg"
                                        >
                                            {submitting ? (
                                                <>
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Submitting...
                                                </>
                                            ) : (
                                                <>
                                                    Submit Application
                                                    <ArrowRight className="w-5 h-5" />
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
