"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, Save, X } from "lucide-react";

type Testimonial = {
    _id: string;
    name: string;
    role: string;
    content: string;
    avatarUrl: string;
    order: number;
};

export default function TestimonialsAdmin() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        content: "",
        avatarUrl: "",
        order: 0,
    });

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/testimonials");
            const data = await res.json();
            setTestimonials(data);
        } catch (error) {
            console.error("Failed to fetch testimonials", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleOpenForm = (t?: Testimonial) => {
        if (t) {
            setEditingId(t._id);
            setFormData({
                name: t.name,
                role: t.role,
                content: t.content,
                avatarUrl: t.avatarUrl,
                order: t.order,
            });
        } else {
            setEditingId(null);
            setFormData({ name: "", role: "", content: "", avatarUrl: "", order: 0 });
        }
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/testimonials/${editingId}` : "/api/testimonials";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsFormOpen(false);
                fetchTestimonials();
            }
        } catch (error) {
            console.error("Failed to save testimonial", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        try {
            await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
            fetchTestimonials();
        } catch (error) {
            console.error("Failed to delete testimonial", error);
        }
    };

    return (
        <div>
            <div className="sm:flex sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Manage Testimonials</h1>
                <button
                    onClick={() => handleOpenForm()}
                    className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Testimonial
                </button>
            </div>

            {isFormOpen && (
                <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {editingId ? "Edit Testimonial" : "New Testimonial"}
                        </h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-500">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Role/Company</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={formData.avatarUrl}
                                        onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Order</label>
                                <div className="mt-1">
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label className="block text-sm font-medium text-gray-700">Testimonial Content</label>
                                <div className="mt-1">
                                    <textarea
                                        rows={4}
                                        required
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                                <Save className="-ml-1 mr-2 h-5 w-5" />
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                </div>
            ) : (
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t) => (
                        <div key={t._id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col p-6">
                            <div className="flex items-center space-x-4 mb-4">
                                <img src={t.avatarUrl} alt={t.name} className="h-12 w-12 rounded-full object-cover bg-gray-100" />
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">{t.name}</h3>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 flex-1 italic">"{t.content}"</p>
                            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs text-gray-400">Order: {t.order}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleOpenForm(t)}
                                        className="p-1.5 rounded-full text-indigo-600 hover:bg-indigo-50"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(t._id)}
                                        className="p-1.5 rounded-full text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {testimonials.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No testimonials found. Add one to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
