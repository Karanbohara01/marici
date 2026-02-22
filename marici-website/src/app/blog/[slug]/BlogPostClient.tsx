"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function BlogPostClient({ post }: { post: any }) {
    return (
        <main className="pt-16 pb-12 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-[11px] font-bold tracking-[0.2em] uppercase text-gray-900 hover:gap-4 transition-all mb-12"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
                </Link>

                <div className="max-w-4xl mx-auto">
                    <header className="mb-12">
                        <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold tracking-[0.2em] uppercase text-[#254796] mb-8">
                            <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> {new Date(post.publishedAt).toLocaleDateString()}</span>
                            <span className="text-gray-300">/</span>
                            <span className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> {post.author}</span>
                            <span className="text-gray-300">/</span>
                            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> 5 MIN READ</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8 leading-[0.9] text-black">
                            {post.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed max-w-4xl">
                            {post.excerpt}
                        </p>
                    </header>

                    {post.coverImage && (
                        <div className="aspect-video relative mb-12 bg-gray-50 border border-gray-100 overflow-hidden">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,240px] gap-12 items-start">
                        <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-black prose-p:text-gray-800 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-black prose-blockquote:border-l-[#254796] prose-blockquote:text-gray-900 prose-blockquote:font-medium prose-blockquote:italic bg-white">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </article>

                        <aside className="sticky top-40 space-y-12 hidden lg:block border-l border-gray-50 pl-12">
                            <div>
                                <h4 className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-6">SHARE ANALYSIS</h4>
                                <div className="flex flex-col gap-4">
                                    <button className="text-[11px] font-bold tracking-widest uppercase text-gray-800 hover:text-[#254796] transition-colors text-left flex items-center gap-2">
                                        <Share2 className="w-3.5 h-3.5" /> X / TWITTER
                                    </button>
                                    <button className="text-[11px] font-bold tracking-widest uppercase text-gray-800 hover:text-[#254796] transition-colors text-left flex items-center gap-2">
                                        <Share2 className="w-3.5 h-3.5" /> LINKEDIN
                                    </button>
                                </div>
                            </div>

                            {post.tags && post.tags.length > 0 && (
                                <div>
                                    <h4 className="text-[11px] font-bold tracking-widest uppercase text-gray-900 mb-6">TAXONOMY</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag: string) => (
                                            <span key={tag} className="text-[11px] font-bold tracking-widest uppercase bg-gray-50 text-gray-800 px-3 py-1.5 border border-gray-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}
