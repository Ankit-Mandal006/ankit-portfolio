import Link from "next/link";

export default function FeaturedProject() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-24">

      <p className="text-cyan-300 uppercase tracking-widest mb-4">
        Featured Project
      </p>

      <div
        className="
          border
          border-zinc-900
          rounded-3xl
          p-12
          bg-zinc-950
        "
      >

        <h2 className="text-6xl font-black">
          Spy-Fiction
        </h2>

        <p className="mt-6 max-w-3xl text-zinc-400 text-lg">
          A stealth-driven spy thriller where players
          infiltrate hostile facilities, collect
          classified intelligence, and uncover
          dangerous conspiracies.
        </p>

        <div className="mt-8">

          <Link
            href="/projects/spy-fiction"
            className="
              inline-block
              px-8
              py-4
              rounded-xl
              bg-white
              text-black
              font-semibold
            "
          >
            View Project
          </Link>

        </div>

      </div>

    </section>
  );
}