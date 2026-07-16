import { getProject } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

      <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-32">

        {/* Back */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors"
        >
          ← Back to Projects
        </Link>

        {/* Hero */}
        <Reveal>
          <section className="mt-10">
            <p className="uppercase tracking-[0.35em] text-cyan-300 text-sm">
              PROJECT
            </p>

            <h1 className="text-5xl md:text-7xl font-black mt-5 leading-tight">
              {project.title}
            </h1>

            <p className="text-zinc-400 text-xl mt-6 max-w-4xl leading-relaxed">
              {project.tagline}
            </p>
          </section>
        </Reveal>

        {/* Cover */}
        <Reveal>
          <section className="mt-16">
            <div className="overflow-hidden rounded-3xl border border-zinc-800 shadow-2xl">
              <Image
                src={cover}
                alt={project.title}
                width={1600}
                height={900}
                priority
                className="w-full object-cover hover:scale-[1.02] transition duration-700"
              />
            </div>
          </section>
        </Reveal>

        {/* Main Layout */}
        <section className="mt-20 grid lg:grid-cols-[320px_1fr] gap-14">

          {/* Sticky Sidebar */}
          <aside className="lg:sticky lg:top-28 h-fit">

            <Reveal>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-lg p-8 space-y-8">

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Engine
                  </p>

                  <p className="mt-2 font-bold text-lg">
                    {project.engine || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Role
                  </p>

                  <p className="mt-2 font-bold text-lg">
                    {project.role || "Developer"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Duration
                  </p>

                  <p className="mt-2 font-bold text-lg">
                    {project.duration || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-500">
                    Platform
                  </p>

                  <p className="mt-2 font-bold text-lg">
                    PC
                  </p>
                </div>

                {(project.itch || project.github) && (
                  <div className="pt-4 border-t border-zinc-800 space-y-3">

                    {project.itch && (
                      <a
                        href={project.itch}
                        target="_blank"
                        className="block w-full text-center rounded-xl bg-cyan-400 text-black font-semibold py-3 hover:bg-cyan-300 transition"
                      >
                        Play Demo
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        className="block w-full text-center rounded-xl border border-zinc-700 py-3 hover:bg-zinc-800 transition"
                      >
                        GitHub
                      </a>
                    )}

                  </div>
                )}

              </div>
            </Reveal>

          </aside>

          {/* Content */}
          <div className="space-y-24">

            {/* Devlog */}
            <Reveal>
              <section>

                <h2 className="text-4xl font-black mb-10">
                  Development Log
                </h2>

                <article className="prose prose-invert max-w-none chunk-markdown">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {project.description}
                  </ReactMarkdown>
                </article>

              </section>
            </Reveal>

            {/* Technologies */}
            <Reveal>
              <section>

                <h2 className="text-4xl font-black mb-8">
                  Technologies
                </h2>

                {project.technologies?.length ? (
                  <div className="flex flex-wrap gap-4">

                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full px-5 py-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-400 transition"
                      >
                        {tech}
                      </span>
                    ))}

                  </div>
                ) : (
                  <p className="text-zinc-500">
                    Technologies coming soon.
                  </p>
                )}

              </section>
            </Reveal>

            {/* Trailer */}
            {project.trailer && (
              <Reveal>
                <section>

                  <h2 className="text-4xl font-black mb-8">
                    Gameplay
                  </h2>

                  <video
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full rounded-3xl border border-zinc-800"
                  >
                    <source
                      src={project.trailer}
                      type="video/mp4"
                    />
                  </video>

                </section>
              </Reveal>
            )}

            {/* Gallery */}
            {project.screenshots &&
              project.screenshots.length > 0 && (
                <Reveal>
                  <section>

                    <p className="uppercase tracking-[0.35em] text-cyan-300 text-sm">
                      Gallery
                    </p>

                    <h2 className="text-5xl font-black mt-3 mb-10">
                      Screenshots
                    </h2>

                    <ProjectGallery
                      images={project.screenshots}
                      title={project.title}
                    />

                  </section>
                </Reveal>
              )}

          </div>

        </section>

      </main>
    </>
  );
}