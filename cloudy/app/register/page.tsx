"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Field from "@/components/Field";
import Button from "@/components/Button";
import { sendOtp, register } from "@/app/services/auth";

export default function RegisterPage() {
  const router = useRouter();

 
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await sendOtp(email);
      setStep(2);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send code");
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password, otp);
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto mt-20 max-w-sm px-6">
      <h1 className="mb-1 text-xl font-bold text-gray-900">Create account</h1>
      <p className="mb-6 text-sm text-gray-600">
        {step === 1
          ? "We'll email you a verification code first."
          : `Enter the code we sent to ${email}.`}
      </p>

      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <Field
            id="email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
          <Button type="submit" loading={loading} className="w-full">
            Send code
          </Button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleRegister}>
          <Field
            id="otp"
            label="Verification code"
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Field
            id="name"
            label="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            Create account
          </Button>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-3 text-sm text-gray-500 hover:underline"
          >
            Use a different email
          </button>
        </form>
      )}

      <p className="mt-4 text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </main>
  );
}
