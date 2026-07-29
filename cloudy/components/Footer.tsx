import Link from "next/link";
import Logo from "./ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">

        <div>

          <Logo />

          <p className="mt-3 text-sm text-gray-500">
            Store, organize and access your files securely.
          </p>

        </div>

        <div className="flex gap-6">

          <Link href="#" className="text-gray-600 hover:text-blue-600">
            Features
          </Link>

          <Link href="#" className="text-gray-600 hover:text-blue-600">
            Pricing
          </Link>

          <Link href="#" className="text-gray-600 hover:text-blue-600">
            Contact
          </Link>

        </div>

      </div>

      <div className="border-t py-5 text-center text-sm text-gray-500">
        © 2026 Cloudy. All rights reserved.
      </div>

    </footer>
  );
}