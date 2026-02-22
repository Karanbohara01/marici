"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, User, BookOpen, Clock } from "lucide-react";
import Image from "next/image";

export default function BlogClient({ posts }: { posts: any[] }) {
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
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold mb-10 leading-none text-white tracking-tighter uppercase"
                        >
                            The Marici <span className="text-gradient">Journal</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-slate-300 leading-relaxed max-w-3xl font-medium"
                        >
                            Exploring the frontier of digital architecture, product engineering, and technical leadership.
                        </motion.p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 max-w-7xl py-20 pb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-slate-900">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-slate-950 border-b md:border-r border-slate-900 hover:bg-slate-900/40 transition-all duration-300"
                        >
                            <Link href={`/blog/${post.slug}`} className="block h-full p-10">
                                <div className="aspect-[16/10] overflow-hidden mb-10 border border-slate-800 relative rounded-xl bg-slate-900">
                                    {post.coverImage ? (
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                                            <BookOpen className="w-12 h-12" strokeWidth={1} />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-[11px] text-blue-400 font-bold uppercase tracking-widest">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </div>

                                    <h2 className="text-2xl font-bold tracking-tighter text-white group-hover:text-blue-400 transition-colors leading-tight uppercase">
                                        {post.title}
                                    </h2>

                                    <p className="text-slate-400 text-base line-clamp-2 leading-relaxed font-medium">
                                        {post.excerpt}
                                    </p>

                                    <div className="pt-6 flex items-center gap-3 text-slate-300 font-bold uppercase tracking-[0.2em] text-[11px] group-hover:text-blue-400 transition-colors">
                                        Read Article
                                        <div className="w-8 h-[1px] bg-slate-800 group-hover:w-12 group-hover:bg-blue-400 transition-all"></div>
                                        <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="py-40 text-center border border-dashed border-slate-900 rounded-2xl bg-slate-900/20">
                        <BookOpen className="w-12 h-12 text-slate-800 mx-auto mb-6" strokeWidth={1} />
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">The journal is empty.</h3>
                        <p className="text-slate-600 mt-2 text-[11px] font-bold uppercase">Check back soon for updates</p>
                    </div>
                )}
            </div>
        </main>
    );
}
