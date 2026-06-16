"use client";

import { motion } from "framer-motion";

const stats = [
  {
    title: "Engine",
    value: "Unity",
  },
  {
    title: "Focus",
    value: "Stealth",
  },
  {
    title: "Role",
    value: "Solo Dev",
  },
  {
    title: "Projects",
    value: "5+",
  },
];

export default function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-16">

      <div className="grid md:grid-cols-4 gap-4">

        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
            }}
            className="
              bg-zinc-900
              p-6
              rounded-xl
              border
              border-zinc-800
            "
          >

            <p className="text-zinc-500">
              {stat.title}
            </p>

            <p className="text-3xl font-bold mt-2">
              {stat.value}
            </p>

          </motion.div>
        ))}

      </div>

    </section>
  );
}