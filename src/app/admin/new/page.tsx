import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 pt-40 pb-20">
      <h1 className="text-5xl font-black">New Project</h1>

      <form action={createProject} className="mt-12 space-y-6">
        {/* Core Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="title"
            required
            placeholder="Project Title"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
          <input
            name="slug"
            required
            placeholder="Slug (e.g., my-awesome-game)"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <input
          name="tagline"
          placeholder="Tagline (Short elevator pitch)"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
        />

        <textarea
          name="description"
          rows={5}
          placeholder="Detailed Description"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400 resize-none"
        />

        {/* Specs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            name="engine"
            placeholder="Engine / Framework (e.g., Unity, Unreal, Next.js)"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
          <input
            name="role"
            placeholder="Your Role (e.g., Solo Developer, Technical Artist)"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
          <input
            name="duration"
            placeholder="Development Duration (e.g., 3 Months)"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="itch"
            type="url"
            placeholder="Itch.io Game Link (Optional)"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
          <input
            name="github"
            type="url"
            placeholder="GitHub Repository Link (Optional)"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="cover"
            placeholder="Cover Image URL (or path)"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
          <input
            name="trailer"
            placeholder="YouTube Trailer Link / ID (Optional)"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <div>
          <label className="block text-sm text-zinc-500 mb-2">Featured Status</label>
          <select 
            name="featured" 
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
          Create Project
        </button>
      </form>
    </main>
  );
}