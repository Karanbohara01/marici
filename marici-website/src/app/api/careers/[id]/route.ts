import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Career from "@/models/Career";
import { cookies } from "next/headers";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectToDatabase();
        const career = await Career.findById(id);
        if (!career) {
            return NextResponse.json({ error: "Career not found" }, { status: 404 });
        }
        return NextResponse.json(career);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch career" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const isAdmin = cookieStore.get("admin_token");

        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const data = await request.json();
        const career = await Career.findByIdAndUpdate(id, data, { new: true });
        if (!career) {
            return NextResponse.json({ error: "Career not found" }, { status: 404 });
        }
        return NextResponse.json(career);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update career" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const cookieStore = await cookies();
        const isAdmin = cookieStore.get("admin_token");

        if (!isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDatabase();
        const career = await Career.findByIdAndDelete(id);
        if (!career) {
            return NextResponse.json({ error: "Career not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Career deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete career" }, { status: 500 });
    }
}
