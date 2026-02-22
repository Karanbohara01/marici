import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import JobApplication from "@/models/JobApplication";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";

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

export async function DELETE(
    req: NextRequest,
    context: any // Use any to avoid the unwrapping issues in some versions
) {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params ?? {}; // Basic check for id

    try {
        await connectToDatabase();

        // Find application to get resume URL
        const application = await JobApplication.findById(id);
        if (!application) {
            return NextResponse.json({ message: "Application not found" }, { status: 404 });
        }

        // Delete the resume file if it exists
        if (application.resumeUrl) {
            const filePath = path.join(process.cwd(), "public", application.resumeUrl);
            try {
                await fs.unlink(filePath);
            } catch (err) {
                console.error("Failed to delete file:", err);
            }
        }

        await JobApplication.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
