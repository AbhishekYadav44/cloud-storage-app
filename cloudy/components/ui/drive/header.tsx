"use client";

import { Cloud, User, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/app/services/users";



export default function Header() {
    const router = useRouter();

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
                router.push("/login");
            });
    }, [router]);

    async function handleLogout() {
        try {
            await logout();
            router.push("/login");
        } catch (err) {
            alert(
                err instanceof Error
                    ? err.message
                    : "Could not logout"
            );
        }
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
            <div className="flex h-20 items-center justify-between px-6">

                <Link
                    href="/drive"
                    className="flex items-center gap-3"
                >
                    <div className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-2">
                        <Cloud
                            className="text-white"
                            size={20}
                        />
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

                <div className="relative">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-100"
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600">
                            <User
                                size={18}
                                className="text-white"
                            />
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                            {user?.name || "User"}
                        </span>

                        {open ? (
                            <ChevronUp
                                size={18}
                                className="text-slate-400"
                            />
                        ) : (
                            <ChevronDown
                                size={18}
                                className="text-slate-400"
                            />
                        )}
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-2 w-48 rounded-lg border bg-white p-2 shadow-lg">

                            {user?.role === "admin" && (
                                <Link
                                    href="/admin"
                                    className="block rounded-md px-3 py-2 text-sm hover:bg-slate-100"
                                >
                                    Admin Panel
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-slate-100"
                            >
                                Logout
                            </button>

                        </div>
                    )}
                </div>

            </div>
        </header>
    );
}