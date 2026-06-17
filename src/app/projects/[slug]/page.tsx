import { getProject } from "@/lib/projects";
import Link from "next/link";
import Image from "next/image";

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
        <h1 className="text-5xl font-black">
          Project Not Found
        </h1>
      </main>
    );
  }

  const cover =
    project.cover ||
    "/defaults/project-cover.png";

  return (
    <main className="max-w-7xl mx-auto px-8 pt-40 pb-24">

      <Link
        href="/projects"
        className="text-cyan-300 hover:text-cyan-200"
      >
        ← Back to Projects
      </Link>

      {/* HERO */}

      <section className="mt-10">

        <p className="text-cyan-300 uppercase tracking-widest">
          Project
        </p>

        <h1 className="text-6xl md:text-8xl font-black mt-4">
          {project.title}
        </h1>

        <p className="text-zinc-400 text-2xl mt-6 max-w-4xl">
          {project.tagline}
        </p>

      </section>

      {/* COVER */}

      <section className="mt-16">

        <div className="relative overflow-hidden rounded-3xl border border-zinc-800">

          <Image
            src={cover}
            alt={project.title}
            width={1600}
            height={900}
            className="w-full object-cover"
          />

        </div>

      </section>

      {/* STATS */}

      <section className="mt-16">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p className="text-zinc-500">
              Engine
            </p>

            <p className="font-bold mt-2">
              {project.engine}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p className="text-zinc-500">
              Role
            </p>

            <p className="font-bold mt-2">
              {project.role}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p className="text-zinc-500">
              Duration
            </p>

            <p className="font-bold mt-2">
              {project.duration}
            </p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <p className="text-zinc-500">
              Platform
            </p>

            <p className="font-bold mt-2">
              PC
            </p>
          </div>

        </div>

      </section>

      {/* OVERVIEW */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold mb-6">
          Overview
        </h2>

        <p className="text-zinc-400 leading-8 text-lg">
          {project.description}
        </p>

      </section>

      {/* TECHNOLOGIES */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold mb-6">
          Technologies
        </h2>

        <div className="flex flex-wrap gap-3">

          {project.technologies?.length ? (
  <div className="flex flex-wrap gap-3">
    {project.technologies.map((tech) => (
      <span
        key={tech}
        className="
          px-4
          py-2
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
        "
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

        </div>

      </section>

      {/* TRAILER */}

      {project.trailer && (
        <section className="mt-20">

          <h2 className="text-4xl font-bold mb-8">
            Gameplay
          </h2>

          <video
            controls
            autoPlay
            muted
            loop
            className="
              w-full
              rounded-3xl
              border
              border-zinc-800
            "
          >
            <source
              src={project.trailer}
              type="video/mp4"
            />
          </video>

        </section>
      )}

      {/* SCREENSHOTS */}

      {project.screenshots &&
        project.screenshots.length > 0 && (
          <section className="mt-20">

            <h2 className="text-4xl font-bold mb-8">
              Gallery
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              {project.screenshots.map(
                (image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`${project.title} Screenshot`}
                    width={1200}
                    height={675}
                    className="
                      rounded-2xl
                      border
                      border-zinc-800
                    "
                  />
                )
              )}

            </div>

          </section>
        )}

      {/* LINKS */}

      <section className="mt-20 flex gap-4 flex-wrap">

        {project.itch && (
          <a
            href={project.itch}
            target="_blank"
            className="
              px-8
              py-4
              bg-white
              text-black
              rounded-xl
              font-semibold
            "
          >
            Play on Itch.io
          </a>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            className="
              px-8
              py-4
              border
              border-zinc-700
              rounded-xl
            "
          >
            View Source
          </a>
        )}

      </section>

    </main>
  );
  
}