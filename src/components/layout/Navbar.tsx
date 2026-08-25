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
        bg-zinc-950/90
        backdrop-blur-md
        border-b
        border-zinc-900
      "
    >
      {/* Top Subtle Cyan HUD Line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
          py-4
          flex
          items-center
          justify-between
        "
      >
        {/* Brand / Logo */}
        <Link
          href="/"
          className="
            group
            flex
            items-center
            gap-2
            font-mono
            font-black
            text-lg
            sm:text-xl
            tracking-wider
            text-white
            hover:text-cyan-400
            transition-colors
          "
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span>ANKIT MANDAL</span>
          <span className="text-cyan-400 font-mono text-xs opacity-70 group-hover:opacity-100 transition-opacity">
            // DEV
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-8 font-mono text-xs uppercase tracking-widest">
          <Link
            href="/projects"
            className="
              relative
              px-3
              py-1.5
              text-zinc-400
              hover:text-cyan-300
              hover:bg-zinc-900
              border
              border-transparent
              hover:border-cyan-500/30
              transition-all
              duration-200
              hud-clip-sm
            "
          >
            &gt; PROJECTS
          </Link>

          <Link
            href="/resume"
            className="
              relative
              px-3
              py-1.5
              text-zinc-400
              hover:text-cyan-300
              hover:bg-zinc-900
              border
              border-transparent
              hover:border-cyan-500/30
              transition-all
              duration-200
              hud-clip-sm
            "
          >
            &gt; RESUME
          </Link>

          <Link
            href="/#contact"
            className="
              px-3.5
              py-1.5
              bg-cyan-500/10
              text-cyan-400
              border
              border-cyan-500/40
              hover:bg-cyan-400
              hover:text-black
              hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]
              font-bold
              transition-all
              duration-200
              hud-clip-sm
            "
          >
            // CONTACT
          </Link>
        </div>
      </div>
    </nav>
  );
}