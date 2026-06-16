const skills = [
  "Unity",
  "C#",
  "Game Design",
  "Level Design",
  "AI Systems",
  "Git",
  "GitHub",
  "Blender",
  "Java",
  "Python",
];

export default function Skills() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-24">

      <h2 className="text-5xl font-black mb-8">
        Skills
      </h2>

      <div className="flex flex-wrap gap-4">

        {skills.map((skill) => (
          <div
            key={skill}
            className="
              px-5
              py-3
              rounded-xl
              bg-zinc-900
              border
              border-zinc-800
            "
          >
            {skill}
          </div>
        ))}

      </div>

    </section>
  );
}