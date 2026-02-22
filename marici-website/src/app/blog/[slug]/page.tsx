import connectToDatabase from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import { notFound } from "next/navigation";
import BlogPostClient from "./BlogPostClient";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        await connectToDatabase();
        const post = await BlogPost.findOne({ slug });
        if (!post) return {};

        return {
            title: `${post.title} | Marici Blog`,
            description: post.excerpt,
        };
    } catch (error) {
        console.error("Metadata fetch failed during build for blog post:", error);
        return {};
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    try {
        await connectToDatabase();
        const post = await BlogPost.findOne({ slug });

        if (!post) {
            notFound();
        }

        return <BlogPostClient post={JSON.parse(JSON.stringify(post))} />;
    } catch (error) {
        console.error("Blog post fetch failed during build:", error);
        notFound();
    }
}
