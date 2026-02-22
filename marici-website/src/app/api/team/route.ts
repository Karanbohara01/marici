import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { TeamMember } from "@/models/TeamMember";

export async function GET() {
    try {
        await connectToDatabase();
        const team = await TeamMember.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(team);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const newTeamMember = await TeamMember.create(data);
        return NextResponse.json(newTeamMember, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
    }
}
