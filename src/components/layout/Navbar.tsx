import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-300
        backdrop-blur-md
        ${scrolled 
          ? "bg-zinc-950/95 border-b border-cyan-500/20 shadow-[0_4px_20px_rgba(34,211,238,0.08)] py-3" 
          : "bg-zinc-950/70 border-b border-zinc-900 py-4"}
      `}
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          sm:px-8
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
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>ANKIT MANDAL</span>
          <span className="text-cyan-400 font-mono text-xs opacity-70 group-hover:opacity-100 transition-opacity">
            // ONLINE
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest">
          <Link
            href="/projects"
            className={`
              relative
              px-3
              py-1.5
              transition-all
              duration-200
              hud-clip-sm
              border
              ${pathname === "/projects"
                ? "text-cyan-300 bg-cyan-950/20 border-cyan-500/40 shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                : "text-zinc-400 hover:text-cyan-300 hover:bg-zinc-900 border-transparent hover:border-cyan-500/30"}
            `}
          >
            &gt; PROJECTS
          </Link>

          <Link
            href="/resume"
            className={`
              relative
              px-3
              py-1.5
              transition-all
              duration-200
              hud-clip-sm
              border
              ${pathname === "/resume"
                ? "text-cyan-300 bg-cyan-950/20 border-cyan-500/40 shadow-[0_0_10px_rgba(34,211,238,0.15)]"
                : "text-zinc-400 hover:text-cyan-300 hover:bg-zinc-900 border-transparent hover:border-cyan-500/30"}
            `}
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
              border-cyan-500/45
              hover:bg-cyan-400
              hover:text-black
              hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]
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