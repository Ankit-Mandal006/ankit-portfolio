"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        pt-24
        overflow-hidden
      "
    >
      {/* Background Glow */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.15),transparent_60%)]" />

      {/* Decorative Blur */}

      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="relative z-10 max-w-5xl text-center px-6">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            uppercase
            tracking-[0.4em]
            text-cyan-300
            mb-6
          "
        >
          Unity Game Developer
        </motion.p>

        <motion.h1
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: 0.2,
  }}
  className="
    text-7xl
    md:text-9xl
    font-black
    leading-none
  "
>
  ANKIT

  <br />

  <span
    className="
      text-transparent
      bg-clip-text

      bg-gradient-to-r
      from-cyan-300
      to-white
    "
  >
    MANDAL
  </span>
</motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
          }}
          className="
            mt-8
            text-lg
            md:text-xl
            text-zinc-400
            max-w-3xl
            mx-auto
            leading-relaxed
          "
        >
          Designing stealth systems, AI behaviours,
          immersive worlds, and narrative-driven gameplay
          experiences using Unity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.8,
          }}
          className="
            mt-10
            flex
            justify-center
            gap-4
            flex-wrap
          "
        >
          <Link
            href="/projects"
            className="
              px-8
              py-4
              bg-white
              text-black
              rounded-xl
              font-semibold
              transition-all
              hover:scale-105
            "
          >
            View Projects
          </Link>

          <a
            href="/AnkitMandalResume.pdf"
            target="_blank"
            className="
              px-8
              py-4
              border
              border-zinc-700
              rounded-xl
              transition-all
              hover:border-cyan-300
              hover:text-cyan-300
            "
          >
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}