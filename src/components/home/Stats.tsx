export default function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-16">

      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-500">
            Engine
          </p>

          <p className="text-3xl font-bold">
            Unity
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-500">
            Focus
          </p>

          <p className="text-3xl font-bold">
            Stealth
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-500">
            Role
          </p>

          <p className="text-3xl font-bold">
            Solo Dev
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <p className="text-zinc-500">
            Projects
          </p>

          <p className="text-3xl font-bold">
            5+
          </p>
        </div>

      </div>

    </section>
  );
}