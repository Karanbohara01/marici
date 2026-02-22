import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Project } from "@/models/Project";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectToDatabase();
        const projects = await Project.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const newProject = await Project.create(data);
        return NextResponse.json(newProject, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
    }
}
