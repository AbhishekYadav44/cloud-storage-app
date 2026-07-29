"use client";

import Link from "next/link";
import { Menu, Cloud } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-2">
            <Cloud className="text-white" size={20} />
          </div>

          <span className="text-2xl font-bold text-slate-900">
            Cloudy
          </span>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-10 text-[15px] font-medium text-slate-600 lg:flex">

          <Link
            href="#features"
            className="transition hover:text-blue-600"
          >
            Features
          </Link>

          <Link
            href="#pricing"
            className="transition hover:text-blue-600"
          >
            Pricing
          </Link>

          <Link
            href="#about"
            className="transition hover:text-blue-600"
          >
            About
          </Link>

          <Link
            href="#contact"
            className="transition hover:text-blue-600"
          >
            Contact
          </Link>

        </nav>

        {/* Right */}

        <div className="hidden items-center gap-4 lg:flex">

          <Link
            href="/login"
            className="rounded-xl px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-medium text-white shadow-lg transition hover:scale-105"
          >
            Get Started
          </Link>

        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="flex flex-col px-6 py-5">

            <Link
              href="#features"
              className="py-3 text-slate-700"
            >
              Features
            </Link>

            <Link
              href="#pricing"
              className="py-3 text-slate-700"
            >
              Pricing
            </Link>

            <Link
              href="#about"
              className="py-3 text-slate-700"
            >
              About
            </Link>

            <Link
              href="#contact"
              className="py-3 text-slate-700"
            >
              Contact
            </Link>

            <hr className="my-4" />

            <Link
              href="/login"
              className="py-3 font-medium text-slate-700"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="mt-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-center font-medium text-white"
            >
              Get Started
            </Link>

          </div>
        </div>
      )}
    </header>
  );
}