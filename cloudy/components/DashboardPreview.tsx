import {
  Cloud,
  Search,
  Upload,
  Folder,
  FileText,
  Image,
  HardDrive,
  MoreVertical,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">


      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-2">
            <Cloud className="text-white" size={20} />
          </div>

          <div>
            <h2 className="font-bold text-slate-900">
              Cloudy
            </h2>

            <p className="text-xs text-slate-500">
              My Drive
            </p>
          </div>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-medium text-white">
          <Upload size={16} />
          Upload
        </button>

      </div>


      <div className="border-b border-slate-200 p-5">

        <div className="flex items-center rounded-xl bg-slate-100 px-4 py-3">

          <Search size={18} className="text-slate-500" />

          <input
            placeholder="Search files..."
            className="ml-3 w-full bg-transparent text-sm outline-none"
          />

        </div>

      </div>


      <div className="grid grid-cols-[180px_1fr]">


        <aside className="border-r border-slate-200 bg-slate-50 p-5">

          <nav className="space-y-2">

            <div className="flex items-center gap-3 rounded-xl bg-blue-100 px-4 py-3 font-medium text-blue-700">
              <Folder size={18} />
              My Drive
            </div>

            <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-white">
              <Image size={18} />
              Photos
            </div>

            <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-white">
              <HardDrive size={18} />
              Backups
            </div>

          </nav>


          <div className="mt-10">

            <div className="flex justify-between text-xs text-slate-500">
              <span>Storage</span>
              <span>48%</span>
            </div>

            <div className="mt-2 h-2 rounded-full bg-slate-200">

              <div className="h-full w-[48%] rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />

            </div>

            <p className="mt-3 text-xs text-slate-500">
              48 GB of 100 GB used
            </p>

          </div>

        </aside>


        <main className="p-6">


          <div className="grid grid-cols-3 gap-4">

            <div className="rounded-2xl border border-slate-200 p-4">

              <p className="text-sm text-slate-500">
                Total Files
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                128
              </h3>

            </div>

            <div className="rounded-2xl border border-slate-200 p-4">

              <p className="text-sm text-slate-500">
                Folders
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                24
              </h3>

            </div>

            <div className="rounded-2xl border border-slate-200 p-4">

              <p className="text-sm text-slate-500">
                Shared
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                8
              </h3>

            </div>

          </div>


          <div className="mt-8">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="text-lg font-bold">
                Recent Files
              </h3>

              <button className="text-sm text-blue-600">
                View all
              </button>

            </div>

            <div className="space-y-3">

              {[
                "Resume.pdf",
                "Project Proposal.docx",
                "Photos.zip",
                "Invoice.pdf",
              ].map((file) => (

                <div
                  key={file}
                  className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50"
                >

                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-blue-100 p-2">

                      <FileText
                        size={18}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <p className="font-medium">
                        {file}
                      </p>

                      <p className="text-xs text-slate-500">
                        Modified 2 hours ago
                      </p>

                    </div>

                  </div>

                  <MoreVertical
                    size={18}
                    className="text-slate-400"
                  />

                </div>

              ))}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}