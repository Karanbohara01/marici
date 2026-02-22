import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { Service } from "@/models/Service";

export async function PUT(request: Request, context: any) {
    try {
        const { params } = context;
        const { id } = await params;
        await connectToDatabase();
        const data = await request.json();
        const service = await Service.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
    }
}

export async function DELETE(request: Request, context: any) {
    try {
        const { params } = context;
        const { id } = await params;
        await connectToDatabase();
        await Service.findByIdAndDelete(id);
        return NextResponse.json({ message: "Service deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
    }
}
