"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2, ArrowRight } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default function BlogPostClient({ post }: { post: any }) {
    return (
        <main className="pt-32 pb-32 bg-background min-h-screen">
            <div className="container mx-auto px-6 max-w-7xl">
                <Link
                    href="/blog"
                    className="inline-flex items-center text-[11px] font-bold tracking-[0.4em] uppercase text-slate-400 hover:text-blue-600 transition-all mb-16 group"
                >
                    <ArrowLeft className="w-4 h-4 mr-4 group-hover:-translate-x-1 transition-transform" /> Back to Journal
                </Link>

                <div className="max-w-5xl mx-auto">
                    <header className="mb-16">
                        <div className="flex flex-wrap items-center gap-8 text-[11px] font-bold tracking-[0.2em] uppercase text-blue-400 mb-12">
                            <span className="flex items-center gap-2.5"><Calendar className="w-3.5 h-3.5" /> {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                            <span className="flex items-center gap-2.5"><User className="w-3.5 h-3.5" /> {post.author}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                            <span className="flex items-center gap-2.5"><Clock className="w-3.5 h-3.5" /> 5 MIN READ</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-12 leading-[0.9] text-foreground">
                            {post.title}
                        </h1>
                        <p className="text-2xl md:text-3xl text-slate-500 font-medium leading-[1.3] max-w-4xl tracking-tight">
                            {post.excerpt}
                        </p>
                    </header>

                    {post.coverImage && (
                        <div className="aspect-[21/9] relative mb-20 bg-slate-100 border border-slate-200 overflow-hidden rounded-3xl">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover opacity-90"
                                priority
                            />
                            <div className="absolute inset-0 bg-background/10" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-24 items-start">
                        <article className="prose prose-slate prose-2xl max-w-none 
                            prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-slate-900 
                            prose-p:text-slate-600 prose-p:font-medium prose-p:leading-relaxed 
                            prose-strong:text-slate-900 prose-blockquote:border-l-blue-500 prose-blockquote:text-slate-700 prose-blockquote:font-bold prose-blockquote:italic
                            prose-img:rounded-3xl prose-code:text-blue-600 prose-pre:bg-slate-100 prose-pre:border prose-pre:border-slate-200">
                            <ReactMarkdown>{post.content}</ReactMarkdown>
                        </article>

                        <aside className="sticky top-40 space-y-16 hidden lg:block border-l border-slate-200 pl-16">
                            <div>
                                <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-foreground mb-10">SHARE ANALYSIS</h4>
                                <div className="flex flex-col gap-6">
                                    <button className="text-[11px] font-bold tracking-widest uppercase text-slate-400 hover:text-blue-400 transition-colors text-left flex items-center gap-3 group">
                                        <Share2 className="w-4 h-4 opacity-50 group-hover:opacity-100" /> TWITTER / X
                                    </button>
                                    <button className="text-[11px] font-bold tracking-widest uppercase text-slate-400 hover:text-blue-400 transition-colors text-left flex items-center gap-3 group">
                                        <Share2 className="w-4 h-4 opacity-50 group-hover:opacity-100" /> LINKEDIN
                                    </button>
                                </div>
                            </div>

                            {post.tags && post.tags.length > 0 && (
                                <div>
                                    <h4 className="text-[11px] font-bold tracking-[0.3em] uppercase text-foreground mb-10">TAXONOMY</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {post.tags.map((tag: string) => (
                                            <span key={tag} className="text-[10px] font-bold tracking-widest uppercase bg-slate-100 text-slate-500 px-4 py-2 border border-slate-200 hover:border-blue-500/30 hover:text-blue-600 transition-all cursor-default">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTABox in detail page sidebar */}
                            <div className="pt-12 border-t border-slate-200">
                                <Link href="/contact" className="block p-8 bg-blue-600 rounded-2xl group overflow-hidden relative">
                                    <div className="relative z-10">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 block mb-4">Collab</span>
                                        <h5 className="text-xl font-black text-white uppercase leading-tight mb-6 tracking-tighter">Build Your <br />Breakthrough</h5>
                                        <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
                                    </div>
                                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </main>
    );
}
