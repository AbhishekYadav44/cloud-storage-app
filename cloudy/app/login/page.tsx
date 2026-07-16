"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Field from "@/components/Field";
import Button from "@/components/Button";
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
      setError(err instanceof Error ? err.message : "Could not log in");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto mt-20 max-w-sm px-6">
      <h1 className="mb-1 text-xl font-bold text-gray-900">Log in</h1>
      <p className="mb-6 text-sm text-gray-600">Welcome back to Cloudy.</p>

      <form onSubmit={handleSubmit}>
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

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        <Button type="submit" loading={loading} className="w-full">
          Log in
        </Button>
      </form>

      <p className="mt-4 text-sm text-gray-600">
        No account yet?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </main>
  );
}
