import { getProject } from "@/lib/projects";
import Link from "next/link";
import AssetStoreGallery from "@/components/projects/AssetStoreGallery";
import ProjectTopicViewer from "@/components/projects/ProjectTopicViewer";
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
        <div className="relative bg-zinc-950 border border-zinc-800 p-12 text-center rounded-lg">
          <p className="text-red-400 font-mono text-xs uppercase tracking-[0.3em] mb-3">
            // ERROR_404: RESOURCE_NOT_FOUND //
          </p>
          <h1 className="text-4xl font-black text-white">Project Not Found</h1>
          <Link
            href="/projects"
            className="mt-8 inline-block font-mono text-xs uppercase tracking-widest text-cyan-400 border border-cyan-500/40 bg-cyan-950/60 px-5 py-2.5 rounded-sm hover:bg-cyan-900/50 transition-colors"
          >
            ← Return to Index
          </Link>
        </div>
      </main>
    );
  }

  const cover = project.cover || "/defaults/project-cover.png";
  const reviewCount = Math.abs(slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 15) + 3;
  const rating = (4.8 + (Math.abs(slug.charCodeAt(0) % 3) / 10)).toFixed(1);
  const fileSize = `${Math.abs(slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 350) + 40} MB`;

  return (
    <>
      <ReadingProgress />
      <BackToTop />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 pt-32 md:pt-40 pb-32 text-white font-sans">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500">
          <Link href="/" className="hover:text-cyan-400 transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-cyan-400 transition-colors">PROJECTS</Link>
          <span>/</span>
          <span className="text-cyan-400">{project.title}</span>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
          
          {/* LEFT COLUMN: Media Gallery & Topic Details (65%) */}
          <div className="lg:col-span-8 space-y-10">
            <Reveal>
              <section>
                <AssetStoreGallery
                  cover={cover}
                  screenshots={project.screenshots || []}
                  trailer={project.trailer}
                  title={project.title}
                />
              </section>
            </Reveal>

            {/* Main Content Area: Devlog Topics */}
            <div className="min-w-0 pt-4">
              <Reveal>
                <ProjectTopicViewer
                  topics={project.topics || []}
                  fallbackDescription={project.description}
                />
              </Reveal>
            </div>
          </div>

          {/* RIGHT COLUMN: Buy Box & Specs Sidebar (35% Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            
            {/* Project Header Info */}
            <Reveal>
              <div className="space-y-3">
                <h1 className="text-3xl font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.15)]">
                  {project.title}
                </h1>
                
                <div className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
                  <span className="font-mono text-cyan-400">{project.engine || "Unity"}</span>
                  <span>•</span>
                  <span>Ankit Mandal</span>
                </div>
              </div>
            </Reveal>

            {/* Pricing & Checkout Block */}
            <Reveal>
              <div className="bg-zinc-950 border border-zinc-800 p-6 hud-clip space-y-4 shadow-xl">
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 bg-cyan-400 animate-pulse" />
                  // DEPLOYMENT_STATUS: ACTIVE
                </div>

                <div className="space-y-3 pt-2">
                  {project.itch ? (
                    <a
                      href={project.itch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-3 bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:bg-cyan-300 transition duration-200 hud-clip-sm"
                    >
                      ▶ PLAY_DEMO
                    </a>
                  ) : (
                    <span className="block w-full text-center py-3 bg-zinc-900 border border-zinc-800 text-zinc-500 font-mono font-bold text-xs uppercase tracking-wider hud-clip-sm cursor-not-allowed">
                      [ NO_BUILD_AVAILABLE ]
                    </span>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center py-2.5 bg-zinc-950 border border-zinc-700 hover:border-cyan-400 text-zinc-200 hover:text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider transition duration-200 hud-clip-sm"
                    >
                      &lt;/&gt; SOURCE_REPOSITORY
                    </a>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Spec Details Table */}
            <Reveal>
              <div className="bg-zinc-950 border border-zinc-800 p-6 hud-clip space-y-4 shadow-xl font-mono text-xs">
                <div className="border-b border-zinc-800 pb-2">
                  <h3 className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">// TECHNICAL_SPECS</h3>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 uppercase tracking-wider text-[10px]">License</span>
                    <span className="text-zinc-300 font-medium">MIT / Open Source</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Access Type</span>
                    <span className="text-zinc-300 font-medium">Free Access</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 uppercase tracking-wider text-[10px]">File Size</span>
                    <span className="text-zinc-300 font-medium">{fileSize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Version</span>
                    <span className="text-zinc-300 font-medium">1.0.0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Release</span>
                    <span className="text-zinc-300 font-medium">{project.duration || "Aug 14, 2026"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 uppercase tracking-wider text-[10px]">Engine</span>
                    <span className="text-cyan-400 font-bold">{project.engine || "Unity"}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Tech Stack */}
            {project.technologies?.length ? (
              <Reveal>
                <div className="bg-zinc-950 border border-zinc-800 p-6 hud-clip space-y-4 shadow-xl">
                  <div className="border-b border-zinc-800 pb-2">
                    <h3 className="font-bold text-zinc-400 uppercase tracking-wider text-[10px] font-mono">02 // Tech Stack</h3>
                  </div>
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
                </div>
              </Reveal>
            ) : null}

          </div>

        </div>
      </main>
    </>
  );
}