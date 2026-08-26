import { getProject } from "@/lib/projects";
import { updateProject } from "../../actions";
import Link from "next/link";
import EditProjectForm from "@/components/admin/EditProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <main className="max-w-5xl mx-auto px-6 sm:px-8 pt-12 pb-32">
        <div className="relative bg-zinc-950 border border-red-500/30 p-12 text-center hud-clip">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-red-500 to-transparent" />
          <p className="text-red-400 font-mono text-xs uppercase tracking-[0.3em] mb-3">
            // ERROR_404: PROJECT_NOT_FOUND //
          </p>
          <h1 className="text-4xl font-black text-white">Not Found</h1>
          <Link
            href="/admin"
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 border border-cyan-500/40 bg-cyan-950/60 px-5 py-2.5 hud-clip-sm hover:bg-cyan-900/50 transition-colors"
          >
            ← Return to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-8 pt-12 pb-32">
      {/* Header */}
      <div className="relative border-l-2 border-cyan-400 pl-5 mb-10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 hover:text-cyan-400 transition-colors mb-3"
        >
          ← [ BACK_TO_DASHBOARD ]
        </Link>
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] mb-1">
          // ADMIN :: EDIT //
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          {project.title}
        </h1>
        <p className="text-zinc-500 font-mono text-sm mt-1">
          Slug: <span className="text-cyan-500">{project.slug}</span>
        </p>
      </div>

      {/* Form card */}
      <div className="relative bg-zinc-950 border border-zinc-800 p-6 sm:p-10 hud-clip">
        <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent" />
        <EditProjectForm project={project} updateAction={updateProject} />
      </div>
    </main>
  );
}