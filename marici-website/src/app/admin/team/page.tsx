"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Loader2, Save, X } from "lucide-react";

type TeamMember = {
    _id: string;
    name: string;
    role: string;
    imageUrl: string;
    socialLinks: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
    order: number;
};

export default function TeamAdmin() {
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        imageUrl: "",
        socialLinks: { linkedin: "", twitter: "", github: "" },
        order: 0,
    });

    const fetchTeam = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/team");
            const data = await res.json();
            setTeam(data);
        } catch (error) {
            console.error("Failed to fetch team", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchTeam();
    }, []);

    const handleOpenForm = (member?: TeamMember) => {
        if (member) {
            setEditingId(member._id);
            setFormData({
                name: member.name,
                role: member.role,
                imageUrl: member.imageUrl,
                socialLinks: {
                    linkedin: member.socialLinks?.linkedin || "",
                    twitter: member.socialLinks?.twitter || "",
                    github: member.socialLinks?.github || "",
                },
                order: member.order,
            });
        } else {
            setEditingId(null);
            setFormData({
                name: "",
                role: "",
                imageUrl: "",
                socialLinks: { linkedin: "", twitter: "", github: "" },
                order: 0
            });
        }
        setIsFormOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingId ? `/api/team/${editingId}` : "/api/team";
            const method = editingId ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsFormOpen(false);
                fetchTeam();
            }
        } catch (error) {
            console.error("Failed to save team member", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this team member?")) return;

        try {
            await fetch(`/api/team/${id}`, { method: "DELETE" });
            fetchTeam();
        } catch (error) {
            console.error("Failed to delete team member", error);
        }
    };

    return (
        <div>
            <div className="sm:flex sm:items-center sm:justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Manage Team</h1>
                <button
                    onClick={() => handleOpenForm()}
                    className="mt-4 sm:mt-0 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" />
                    Add Member
                </button>
            </div>

            {isFormOpen && (
                <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            {editingId ? "Edit Team Member" : "New Team Member"}
                        </h3>
                        <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-500">
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
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
                                <label className="block text-sm font-medium text-gray-700">Role</label>
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

                            <div className="sm:col-span-4">
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <div className="mt-1">
                                    <input
                                        type="text"
                                        required
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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

                            <div className="sm:col-span-6 border-t border-gray-200 pt-4 mt-2">
                                <h4 className="text-sm font-medium text-gray-900 mb-4">Social Links (Optional)</h4>
                                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                value={formData.socialLinks.linkedin}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                                                })}
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Twitter URL</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                value={formData.socialLinks.twitter}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                                                })}
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">GitHub URL</label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                value={formData.socialLinks.github}
                                                onChange={(e) => setFormData({
                                                    ...formData,
                                                    socialLinks: { ...formData.socialLinks, github: e.target.value }
                                                })}
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
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
                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {team.map((member) => (
                        <div key={member._id} className="bg-white rounded-lg shadow overflow-hidden flex flex-col items-center p-6 text-center">
                            <img
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-100"
                            />
                            <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                            <p className="text-sm text-blue-600 mb-4">{member.role}</p>

                            <div className="mt-auto w-full pt-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs text-gray-400">Order: {member.order}</span>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleOpenForm(member)}
                                        className="p-1.5 rounded-full text-indigo-600 hover:bg-indigo-50"
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(member._id)}
                                        className="p-1.5 rounded-full text-red-600 hover:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {team.length === 0 && (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            No team members found. Add one to get started.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
