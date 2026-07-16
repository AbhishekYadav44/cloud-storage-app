"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";
import {getDirectory,createDirectory, renameDirectory,deleteDirectory,} from "@/app/services/directory";
import { uploadFile,renameFile,deleteFile,getFileUrl,} from "../services/file"
import { getCurrentUser,logout } from "../services/users";

type DirEntry = { id: string; name: string };
type FileEntry = { id: string; name: string };

type DirectoryData = {
  _id: string;
  name: string;
  parentDirId: string | null;
  directories: DirEntry[];
  files: FileEntry[];
};

export default function DrivePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // If there's no "id" in the URL, we're looking at the root folder.
  const currentId = searchParams.get("id") || undefined;

  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [dir, setDir] = useState<DirectoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getCurrentUser()
      .then(setUser)
      .catch(() => router.push("/login"));
  }, [router]);

  useEffect(() => {
    loadDirectory();
  }, [currentId]);

  async function loadDirectory() {
    setLoading(true);
    setError("");
    try {
      const data = await getDirectory(currentId);
      setDir(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load folder");
    } finally {
      setLoading(false);
    }
  }

  function openFolder(id: string) {
    router.push(`/drive?id=${id}`);
  }

  async function handleCreateFolder() {
    const name = window.prompt("Folder name?");
    if (!name) return;
    try {
      await createDirectory(currentId, name);
      loadDirectory();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not create folder");
    }
  }

  async function handleRenameFolder(id: string, oldName: string) {
    const name = window.prompt("New folder name?", oldName);
    if (!name) return;
    try {
      await renameDirectory(id, name);
      loadDirectory();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not rename folder");
    }
  }

  async function handleDeleteFolder(id: string) {
    if (!window.confirm("Delete this folder and everything inside it?")) return;
    try {
      await deleteDirectory(id);
      loadDirectory();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not delete folder");
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; 
    if (!file || !dir) return;

    setUploading(true);
    try {
      await uploadFile(dir._id, file);
      loadDirectory();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not upload file");
    } finally {
      setUploading(false);
    }
  }

  async function handleRenameFile(id: string, oldName: string) {
    const name = window.prompt("New file name?", oldName);
    if (!name) return;
    try {
      await renameFile(id, name);
      loadDirectory();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not rename file");
    }
  }

  async function handleDeleteFile(id: string) {
    if (!window.confirm("Delete this file?")) return;
    try {
      await deleteFile(id);
      loadDirectory();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Could not delete file");
    }
  }

  async function handleLogout() {
    await logout();
    router.push("/login");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      {/* top bar */}
      <div className="mb-6 flex items-center justify-between">
        <Link href="/drive" className="text-lg font-bold text-gray-900">
          Cloudy
        </Link>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          {user && <span>{user.name}</span>}
          {user?.role !== "user" && (
            <Link href="/admin" className="text-blue-600 hover:underline">
              Admin
            </Link>
          )}
          <button onClick={handleLogout} className="text-gray-500 hover:underline">
            Log out
          </button>
        </div>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {loading && <p className="text-sm text-gray-500">Loading...</p>}

      {dir && !loading && (
        <>
          {/* folder header + actions */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {dir.parentDirId && (
                <button
                  onClick={() => openFolder(dir.parentDirId!)}
                  className="text-sm text-gray-500 hover:underline"
                >
                  ← Up
                </button>
              )}
              <h1 className="text-lg font-semibold text-gray-900">{dir.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="secondary" onClick={handleCreateFolder}>
                New folder
              </Button>
              <label>
                <span className="cursor-pointer rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  {uploading ? "Uploading..." : "Upload file"}
                </span>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>

          {dir.directories.length > 0 && (
            <ul className="mb-4 divide-y divide-gray-200 rounded border border-gray-200 bg-white">
              {dir.directories.map((folder) => (
                <li key={folder.id} className="flex items-center justify-between px-4 py-3">
                  <button
                    onClick={() => openFolder(folder.id)}
                    className="text-sm text-gray-900 hover:underline"
                  >
                    📁 {folder.name}
                  </button>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <button onClick={() => handleRenameFolder(folder.id, folder.name)} className="hover:underline">
                      Rename
                    </button>
                    <button onClick={() => handleDeleteFolder(folder.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {dir.files.length > 0 && (
            <ul className="divide-y divide-gray-200 rounded border border-gray-200 bg-white">
              {dir.files.map((file) => (
                <li key={file.id} className="flex items-center justify-between px-4 py-3">
                  <a
                    href={getFileUrl(file.id)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-gray-900 hover:underline"
                  >
                    📄 {file.name}
                  </a>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <a href={getFileUrl(file.id, true)} className="hover:underline">
                      Download
                    </a>
                    <button onClick={() => handleRenameFile(file.id, file.name)} className="hover:underline">
                      Rename
                    </button>
                    <button onClick={() => handleDeleteFile(file.id)} className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {dir.directories.length === 0 && dir.files.length === 0 && (
            <p className="text-sm text-gray-500">This folder is empty.</p>
          )}
        </>
      )}
    </main>
  );
}
