"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Cloud } from "lucide-react";
import Field from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { login } from "@/app/services/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/drive");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleLogin() {
    alert("Google Login will be available soon.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600">
              <Cloud className="text-white" size={28} />
            </div>

            <h1 className="mt-5 text-3xl font-bold text-slate-900">
              Welcome Back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your Cloudy account.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.91 2.38 30.37 0 24 0 14.64 0 6.56 5.38 2.6 13.22l7.98 6.2C12.5 13.1 17.8 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.5 24.5c0-1.64-.15-3.21-.43-4.72H24v9.06h12.7c-.55 2.96-2.22 5.47-4.73 7.15l7.28 5.65C43.84 37.39 46.5 31.5 46.5 24.5z"
              />
              <path
                fill="#FBBC05"
                d="M10.58 28.42A14.5 14.5 0 0 1 9.5 24c0-1.53.27-3 .76-4.42l-7.98-6.2A24.01 24.01 0 0 0 0 24c0 3.88.93 7.55 2.58 10.62l8-6.2z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.92-2.13 15.9-5.8l-7.28-5.65c-2.02 1.36-4.6 2.15-8.62 2.15-6.2 0-11.5-3.6-13.42-8.92l-8 6.2C6.56 42.62 14.64 48 24 48z"
              />
            </svg>

            Continue with Google
          </button>
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="mx-4 text-sm text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Field
              id="email"
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Field
              id="password"
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-end">
              <Link
                href="#"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <Button
              type="submit"
              loading={loading}
              className="h-12 w-full"
            >
              Log in
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}