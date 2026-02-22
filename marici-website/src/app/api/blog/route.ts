import connectToDatabase from "@/lib/mongoose";
import BlogPost from "@/models/BlogPost";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const featured = searchParams.get("featured");

        let query = {};
        if (featured === "true") {
            query = { isFeatured: true };
        }

        const posts = await BlogPost.find(query).sort({ publishedAt: -1 });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();
        const isAdmin = cookieStore.get("admin_token");

        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const data = await request.json();
        const post = await BlogPost.create(data);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
    }
}
