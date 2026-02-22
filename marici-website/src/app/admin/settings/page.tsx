"use client";

import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";

export default function SettingsAdmin() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        address: "",
        facebookUrl: "",
        twitterUrl: "",
        linkedinUrl: "",
        instagramUrl: "",
        stats: [
            { value: "150+", label: "Global Customers" },
            { value: "99.99%", label: "Platform Uptime" },
            { value: "50M+", label: "Queries Per Second" },
            { value: "10+", label: "Years Innovating" }
        ],
        privacyPolicy: "",
        termsOfService: "",
        whatsappNumber: "",
    });

    const fetchSettings = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/settings");
            const data = await res.json();
            if (data && !data.error) {
                setFormData({
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    facebookUrl: data.facebookUrl || "",
                    twitterUrl: data.twitterUrl || "",
                    linkedinUrl: data.linkedinUrl || "",
                    instagramUrl: data.instagramUrl || "",
                    stats: data.stats?.length === 4 ? data.stats : formData.stats,
                    privacyPolicy: data.privacyPolicy || "",
                    termsOfService: data.termsOfService || "",
                    whatsappNumber: data.whatsappNumber || "",
                });
            }
        } catch (error) {
            console.error("Failed to fetch settings", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setMessage("");
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setMessage("Settings saved successfully!");
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage("Failed to save settings.");
            }
        } catch (error) {
            setMessage("An error occurred while saving.");
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Global Site Settings
                    </h2>
                </div>
            </div>

            <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6 content-start">
                <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">

                        {/* Contact Information */}
                        <div>
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Contact Information</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    This information will be displayed in the footer and contact pages.
                                </p>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone number
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
                                        WhatsApp Number (with country code, no + or spaces)
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="whatsappNumber"
                                            value={formData.whatsappNumber}
                                            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                            placeholder="919876543210"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                                        Physical Address
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="address"
                                            rows={3}
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Social Media Links</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Links to Marici Technology's social media profiles.
                                </p>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">
                                        LinkedIn URL
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="linkedinUrl"
                                            value={formData.linkedinUrl}
                                            onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="twitterUrl" className="block text-sm font-medium text-gray-700">
                                        Twitter (X) URL
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="twitterUrl"
                                            value={formData.twitterUrl}
                                            onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="facebookUrl" className="block text-sm font-medium text-gray-700">
                                        Facebook URL
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="facebookUrl"
                                            value={formData.facebookUrl}
                                            onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700">
                                        Instagram URL
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            id="instagramUrl"
                                            value={formData.instagramUrl}
                                            onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Company Statistics */}
                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Company Statistics</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    These 4 statistics are displayed dynamically on the homepage.
                                </p>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-4">
                                {formData.stats.map((stat, index) => (
                                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                        <div className="mb-4">
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                                Label {index + 1}
                                            </label>
                                            <input
                                                type="text"
                                                value={stat.label}
                                                onChange={(e) => {
                                                    const newStats = [...formData.stats];
                                                    newStats[index].label = e.target.value;
                                                    setFormData({ ...formData, stats: newStats });
                                                }}
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                                placeholder="e.g. Platform Uptime"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                                Value {index + 1}
                                            </label>
                                            <input
                                                type="text"
                                                value={stat.value}
                                                onChange={(e) => {
                                                    const newStats = [...formData.stats];
                                                    newStats[index].value = e.target.value;
                                                    setFormData({ ...formData, stats: newStats });
                                                }}
                                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border font-bold text-blue-600"
                                                placeholder="e.g. 99.99%"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legal Content */}
                        <div className="pt-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Legal Content</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Edit the content for the Privacy Policy and Terms of Service (Markdown supported).
                                </p>
                            </div>
                            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4">
                                <div className="sm:col-span-6">
                                    <label htmlFor="privacyPolicy" className="block text-sm font-medium text-gray-700">
                                        Privacy Policy
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="privacyPolicy"
                                            rows={12}
                                            value={formData.privacyPolicy}
                                            onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2 font-mono"
                                            placeholder="# Privacy Policy..."
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-6">
                                    <label htmlFor="termsOfService" className="block text-sm font-medium text-gray-700">
                                        Terms of Service
                                    </label>
                                    <div className="mt-1">
                                        <textarea
                                            id="termsOfService"
                                            rows={12}
                                            value={formData.termsOfService}
                                            onChange={(e) => setFormData({ ...formData, termsOfService: e.target.value })}
                                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2 font-mono"
                                            placeholder="# Terms of Service..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-5 flex items-center justify-between">
                        <div>
                            {message && (
                                <span className={`text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                                    {message}
                                </span>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={saving}
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                            >
                                {saving ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="-ml-1 mr-2 h-5 w-5" />
                                        Save Settings
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
