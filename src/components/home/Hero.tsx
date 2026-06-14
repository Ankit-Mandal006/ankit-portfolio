export default function Hero() {
  return (
    <section className="min-h-[90vh] flex items-center justify-center">

      <div className="max-w-5xl text-center px-6">

        <p className="text-zinc-500 uppercase tracking-[0.4em] mb-6">
          Game Developer
        </p>

        <h1 className="text-7xl md:text-8xl font-black leading-none">

          Building
          <br />

          <span className="text-cyan-300">
            Interactive Worlds
          </span>

        </h1>

        <p className="mt-8 text-xl text-zinc-400 max-w-2xl mx-auto">

          Unity Developer focused on stealth gameplay,
          AI systems, narrative design,
          and immersive player experiences.

        </p>

        <div className="mt-10 flex justify-center gap-4">

          <a
            href="/projects"
            className="px-8 py-4 bg-white text-black rounded-xl font-semibold"
          >
            View Projects
          </a>

          <a
            href="/resume"
            className="px-8 py-4 border border-zinc-700 rounded-xl"
          >
            Resume
          </a>

        </div>

      </div>

    </section>
  );
}