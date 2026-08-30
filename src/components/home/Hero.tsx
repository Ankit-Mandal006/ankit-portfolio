"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FolderGit2, Palette, Mail, Terminal, Shield, Cpu, Activity, Gamepad2 } from "lucide-react";
import GameArena from "@/components/home/GameArena";
import GlitchTitle from "@/components/home/GlitchTitle";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64 7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

export default function Hero() {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootLogs, setBootLogs] = useState<string[]>([]);
  const [currentBioIndex, setCurrentBioIndex] = useState(0);
  const [typedBio, setTypedBio] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Game state
  const [isGameOpen, setIsGameOpen] = useState(false);

  const bios = [
    "Designing stealth systems, AI behaviors, and mechanical gameplay dynamics.",
    "Developing high-performance C# script architectures and custom render pipelines.",
    "Crafting immersive game mechanics, real-time algorithms, and dynamic worlds.",
  ];

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/ankit-mandal006", icon: GithubIcon },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/ankit-mandal-724890359/", icon: LinkedinIcon },
    { name: "Itch.io", href: "https://ankit-mandal006.itch.io/", icon: Gamepad2 },
    { name: "ArtStation", href: "https://www.artstation.com/ankitmandal006/albums/14439986", icon: Palette },
    { name: "Email", href: "mailto:mandal.ankit190506@gmail.com", icon: Mail },
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem("portfolio_booted")) {
      setBootComplete(true);
      return;
    }

    const logs = [
      "INITIALIZING ANKIT-PORTFOLIO CORE ENGINE [v5.0.0]...",
      "LOADING ASSETS & PHYSICS CONTROLLERS... [OK]",
      "SECURING CONNECTION TO SUPABASE STORAGE BUCKET...",
      "SUPABASE DATABASE CONNECTED [STATUS: STABLE]",
      "ASSEMBLING UNITY ECS & C# COMPILED BINARIES...",
      "AI BEHAVIOR STATEMACHINES REGISTERED SUCCESSFULLY.",
      "BOOT SEQUENCE FINISHED. DISPATCHING INTERACTIVE HOLOGRAPHIC HUD."
    ];

    let timer = 0;
    logs.forEach((log, index) => {
      timer += index === 0 ? 100 : Math.random() * 300 + 200;
      setTimeout(() => {
        setBootLogs((prev) => [...prev, log]);
        if (index === logs.length - 1) {
          setTimeout(() => {
            setBootComplete(true);
            sessionStorage.setItem("portfolio_booted", "true");
          }, 600);
        }
      }, timer);
    });
  }, []);

  useEffect(() => {
    if (!bootComplete) return;

    let timer: NodeJS.Timeout;
    const currentFullText = bios[currentBioIndex];
    const typingSpeed = isDeleting ? 20 : 40;

    if (!isDeleting && typedBio === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 3000);
    } else if (isDeleting && typedBio === "") {
      setIsDeleting(false);
      setCurrentBioIndex((prev) => (prev + 1) % bios.length);
    } else {
      timer = setTimeout(() => {
        setTypedBio((prev) =>
          isDeleting
            ? currentFullText.substring(0, prev.length - 1)
            : currentFullText.substring(0, prev.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [typedBio, isDeleting, currentBioIndex, bootComplete]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden text-white font-sans bg-zinc-950/20">

      {/* Background Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,rgba(34,211,238,0.05)_1px,transparent_1.5px)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.08),transparent_65%)] pointer-events-none" />
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Embedded Game Component Modal */}
      <GameArena isOpen={isGameOpen} onClose={() => setIsGameOpen(false)} />

      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <motion.div
            key="boot"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-full max-w-2xl px-6 font-mono text-left"
          >
            <div className="border border-zinc-800 bg-zinc-950/90 p-6 rounded-md shadow-2xl relative">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-900 mb-4 text-[10px] text-zinc-500">
                <span className="flex items-center gap-1.5 font-bold uppercase">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  System Terminal Boot Logger
                </span>
                <span>SYS_INIT: OK</span>
              </div>
              <div className="space-y-2 text-xs md:text-sm text-cyan-400/90 min-h-[160px]">
                {bootLogs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-zinc-600 flex-shrink-0">&gt;</span>
                    <span>{log}</span>
                  </motion.div>
                ))}
                <span className="inline-block w-2.5 h-4 bg-cyan-400 animate-pulse align-middle ml-1" />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="hud"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 w-full max-w-5xl text-center px-6 flex flex-col items-center"
          >
            {/* Corner Markers */}
            <div className="absolute -inset-10 border border-cyan-500/10 pointer-events-none rounded-2xl hidden md:block">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/40 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/40 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/40 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/40 rounded-br-lg" />
            </div>

            {/* Side telemetry widgets */}
            <div className="absolute left-[-200px] top-1/4 w-[160px] hidden xl:flex flex-col text-left font-mono space-y-4 pointer-events-none opacity-45 border-l border-zinc-800 pl-4">
              <div>
                <span className="block text-[8px] text-zinc-500 uppercase tracking-widest">Hardware Info</span>
                <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5" /> RTX_ACTIVE
                </span>
              </div>
              <div>
                <span className="block text-[8px] text-zinc-500 uppercase tracking-widest">System Load</span>
                <span className="text-[10px] text-zinc-300">GPU: 48°C • CPU: 22%</span>
              </div>
              <div className="space-y-1">
                <span className="block text-[8px] text-zinc-500 uppercase tracking-widest">Telemetry</span>
                <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-bold">
                  <Activity className="w-3 h-3 animate-pulse" /> 144 FPS
                </div>
              </div>
            </div>

            <div className="absolute right-[-200px] top-1/4 w-[160px] hidden xl:flex flex-col text-right font-mono space-y-4 pointer-events-none opacity-45 border-r border-zinc-800 pr-4">
              <div>
                <span className="block text-[8px] text-zinc-500 uppercase tracking-widest">Engine Status</span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center justify-end gap-1">
                  UNITY_ONLINE <Shield className="w-3.5 h-3.5 text-emerald-500" />
                </span>
              </div>
              <div>
                <span className="block text-[8px] text-zinc-500 uppercase tracking-widest">Memory Pool</span>
                <span className="text-[10px] text-zinc-300">HEAP_FREE: 92.4%</span>
              </div>
              <div>
                <span className="block text-[8px] text-zinc-500 uppercase tracking-widest">Build Status</span>
                <span className="text-[10px] text-cyan-400">READY (0 ERRORS)</span>
              </div>
            </div>

            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-cyan-500/40 bg-zinc-950/80 backdrop-blur-md mb-6 hud-clip-sm shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:border-cyan-400/80 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-cyan-300">
                // SYS_ROLE :: UNITY_GAME_DEVELOPER //
              </span>
            </motion.div>

            {/* GLITCH TITLE — Clicking opens the Playable Game Arena */}
            <GlitchTitle onClick={() => setIsGameOpen(true)} />

            {/* Typewritten Bio Tagline */}
            <div className="h-[80px] md:h-[60px] flex items-center justify-center mt-6">
              <p className="text-base md:text-xl text-zinc-300 font-mono max-w-3xl leading-relaxed animate-cursor">
                {typedBio}
              </p>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 flex justify-center gap-4 flex-wrap"
            >
              {/* Route to /projects page */}
              <Link
                href="/projects"
                className="group flex items-center gap-2 bg-cyan-400 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] hover:bg-cyan-300 transition-all duration-300 hover:scale-105 hud-clip-sm"
              >
                <FolderGit2 className="w-4 h-4 text-black" />
                <span>&gt; EXPLORE_PROJECTS</span>
              </Link>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-cyan-400/50 bg-zinc-950/80 px-8 py-4 font-mono text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.05)] hover:border-cyan-300 hover:bg-zinc-900 transition-all duration-300 hover:scale-105 hud-clip-sm"
              >
                <span>&lt;/&gt; TELEPORT_RESUME</span>
              </a>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 flex items-center justify-center gap-3 flex-wrap"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.name !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2.5 px-4 py-2.5 bg-zinc-950/90 border border-cyan-500/30 backdrop-blur-sm text-zinc-400 font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:border-cyan-400 hover:text-cyan-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] hud-clip-sm"
                  >
                    <Icon className="w-4 h-4 text-cyan-400/70 group-hover:text-cyan-300 transition-colors" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}