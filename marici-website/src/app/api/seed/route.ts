import { NextResponse } from "next/server";
import { seedData } from "@/lib/seed-data";

export async function GET() {
    try {
        const result = await seedData();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}
