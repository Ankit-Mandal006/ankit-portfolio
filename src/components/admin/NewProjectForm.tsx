"use client";

import { useFormStatus } from "react-dom";
import ImageUploader from "./ImageUploader";
import GalleryUploader from "./GalleryUploader";
import TopicsEditor from "@/components/admin/TopicsEditor";

type Props = {
  action: (formData: FormData) => Promise<void> | void;
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        px-8
        py-4
        rounded-xl
        bg-cyan-400
        text-black
        font-semibold
        hover:bg-cyan-300
        disabled:opacity-50
        disabled:cursor-not-allowed
        transition-colors
        flex
        items-center
        gap-2
      "
    >
      {pending ? (
        <>
          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          Creating Project...
        </>
      ) : (
        "Create Project"
      )}
    </button>
  );
}

export default function NewProjectForm({ action }: Props) {
  return (
    <form action={action} className="space-y-8">
      {/* ---------- Basic Info ---------- */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-semibold text-zinc-200">
            Project Title
          </label>
          <input
            name="title"
            required
            placeholder="Spy-Fiction"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-zinc-200">
            Slug
          </label>
          <input
            name="slug"
            required
            placeholder="spy-fiction"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-semibold text-zinc-200">
          Tagline
        </label>
        <input
          name="tagline"
          placeholder="A 3D stealth action game in Unity"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
        />
      </div>

      {/* ---------- Project Info ---------- */}
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <label className="block mb-2 font-semibold text-zinc-200">
            Engine
          </label>
          <input
            name="engine"
            placeholder="Unity"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-zinc-200">
            Role
          </label>
          <input
            name="role"
            placeholder="Lead Developer"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-zinc-200">
            Duration
          </label>
          <input
            name="duration"
            placeholder="3 Months"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* ---------- Cover ---------- */}
      <div>
        <label className="block mb-2 font-semibold text-zinc-200">
          Cover Image
        </label>
        <ImageUploader name="cover" />
      </div>

      {/* ---------- Gallery ---------- */}
      <div>
        <label className="block mb-2 font-semibold text-zinc-200">
          Screenshot Gallery
        </label>
        <GalleryUploader name="screenshots" />
      </div>

      {/* ---------- Trailer ---------- */}
      <div>
        <label className="block mb-2 font-semibold text-zinc-200">
          Trailer (YouTube URL or .mp4)
        </label>
        <input
          name="trailer"
          placeholder="https://..."
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
        />
      </div>

      {/* ---------- Technologies ---------- */}
      <div>
        <label className="block mb-2 font-semibold text-zinc-200">
          Technologies
        </label>
        <p className="text-sm text-zinc-500 mb-3">
          Separate each technology with a comma.
        </p>
        <input
          name="technologies"
          placeholder="Unity, C#, Blender, FMOD"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
        />
      </div>

      {/* ---------- Links ---------- */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 font-semibold text-zinc-200">
            Itch.io
          </label>
          <input
            name="itch"
            placeholder="https://..."
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-zinc-200">
            GitHub
          </label>
          <input
            name="github"
            placeholder="https://..."
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* ---------- Featured ---------- */}
      <div>
        <label className="block mb-2 font-semibold text-zinc-200">
          Featured
        </label>
        <select
          name="featured"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-cyan-400 transition-colors"
        >
          <option value="false">Standard Project</option>
          <option value="true">Featured Project</option>
        </select>
      </div>

      {/* ---------- Devlog Topics ---------- */}
      <div>
        <label className="block mb-1 font-semibold text-zinc-200">
          📝 Devlog Topics
        </label>
        <p className="text-sm text-zinc-500 mb-4">
          Add one or more topics (e.g. Overview, Architecture, Post-Mortem). Each topic is saved as a separate <code className="text-cyan-400">.md</code> file under <code className="text-cyan-400">public/projects/[slug]/</code>.
        </p>
        <TopicsEditor name="topics" />
      </div>

      {/* ---------- Submit ---------- */}
      <SubmitButton />
    </form>
  );
}