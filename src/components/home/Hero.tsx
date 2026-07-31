"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Gamepad2, Palette, Mail } from "lucide-react";

// Custom GitHub SVG Icon
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

// Custom LinkedIn SVG Icon
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function Hero() {
  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/ankit-mandal006",
      icon: GithubIcon,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/ankit-mandal-724890359/",
      icon: LinkedinIcon,
    },
    {
      name: "Itch.io",
      href: "https://ankit-mandal006.itch.io/",
      icon: Gamepad2,
    },
    {
      name: "ArtStation",
      href: "https://www.artstation.com/ankitmandal006/albums/14439986",
      icon: Palette,
    },
    {
      name: "Email",
      href: "mailto:mandal.ankit190506@gmail.com",
      icon: Mail,
    },
  ];

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
          Designing stealth systems, AI behaviours, immersive worlds, and
          narrative-driven gameplay experiences using Unity.
        </motion.p>

        {/* Primary Action Buttons */}
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
            rel="noopener noreferrer"
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

        {/* Professional Social Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.0,
          }}
          className="
            mt-12
            flex
            items-center
            justify-center
            gap-3
            flex-wrap
          "
        >
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target={social.name !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="
                  group
                  flex
                  items-center
                  gap-2.5
                  px-4
                  py-2.5
                  rounded-xl
                  bg-zinc-900/60
                  border
                  border-zinc-800
                  backdrop-blur-sm
                  text-zinc-400
                  text-sm
                  font-medium
                  transition-all
                  duration-300
                  hover:bg-zinc-800/80
                  hover:border-cyan-500/50
                  hover:text-cyan-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_4px_20px_rgba(34,211,238,0.15)]
                "
              >
                <Icon className="w-4 h-4 text-zinc-400 group-hover:text-cyan-300 transition-colors" />
                <span>{social.name}</span>
              </a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}