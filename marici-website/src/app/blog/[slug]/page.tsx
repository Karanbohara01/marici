import connectToDatabase from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    await connectToDatabase();
    const post = await BlogPost.findOne({ slug });
    if (!post) return {};

    return {
        title: `${post.title} | Marici Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    await connectToDatabase();
    const post = await BlogPost.findOne({ slug });

    if (!post) {
        notFound();
    }

    return <BlogPostClient post={JSON.parse(JSON.stringify(post))} />;
}
