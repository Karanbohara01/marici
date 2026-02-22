import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Contact } from "@/lib/models/Contact";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Connect to MongoDB
        await connectToDatabase();

        // Create new contact entry
        const newContact = await Contact.create(body);

        return NextResponse.json(
            { success: true, message: "Message sent successfully!", data: newContact },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Contact API error:", error);

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err: any) => err.message);
            return NextResponse.json(
                { success: false, message: messages.join(", ") },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
