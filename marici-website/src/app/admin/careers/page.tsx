"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, AlertCircle, Loader2 } from "lucide-react";

export default function CareersAdmin() {
    const [jobs, setJobs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<any>(null);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        department: "",
        location: "",
        type: "Full-time",
        description: "",
        requirements: "",
        status: "Open"
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const res = await fetch("/api/careers");
            const data = await res.json();
            setJobs(data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch jobs");
            setLoading(false);
        }
    };

    const handleOpenModal = (job: any = null) => {
        if (job) {
            setEditingJob(job);
            setFormData({
                ...job,
                requirements: (job as any).requirements ? (job as any).requirements.join("\n") : ""
            });
        } else {
            setEditingJob(null);
            setFormData({
                title: "",
                slug: "",
                department: "",
                location: "",
                type: "Full-time",
                description: "",
                requirements: "",
                status: "Open"
            });
        }
        setIsModalOpen(true);
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError("");

        const submissionData = {
            ...formData,
            requirements: formData.requirements.split("\n").map(line => line.trim()).filter(line => line !== "")
        };

        try {
            const url = editingJob ? `/api/careers/${editingJob._id}` : "/api/careers";
            const method = editingJob ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            if (!res.ok) throw new Error("Failed to save job");

            await fetchJobs();
            setIsModalOpen(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this job?")) return;

        try {
            const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete job");
            await fetchJobs();
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <>
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-heading font-black tracking-tight uppercase">Careers Management</h1>
                        <p className="text-foreground/50 mt-1">Manage job openings and opportunities.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-foreground text-background px-6 py-2 uppercase text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-foreground/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> New Position
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin opacity-20" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {jobs.map((job: any) => (
                            <div key={job._id} className="bg-background border border-foreground/10 p-6 flex justify-between items-center group hover:border-foreground/20 transition-all">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-heading font-black tracking-tight uppercase">{job.title}</h3>
                                        <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 ${job.status === 'Open' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                            {job.status}
                                        </span>
                                    </div>
                                    <div className="flex gap-4 text-xs font-bold tracking-widest uppercase opacity-40">
                                        <span>{job.department}</span>
                                        <span>/</span>
                                        <span>{job.location}</span>
                                        <span>/</span>
                                        <span>{job.type}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(job)}
                                        className="p-2 hover:bg-foreground/5 transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(job._id)}
                                        className="p-2 hover:bg-red-500/10 text-red-500 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {jobs.length === 0 && (
                            <div className="text-center py-20 border border-dashed border-foreground/10">
                                <p className="opacity-40 uppercase text-xs font-bold tracking-widest">No positions found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                    <div className="bg-background border border-foreground/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-8 border-b border-foreground/10 flex justify-between items-center sticky top-0 bg-background z-10">
                            <h2 className="text-2xl font-heading font-black tracking-tight uppercase">
                                {editingJob ? "Edit Position" : "Create Position"}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="opacity-40 hover:opacity-100 transition-opacity">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 p-4 text-red-500 text-sm flex items-center gap-3 font-bold uppercase tracking-widest">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    {error}
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Job Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all uppercase font-medium"
                                        placeholder="e.g. Senior Software Engineer"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Slug</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                        className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all font-medium"
                                        placeholder="url-friendly-slug"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Department</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                        className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all uppercase font-medium"
                                        placeholder="e.g. Engineering"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Location</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all uppercase font-medium"
                                        placeholder="e.g. Kathmandu, Nepal"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Job Type</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all font-medium"
                                    >
                                        <option value="Full-time">Full-time</option>
                                        <option value="Part-time">Part-time</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Remote">Remote</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all font-medium"
                                    >
                                        <option value="Open">Open</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Job Description</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all font-light resize-none h-32"
                                    placeholder="Brief summary of the role..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Requirements (One per line)</label>
                                <textarea
                                    required
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                    className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all font-light resize-none h-48"
                                    placeholder="Requirement 1&#10;Requirement 2&#10;Requirement 3..."
                                />
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-foreground text-background px-12 py-4 uppercase text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-foreground/90 transition-all disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {editingJob ? "Update Position" : "Create Position"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
