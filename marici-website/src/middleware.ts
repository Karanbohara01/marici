import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "marici_super_secret_key_2026";
const secret = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("admin_token")?.value;

    // Protect /admin routes except /admin/login
    if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            await jwtVerify(token, secret);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    // Redirect authenticated users away from login page
    if (request.nextUrl.pathname === "/admin/login" && token) {
        try {
            await jwtVerify(token, secret);
            return NextResponse.redirect(new URL("/admin", request.url));
        } catch {
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
