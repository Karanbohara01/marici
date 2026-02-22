import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import JobApplication from "@/models/JobApplication";
import Career from "@/models/Career";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

async function verifyAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;

    if (!token) return false;

    try {
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        return false;
    }
}

export async function GET() {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectToDatabase();
        const applications = await JobApplication.find()
            .populate("jobId", "title")
            .sort({ createdAt: -1 });
        return NextResponse.json(applications);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectToDatabase();
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ message: "Missing ID or status" }, { status: 400 });
        }

        const application = await JobApplication.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!application) {
            return NextResponse.json({ message: "Application not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: application });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
