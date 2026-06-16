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
        <h1 className="text-5xl font-bold">
          Project Not Found
        </h1>

        <Link
          href="/projects"
          className="text-cyan-300 mt-6 inline-block"
        >
          ← Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-8 py-16">

      {/* HERO */}

      <section>

        <p className="text-cyan-300 uppercase tracking-widest">
          Featured Project
        </p>

        <h1 className="text-7xl font-black mt-4">
          {project.title}
        </h1>

        <p className="text-2xl text-zinc-400 mt-6">
          {project.tagline}
        </p>

        <div className="flex gap-4 mt-8 flex-wrap">

          <a
            href={project.itch}
            target="_blank"
            className="
              px-6 py-3
              bg-white
              text-black
              rounded-xl
              font-semibold
            "
          >
            Play Demo
          </a>

          <a
            href={project.github}
            target="_blank"
            className="
              px-6 py-3
              border
              border-zinc-700
              rounded-xl
            "
          >
            GitHub
          </a>

        </div>

      </section>

      {/* COVER IMAGE */}

      <section className="mt-16">

        <img
          src="/projects/spy-fiction/cover.png"
          alt="Spy Fiction Cover"
          className="
            w-full
            rounded-3xl
            border
            border-zinc-800
          "
        />

      </section>

      {/* TECH STACK */}

      <section className="mt-16">

        <h2 className="text-3xl font-bold mb-6">
          Technologies
        </h2>

        <div className="flex flex-wrap gap-3">

          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="
                px-4
                py-2
                rounded-lg
                bg-zinc-900
              "
            >
              {tech}
            </span>
          ))}

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

      {/* WHAT */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold mb-6">
          What
        </h2>

        <p className="text-zinc-400 leading-8">
          Spy-Fiction is a stealth-driven spy thriller
          where players infiltrate hostile facilities,
          recover classified intelligence, avoid enemy
          patrols, and uncover hidden conspiracies.
        </p>

      </section>

      {/* WHY */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold mb-6">
          Why
        </h2>

        <p className="text-zinc-400 leading-8">
          The project was created to explore stealth
          gameplay, enemy AI systems, environmental
          storytelling, and narrative-driven level
          design while building a complete commercial
          quality game prototype.
        </p>

      </section>

      {/* HOW */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold mb-6">
          How
        </h2>

        <div className="space-y-8">

          <div>
            <h3 className="text-2xl font-bold">
              Enemy AI
            </h3>

            <p className="text-zinc-400 mt-2">
              Patrol routes, detection systems,
              investigation states, and stealth
              awareness mechanics.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              Dialogue System
            </h3>

            <p className="text-zinc-400 mt-2">
              Interactive dialogue and story delivery
              through documents and conversations.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              Level Design
            </h3>

            <p className="text-zinc-400 mt-2">
              Designed around player choice,
              exploration, and stealth-focused
              navigation paths.
            </p>
          </div>

        </div>

      </section>

      {/* CHALLENGES */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold mb-6">
          Challenges
        </h2>

        <ul className="space-y-4 text-zinc-400">

          <li>
            • Balancing stealth gameplay and player
            freedom.
          </li>

          <li>
            • Designing AI that feels intelligent
            without becoming frustrating.
          </li>

          <li>
            • Integrating story progression into
            gameplay exploration.
          </li>

        </ul>

      </section>

      {/* LESSONS */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold mb-6">
          Lessons Learned
        </h2>

        <p className="text-zinc-400 leading-8">
          Through Spy-Fiction I improved my skills in
          Unity architecture, AI programming,
          narrative design, debugging large systems,
          and managing a long-term solo game
          development project.
        </p>

      </section>

      {/* SCREENSHOTS */}

      <section className="mt-20">

        <h2 className="text-4xl font-bold mb-8">
          Screenshots
        </h2>

        <div className="grid md:grid-cols-3 gap-4">

          <img
            src="/projects/spy-fiction/screenshot 1.png"
            alt=""
            className="rounded-xl border border-zinc-800"
          />

          <img
            src="/projects/spy-fiction/screenshot 2.png"
            alt=""
            className="rounded-xl border border-zinc-800"
          />

          <img
            src="/projects/spy-fiction/screenshot 3.png"
            alt=""
            className="rounded-xl border border-zinc-800"
          />

          <img
            src="/projects/spy-fiction/screenshot 4.png"
            alt=""
            className="rounded-xl border border-zinc-800"
          />

        </div>

      </section>

    </main>
  );
}