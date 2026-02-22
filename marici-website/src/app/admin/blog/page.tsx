"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X, Save, AlertCircle, Loader2, Upload, Image as ImageIcon } from "lucide-react";

interface BlogPost {
    _id?: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    coverImage: string;
    tags: string[] | string;
    isFeatured: boolean;
    publishedAt?: string;
}


export default function BlogAdmin() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form state
    const [formData, setFormData] = useState<BlogPost>({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        coverImage: "",
        tags: "",
        isFeatured: false
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/blog");
            const data = await res.json();
            setPosts(data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch posts");
            setLoading(false);
        }
    };

    const handleOpenModal = (post: BlogPost | null = null) => {
        if (post) {
            setEditingPost(post);
            setFormData({
                title: post.title || "",
                slug: post.slug || "",
                excerpt: post.excerpt || "",
                content: post.content || "",
                author: post.author || "",
                coverImage: post.coverImage || "",
                tags: Array.isArray(post.tags) ? post.tags.join(", ") : (post.tags || ""),
                isFeatured: !!post.isFeatured
            });
        } else {
            setEditingPost(null);
            setFormData({
                title: "",
                slug: "",
                excerpt: "",
                content: "",
                author: "",
                coverImage: "",
                tags: "",
                isFeatured: false
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
            title: formData.title,
            slug: formData.slug,
            excerpt: formData.excerpt,
            content: formData.content,
            author: formData.author,
            coverImage: formData.coverImage,
            isFeatured: formData.isFeatured,
            tags: typeof formData.tags === 'string'
                ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
                : formData.tags
        };

        try {
            const url = editingPost ? `/api/blog/${editingPost._id}` : "/api/blog";
            const method = editingPost ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submissionData),
            });

            if (!res.ok) throw new Error("Failed to save post");

            await fetchPosts();
            setIsModalOpen(false);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete post");
            await fetchPosts();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");

            setFormData(prev => ({ ...prev, coverImage: data.url }));
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploading(false);
            // Clear the input
            e.target.value = "";
        }
    };

    return (
        <>
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-heading font-black tracking-tight uppercase">Blog Management</h1>
                        <p className="text-foreground/50 mt-1">Create and manage your articles.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-foreground text-background px-6 py-2 uppercase text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-foreground/90 transition-colors"
                    >
                        <Plus className="w-4 h-4" /> New Post
                    </button>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin opacity-20" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {posts.map((post: any) => (
                            <div key={post._id} className="bg-background border border-foreground/10 p-6 flex justify-between items-center group hover:border-foreground/20 transition-all">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-xl font-heading font-black tracking-tight uppercase">{post.title}</h3>
                                        {post.isFeatured && (
                                            <span className="text-[10px] font-bold tracking-widest uppercase bg-accent text-background px-2 py-0.5">Featured</span>
                                        )}
                                    </div>
                                    <div className="flex gap-4 text-xs font-bold tracking-widest uppercase opacity-40">
                                        <span>BY {post.author}</span>
                                        <span>/</span>
                                        <span>{new Date(post.publishedAt || "").toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleOpenModal(post)}
                                        className="p-2 hover:bg-foreground/5 transition-colors"
                                        title="Edit"
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        className="p-2 hover:bg-red-500/10 text-red-500 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {posts.length === 0 && (
                            <div className="text-center py-20 border border-dashed border-foreground/10">
                                <p className="opacity-40 uppercase text-xs font-bold tracking-widest">No posts found.</p>
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
                                {editingPost ? "Edit Post" : "Create Post"}
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
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all uppercase font-medium"
                                        placeholder="Enter title"
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
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Author</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all uppercase font-medium"
                                        placeholder="Author name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Cover Image</label>
                                    <div className="flex gap-4">
                                        <div className="flex-grow">
                                            <input
                                                type="text"
                                                value={formData.coverImage}
                                                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                                                className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all font-medium"
                                                placeholder="https://... or upload"
                                            />
                                        </div>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                disabled={uploading}
                                            />
                                            <button
                                                type="button"
                                                className="h-full bg-foreground/5 border border-foreground/10 px-4 flex items-center gap-2 hover:bg-foreground/10 transition-colors disabled:opacity-50"
                                            >
                                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                                <span className="text-[10px] font-bold tracking-widest uppercase">Upload</span>
                                            </button>
                                        </div>
                                    </div>
                                    {formData.coverImage && (
                                        <div className="mt-4 relative aspect-video w-full bg-foreground/5 border border-foreground/10 overflow-hidden group">
                                            <img
                                                src={formData.coverImage}
                                                alt="Preview"
                                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-[10px] font-bold tracking-widest uppercase text-white">Preview</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Excerpt</label>
                                <textarea
                                    required
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all font-light resize-none h-24"
                                    placeholder="Brief summary of the post..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Content (Markdown supported)</label>
                                <textarea
                                    required
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all font-mono resize-none h-64"
                                    placeholder="# My Awesome Post..."
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="space-y-2 flex-grow mr-6">
                                    <label className="text-[10px] font-bold tracking-widest uppercase opacity-40">Tags (Comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        className="w-full bg-foreground/5 border-none p-4 text-sm focus:ring-1 focus:ring-foreground transition-all uppercase font-medium"
                                        placeholder="NEXTJS, REACT, TECH"
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        id="isFeatured"
                                        checked={formData.isFeatured}
                                        onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                        className="w-5 h-5 accent-foreground"
                                    />
                                    <label htmlFor="isFeatured" className="text-[10px] font-bold tracking-widest uppercase cursor-pointer">Featured</label>
                                </div>
                            </div>

                            <div className="flex justify-end pt-6">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-foreground text-background px-12 py-4 uppercase text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-foreground/90 transition-all disabled:opacity-50"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    {editingPost ? "Update Post" : "Create Post"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
