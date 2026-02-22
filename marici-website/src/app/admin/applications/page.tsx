"use client";

import { useState, useEffect } from "react";
import { Loader2, FileText, Download, AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ApplicationsAdmin() {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusUpdating, setStatusUpdating] = useState<string | null>(null);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/admin/applications");
            if (!res.ok) {
                if (res.status === 401) {
                    throw new Error("Unauthorized. Please log in again.");
                }
                throw new Error("Failed to fetch applications");
            }
            const data = await res.json();
            setApplications(data);
            setError("");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            setStatusUpdating(id);
            const res = await fetch("/api/admin/applications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: newStatus }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            // Update local state instead of re-fetching everything
            setApplications((apps: any[]) => apps.map((app: any) =>
                app._id === id ? { ...app, status: newStatus } : app
            ));
        } catch (err: any) {
            alert(err.message);
        } finally {
            setStatusUpdating(null);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Pending": return "bg-yellow-500 text-white";
            case "Reviewed": return "bg-blue-500 text-white";
            case "Shortlisted": return "bg-green-500 text-white";
            case "Rejected": return "bg-red-500 text-white";
            default: return "bg-gray-500 text-white";
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-black tracking-tight uppercase">Applications Management</h1>
                    <p className="text-foreground/50 mt-1">Review and manage job applications.</p>
                </div>
                <button
                    onClick={fetchApplications}
                    className="bg-foreground text-background px-4 py-2 uppercase text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-foreground/90 transition-colors hidden md:flex"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 mb-6 text-red-500 text-sm flex items-center gap-3 font-bold uppercase tracking-widest">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin opacity-20" />
                </div>
            ) : (
                <div className="flex flex-col gap-6 mt-6">
                    {applications?.map((app: any) => (
                        <div key={app._id} className="bg-background border border-foreground/10 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start group hover:border-foreground/20 transition-all gap-8">
                            <div className="flex-1 w-full">
                                <div className="flex flex-wrap items-center gap-4 mb-6">
                                    <h3 className="text-2xl font-heading font-black tracking-tight">{app.fullName}</h3>
                                    <span className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1 ${getStatusColor(app.status)}`}>
                                        {app.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-1">Position</p>
                                        <p className="text-sm font-bold uppercase tracking-wide">{app.jobId?.title || 'Unknown Position'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-1">Email</p>
                                        <p className="text-sm font-medium">
                                            <a href={`mailto:${app.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">{app.email}</a>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-1">Phone</p>
                                        <p className="text-sm font-medium">
                                            <a href={`tel:${app.phone}`} className="text-blue-600 dark:text-blue-400 hover:underline">{app.phone}</a>
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-1">Applied Date</p>
                                        <p className="text-sm font-medium opacity-80">{formatDate(app.createdAt)}</p>
                                    </div>
                                </div>

                                {app.coverLetter && (
                                    <div className="mt-8 pt-6 border-t border-foreground/5">
                                        <p className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-3">Cover Letter</p>
                                        <div className="bg-foreground/5 border-l-2 border-foreground/20 p-5 text-sm font-medium opacity-90 whitespace-pre-wrap leading-relaxed">
                                            {app.coverLetter}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col md:items-end w-full md:w-56 mt-2 md:mt-0 pt-6 md:pt-0 border-t border-foreground/10 md:border-transparent gap-4 shrink-0">
                                <div className="w-full">
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40 mb-2 block">Update Status</label>
                                    <select
                                        value={app.status}
                                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                        disabled={statusUpdating === app._id}
                                        className="w-full bg-foreground/5 border-none p-3 text-xs focus:ring-1 focus:ring-foreground transition-all font-bold tracking-widest uppercase disabled:opacity-50 cursor-pointer"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">Reviewed</option>
                                        <option value="Shortlisted">Shortlisted</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                <Link
                                    href={app.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-foreground text-background px-4 py-3 uppercase text-xs font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
                                >
                                    <FileText className="w-4 h-4" /> View Resume
                                </Link>
                            </div>
                        </div>
                    ))}
                    {applications?.length === 0 && (
                        <div className="text-center py-20 border border-dashed border-foreground/10">
                            <p className="opacity-40 uppercase text-xs font-bold tracking-widest">No applications found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
