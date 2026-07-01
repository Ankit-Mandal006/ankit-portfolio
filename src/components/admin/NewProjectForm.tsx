"use client";

import ImageUploader from "./ImageUploader";
import GalleryUploader from "./GalleryUploader";

type Props = {
  action: (formData: FormData) => void;
};

export default function NewProjectForm({ action }: Props) {
  return (
    <form action={action} className="space-y-8">

      {/* ---------- Basic Info ---------- */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-semibold">
            Project Title
          </label>

          <input
            name="title"
            required
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Slug
          </label>

          <input
            name="slug"
            required
            placeholder="spy-fiction"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />
        </div>

      </div>

      <div>

        <label className="block mb-2 font-semibold">
          Tagline
        </label>

        <input
          name="tagline"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
        />

      </div>

      <div>

        <label className="block mb-2 font-semibold">
          Description (Markdown Supported)
        </label>

        <textarea
          rows={12}
          name="description"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
        />

      </div>

      {/* ---------- Project Info ---------- */}

      <div className="grid md:grid-cols-3 gap-6">

        <div>

          <label className="block mb-2 font-semibold">
            Engine
          </label>

          <input
            name="engine"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Role
          </label>

          <input
            name="role"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            Duration
          </label>

          <input
            name="duration"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

        </div>

      </div>

      {/* ---------- Cover ---------- */}

      <div>

        <label className="block mb-2 font-semibold">
          Cover Image
        </label>

        <ImageUploader
          name="cover"
        />

      </div>

      {/* ---------- Gallery ---------- */}

      <div>

        <label className="block mb-2 font-semibold">
          Screenshot Gallery
        </label>

        <GalleryUploader
          name="screenshots"
        />

      </div>

      {/* ---------- Trailer ---------- */}

      <div>

        <label className="block mb-2 font-semibold">
          Trailer (.mp4 URL)
        </label>

        <input
          name="trailer"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
        />

      </div>

      {/* ---------- Technologies ---------- */}

      <div>

        <label className="block mb-2 font-semibold">
          Technologies
        </label>

        <p className="text-sm text-zinc-500 mb-3">
          Separate each technology with a comma.
        </p>

        <input
          name="technologies"
          placeholder="Unity, C#, Blender, FMOD"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
        />

      </div>

      {/* ---------- Links ---------- */}

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <label className="block mb-2 font-semibold">
            Itch.io
          </label>

          <input
            name="itch"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

        </div>

        <div>

          <label className="block mb-2 font-semibold">
            GitHub
          </label>

          <input
            name="github"
            className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
          />

        </div>

      </div>

      {/* ---------- Featured ---------- */}

      <div>

        <label className="block mb-2 font-semibold">
          Featured
        </label>

        <select
          name="featured"
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800"
        >
          <option value="false">
            Standard Project
          </option>

          <option value="true">
            Featured Project
          </option>

        </select>

      </div>

      {/* ---------- Submit ---------- */}

      <button
        type="submit"
        className="
          px-8
          py-4
          rounded-xl
          bg-cyan-400
          text-black
          font-semibold
          hover:bg-cyan-300
        "
      >
        Create Project
      </button>

    </form>
  );
}