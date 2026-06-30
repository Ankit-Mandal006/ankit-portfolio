"use client";

import ImageUploader from "./ImageUploader";

type Props = {
  action: (formData: FormData) => void;
};

export default function NewProjectForm({
  action,
}: Props) {
  return (
    <form action={action} className="mt-12 space-y-6">

      <div>
        <label className="block mb-2 font-semibold">
          Cover Image
        </label>

        <ImageUploader
          name="cover"
        />
      </div>

      <input
        name="title"
        required
        placeholder="Project Title"
        className="
          w-full
          p-4
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
        "
      />

      <input
        name="slug"
        required
        placeholder="Slug"
        className="
          w-full
          p-4
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
        "
      />

      <input
        name="tagline"
        placeholder="Tagline"
        className="
          w-full
          p-4
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
        "
      />

      <textarea
        name="description"
        rows={8}
        placeholder="Description"
        className="
          w-full
          p-4
          rounded-xl
          bg-zinc-900
          border
          border-zinc-800
        "
      />

      <button
        type="submit"
        className="
          px-8
          py-4
          rounded-xl
          bg-cyan-400
          text-black
          font-semibold
        "
      >
        Create Project
      </button>

    </form>
  );
}