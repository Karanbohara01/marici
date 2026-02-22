import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import { SiteSettings } from "@/models/SiteSettings";

export async function GET() {
    try {
        await connectToDatabase();
        let settings = await SiteSettings.findOne();
        if (!settings) {
            settings = await SiteSettings.create({});
        }
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await connectToDatabase();
        const data = await request.json();
        console.log("PUT /api/settings received data:", data);
        let settings = await SiteSettings.findOne();

        if (settings) {
            settings = await SiteSettings.findByIdAndUpdate(settings._id, data, { new: true });
        } else {
            settings = await SiteSettings.create(data);
        }

        console.log("PUT /api/settings saved settings:", settings);
        return NextResponse.json(settings);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}
