import Link from "next/link";
import { createProject } from "../actions";
import NewProjectForm from "@/components/admin/NewProjectForm";

export default function NewProjectPage() {
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
          // ADMIN :: CREATE //
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
          New Project
        </h1>
        <p className="text-zinc-500 font-mono text-sm mt-1">
          Data saved to Supabase · Devlog written to local .md files
        </p>
      </div>

      {/* Form card */}
      <div className="relative bg-zinc-950 border border-zinc-800 p-6 sm:p-10 hud-clip">
        <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent" />
        <NewProjectForm action={createProject} />
      </div>
    </main>
  );
}