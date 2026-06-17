export default function NewProjectPage() {
  return (
    <main className="max-w-5xl mx-auto px-8 pt-40">

      <h1 className="text-5xl font-black">
        New Project
      </h1>

      <form className="mt-12 space-y-6">

        <input
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

        <button
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

    </main>
  );
}