import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-900 bg-black/70 backdrop-blur-xl">

      <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

        <Link
          href="/"
          className="font-bold text-xl tracking-wide"
        >
          ANKIT
        </Link>

        <div className="flex gap-8 text-zinc-400">

          <Link
            href="/projects"
            className="hover:text-white transition"
          >
            Projects
          </Link>

          <Link
            href="/resume"
            className="hover:text-white transition"
          >
            Resume
          </Link>

          <Link
            href="/contact"
            className="hover:text-white transition"
          >
            Contact
          </Link>

        </div>

      </div>

    </nav>
  );
}