import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Cloudy</h1>
      <p className="mx-auto mt-3 max-w-md text-gray-600">
        A simple place to upload files, organize them into folders, and get
        to them from any device.
      </p>

      <div className="mt-8 flex items-center justify-center gap-3">
        <Link
          href="/register"
          className="rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create account
        </Link>
        <Link
          href="/login"
          className="rounded border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Log in
        </Link>
      </div>
    </main>
  );
}
