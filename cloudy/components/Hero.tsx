import Link from "next/link";
import { ArrowRight, ShieldCheck, Cloud, Folder } from "lucide-react";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Background Blur */}
      <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -right-40 top-10 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 px-6 py-24 lg:grid-cols-[1.05fr_.95fr]">
        {/* LEFT */}

        <div className="relative">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            <Cloud size={16} />
            Secure Cloud Storage
          </div>

          {/* Heading */}

          <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 lg:text-7xl">
            Store your files.
            <br />

            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Access them anywhere.
            </span>
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
            Upload, organize and access your files from anywhere.
            Cloudy keeps everything synced securely across all your
            devices.
          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-4 font-semibold text-white shadow-lg transition hover:scale-105"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              href="#features"
              className="rounded-xl border border-slate-300 px-7 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Learn More
            </Link>

          </div>

          {/* Stats */}

          <div className="mt-14 flex gap-10">

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                10K+
              </h2>

              <p className="text-slate-500">
                Users
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                99.9%
              </h2>

              <p className="text-slate-500">
                Uptime
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                1 TB
              </h2>

              <p className="text-slate-500">
                Storage
              </p>
            </div>

          </div>

          {/* Floating Icon */}

          <div className="absolute -left-8 top-60 hidden rounded-full bg-white p-4 shadow-xl lg:block">
            <ShieldCheck className="text-blue-600" size={22} />
          </div>

        </div>

        {/* RIGHT */}

        <div className="relative flex justify-center">

          {/* Glow */}

          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-blue-300/30 to-violet-300/30 blur-3xl" />

          {/* Floating Folder */}

          <div className="absolute -right-8 -top-6 hidden rounded-full bg-white p-4 shadow-xl lg:block">
            <Folder className="text-amber-500" size={22} />
          </div>

          {/* Dashboard */}

          <div className="relative w-full max-w-[560px] rotate-2 transition duration-500 hover:rotate-0 hover:scale-105">
            <DashboardPreview />
          </div>

        </div>

      </div>
    </section>
  );
}