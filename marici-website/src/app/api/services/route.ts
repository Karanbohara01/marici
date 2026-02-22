import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Service } from "@/models/Service";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectToDatabase();
        const services = await Service.find().sort({ order: 1, createdAt: -1 });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        const newService = await Service.create(data);
        return NextResponse.json(newService, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
    }
}
