import Link from "next/link";
import { getProjects } from "@/lib/projects";

export default async function AdminPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-7xl mx-auto px-8 pt-40 pb-24">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-cyan-300 uppercase tracking-widest">
            Admin Dashboard
          </p>

          <h1 className="text-6xl font-black mt-4">
            Projects
          </h1>
        </div>

        <Link
          href="/admin/new"
          className="
            px-6
            py-3
            bg-cyan-400
            text-black
            rounded-xl
            font-semibold
          "
        >
          + New Project
        </Link>

      </div>

      <div className="mt-12 space-y-4">

        {projects.map((project) => (

          <div
            key={project.slug}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-6

              flex
              items-center
              justify-between
            "
          >

            <div>

              <h2 className="text-2xl font-bold">
                {project.title}
              </h2>

              <p className="text-zinc-400 mt-2">
                {project.slug}
              </p>

            </div>

            <div className="flex gap-3">

              {project.featured && (
                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-cyan-400/20
                    text-cyan-300
                  "
                >
                  Featured
                </span>
              )}

              <Link
                href={`/admin/edit/${project.slug}`}
                className="
                  px-4
                  py-2
                  rounded-lg
                  bg-zinc-800
                "
              >
                Edit
              </Link>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}