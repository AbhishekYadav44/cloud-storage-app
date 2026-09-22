"use client";

import {
    createDirectory,
    renameDirectory,
    deleteDirectory,
} from "@/app/services/directory";

import {
    renameFile,
    deleteFile,
    getFileUrl,
} from "@/app/services/file";

type DirEntry = {
    id: string;
    name: string;
};

type FileEntry = {
    id: string;
    name: string;
};

type ContentProps = {
    directories: DirEntry[];
    files: FileEntry[];
    currentDirectoryName: string;
    parentDirId: string | null;
    currentDirId?: string;
    onOpenFolder: (id: string) => void;
    onRefresh: () => void;
};

export default function Content({
    directories,
    files,
    currentDirectoryName,
    parentDirId,
    currentDirId,
    onOpenFolder,
    onRefresh,
}: ContentProps) {

    async function handleCreateFolder() {
        const name = window.prompt("Folder name?");

        if (!name || !currentDirId) return;

        try {
            await createDirectory(currentDirId, name);
            onRefresh();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Could not create folder"
            );
        }
    }

    async function handleRenameFolder(
        id: string,
        oldName: string
    ) {
        const name = window.prompt(
            "New folder name?",
            oldName
        );

        if (!name) return;

        try {
            await renameDirectory(id, name);
            onRefresh();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Could not rename folder"
            );
        }
    }

    async function handleDeleteFolder(id: string) {
        const confirmed = window.confirm(
            "Delete this folder and everything inside it?"
        );

        if (!confirmed) return;

        try {
            await deleteDirectory(id);
            onRefresh();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Could not delete folder"
            );
        }
    }

    function handleOpenFile(id: string) {
        window.open(getFileUrl(id), "_blank");
    }

    function handleDownloadFile(id: string) {
        window.open(getFileUrl(id, true), "_blank");
    }

    async function handleRenameFile(
        id: string,
        oldName: string
    ) {
        const name = window.prompt(
            "New file name?",
            oldName
        );

        if (!name) return;

        try {
            await renameFile(id, name);
            onRefresh();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Could not rename file"
            );
        }
    }

    async function handleDeleteFile(id: string) {
        const confirmed = window.confirm(
            "Delete this file?"
        );

        if (!confirmed) return;

        try {
            await deleteFile(id);
            onRefresh();
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Could not delete file"
            );
        }
    }

    return (
        <div className="p-6">

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                    {parentDirId && (
                        <button
                            onClick={() =>
                                onOpenFolder(parentDirId)
                            }
                            className="text-sm text-slate-500 hover:underline"
                        >
                            ← Up
                        </button>
                    )}

                    <h1 className="text-xl font-semibold text-slate-900">
                        {currentDirectoryName}
                    </h1>

                </div>

                <button
                    onClick={handleCreateFolder}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    + New Folder
                </button>

            </div>

            {directories.length > 0 && (
                <>
                    <h2 className="mt-8 mb-3 text-sm font-medium text-slate-500">
                        Folders
                    </h2>

                    <div className="grid grid-cols-3 gap-4">

                        {directories.map((folder) => (
                            <div
                                key={folder.id}
                                className="rounded-lg border p-4 hover:bg-slate-50"
                            >

                                <button
                                    onClick={() =>
                                        onOpenFolder(folder.id)
                                    }
                                    className="w-full text-left"
                                >
                                    📁 {folder.name}
                                </button>

                                <div className="mt-3 flex gap-3">

                                    <button
                                        onClick={() =>
                                            handleRenameFolder(
                                                folder.id,
                                                folder.name
                                            )
                                        }
                                        className="text-sm text-slate-500 hover:underline"
                                    >
                                        Rename
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDeleteFolder(
                                                folder.id
                                            )
                                        }
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                </>
            )}

            {files.length > 0 && (
                <>
                    <h2 className="mt-8 mb-3 text-sm font-medium text-slate-500">
                        Files
                    </h2>

                    <div className="rounded-lg border">

                        {files.map((file) => (
                            <div
                                key={file.id}
                                className="flex items-center justify-between border-b px-4 py-3 last:border-b-0 hover:bg-slate-50"
                            >

                                <button
                                    onClick={() =>
                                        handleOpenFile(file.id)
                                    }
                                    className="text-left text-sm text-slate-800 hover:underline"
                                >
                                    📄 {file.name}
                                </button>

                                <div className="flex gap-4">

                                    <button
                                        onClick={() =>
                                            handleDownloadFile(
                                                file.id
                                            )
                                        }
                                        className="text-sm text-slate-500 hover:underline"
                                    >
                                        Download
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleRenameFile(
                                                file.id,
                                                file.name
                                            )
                                        }
                                        className="text-sm text-slate-500 hover:underline"
                                    >
                                        Rename
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDeleteFile(
                                                file.id
                                            )
                                        }
                                        className="text-sm text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                </>
            )}

            {directories.length === 0 &&
                files.length === 0 && (
                    <p className="mt-8 text-sm text-slate-500">
                        This folder is empty.
                    </p>
                )}

        </div>
    );
}