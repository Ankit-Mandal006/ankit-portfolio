import { projects } from "@/data/projects";
import Link from "next/link";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (p) => p.slug === slug
  );

  if (!project) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold">
          Project Not Found
        </h1>

        <Link
          href="/projects"
          className="mt-4 inline-block text-blue-400"
        >
          ← Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <h1 className="text-6xl font-bold">
        {project.title}
      </h1>

      <p className="mt-4 text-zinc-400 text-lg">
        {project.description}
      </p>

      <div className="mt-6 flex gap-3 flex-wrap">
        <span className="px-3 py-1 bg-zinc-800 rounded-full">
          {project.engine}
        </span>

        <span className="px-3 py-1 bg-zinc-800 rounded-full">
          {project.genre}
        </span>

        <span className="px-3 py-1 bg-zinc-800 rounded-full">
          {project.role}
        </span>
      </div>

      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-4">
          What
        </h2>

        <p>
          Explain what the game is, core gameplay loop,
          genre, target audience, and unique selling point.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">
          Why
        </h2>

        <p>
          Explain why you built the project and what
          inspired it.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">
          How
        </h2>

        <p>
          Explain AI systems, stealth mechanics,
          dialogue systems, level design, and tools used.
        </p>
      </section>
    </main>
  );
}