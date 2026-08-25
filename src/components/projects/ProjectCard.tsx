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
        relative
        bg-zinc-950
        border
        border-zinc-800
        hover:border-cyan-500/50
        transition-all
        duration-300
        hud-clip
        flex
        flex-col
        h-full
        overflow-hidden
      "
    >
      {/* Tactical Top Accent Line */}
      <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* IMAGE CONTAINER + HOVER HUD OVERLAY */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-zinc-800/80 bg-zinc-900">
        <Link
          href={`/projects/${slug}`}
          className="absolute inset-0 z-0 block w-full h-full"
          aria-label={`View ${title} project`}
        >
          <Image
            src={cover || "/defaults/project-cover.png"}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
            className="
              object-cover
              object-center
              transition-all
              duration-500
              group-hover:scale-105
              group-hover:brightness-40
              group-hover:blur-[1px]
            "
          />
        </Link>

        {/* Tactical Corner Badge */}
        <div className="absolute top-3 left-3 z-10 font-mono text-[10px] uppercase tracking-widest text-cyan-400 bg-zinc-950/90 border border-cyan-500/40 px-2.5 py-1 backdrop-blur-md hud-clip-sm pointer-events-none">
          // PROJ_ID: {slug.toUpperCase()}
        </div>

        {/* HOVER OVERLAY ACTIONS */}
        <div
          className="
            absolute
            inset-0
            z-10
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
            p-4
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            pointer-events-none
            bg-zinc-950/60
            backdrop-blur-xs
          "
        >
          {/* PLAY LINK */}
          {itch && (
            <a
              href={itch}
              target="_blank"
              rel="noopener noreferrer"
              className="
                pointer-events-auto
                px-4
                py-2
                bg-cyan-400
                text-black
                font-mono
                font-bold
                text-xs
                uppercase
                tracking-wider
                shadow-[0_0_15px_rgba(34,211,238,0.3)]
                hover:bg-cyan-300
                hover:scale-105
                transition-all
                duration-200
                hud-clip-sm
              "
            >
              ▶ PLAY_GAME
            </a>
          )}

          {/* SOURCE CODE LINK */}
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                pointer-events-auto
                px-4
                py-2
                bg-zinc-950/90
                border
                border-zinc-700
                text-zinc-200
                font-mono
                font-bold
                text-xs
                uppercase
                tracking-wider
                backdrop-blur-md
                hover:border-cyan-400
                hover:text-cyan-300
                hover:scale-105
                transition-all
                duration-200
                hud-clip-sm
              "
            >
              &lt;/&gt; SOURCE_CODE
            </a>
          )}
        </div>
      </div>

      {/* PROJECT INFORMATION */}
      <div className="p-6 flex flex-col justify-between flex-grow font-sans">
        <div>
          <h3
            className="
              text-2xl
              font-black
              tracking-tight
              text-white
              group-hover:text-cyan-300
              transition-colors
              duration-200
            "
          >
            {title}
          </h3>

          <p className="mt-3 text-sm text-zinc-400 line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        <Link
          href={`/projects/${slug}`}
          className="
            mt-6
            inline-flex
            items-center
            gap-2
            font-mono
            text-xs
            uppercase
            tracking-widest
            text-cyan-400
            group-hover:text-cyan-300
            transition-colors
          "
        >
          <span>VIEW CASE STUDY</span>
          <span className="text-cyan-400 transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}