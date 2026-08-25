import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/projects";

export default async function FeaturedProject() {
  const projects = await getProjects();

  const featuredProjects = projects.filter((project) => project.featured);

  if (!featuredProjects.length) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 text-white font-sans">
      {/* ========================= */}
      {/* SECTION HEADER */}
      {/* ========================= */}

      <div className="mb-12 border-l-2 border-cyan-400 pl-4">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // FEATURED_OPERATIONS //
        </p>

        <h2 className="text-4xl md:text-5xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          Featured Projects
        </h2>
      </div>

      {/* ========================= */}
      {/* PROJECT GRID */}
      {/* ========================= */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => {
          const cover = project.cover || "/defaults/project-cover.png";
          const sysId = `PRJ-${String(index + 1).padStart(2, "0")}`;

          return (
            <article
              key={project.slug}
              className="
                group
                relative
                bg-zinc-950/90
                border
                border-cyan-500/30
                shadow-[0_0_20px_rgba(34,211,238,0.05)]
                hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]
                hover:border-cyan-400
                transition-all
                duration-500
                hud-clip
                flex
                flex-col
              "
            >
              {/* Tactical Corner Markers */}
              <span className="absolute top-1 left-1 text-[9px] font-mono text-cyan-500/40 pointer-events-none z-10">┌</span>
              <span className="absolute top-1 right-5 text-[9px] font-mono text-cyan-500/40 pointer-events-none z-10">┐</span>
              <span className="absolute bottom-5 left-1 text-[9px] font-mono text-cyan-500/40 pointer-events-none z-10">└</span>

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              {/* IMAGE CONTAINER */}
              <div className="relative aspect-video overflow-hidden border-b border-zinc-800/80">
                <Image
                  src={cover}
                  alt={project.title}
                  fill
                  sizes="
                    (max-width: 768px) 100vw,
                    (max-width: 1024px) 50vw,
                    33vw
                  "
                  className="
                    object-cover
                    transition-all
                    duration-500
                    group-hover:scale-110
                    group-hover:blur-sm
                  "
                />

                {/* Dark Gradient Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-zinc-950
                    via-zinc-950/40
                    to-transparent
                    opacity-60
                    transition-all
                    duration-500
                    group-hover:bg-zinc-950/85
                    group-hover:opacity-90
                  "
                />

                {/* FEATURED BADGE */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      border
                      border-cyan-400/40
                      bg-zinc-950/80
                      px-2.5
                      py-1
                      text-[10px]
                      font-mono
                      uppercase
                      tracking-widest
                      text-cyan-300
                      backdrop-blur-md
                      group-hover:opacity-0
                      transition-opacity
                      duration-300
                    "
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {sysId} :: FEATURED
                  </span>
                </div>

                {/* HOVER ACTIONS */}
                <div
                  className="
                    absolute
                    inset-0
                    z-20
                    flex
                    flex-col
                    sm:flex-row
                    items-center
                    justify-center
                    gap-3
                    p-4
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:opacity-100
                  "
                >
                  {/* PLAY LINK */}
                  {project.itch && (
                    <a
                      href={project.itch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        items-center
                        gap-2
                        bg-cyan-400
                        px-4
                        py-2.5
                        font-mono
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-black
                        shadow-[0_0_15px_rgba(34,211,238,0.5)]
                        transition-all
                        duration-200
                        hover:scale-105
                        hover:bg-cyan-300
                        hud-clip-sm
                      "
                    >
                      <span>▶</span>
                      PLAY_NOW
                    </a>
                  )}

                  {/* SOURCE CODE LINK */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        items-center
                        gap-2
                        border
                        border-cyan-400/50
                        bg-zinc-900/90
                        px-4
                        py-2.5
                        font-mono
                        text-xs
                        font-bold
                        uppercase
                        tracking-wider
                        text-cyan-300
                        backdrop-blur-md
                        transition-all
                        duration-200
                        hover:scale-105
                        hover:border-cyan-300
                        hover:bg-zinc-800
                        hud-clip-sm
                      "
                    >
                      <span>&lt;/&gt;</span>
                      SOURCE_CODE
                    </a>
                  )}
                </div>
              </div>

              {/* PROJECT INFORMATION */}
              <Link
                href={`/projects/${project.slug}`}
                className="flex-1 flex flex-col justify-between p-6"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-2">
                    <span className="text-cyan-400/80">{sysId}</span>
                    <span className="text-[10px] tracking-widest uppercase text-zinc-400">
                      SYS_ACTIVE
                    </span>
                  </div>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      tracking-tight
                      text-white
                      transition-colors
                      duration-300
                      group-hover:text-cyan-300
                    "
                  >
                    {project.title}
                  </h3>

                  <p className="mt-3 text-sm text-zinc-400 leading-relaxed line-clamp-2">
                    {project.tagline}
                  </p>
                </div>

                <div
                  className="
                    mt-6
                    pt-4
                    border-t
                    border-zinc-900
                    flex
                    items-center
                    justify-between
                    text-xs
                    font-mono
                    font-semibold
                    text-cyan-400
                  "
                >
                  <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300">
                    <span>&gt;</span> EXECUTE_VIEW
                  </span>

                  <span
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-2
                    "
                  >
                    →
                  </span>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {/* ========================= */}
      {/* VIEW ALL PROJECTS OPTION */}
      {/* ========================= */}

      <div className="mt-14 flex justify-center">
        <Link
          href="/projects"
          className="
            group
            inline-flex
            items-center
            gap-3
            border
            border-cyan-500/40
            bg-zinc-950/80
            px-6
            py-3
            font-mono
            text-xs
            font-bold
            uppercase
            tracking-widest
            text-cyan-400
            transition-all
            duration-300
            hover:border-cyan-400
            hover:bg-cyan-400
            hover:text-black
            hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]
            hud-clip-sm
          "
        >
          <span>VIEW_ALL_PROJECTS</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}