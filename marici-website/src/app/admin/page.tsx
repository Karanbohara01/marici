import {
    Briefcase,
    Image as ImageIcon,
    MessageSquare,
    Users
} from "lucide-react";
import connectToDatabase from "@/lib/mongoose";
import { Service } from "@/models/Service";
import { Project } from "@/models/Project";
import { Testimonial } from "@/models/Testimonial";
import { TeamMember } from "@/models/TeamMember";
import Link from "next/link";
export const dynamic = "force-dynamic";

async function getStats() {
    try {
        await connectToDatabase();

        const [servicesCount, projectsCount, testimonialsCount, teamCount] = await Promise.all([
            Service.countDocuments(),
            Project.countDocuments(),
            Testimonial.countDocuments(),
            TeamMember.countDocuments(),
        ]);

        return [
            { name: "Services", stat: servicesCount, icon: Briefcase, color: "bg-blue-500", href: "/admin/services" },
            { name: "Projects", stat: projectsCount, icon: ImageIcon, color: "bg-emerald-500", href: "/admin/projects" },
            { name: "Testimonials", stat: testimonialsCount, icon: MessageSquare, color: "bg-amber-500", href: "/admin/testimonials" },
            { name: "Team Members", stat: teamCount, icon: Users, color: "bg-purple-500", href: "/admin/team" },
        ];
    } catch (error) {
        console.error("Failed to fetch stats during build:", error);
        return [
            { name: "Services", stat: 0, icon: Briefcase, color: "bg-blue-500", href: "/admin/services" },
            { name: "Projects", stat: 0, icon: ImageIcon, color: "bg-emerald-500", href: "/admin/projects" },
            { name: "Testimonials", stat: 0, icon: MessageSquare, color: "bg-amber-500", href: "/admin/testimonials" },
            { name: "Team Members", stat: 0, icon: Users, color: "bg-purple-500", href: "/admin/team" },
        ];
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className={`${item.color} rounded-md p-3`}>
                                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">{item.stat}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-5 py-3">
                            <div className="text-sm">
                                <Link href={item.href} className="font-medium text-blue-700 hover:text-blue-900">
                                    Manage {item.name.toLowerCase()}
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
