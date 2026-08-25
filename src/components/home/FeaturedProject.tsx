import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/projects";

export default async function FeaturedProject() {
  const projects = await getProjects();

  const featuredProjects = projects.filter(
    (project) => project.featured
  );

  if (!featuredProjects.length) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

      {/* ========================= */}
      {/* SECTION HEADER */}
      {/* ========================= */}

      <div className="mb-10">
        <p className="text-cyan-300 uppercase tracking-[0.3em] text-sm">
          Featured Projects
        </p>

        <h2 className="text-4xl md:text-5xl font-black mt-3">
          Selected Work
        </h2>
      </div>

      {/* ========================= */}
      {/* PROJECT GRID */}
      {/* ========================= */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {featuredProjects.map((project) => {
          const cover =
            project.cover || "/defaults/project-cover.png";

          return (
            <article
              key={project.slug}
              className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-950
                transition-all
                duration-500
                hover:-translate-y-2
                hover:border-cyan-400/50
                hover:shadow-[0_20px_60px_rgba(0,0,0,0.45)]
              "
            >

              {/* ========================= */}
              {/* IMAGE */}
              {/* ========================= */}

              <div className="relative aspect-video overflow-hidden">

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

                {/* Dark overlay */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/20
                    transition-all
                    duration-500
                    group-hover:bg-black/70
                  "
                />

                {/* ========================= */}
                {/* FEATURED BADGE */}
                {/* ========================= */}

                <div
                  className="
                    absolute
                    top-5
                    left-5
                    transition-all
                    duration-300
                    group-hover:opacity-0
                  "
                >
                  <span
                    className="
                      rounded-full
                      border
                      border-cyan-400/30
                      bg-black/50
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      uppercase
                      tracking-widest
                      text-cyan-300
                      backdrop-blur-md
                    "
                  >
                    Featured
                  </span>
                </div>

                {/* ========================= */}
                {/* HOVER ACTIONS */}
                {/* ========================= */}

                <div
                  className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    gap-4
                    opacity-0
                    transition-all
                    duration-300
                    group-hover:opacity-100
                  "
                >

                  {/* PLAY */}

                  {project.itch && (
                    <a
                      href={project.itch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-cyan-400
                        px-6
                        py-3
                        font-bold
                        text-black
                        shadow-xl
                        transition-all
                        duration-200
                        hover:scale-105
                        hover:bg-cyan-300
                      "
                    >
                      <span>▶</span>
                      Play
                    </a>
                  )}

                  {/* SOURCE CODE */}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-white/20
                        bg-black/70
                        px-6
                        py-3
                        font-semibold
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-200
                        hover:scale-105
                        hover:border-cyan-400
                        hover:text-cyan-300
                      "
                    >
                      <span>&lt;/&gt;</span>
                      Source Code
                    </a>
                  )}

                </div>

              </div>

              {/* ========================= */}
              {/* PROJECT INFORMATION */}
              {/* ========================= */}

              <Link
                href={`/projects/${project.slug}`}
                className="block p-7"
              >

                <h3
                  className="
                    text-2xl
                    font-black
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-cyan-300
                  "
                >
                  {project.title}
                </h3>

                <p className="mt-3 text-zinc-400 leading-relaxed">
                  {project.tagline}
                </p>

                <div
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-semibold
                    text-cyan-300
                  "
                >
                  View Project

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

    </section>
  );
}