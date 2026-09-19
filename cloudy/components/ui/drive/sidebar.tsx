import { Upload, Home, Folder } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r p-4">

      {/* Upload */}
      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700">
        <Upload size={18} />
        Upload
      </button>

      {/* Navigation */}
      <nav className="mt-6 space-y-2">

        <button className="flex w-full items-center gap-3 rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-800">
          <Home size={18} />
          Home
        </button>

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-100">
          <Folder size={18} />
          My Files
        </button>

      </nav>

    </aside>
  );
}