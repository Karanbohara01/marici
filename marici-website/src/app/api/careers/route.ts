import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Career from "@/models/Career";
import { cookies } from "next/headers";

export async function GET() {
    try {
        await connectToDatabase();
        const careers = await Career.find({ status: "Open" }).sort({ createdAt: -1 });
        return NextResponse.json(careers);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch careers" }, { status: 500 });
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
        const career = await Career.create(data);
        return NextResponse.json(career, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create career" }, { status: 500 });
    }
}
