"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Briefcase,
    Image as ImageIcon,
    MessageSquare,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    FileText,
    BookOpen,

} from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Services", href: "/admin/services", icon: Settings },
    { name: "Projects", href: "/admin/projects", icon: ImageIcon },
    { name: "Blog", href: "/admin/blog", icon: BookOpen },
    { name: "Careers", href: "/admin/careers", icon: Briefcase },
    { name: "Applications", href: "/admin/applications", icon: FileText },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // If we're on the login page or any page without layout, don't show sidebar
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", { method: "POST" });
            router.push("/admin/login");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col flex-shrink-0`}
            >
                <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4 justify-between">
                        <Link href="/" className="flex items-center">
                            <img
                                src="/logo.png"
                                alt="Marici Technology"
                                className="h-22 w-auto object-contain bg-white"
                            />
                        </Link>
                        <button
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    <nav className="mt-8 flex-1 px-2 space-y-1">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`${isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
                                >
                                    <Icon
                                        className={`${isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
                                            } mr-3 flex-shrink-0 h-5 w-5`}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                    <button
                        onClick={handleLogout}
                        className="flex-shrink-0 w-full group block"
                    >
                        <div className="flex items-center text-red-600 hover:text-red-700 font-medium">
                            <LogOut className="inline-block h-5 w-5 mr-2" />
                            Sign Out
                        </div>
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="lg:hidden h-16 bg-white shadow-sm flex items-center px-4 flex-shrink-0">
                    <button
                        type="button"
                        className="h-10 w-10 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <Menu className="h-6 w-6" />
                    </button>
                    <Link href="/" className="ml-4">
                        <img
                            src="/logo.png"
                            alt="Marici Technology"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>
                </div>

                <main className="flex-1 overflow-y-auto focus:outline-none bg-gray-50">
                    <div className="py-6 sm:py-8 lg:py-10">
                        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
