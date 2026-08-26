import { createAdminClient } from "@/lib/supabaseAdmin";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createAdminClient();

  // 1. Fetch the authenticated user data from the session token
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  // 2. Fetch the current active session meta-data
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const nowInSeconds = Math.floor(Date.now() / 1000);

    if (!session.expires_at) {
      await supabase.auth.signOut();
      redirect("/login");
    }

    const sessionAge = nowInSeconds - session.expires_at + session.expires_in;
    const ALLOWED_LIMIT_SECONDS = 3600;

    if (sessionAge > ALLOWED_LIMIT_SECONDS) {
      await supabase.auth.signOut();
      redirect("/login");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* ── HUD Admin Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 border-b border-zinc-800 backdrop-blur-md">
        {/* Top accent line */}
        <div className="h-[2px] w-full bg-gradient-to-r from-cyan-400 via-teal-300/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-3 flex items-center justify-between">
          {/* Left: Brand */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-mono font-black text-base tracking-wider text-white hover:text-cyan-400 transition-colors"
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              ANKIT MANDAL
              <span className="text-cyan-400 font-mono text-xs opacity-70">
                // ADMIN
              </span>
            </Link>

            {/* Separator */}
            <span className="text-zinc-700 font-mono">|</span>

            {/* Nav links */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
              <Link
                href="/admin"
                className="px-3 py-1.5 text-zinc-400 hover:text-cyan-300 hover:bg-zinc-900 border border-transparent hover:border-cyan-500/30 transition-all hud-clip-sm"
              >
                &gt; DASHBOARD
              </Link>
              <Link
                href="/admin/new"
                className="px-3 py-1.5 text-zinc-400 hover:text-cyan-300 hover:bg-zinc-900 border border-transparent hover:border-cyan-500/30 transition-all hud-clip-sm"
              >
                &gt; NEW PROJECT
              </Link>
              <Link
                href="/projects"
                target="_blank"
                className="px-3 py-1.5 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900 border border-transparent hover:border-zinc-700 transition-all hud-clip-sm"
              >
                &gt; VIEW LIVE ↗
              </Link>
            </div>
          </div>

          {/* Right: Sign Out */}
          <form action={signOut}>
            <button
              type="submit"
              className="px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-zinc-500 border border-zinc-800 hover:border-red-500/40 hover:text-red-400 transition-all hud-clip-sm"
            >
              [ SIGN_OUT ]
            </button>
          </form>
        </div>
      </nav>

      {/* Page content with top padding for fixed nav */}
      <div className="pt-16">{children}</div>
    </div>
  );
}