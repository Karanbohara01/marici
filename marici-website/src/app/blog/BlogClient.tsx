"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, User, BookOpen, Clock } from "lucide-react";
import Image from "next/image";

export default function BlogClient({ posts }: { posts: any[] }) {
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
                            Insights & Updates
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold mb-10 leading-none text-[#254796] tracking-tighter uppercase"
                        >
                            The Marici <span className="text-[#254796]">Journal</span>.
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-2xl text-gray-800 leading-relaxed max-w-3xl font-medium"
                        >
                            Exploring the frontier of digital architecture, product engineering, and technical leadership.
                        </motion.p>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-6 max-w-7xl py-12 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-100">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white border-b md:border-r border-gray-100 hover:bg-gray-50 transition-all duration-300"
                        >
                            <Link href={`/blog/${post.slug}`} className="block h-full p-10">
                                <div className="aspect-[16/10] overflow-hidden mb-10 border border-gray-100 grayscale hover:grayscale-0 transition-all duration-700 bg-gray-50">
                                    {post.coverImage ? (
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover scale-100 group-hover:scale-110 transition-transform duration-1000"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                                            <BookOpen className="w-12 h-12" strokeWidth={1} />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-[11px] text-gray-800 font-bold uppercase tracking-widest">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </div>

                                    <h2 className="text-2xl font-bold tracking-tighter text-[#254796] group-hover:text-black transition-colors leading-tight uppercase">
                                        {post.title}
                                    </h2>

                                    <p className="text-gray-800 text-base line-clamp-2 leading-relaxed font-medium">
                                        {post.excerpt}
                                    </p>

                                    <div className="pt-6 flex items-center gap-3 text-gray-800 font-bold uppercase tracking-[0.2em] text-[11px] group-hover:text-black transition-colors">
                                        Read Article
                                        <div className="w-8 h-[1px] bg-gray-200 group-hover:w-12 group-hover:bg-black transition-all"></div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="py-40 text-center border border-dashed border-gray-100">
                        <BookOpen className="w-12 h-12 text-gray-200 mx-auto mb-6" strokeWidth={1} />
                        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-widest">The journal is empty.</h3>
                        <p className="text-gray-800 mt-2 text-[11px] font-bold uppercase">Check back soon for updates</p>
                    </div>
                )}


            </div>
        </main>
    );
}
