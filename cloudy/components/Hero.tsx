
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Cloud,
  Folder,
  Lock,
  Globe,
  Zap,
} from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -right-40 top-0 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-14 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            <Cloud size={16} />
            Secure Cloud Storage
          </div>

          <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl">
            Your files.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Anywhere. Anytime.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
            Upload, organize and access your files securely from anywhere.
            Create folders, manage documents and keep everything synced in
            one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-blue-600 hover:text-blue-600"
            >
              Login
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Lock className="mb-2 text-blue-600" size={21} />
              <h3 className="font-semibold text-slate-900">Secure</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Protected file storage with authentication.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Globe className="mb-2 text-violet-600" size={21} />
              <h3 className="font-semibold text-slate-900">Anywhere</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Access your files from any device anytime.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Zap className="mb-2 text-amber-500" size={21} />
              <h3 className="font-semibold text-slate-900">Fast</h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Upload and manage files with ease.
              </p>
            </div>
          </div>

          <div className="absolute -left-8 top-64 hidden rounded-full bg-white p-4 shadow-xl lg:block">
            <ShieldCheck className="text-blue-600" size={22} />
          </div>
        </div>

        <div className="relative flex justify-center lg:self-start lg:pt-2">
          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-blue-300/30 to-violet-300/30 blur-3xl" />

          <div className="absolute -right-4 -top-6 hidden rounded-full bg-white p-4 shadow-xl lg:block">
            <Folder className="text-amber-500" size={22} />
          </div>

          <div className="relative w-full max-w-[570px] transition duration-500 hover:scale-[1.015]">
            <DashboardPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
