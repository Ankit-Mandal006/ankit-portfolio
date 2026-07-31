import { getProject } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";
import MarkdownRenderer from "@/components/projects/markdown/MarkdownRenderer";

import ProjectGallery from "@/components/projects/ProjectGallery";
import ReadingProgress from "@/components/projects/ReadingProgress";
import BackToTop from "@/components/projects/BackToTop";
import Reveal from "@/components/ui/Reveal";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await getProject(slug);

  if (!project) {
    return (
      <main className="max-w-6xl mx-auto px-8 pt-40">
        <h1 className="text-5xl font-black">Project Not Found</h1>
      </main>
    );
  }

  const cover = project.cover || "/defaults/project-cover.png";

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-36 pb-32">

        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          ← Back to Projects
        </Link>

        {/* Hero Section */}
        <Reveal>
          <section className="mt-10">
            <p className="uppercase tracking-[0.35em] text-cyan-300 text-sm">
              PROJECT
            </p>

            <h1 className="text-5xl md:text-7xl font-black mt-5 leading-tight">
              {project.title}
            </h1>

            <p className="text-zinc-400 text-xl mt-6 max-w-5xl leading-relaxed">
              {project.tagline}
            </p>
          </section>
        </Reveal>

        {/* Cover Image with Hover Controls */}
        <Reveal>
          <section className="mt-16">
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-800 shadow-2xl">
              <Image
                src={cover}
                alt={project.title}
                width={1600}
                height={900}
                priority
                className="w-full object-cover hover:scale-[1.02] transition duration-700 group-hover:blur-sm group-hover:scale-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-8">
                {/* Center Play Button */}
                <div className="flex-1 flex items-center justify-center">
                  {project.itch ? (
                    <a
                      href={project.itch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 rounded-full bg-cyan-400 text-black font-bold text-lg hover:bg-cyan-300 transform hover:scale-105 transition duration-200 shadow-lg"
                    >
                      Play
                    </a>
                  ) : (
                    <span className="px-6 py-3 rounded-full bg-zinc-800/80 text-zinc-400 font-semibold backdrop-blur-md">
                      No Play Link Available
                    </span>
                  )}
                </div>

                {/* Bottom-Left Source Code Link */}
                <div className="flex justify-start">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan-300 font-medium text-base transition-colors duration-200 backdrop-blur-sm bg-black/30 px-4 py-2 rounded-lg"
                    >
                      View Source Code on GitHub →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        {/* Main Layout: Expanded Grid (420px Sidebar) */}
        <section className="mt-20 grid lg:grid-cols-[420px_1fr] gap-12 items-start">

          {/* Sticky & Scrollable Sidebar */}
          <aside className="lg:sticky lg:top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 space-y-8 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

            {/* Quick Metadata Box */}
            <Reveal>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-lg p-8 space-y-6">

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Engine
                  </p>
                  <p className="mt-1 font-bold text-lg">
                    {project.engine || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Role
                  </p>
                  <p className="mt-1 font-bold text-lg">
                    {project.role || "Developer"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Duration
                  </p>
                  <p className="mt-1 font-bold text-lg">
                    {project.duration || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Platform
                  </p>
                  <p className="mt-1 font-bold text-lg">
                    PC
                  </p>
                </div>

                {(project.itch || project.github) && (
                  <div className="pt-4 border-t border-zinc-800 space-y-3">
                    {project.itch && (
                      <a
                        href={project.itch}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center rounded-xl bg-cyan-400 text-black font-semibold py-3 hover:bg-cyan-300 transition"
                      >
                        Play Demo
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center rounded-xl border border-zinc-700 py-3 hover:bg-zinc-800 transition"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}

              </div>
            </Reveal>

            {/* Sidebar Section: Technologies */}
            <Reveal>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-lg p-8">
                <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
                  Technologies
                </h3>

                {project.technologies?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full px-4 py-2 text-sm bg-zinc-900 border border-zinc-800 hover:border-cyan-400 transition"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500 text-sm">
                    Technologies coming soon.
                  </p>
                )}
              </div>
            </Reveal>

            {/* Sidebar Section: Gameplay Video Trailer */}
            {project.trailer && (
              <Reveal>
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-lg p-8">
                  <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
                    Gameplay Trailer
                  </h3>

                  <video
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full rounded-2xl border border-zinc-800"
                  >
                    <source src={project.trailer} type="video/mp4" />
                  </video>
                </div>
              </Reveal>
            )}

            {/* Sidebar Section: Gallery / Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <Reveal>
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-lg p-8">
                  <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
                    Screenshots
                  </h3>

                  <ProjectGallery
                    images={project.screenshots}
                    title={project.title}
                  />
                </div>
              </Reveal>
            )}

          </aside>

          {/* Main Content Area: Devlog */}
          <div className="min-w-0">
            <Reveal>
              <section className="rounded-3xl border border-zinc-800/80 bg-zinc-900/30 p-8 sm:p-12">
                <h2 className="text-4xl font-black mb-10 border-b border-zinc-800 pb-6">
                  Development Log
                </h2>

                <MarkdownRenderer content={project.description} />
              </section>
            </Reveal>
          </div>

        </section>

      </main>
    </>
  );
}