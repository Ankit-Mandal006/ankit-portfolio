import { getProject } from "@/lib/projects";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <main className="max-w-5xl mx-auto px-8 pt-40">
        <h1 className="text-5xl font-black">Project Not Found</h1>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-8 pt-40 pb-24">
      <div className="mb-12">
        <p className="text-cyan-300 uppercase tracking-widest">Admin</p>
        <h1 className="text-5xl font-black mt-4">Edit Project</h1>
      </div>

      <form action={updateProject} className="space-y-8">
        {/* Hidden field to keep track of old database lookup handle */}
        <input type="hidden" name="currentSlug" value={project.slug} />

        <div>
          <label className="block mb-2 font-semibold">Title</label>
          <input
            name="title"
            defaultValue={project.title}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Slug</label>
          <input
            name="slug"
            defaultValue={project.slug}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Tagline</label>
          <input
            name="tagline"
            defaultValue={project.tagline}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            rows={8}
            defaultValue={project.description}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2">Engine</label>
            <input
              name="engine"
              defaultValue={project.engine}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
            />
          </div>

          <div>
            <label className="block mb-2">Role</label>
            <input
              name="role"
              defaultValue={project.role}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
            />
          </div>

          <div>
            <label className="block mb-2">Duration</label>
            <input
              name="duration"
              defaultValue={project.duration}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Cover Image URL</label>
          <input
            name="cover"
            defaultValue={project.cover}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

        <div>
          <label className="block mb-2">Trailer URL</label>
          <input
            name="trailer"
            defaultValue={project.trailer}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

        <div>
          <label className="block mb-2">Itch.io Link</label>
          <input
            name="itch"
            defaultValue={project.itch}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

        <div>
          <label className="block mb-2">GitHub Link</label>
          <input
            name="github"
            defaultValue={project.github}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

        <button
          type="submit"
          className="px-8 py-4 rounded-xl bg-cyan-400 text-black font-semibold"
        >
          Save Project
        </button>
      </form>
    </main>
  );
}