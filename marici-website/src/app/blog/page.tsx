import connectToDatabase from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import BlogClient from "./BlogClient";

export const metadata = {
    title: "Blog | Marici Technology",
    description: "Insights, updates, and stories from the team at Marici.",
};

export const dynamic = "force-dynamic";

async function getPosts() {
    try {
        await connectToDatabase();
        const posts = await BlogPost.find({}).sort({ publishedAt: -1 });
        return JSON.parse(JSON.stringify(posts));
    } catch (error) {
        console.error("Failed to fetch blog posts during build:", error);
        return [];
    }
}

export default async function BlogPage() {
    const posts = await getPosts();
    return <BlogClient posts={posts} />;
}
