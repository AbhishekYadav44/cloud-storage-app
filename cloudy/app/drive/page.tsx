
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Content from "@/components/ui/drive/Content";
import Header from "@/components/ui/drive/header";
import Sidebar from "@/components/ui/drive/sidebar";
import { createDirectory } from "@/app/services/directory";

import { getDirectory } from "@/app/services/directory";


type DirEntry = {
  id: string;
  name: string;
};

type DirectoryData = {
  _id: string;
  name: string;
  parentDirId: string | null;
  directories: DirEntry[];
  files: {
    id: string;
    name: string;
  }[];
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
  async function handleCreateFolder() {
    const name = window.prompt("Folder name?");

    if (!name) return;

    try {
      await createDirectory(currentId, name);
      loadDirectory();
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Could not create folder"
      );
    }
  }

  function openFolder(id: string) {
    router.push(`/drive?id=${id}`);
  }

  return (
    <div className="flex min-h-screen flex-col">

      <Header />

      <div className="flex flex-1">

        <Sidebar />

        <main className="flex-1">
          <Content
            directories={dir?.directories ?? []}
            onOpenFolder={openFolder}
            onCreateFolder={handleCreateFolder}
          />
        </main>

      </div>

    </div>
  );
}