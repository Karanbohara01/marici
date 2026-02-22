import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Project } from "@/models/Project";

export async function PUT(request: Request, context: any) {
    try {
        const { params } = context;
        const { id } = await params;
        await connectToDatabase();
        const data = await request.json();
        const project = await Project.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: any) {
    try {
        const { params } = context;
        const { id } = await params;
        await connectToDatabase();
        await Project.findByIdAndDelete(id);
        return NextResponse.json({ message: "Project deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
    }
}
