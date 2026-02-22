import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import JobApplication from "@/models/JobApplication";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const formData = await req.formData();

        const jobId = formData.get("jobId") as string;
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const coverLetter = formData.get("coverLetter") as string;
        const resumeFile = formData.get("resume") as File;

        if (!jobId || !fullName || !email || !resumeFile) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Handle file upload
        const bytes = await resumeFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const fileExtension = path.extname(resumeFile.name);
        const fileName = `${uuidv4()}${fileExtension}`;
        const uploadDir = path.join(process.cwd(), "public", "uploads", "resumes");
        const filePath = path.join(uploadDir, fileName);

        await writeFile(filePath, buffer);
        const resumeUrl = `/uploads/resumes/${fileName}`;

        const application = await JobApplication.create({
            jobId,
            fullName,
            email,
            phone,
            resumeUrl,
            coverLetter,
        });

        return NextResponse.json({ success: true, data: application }, { status: 201 });
    } catch (error: any) {
        console.error("Submission error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
