import { projects } from "@/data/projects";
import ProjectCard from "@/components/projects/ProjectCard";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <h1 className="text-5xl font-bold mb-12">
        Projects
      </h1>

      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.tagline}
            slug={project.slug}
          />
        ))}
      </div>
    </main>
  );
}