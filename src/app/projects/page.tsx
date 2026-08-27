import ProjectCard from "@/components/projects/ProjectCard";
import { getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-7xl mx-auto px-6 sm:px-8 pt-32 md:pt-40 pb-24 text-white font-sans">
      {/* Header */}
      <section className="mb-14 border-l-2 border-cyan-400 pl-4 md:pl-6">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // PORTFOLIO_INDEX //
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          Projects
        </h1>

        <p className="text-zinc-400 font-mono text-xs sm:text-sm md:text-base mt-4 max-w-3xl leading-relaxed">
          A collection of games, prototypes, experiments, and interactive experiences developed using Unity & C#.
        </p>
      </section>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            description={project.tagline}
            cover={project.cover}
            itch={project.itch}
            github={project.github}
            engine={project.engine}
            featured={project.featured}
          />
        ))}
      </div>
    </main>
  );
}