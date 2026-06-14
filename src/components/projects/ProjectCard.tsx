import Link from "next/link";

type Props = {
  title: string;
  description: string;
  slug: string;
};

export default function ProjectCard({
  title,
  description,
  slug,
}: Props) {
  return (
    <Link href={`/projects/${slug}`}>

      <div
        className="
          group
          p-8
          rounded-2xl
          border
          border-zinc-900
          bg-zinc-950
          hover:border-cyan-400/40
          transition-all
          duration-300
        "
      >

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
  );
}