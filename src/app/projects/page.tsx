import ProjectCard from "@/components/projects/ProjectCard";
import { getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-7xl mx-auto px-8 pt-40 pb-24">

      <section className="mb-16">

        <p className="text-cyan-300 uppercase tracking-widest">
          Portfolio
        </p>

        <h1 className="text-6xl md:text-7xl font-black mt-4">
          Projects
        </h1>

        <p className="text-zinc-400 text-xl mt-6 max-w-3xl">
          A collection of games, prototypes,
          experiments, and interactive experiences
          developed using Unity.
        </p>

      </section>

      <div className="grid lg:grid-cols-2 gap-8">

        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            title={project.title}
            description={project.tagline}
            cover={project.cover}
          />
        ))}

      </div>

    </main>
  );
}