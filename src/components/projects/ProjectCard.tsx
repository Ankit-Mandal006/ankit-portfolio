import Link from "next/link";
import Image from "next/image";

type Props = {
  slug: string;
  title: string;
  description: string;
  cover?: string;
};

export default function ProjectCard({
  slug,
  title,
  description,
  cover,
}: Props) {
  return (
    <Link href={`/projects/${slug}`}>
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
        <Image
          src={cover || "/defaults/project-cover.png"}
          alt={title}
          width={1200}
          height={675}
          className="
            w-full
            h-64
            object-cover
            group-hover:scale-105
            transition-transform
            duration-500
          "
        />

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
      </article>
    </Link>
  );
}