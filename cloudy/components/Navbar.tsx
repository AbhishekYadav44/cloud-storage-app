
"use client";

import Link from "next/link";
import { Menu, Cloud } from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "@/app/services/users";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState<{
        name: string;
        role: string;
    } | null>(null);

    useEffect(() => {
        getCurrentUser()
            .then((data) => {
                setUser(data);
            })
            .catch(() => {
                setUser(null);
            });
    }, []);

    async function handleLogout() {
        try {
            await logout();
            setUser(null);
            setOpen(false);
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Could not logout"
            );
        }
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                <Link href="/" className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-2">
                        <Cloud className="text-white" size={20} />
                    </div>

                    <span className="text-2xl font-bold text-slate-900">
                        Cloudy
                    </span>
                </Link>

                <nav className="hidden items-center gap-10 text-[15px] font-medium text-slate-600 lg:flex">

                    <Link href="#features" className="transition hover:text-blue-600">
                        Features
                    </Link>

                    <Link href="#pricing" className="transition hover:text-blue-600">
                        Pricing
                    </Link>

                    <Link href="#about" className="transition hover:text-blue-600">
                        About
                    </Link>

                    <Link href="#contact" className="transition hover:text-blue-600">
                        Contact
                    </Link>

                </nav>

                <div className="hidden items-center gap-4 lg:flex">

                    {user ? (
                        <>
                            <button onClick={handleLogout} className="rounded-xl px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100">
                                Logout
                            </button>

                            <Link href="/drive" className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:scale-105 hover:translate-y-0.5">
                                Go to Drive
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="rounded-xl px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-100">
                                Login
                            </Link>

                            <Link href="/register" className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 font-medium text-white shadow-lg transition-all hover:scale-105 hover:translate-y-0.5">
                                Get Started
                            </Link>
                        </>
                    )}

                </div>

                <button onClick={() => setOpen(!open)} className="rounded-lg p-2 hover:bg-slate-100 lg:hidden">
                    <Menu size={24} />
                </button>

            </div>

            {open && (
                <div className="border-t border-slate-200 bg-white lg:hidden">
                    <div className="flex flex-col px-6 py-5">

                        <Link href="#features" className="py-3 text-slate-700" onClick={() => setOpen(false)}>
                            Features
                        </Link>

                        <Link href="#pricing" className="py-3 text-slate-700" onClick={() => setOpen(false)}>
                            Pricing
                        </Link>

                        <Link href="#about" className="py-3 text-slate-700" onClick={() => setOpen(false)}>
                            About
                        </Link>

                        <Link href="#contact" className="py-3 text-slate-700" onClick={() => setOpen(false)}>
                            Contact
                        </Link>

                        <hr className="my-4" />

                        {user ? (
                            <>
                                <button onClick={handleLogout} className="rounded-xl px-5 py-2.5 text-left font-medium text-slate-700 transition hover:bg-slate-100">
                                    Logout
                                </button>

                                <Link href="/drive" className="mt-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-center font-medium text-white shadow-lg transition-all hover:scale-105 hover:translate-y-0.5" onClick={() => setOpen(false)}>
                                    Go to Drive
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="py-3 font-medium text-slate-700" onClick={() => setOpen(false)}>
                                    Login
                                </Link>

                                <Link href="/register" className="mt-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-center font-medium text-white" onClick={() => setOpen(false)}>
                                    Get Started
                                </Link>
                            </>
                        )}

                    </div>
                </div>
            )}
        </header>
    );
}
