import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Testimonial } from "@/models/Testimonial";

export async function PUT(request: Request, context: any) {
    try {
        const { params } = context;
        const { id } = await params;
        await connectToDatabase();
        const data = await request.json();
        const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(testimonial);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: any) {
    try {
        const { params } = context;
        const { id } = await params;
        await connectToDatabase();
        await Testimonial.findByIdAndDelete(id);
        return NextResponse.json({ message: "Testimonial deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
    }
}
