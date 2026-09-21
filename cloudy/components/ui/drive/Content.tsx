type DirEntry = {
    id: string;
    name: string;
};

type ContentProps = {
    directories: DirEntry[];
    onOpenFolder: (id: string) => void;
    onCreateFolder: () => void;
};

export default function Content({
    directories,
    onOpenFolder,
    onCreateFolder,
}: ContentProps) {
    return (
        <div className="p-6">

            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold text-slate-900">
                    My Files
                </h1>
                <button
                    onClick={onCreateFolder}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    + New Folder
                </button>
            </div>

           
            <div className="mt-6 grid grid-cols-3 gap-4">
                {directories.map((folder) => (
                    <button
                        key={folder.id}
                        onClick={() => onOpenFolder(folder.id)}
                        className="rounded-lg border p-4 text-left hover:bg-slate-50"
                    >
                        📁 {folder.name}
                    </button>
                ))}
            </div>

        </div>
    );
}