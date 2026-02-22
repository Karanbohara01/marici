import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Testimonial } from "@/models/Testimonial";

export async function GET() {
    try {
        await connectToDatabase();
        const testimonials = await Testimonial.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(testimonials);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const newTestimonial = await Testimonial.create(data);
        return NextResponse.json(newTestimonial, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
    }
}
