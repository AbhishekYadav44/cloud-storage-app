"use client"

import { Cloud, User, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [open, setOpen] = useState(false)
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
            <div className="flex h-20 items-center justify-between px-6">


                <Link href="/drive" className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-2">
                        <Cloud className="text-white" size={20} />
                    </div>

                    <span className="text-2xl font-bold text-slate-900">
                        Cloudy
                    </span>
                </Link>


                <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4">
                    <input
                        type="text"
                        placeholder="Search files..."
                        className="w-80 bg-transparent py-3 text-sm text-slate-700 outline-none"
                    />
                </div>


                <button onClick={() => setOpen(!open)} className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-100">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600">
                        <User size={18} className="text-white" />
                    </div>


                    <span className="text-sm font-medium text-slate-700">
                        Abhishek
                    </span>


                    {open ? (
                        <ChevronUp size={18} className="text-slate-400" />
                    ) : (
                        <ChevronDown size={18} className="text-slate-400" />
                    )}
                </button>

            </div>
        </header>
    );
}