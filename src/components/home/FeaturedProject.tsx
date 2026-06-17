import Link from "next/link";
import { getProjects } from "@/lib/projects";

export default async function FeaturedProject() {
  const projects = await getProjects();

  const featuredProjects =
    projects.filter(
      (project) => project.featured
    );

  return (
    <section
      className="
        max-w-7xl
        mx-auto
        px-8
        py-24
      "
    >
      <p className="text-cyan-300 uppercase tracking-widest mb-4">
        Featured Projects
      </p>

      <div className="grid lg:grid-cols-3 gap-6">

        {featuredProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
          >
            <div
              className="
                bg-zinc-900
                rounded-3xl
                p-8
                border
                border-zinc-800
                hover:border-cyan-400/40
                transition
              "
            >
              <h2 className="text-3xl font-black">
                {project.title}
              </h2>

              <p className="mt-4 text-zinc-400">
                {project.tagline}
              </p>

              <p className="mt-6 text-cyan-300">
                View Project →
              </p>
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}