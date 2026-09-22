"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Content from "@/components/ui/drive/Content";
import Header from "@/components/ui/drive/header";
import Sidebar from "@/components/ui/drive/sidebar";

import { getDirectory } from "@/app/services/directory";

type DirEntry = {
    id: string;
    name: string;
};

type FileEntry = {
    id: string;
    name: string;
};

type DirectoryData = {
    _id: string;
    name: string;
    parentDirId: string | null;
    directories: DirEntry[];
    files: FileEntry[];
};

export default function Drive() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentId = searchParams.get("id") || undefined;

    const [dir, setDir] = useState<DirectoryData | null>(null);

    useEffect(() => {
        loadDirectory();
    }, [currentId]);

    async function loadDirectory() {
        try {
            const data = await getDirectory(currentId);
            setDir(data);
        } catch (err) {
            console.log(err);
        }
    }

    function openFolder(id: string) {
        router.push(`/drive?id=${id}`);
    }

    return (
        <div className="flex min-h-screen flex-col">

            <Header />

            <div className="flex flex-1">

                <Sidebar
                    currentDirId={dir?._id}
                    onUploadComplete={loadDirectory}
                />

                <main className="flex-1">

                    <Content
                        directories={dir?.directories ?? []}
                        files={dir?.files ?? []}
                        currentDirectoryName={
                            dir?.name ?? "My Files"
                        }
                        parentDirId={
                            dir?.parentDirId ?? null
                        }
                        currentDirId={dir?._id}
                        onOpenFolder={openFolder}
                        onRefresh={loadDirectory}
                    />

                </main>

            </div>

        </div>
    );
}