"use client";

import { Upload, Home, Folder } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { uploadFile } from "@/app/services/file";

type SidebarProps = {
    currentDirId?: string;
    onUploadComplete: () => void;
};

export default function Sidebar({
    currentDirId,
    onUploadComplete,
}: SidebarProps) {
    const [uploading, setUploading] = useState(false);

    async function handleUpload(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        e.target.value = "";

        if (!file || !currentDirId) return;

        setUploading(true);

        try {
            await uploadFile(currentDirId, file);
            onUploadComplete();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Could not upload file"
            );
        } finally {
            setUploading(false);
        }
    }

    return (
        <aside className="w-64 border-r p-4">

            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700">
                <Upload size={18} />

                {uploading ? "Uploading..." : "Upload"}

                <input
                    type="file"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={uploading}
                />
            </label>

            <nav className="mt-6 space-y-2">

                <Link
                    href="/"
                    className="flex w-full items-center gap-3 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800"
                >
                    <Home size={18} />
                    Home
                </Link>

                <Link
                    href="/drive"
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100"
                >
                    <Folder size={18} />
                    My Files
                </Link>

            </nav>
        </aside>
    );
}