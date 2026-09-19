
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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">

        <div className="flex items-center gap-2">

          <div className="rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 p-1.5">
            <Cloud className="text-white" size={16} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Cloudy
            </h2>

            <p className="text-[10px] text-slate-500">
              My Drive
            </p>
          </div>

        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1.5 text-xs font-medium text-white">
          <Upload size={14} />
          Upload
        </button>

      </div>


      <div className="border-b border-slate-200 p-3">

        <div className="flex items-center rounded-lg bg-slate-100 px-3 py-2">

          <Search size={15} className="text-slate-500" />

          <input
            placeholder="Search files..."
            className="ml-2 w-full bg-transparent text-xs outline-none"
          />

        </div>

      </div>


    
      <div className="grid grid-cols-[145px_1fr]">


    
        <aside className="border-r border-slate-200 bg-slate-50 p-3">

          <nav className="space-y-1">

            <div className="flex items-center gap-2 rounded-lg bg-blue-100 px-3 py-2 text-xs font-medium text-blue-700">
              <Folder size={15} />
              My Drive
            </div>

            <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-white">
              <Image size={15} />
              Photos
            </div>

            <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-600 hover:bg-white">
              <HardDrive size={15} />
              Backups
            </div>

          </nav>


          <div className="mt-7">

            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Storage</span>
              <span>48%</span>
            </div>

            <div className="mt-1.5 h-1.5 rounded-full bg-slate-200">

              <div className="h-full w-[48%] rounded-full bg-gradient-to-r from-blue-600 to-violet-600" />

            </div>

            <p className="mt-2 text-[10px] text-slate-500">
              48 GB of 100 GB used
            </p>

          </div>

        </aside>


        <main className="p-4">

        
          <div className="grid grid-cols-3 gap-3">

            <div className="rounded-xl border border-slate-200 p-3">

              <p className="text-xs text-slate-500">
                Total Files
              </p>

              <h3 className="mt-1 text-xl font-bold">
                128
              </h3>

            </div>

            <div className="rounded-xl border border-slate-200 p-3">

              <p className="text-xs text-slate-500">
                Folders
              </p>

              <h3 className="mt-1 text-xl font-bold">
                24
              </h3>

            </div>

            <div className="rounded-xl border border-slate-200 p-3">

              <p className="text-xs text-slate-500">
                Shared
              </p>

              <h3 className="mt-1 text-xl font-bold">
                8
              </h3>

            </div>

          </div>


        
          <div className="mt-5">

            <div className="mb-3 flex items-center justify-between">

              <h3 className="text-base font-bold">
                Recent Files
              </h3>

              <button className="text-xs text-blue-600">
                View all
              </button>

            </div>


            <div className="space-y-2">

              {[
                "Resume.pdf",
                "Project Proposal.docx",
                "Photos.zip",
                "Invoice.pdf",
              ].map((file) => (

                <div
                  key={file}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 transition hover:bg-slate-50"
                >

                  <div className="flex items-center gap-2">

                    <div className="rounded-md bg-blue-100 p-1.5">

                      <FileText
                        size={15}
                        className="text-blue-600"
                      />

                    </div>

                    <div>

                      <p className="text-xs font-medium">
                        {file}
                      </p>

                      <p className="text-[10px] text-slate-500">
                        Modified 2 hours ago
                      </p>

                    </div>

                  </div>

                  <MoreVertical
                    size={15}
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

