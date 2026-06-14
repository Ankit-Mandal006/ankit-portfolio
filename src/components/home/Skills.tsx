export default function Skills() {
  const skills = [
    "Unity",
    "C#",
    "Game Design",
    "AI Systems",
    "Blender",
    "Git",
    "Level Design",
    "Narrative Design",
  ];

  return (
    <section className="max-w-6xl mx-auto px-8 py-24">

      <h2 className="text-4xl font-bold mb-8">
        Technical Skills
      </h2>

      <div className="flex flex-wrap gap-4">

        {skills.map((skill) => (
          <div
            key={skill}
            className="px-4 py-2 bg-zinc-900 rounded-lg"
          >
            {skill}
          </div>
        ))}

      </div>

    </section>
  );
}