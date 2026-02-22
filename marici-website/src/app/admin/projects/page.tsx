"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, Save, X } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

type Project = {
    _id: string;
    title: string;
    slug: string;
    category: string;
    imageUrl: string;
    link: string;
    order: number;
};

export default function ProjectsAdmin() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "",
        imageUrl: "",
        link: "",
        order: 0,
    });

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleOpenForm = (project?: Project) => {
        if (project) {
            setEditingId(project._id);
            setFormData({
                title: project.title,
                slug: project.slug,
                category: project.category,
                imageUrl: project.imageUrl,
                link: project.link,
                order: project.order,
            });
        } else {
            setEditingId(null);
            setFormData({ title: "", slug: "", category: "", imageUrl: "", link: "", order: 0 });
        }
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsFormOpen(false);
                fetchProjects();
            }
        } catch (error) {
            console.error("Failed to save project", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            await fetch(`/api/projects/${id}`, { method: "DELETE" });
            fetchProjects();
        } catch (error) {
            console.error("Failed to delete project", error);
        }
    };

    return (
        <div>
            <div className="sm:flex sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Manage Projects</h1>
                <button
                    onClick={() => handleOpenForm()}
                    className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Project
                </button>
            </div>

            {isFormOpen && (
                <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {editingId ? "Edit Project" : "New Project"}
                        </h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-500">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Slug</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={formData.slug}
                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        placeholder="globalfin-portal"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <ImageUpload
                                    label="Project Image"
                                    value={formData.imageUrl}
                                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Project Link</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={formData.link}
                                        onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
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
                    {projects.map((project) => (
                        <div key={project._id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col">
                            <div className="relative h-48 w-full bg-gray-200">
                                {/* Check if imageUrl is absolute, maybe a placeholder */}
                                <Image
                                    src={project.imageUrl.startsWith("http") ? project.imageUrl : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80"}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-medium text-gray-900">{project.title}</h3>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {project.category}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500 truncate">{project.link}</p>
                                    <p className="mt-1 text-xs text-gray-400">Order: {project.order}</p>
                                </div>
                                <div className="mt-4 flex justify-end space-x-2">
                                    <button
                                        onClick={() => handleOpenForm(project)}
                                        className="p-1.5 rounded-full text-indigo-600 hover:bg-indigo-50"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="p-1.5 rounded-full text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No projects found. Add one to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
