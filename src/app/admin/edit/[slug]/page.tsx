import { getProject } from "@/lib/projects";
import { updateProject } from "../../actions";
import Link from "next/link"; // For the cancel button
import ImageUploader from "@/components/admin/ImageUploader";
import GalleryUploader from "@/components/admin/GalleryUploader";

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
        <Link href="/admin" className="text-cyan-400 hover:underline mt-4 inline-block">
          Return to Dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-8 pt-40 pb-24">
      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="text-cyan-300 uppercase tracking-widest">Admin</p>
          <h1 className="text-5xl font-black mt-4">Edit Project</h1>
        </div>
        <Link 
          href="/admin" 
          className="text-sm text-zinc-400 hover:text-white transition-colors"
        >
          Cancel
        </Link>
      </div>

      <form action={updateProject} className="space-y-8">
        {/* Hidden field to keep track of old database lookup handle */}
        <input type="hidden" name="currentSlug" value={project.slug} />

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-zinc-400">Title</label>
            <input
              name="title"
              required
              defaultValue={project.title}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-zinc-400">Slug</label>
            <input
              name="slug"
              required
              defaultValue={project.slug}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-zinc-400">Tagline</label>
          <input
            name="tagline"
            defaultValue={project.tagline}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-zinc-400">Description</label>
          <textarea
            name="description"
            rows={8}
            defaultValue={project.description}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400 resize-none"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-zinc-400">Engine</label>
            <input
              name="engine"
              defaultValue={project.engine}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-zinc-400">Role</label>
            <input
              name="role"
              defaultValue={project.role}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-zinc-400">Duration</label>
            <input
              name="duration"
              defaultValue={project.duration}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
<div className="grid md:grid-cols-2 gap-6">

  <div>
    <label className="block mb-2 font-semibold text-zinc-400">
      Cover Image
    </label>

    <ImageUploader
      name="cover"
      defaultValue={project.cover || ""}
    />
  </div>
<div>
  <label className="block mb-2 font-semibold text-zinc-400">
    Screenshots
  </label>

  <GalleryUploader
    name="screenshots"
    defaultValue={project.screenshots || []}
  />
</div>
  <div>
    <label className="block mb-2 font-semibold text-zinc-400">
      Trailer URL
    </label>

    <input
      name="trailer"
      defaultValue={project.trailer}
      className="
        w-full
        p-4
        rounded-xl
        bg-zinc-900
        border
        border-zinc-800
        focus:outline-none
        focus:border-cyan-400
      "
    />
  </div>

</div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-zinc-400">Itch.io Link</label>
            <input
              name="itch"
              type="url"
              defaultValue={project.itch}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-zinc-400">GitHub Link</label>
            <input
              name="github"
              type="url"
              defaultValue={project.github}
              className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-zinc-400">Featured Status</label>
          <select 
            name="featured" 
            defaultValue={project.featured ? "true" : "false"}
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 focus:outline-none focus:border-cyan-400"
          >
            <option value="false">Standard Project</option>
            <option value="true">Featured Showcase</option>
          </select>
        </div>

        <button
          type="submit"
          className="px-8 py-4 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition-colors"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}