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
          relative
          overflow-hidden

          p-8

          rounded-3xl

          border
          border-zinc-800

          bg-zinc-950

          transition-all
          duration-300

          hover:-translate-y-2
          hover:border-cyan-400/50
          hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]
        "
      >

        {/* Glow Effect */}

        <div
          className="
            absolute
            inset-0

            opacity-0
            group-hover:opacity-100

            transition-opacity
            duration-500

            bg-gradient-to-br
            from-cyan-400/5
            to-transparent
          "
        />

        {/* Content */}

        <div className="relative z-10">

          <h3
            className="
              text-3xl
              font-bold

              transition-colors
              duration-300

              group-hover:text-cyan-300
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-4
              text-zinc-400
              leading-relaxed
            "
          >
            {description}
          </p>

          <div
            className="
              mt-8

              flex
              items-center
              gap-2

              text-cyan-300
              font-medium
            "
          >

            <span>
              View Case Study
            </span>

            <span
              className="
                transition-transform
                duration-300

                group-hover:translate-x-2
              "
            >
              →
            </span>

          </div>

        </div>

      </div>

    </Link>
  );
}