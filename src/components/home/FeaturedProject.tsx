import Link from "next/link";

export default function FeaturedProject() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-24">

      <p className="text-cyan-300 uppercase tracking-widest mb-4">
        Featured Project
      </p>

      <div className="bg-zinc-900 rounded-3xl p-10">

        <h2 className="text-5xl font-black">
          Spy-Fiction
        </h2>

        <p className="mt-6 text-zinc-400 text-lg max-w-3xl">
          A stealth-driven spy thriller where players
          infiltrate hostile facilities, collect
          classified intelligence, avoid detection,
          and uncover hidden conspiracies.
        </p>

        <Link
          href="/projects/spy-fiction"
          className="
            inline-block
            mt-8
            px-8
            py-4
            bg-white
            text-black
            rounded-xl
            font-semibold
          "
        >
          View Case Study
        </Link>

      </div>

    </section>
  );
}