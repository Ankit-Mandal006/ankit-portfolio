import Link from "next/link";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  description: string;
  cover?: string;
  itch?: string;
  github?: string;
};

export default function ProjectCard({
  slug,
  title,
  description,
  cover,
  itch,
  github,
}: Props) {
  return (
    <article
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-950
        hover:border-cyan-400/40
        transition-all
        duration-300
      "
    >
      {/* IMAGE + HOVER OVERLAY */}

      <div className="relative h-64 overflow-hidden">

        <Link
          href={`/projects/${slug}`}
          className="absolute inset-0 z-0"
          aria-label={`View ${title} project`}
        >
          <Image
            src={cover || "/defaults/project-cover.png"}
            alt={title}
            width={1200}
            height={675}
            className="
              w-full
              h-full
              object-cover
              transition-all
              duration-500
              group-hover:scale-105
              group-hover:blur-[2px]
              group-hover:brightness-50
            "
          />
        </Link>

        {/* HOVER OPTIONS */}

        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            gap-4
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            pointer-events-none
          "
        >

          {/* PLAY */}

          {itch && (
            <a
              href={itch}
              target="_blank"
              rel="noopener noreferrer"
              className="
                pointer-events-auto
                px-6
                py-3
                rounded-xl
                bg-cyan-400
                text-black
                font-bold
                shadow-xl
                hover:bg-cyan-300
                hover:scale-105
                transition
              "
            >
              ▶ Play
            </a>
          )}

          {/* SOURCE CODE */}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                pointer-events-auto
                px-6
                py-3
                rounded-xl
                bg-zinc-950/90
                border
                border-zinc-600
                text-white
                font-semibold
                backdrop-blur-md
                hover:border-cyan-400
                hover:text-cyan-300
                hover:scale-105
                transition
              "
            >
              &lt;/&gt; Source Code
            </a>
          )}

        </div>

      </div>

      {/* PROJECT INFORMATION */}

      <Link href={`/projects/${slug}`}>
        <div className="p-8">

          <h3
            className="
              text-3xl
              font-bold
              group-hover:text-cyan-300
              transition
            "
          >
            {title}
          </h3>

          <p className="mt-4 text-zinc-400">
            {description}
          </p>

          <p className="mt-6 text-cyan-300">
            View Case Study →
          </p>

        </div>
      </Link>

    </article>
  );
}