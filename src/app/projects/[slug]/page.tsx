import { getProject } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";
import ProjectTopicViewer from "@/components/projects/ProjectTopicViewer";

import ProjectGallery from "@/components/projects/ProjectGallery";
import ReadingProgress from "@/components/projects/ReadingProgress";
import BackToTop from "@/components/projects/BackToTop";
import Reveal from "@/components/ui/Reveal";

import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description:
      project.tagline || `Detailed devlog and specifications for ${project.title}.`,
    openGraph: {
      title: project.title,
      description: project.tagline,
      images: [
        {
          url: project.cover || "/defaults/project-cover.png",
          width: 1200,
          height: 675,
          alt: project.title,
        },
      ],
    },
  };
}

/**
 * Extracts YouTube video ID from standard, short, embed, or shorts URLs.
 */
function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/;

  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube-nocookie.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}`;
  }
  return null;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <main className="max-w-6xl mx-auto px-6 pt-40 pb-24 text-white font-sans">
        <div className="relative bg-zinc-950 border border-zinc-800 p-12 text-center hud-clip">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-red-500 to-transparent" />
          <p className="text-red-400 font-mono text-xs uppercase tracking-[0.3em] mb-3">
            // ERROR_404: RESOURCE_NOT_FOUND //
          </p>
          <h1 className="text-4xl font-black text-white">Project Not Found</h1>
          <Link
            href="/projects"
            className="mt-8 inline-block font-mono text-xs uppercase tracking-widest text-cyan-400 border border-cyan-500/40 bg-cyan-950/60 px-5 py-2.5 hud-clip-sm hover:bg-cyan-900/50 transition-colors"
          >
            ← Return to Index
          </Link>
        </div>
      </main>
    );
  }

  const cover = project.cover || "/defaults/project-cover.png";
  const embedUrl = project.trailer ? getYouTubeEmbedUrl(project.trailer) : null;

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <main className="max-w-[1600px] mx-auto px-6 lg:px-12 pt-32 md:pt-40 pb-32 text-white font-sans">
        {/* Navigation Back Link */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>←</span>
            <span>[ SYS_BACK / PROJECTS ]</span>
          </Link>
        </div>

        {/* Hero Section */}
        <Reveal>
          <section className="border-l-2 border-cyan-400 pl-4 md:pl-6">
            <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
              // PROJECT_SPECIFICATION //
            </p>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mt-3 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
              {project.title}
            </h1>

            <p className="text-zinc-400 font-mono text-sm md:text-base mt-4 max-w-5xl leading-relaxed">
              {project.tagline}
            </p>
          </section>
        </Reveal>

        {/* Cover Image Container */}
        <Reveal>
          <section className="mt-12">
            <div className="group relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 border border-zinc-800 hud-clip transition-all duration-300 hover:border-cyan-500/50">
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              <div className="absolute top-3 left-3 z-10 font-mono text-[10px] uppercase tracking-widest text-cyan-400 bg-zinc-950/90 border border-cyan-500/40 px-2.5 py-1 backdrop-blur-md hud-clip-sm pointer-events-none">
                // VIEWPORT_STREAM: {slug.toUpperCase()}
              </div>

              <Image
                src={cover}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1600px) 100vw, 1600px"
                className="object-cover object-center transition-all duration-700 group-hover:scale-105 group-hover:brightness-50 group-hover:blur-[1px]"
              />

{/* Overlay: Visible on mobile/touch, triggers on hover for desktop */}
<div className="absolute inset-0 z-10 bg-zinc-950/40 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 sm:p-8 backdrop-blur-sm">
                <div className="flex-1 flex items-center justify-center gap-4">
                  {project.itch ? (
                    <a
                      href={project.itch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-cyan-300 hover:scale-105 transition-all duration-200 hud-clip-sm"
                    >
                      ▶ PLAY_BUILD
                    </a>
                  ) : (
                    <span className="px-5 py-2.5 font-mono text-xs uppercase tracking-wider bg-zinc-900/90 border border-zinc-700 text-zinc-500 backdrop-blur-md hud-clip-sm">
                      [ NO_BUILD_LINK ]
                    </span>
                  )}
                </div>

                {project.github && (
                  <div className="flex justify-start">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs uppercase tracking-wider text-zinc-200 bg-zinc-950/90 border border-zinc-700 px-4 py-2 hover:border-cyan-400 hover:text-cyan-300 backdrop-blur-md transition-all duration-200 hud-clip-sm"
                    >
                      &lt;/&gt; SOURCE_REPOSITORY →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </section>
        </Reveal>

        {/* Layout Grid */}
        <section className="mt-14 grid lg:grid-cols-[400px_1fr] gap-10 items-start">
          {/* Independent Scrollable Sticky Sidebar */}
          <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto lg:pr-2 space-y-6 [scrollbar-width:thin] [scrollbar-color:#27272a_transparent]">
            {/* Metadata Box */}
            <Reveal>
              <div className="relative bg-zinc-950 border border-zinc-800 p-6 hud-clip group hover:border-cyan-500/40 transition-all">
                <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center justify-between mb-6 pb-3 border-b border-zinc-800/80">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors">
                    01 // Telemetry & Specs
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-600">[META]</span>
                </div>

                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hud-clip-sm">
                    <span className="text-zinc-500 uppercase tracking-wider">Engine</span>
                    <span className="text-zinc-100 font-bold">{project.engine || "Unity"}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hud-clip-sm">
                    <span className="text-zinc-500 uppercase tracking-wider">Role</span>
                    <span className="text-zinc-100 font-bold">{project.role || "Developer"}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hud-clip-sm">
                    <span className="text-zinc-500 uppercase tracking-wider">Duration</span>
                    <span className="text-zinc-100 font-bold">{project.duration || "-"}</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hud-clip-sm">
                    <span className="text-zinc-500 uppercase tracking-wider">Target Platform</span>
                    <span className="text-cyan-400 font-bold">PC / WebGL</span>
                  </div>
                </div>

                {(project.itch || project.github) && (
                  <div className="pt-6 mt-6 border-t border-zinc-800/80 space-y-3 font-mono">
                    {project.itch && (
                      <a
                        href={project.itch}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-2.5 bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:bg-cyan-300 transition hud-clip-sm"
                      >
                        ▶ PLAY_DEMO
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-center py-2.5 bg-zinc-900 border border-zinc-700 text-zinc-200 font-bold text-xs uppercase tracking-wider hover:border-cyan-400 hover:text-cyan-300 transition hud-clip-sm"
                      >
                        &lt;/&gt; GITHUB_REPO
                      </a>
                    )}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Tech Stack */}
            <Reveal>
              <div className="relative bg-zinc-950 border border-zinc-800 p-6 hud-clip group hover:border-cyan-500/40 transition-all">
                <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800/80">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors">
                    02 // Tech Stack
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-600">[MODULES]</span>
                </div>

                {project.technologies?.length ? (
                  <div className="flex flex-wrap gap-2 font-mono">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-zinc-300 bg-zinc-900/60 border border-zinc-800 px-3 py-1 hud-clip-sm hover:border-cyan-500/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-500 font-mono text-xs">
                    // NO_TECH_SPECIFIED
                  </p>
                )}
              </div>
            </Reveal>

            {/* Gameplay Trailer */}
            {project.trailer && (
              <Reveal>
                <div className="relative bg-zinc-950 border border-zinc-800 p-6 hud-clip group hover:border-cyan-500/40 transition-all">
                  <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800/80">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors">
                      03 // Gameplay Trailer
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-600">[AV_STREAM]</span>
                  </div>

                  <div className="overflow-hidden border border-zinc-800 hud-clip-sm aspect-video w-full bg-black">
{embedUrl ? (
                      <iframe
                        src={embedUrl}

                        title={`${project.title} Trailer`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    ) : (
                      <video
                        key={project.trailer}
                        src={project.trailer}
                        controls
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Gallery Screenshots */}
            {project.screenshots && project.screenshots.length > 0 && (
              <Reveal>
                <div className="relative bg-zinc-950 border border-zinc-800 p-6 hud-clip group hover:border-cyan-500/40 transition-all">
                  <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800/80">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors">
                      04 // Visual Data / Shots
                    </h3>
                    <span className="text-[10px] font-mono text-zinc-600">[CAP_LOG]</span>
                  </div>

                  <ProjectGallery
                    images={project.screenshots}
                    title={project.title}
                  />
                </div>
              </Reveal>
            )}
          </aside>

          {/* Main Content Area: Topical Devlog Modules */}
          <div className="min-w-0">
            <Reveal>
              <ProjectTopicViewer
                topics={project.topics || []}
                fallbackDescription={project.description}
              />
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}