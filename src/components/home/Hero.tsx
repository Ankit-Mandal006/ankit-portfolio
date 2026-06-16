export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_60%)]" />

      <div className="relative max-w-5xl text-center px-6">

        <p className="uppercase tracking-[0.4em] text-cyan-300 mb-6">
          Unity Game Developer
        </p>

        <h1 className="text-7xl md:text-9xl font-black leading-none">

          ANKIT

          <br />

          <span className="text-zinc-300">
            MANDAL
          </span>

        </h1>

        <p className="mt-8 text-xl text-zinc-400 max-w-2xl mx-auto">

          Designing stealth systems,
          immersive worlds,
          and narrative-driven gameplay.

        </p>

      </div>

    </section>
  );
}