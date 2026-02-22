import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { TeamMember } from "@/models/TeamMember";

export async function PUT(request: Request, context: any) {
    try {
        const { params } = context;
        const { id } = await params;
        await connectToDatabase();
        const data = await request.json();
        const teamMember = await TeamMember.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(teamMember);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: any) {
    try {
        const { params } = context;
        const { id } = await params;
        await connectToDatabase();
        await TeamMember.findByIdAndDelete(id);
        return NextResponse.json({ message: "Team Member deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
    }
}
