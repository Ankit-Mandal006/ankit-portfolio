"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="
        fixed
        top-0
        left-0
        right-0
        z-50

        backdrop-blur-md
        bg-black/30

        border-b
        border-zinc-900
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-8
          py-5

          flex
          items-center
          justify-between
        "
      >
        <Link
          href="/"
          className="
            font-black
            text-xl
            tracking-wider
          "
        >
          ANKIT
        </Link>

        <div className="flex gap-8">

          <Link
            href="/projects"
            className="
              text-zinc-400
              hover:text-cyan-300
              transition
            "
          >
            Projects
          </Link>

          <Link
            href="/resume"
            className="
              text-zinc-400
              hover:text-cyan-300
              transition
            "
          >
            Resume
          </Link>

        </div>
      </div>
    </nav>
  );
}