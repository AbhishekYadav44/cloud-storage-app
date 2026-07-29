import Link from "next/link";
import { Cloud } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-2">
                <Cloud className="text-white" size={20} />
              </div>

              <span className="text-2xl font-bold text-slate-900">
                Cloudy
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">
              A simple and secure cloud storage application to upload,
              organize and manage your files from anywhere.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="mb-4 font-semibold text-slate-900">
                Quick Links
              </h3>

              <div className="flex flex-col gap-3 text-sm text-slate-600">
                <Link href="/login" className="hover:text-blue-600">
                  Login
                </Link>

                <Link href="/register" className="hover:text-blue-600">
                  Register
                </Link>

                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold text-slate-900">
                Features
              </h3>

              <div className="flex flex-col gap-3 text-sm text-slate-600">
                <p>File Upload</p>
                <p>Folder Management</p>
                <p>Secure Storage</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
          © 2026 Cloudy. Built with Next.js, Node.js and MongoDB.
        </div>
      </div>
    </footer>
  );
}