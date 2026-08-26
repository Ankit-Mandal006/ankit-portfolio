import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { Plus, Pencil, ExternalLink, Star } from "lucide-react";

// Force dynamic rendering so updates to local .md files appear immediately
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-32">
      {/* ── Page Header ── */}
      <div className="relative border-l-2 border-cyan-400 pl-5 mb-12 pt-2">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2 mb-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // ADMIN_CONTROL_PANEL //
        </p>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.15)]">
          Projects
        </h1>
        <p className="text-zinc-500 font-mono text-sm mt-2">
          {projects.length} ENTRIES IN DATABASE
        </p>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Total Projects", value: projects.length, color: "text-white" },
          {
            label: "Featured",
            value: projects.filter((p) => p.featured).length,
            color: "text-cyan-400",
          },
          {
            label: "With Trailers",
            value: projects.filter((p) => p.trailer).length,
            color: "text-teal-300",
          },
          {
            label: "On Itch.io",
            value: projects.filter((p) => p.itch).length,
            color: "text-emerald-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="relative bg-zinc-950 border border-zinc-800 p-4 hud-clip group hover:border-cyan-500/30 transition-all"
          >
            <div className="absolute top-0 left-0 right-4 h-[1px] bg-gradient-to-r from-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-1">
              {stat.label}
            </p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Action Bar ── */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          // PROJECT_INDEX //
        </h2>
        <Link
          href="/admin/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all hud-clip-sm"
        >
          <Plus className="w-4 h-4" />
          [ NEW_PROJECT ]
        </Link>
      </div>

      {/* ── Project Cards ── */}
      {projects.length === 0 ? (
        <div className="relative bg-zinc-950 border border-zinc-800 p-16 text-center hud-clip">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-zinc-700 to-transparent" />
          <p className="text-zinc-600 font-mono text-xs uppercase tracking-widest mb-3">
            // NO_ENTRIES_FOUND //
          </p>
          <p className="text-zinc-500 text-sm">
            No projects yet. Create your first one.
          </p>
          <Link
            href="/admin/new"
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider hud-clip-sm hover:bg-cyan-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create First Project
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              className="group relative bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 transition-all duration-200 hud-clip"
            >
              {/* Hover top accent */}
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-center gap-4 p-4 sm:p-5">
                {/* Index badge */}
                <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-800 group-hover:border-cyan-500/30 font-mono text-xs font-bold text-zinc-500 group-hover:text-cyan-400 transition-colors hud-clip-sm">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Project info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-50 transition-colors truncate">
                      {project.title}
                    </h2>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cyan-400/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] uppercase tracking-widest hud-clip-sm">
                        <Star className="w-2.5 h-2.5" />
                        FEATURED
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1 font-mono text-[11px] text-zinc-500">
                    <span className="text-zinc-600">/projects/</span>
                    <span className="text-cyan-500/80">{project.slug}</span>
                    {project.engine && (
                      <>
                        <span className="text-zinc-700">·</span>
                        <span>{project.engine}</span>
                      </>
                    )}
                    {project.duration && (
                      <>
                        <span className="text-zinc-700">·</span>
                        <span>{project.duration}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* View live */}
                  <Link
                    href={`/projects/${project.slug}`}
                    target="_blank"
                    title="View Live Page"
                    className="p-2 text-zinc-500 hover:text-teal-300 border border-transparent hover:border-zinc-700 transition-all hud-clip-sm"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  {/* Edit */}
                  <Link
                    href={`/admin/edit/${project.slug}`}
                    className="flex items-center gap-1.5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-zinc-300 bg-zinc-900 border border-zinc-700 hover:border-cyan-400 hover:text-cyan-300 transition-all hud-clip-sm"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    [ EDIT ]
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Footer status ── */}
      <div className="mt-16 pt-6 border-t border-zinc-900 flex items-center justify-between font-mono text-[11px] text-zinc-600">
        <span>// ADMIN_SESSION_ACTIVE //</span>
        <span>{projects.length} RECORDS LOADED</span>
      </div>
    </main>
  );
}