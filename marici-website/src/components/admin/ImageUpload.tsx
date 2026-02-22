"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset error
        setError("");
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");

            onChange(data.url);
        } catch (err: any) {
            console.error("Upload error:", err);
            setError(err.message || "Failed to upload image");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleRemove = () => {
        onChange("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <div className="flex flex-col gap-4">
                {value ? (
                    <div className="relative w-full aspect-video sm:w-64 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden group">
                        <img
                            src={value}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                            title="Remove image"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <div className="absolute inset-x-0 bottom-0 bg-black/50 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <p className="text-[10px] text-white text-center font-medium truncate px-2">
                                {value}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`
                            relative w-full aspect-video sm:w-64 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer transition-all
                            ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'}
                        `}
                    >
                        {uploading ? (
                            <div className="flex flex-col items-center">
                                <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                                <span className="text-xs font-medium text-gray-500">Uploading...</span>
                            </div>
                        ) : (
                            <>
                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                <span className="text-xs font-medium text-gray-500 text-center px-4">
                                    Click to upload or drag & drop
                                </span>
                                <span className="text-[10px] text-gray-400 mt-1">
                                    PNG, JPG, GIF up to 10MB
                                </span>
                            </>
                        )}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </div>
                )}

                {error && (
                    <p className="text-xs text-red-500 font-medium">
                        {error}
                    </p>
                )}

                {/* Manual input fallback - sometimes useful if image is already hosted elsewhere */}
                {!uploading && !value && (
                    <div className="sm:w-64">
                        <input
                            type="text"
                            placeholder="Or paste image URL here..."
                            className="w-full text-[10px] p-2 border border-gray-200 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
