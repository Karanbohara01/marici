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
import { motion, AnimatePresence } from "framer-motion";

const navGroups = [
    {
        title: "Overview",
        items: [
            { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        ]
    },
    {
        title: "Content Management",
        items: [
            { name: "Services", href: "/admin/services", icon: Settings },
            { name: "Projects", href: "/admin/projects", icon: ImageIcon },
            { name: "Blog", href: "/admin/blog", icon: BookOpen },
            { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
            { name: "Team", href: "/admin/team", icon: Users },
        ]
    },
    {
        title: "Operations",
        items: [
            { name: "Careers", href: "/admin/careers", icon: Briefcase },
            { name: "Applications", href: "/admin/applications", icon: FileText },
        ]
    },
    {
        title: "System",
        items: [
            { name: "Settings", href: "/admin/settings", icon: Settings },
        ]
    }
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
        <div className="min-h-screen bg-[#F8FAFC] flex">
            {/* Mobile sidebar overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 shadow-sm transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col flex-shrink-0`}
            >
                {/* Sidebar Header */}
                <div className="h-24 flex items-center px-8 border-b border-slate-50 flex-shrink-0">
                    <Link href="/" className="flex flex-col">
                        <img
                            src="/logo.png"
                            alt="Marici Technology"
                            className="h-12 w-auto object-contain mb-1"
                        />
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-blue-600 uppercase">Control Center</span>
                            <div className="h-[1px] w-6 bg-blue-100"></div>
                        </div>
                    </Link>
                    <button
                        className="lg:hidden ml-auto p-2 text-slate-400 hover:text-slate-600"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-8 px-4 custom-scrollbar">
                    <nav className="space-y-8">
                        {navGroups.map((group) => (
                            <div key={group.title}>
                                <h3 className="px-4 text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-slate-400 mb-4 flex items-center gap-3">
                                    {group.title}
                                    <div className="h-[1px] flex-1 bg-slate-100"></div>
                                </h3>
                                <div className="space-y-1">
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href;
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={`group relative flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${isActive
                                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                    }`}
                                            >
                                                <Icon
                                                    className={`mr-3 flex-shrink-0 h-5 w-5 transition-transform group-hover:scale-110 ${isActive ? "text-white" : "text-slate-400 group-hover:text-blue-500"
                                                        }`}
                                                />
                                                {item.name}
                                                {isActive && (
                                                    <motion.div
                                                        layoutId="active-pill"
                                                        className="absolute left-[-1rem] w-1.5 h-8 bg-blue-600 rounded-r-full"
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* User Profile Section */}
                <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-3 p-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-white">
                            KB
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">Karan Bohara</p>
                            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest truncate">Administrator</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 border border-slate-200"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="lg:hidden h-20 bg-white border-b border-slate-200 flex items-center px-6 flex-shrink-0 sticky top-0 z-30">
                    <button
                        type="button"
                        className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="ml-4 flex items-center gap-3">
                        <img
                            src="/logo.png"
                            alt="Marici Technology"
                            className="h-10 w-auto object-contain"
                        />
                        <div className="h-5 w-[1px] bg-slate-200 mx-1"></div>
                        <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">Admin</span>
                    </div>
                </header>

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
