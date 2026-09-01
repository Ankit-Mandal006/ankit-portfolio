import Link from "next/link";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  description: string;
  cover?: string;
  coverPosition?: string;
  itch?: string;
  github?: string;
  engine?: string;
  featured?: boolean;
};

export default function ProjectCard({
  slug,
  title,
  description,
  cover,
  coverPosition = "center",
  itch,
  github,
  engine = "Unity",
  featured = false,
}: Props) {
  return (
    <article
      className="
        group
        relative
        bg-zinc-950
        border
        border-zinc-800
        hover:border-cyan-400/80
        hover:shadow-[0_0_35px_rgba(34,211,238,0.12)]
        transition-all
        duration-500
        hud-clip
        flex
        flex-col
        h-full
        overflow-hidden
      "
    >
      {/* Tactical Top Accent Line with Smooth Fade */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20" />

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
            sizes="(max-width: 1024px) 100vw, 25vw"
            priority={false}
            style={{ objectPosition: coverPosition }}
            className="
              object-cover
              transition-all
              duration-700
              ease-out
              group-hover:scale-105
              group-hover:brightness-50
              group-hover:blur-[1px]
            "
          />
        </Link>

        {/* LIGHT CRT TV SCANLINE & RGB EFFECT (Visible on Hover) */}
        <div
          className="
            absolute
            inset-0
            z-[5]
            pointer-events-none
            opacity-0
            group-hover:opacity-35
            transition-opacity
            duration-500
            bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.45)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))]
            bg-[length:100%_4px,6px_100%]
          "
        />

        {/* Tactical Corner Badge */}
        <div className="absolute top-3 left-3 z-10 font-mono text-[9px] uppercase tracking-widest text-cyan-400 bg-zinc-950/90 border border-cyan-500/40 px-2 py-0.5 backdrop-blur-md hud-clip-sm pointer-events-none">
          // ID: {slug.slice(0, 8).toUpperCase()}
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
      <div className="p-5 flex flex-col justify-between flex-grow font-sans gap-3">
        <div className="space-y-2">
          {/* Category/Engine Tags */}
          <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono font-bold tracking-wider">
            <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hud-clip-sm uppercase">
              {engine}
            </span>
            <span className="px-1.5 py-0.5 bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 hud-clip-sm uppercase">
              {featured ? "Featured" : "Project"}
            </span>
          </div>

          {/* Title */}
          <Link href={`/projects/${slug}`}>
            <h3
              className="
                text-lg
                font-black
                tracking-tight
                text-white
                group-hover:text-cyan-300
                transition-colors
                duration-300
                line-clamp-1
              "
            >
              {title}
            </h3>
          </Link>

          <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Case Study Link */}
        <div className="flex items-center justify-between pt-2 border-t border-zinc-900 group-hover:border-zinc-800/80 transition-colors duration-300">
          <span className="text-[10px] text-zinc-500 font-mono font-medium">Ankit Mandal</span>
          <Link
            href={`/projects/${slug}`}
            className="
              inline-flex
              items-center
              gap-1
              font-mono
              text-[10px]
              uppercase
              tracking-wider
              text-cyan-400
              group-hover:text-cyan-300
              transition-colors
            "
          >
            <span>VIEW CASE STUDY</span>
            <span className="text-cyan-400 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}