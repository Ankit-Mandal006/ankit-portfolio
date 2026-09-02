import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  const highlights = [
    {
      code: "01 // ARCHITECTURE",
      title: "Systems & AI Architecture",
      ref: "SYS_MOD_01",
      description:
        "Strong emphasis on modular system design, finite state machines, custom NPC behavior, and clean code principles.",
      tags: ["C#", "FSM", "Unity AI", "Patterns"],
    },
    {
      code: "02 // MATHEMATICS",
      title: "CS Fundamentals & Math",
      ref: "SYS_MOD_02",
      description:
        "Grounded in data structures, algorithm optimization, vector mathematics, and real-time performance tuning.",
      tags: ["Linear Algebra", "Data Structures", "Optimization"],
    },
    {
      code: "03 // PERFORMANCE",
      title: "Problem Solving & Impact",
      ref: "SYS_MOD_03",
      description:
        "A proactive developer experienced in cross-functional team collaboration, rapid prototyping, and optimizing cross-platform builds.",
      tags: ["Profiling", "Cross-Platform", "Prototyping"],
    },
  ];

  const stats = [
    { label: "C# / UNITY ARCHITECTURE", val: "95%" },
    { label: "AI & NPC STATE MACHINES", val: "90%" },
    { label: "VECTOR MATH & PHYSICS", val: "88%" },
    { label: "MEMORY & FRAME OPTIMIZATION", val: "92%" },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 text-white font-sans">
      {/* ========================= */}
      {/* SECTION HEADER */}
      {/* ========================= */}
      <div className="mb-12 border-l-2 border-cyan-400 pl-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
            // OPERATOR_DOSSIER //
          </p>

          <h2 className="text-4xl md:text-5xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
            About Me
          </h2>
        </div>

        {/* Global Terminal Badge */}
        <div className="font-mono text-[10px] text-zinc-500 flex items-center gap-3 border border-zinc-800 bg-zinc-950 px-3 py-1.5 self-start md:self-auto">
          <span>LOC: KATTANKULATHUR // SRM</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ONLINE
          </span>
        </div>
      </div>

      {/* ========================= */}
      {/* DOSSIER HEADER STRIP (Compact Photo + Narrative) */}
      {/* ========================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* COMPACT HUD PHOTO FRAME (Scaled down & focused) */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
          <div className="group relative w-full max-w-[240px]">
            {/* Outer Frame */}
            <div className="relative bg-zinc-950 border border-cyan-500/30 p-2 hud-clip cyber-card shadow-[0_0_20px_rgba(34,211,238,0.05)] transition-all duration-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(34,211,238,0.25)]">
              
              {/* Tactical Markers */}
              <span className="absolute top-1 left-1 text-[8px] font-mono text-cyan-500/40 pointer-events-none z-20">┌</span>
              <span className="absolute top-1 right-4 text-[8px] font-mono text-cyan-500/40 pointer-events-none z-20">┐</span>
              <span className="absolute bottom-4 left-1 text-[8px] font-mono text-cyan-500/40 pointer-events-none z-20">└</span>

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

              {/* Image Box */}
              <div className="relative aspect-[3/4] overflow-hidden border border-zinc-900 bg-zinc-950">
                <Image
                  src="/ankit-mandal.jpg"
                  alt="Ankit Mandal"
                  fill
                  sizes="(max-width: 768px) 240px, 240px"
                  className="object-cover transition-all duration-500 filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105"
                  priority
                />

                {/* Cyan Monochrome Overlay (Fades out on hover) */}
                <div className="absolute inset-0 bg-cyan-500/35 mix-blend-color transition-opacity duration-500 group-hover:opacity-0 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-cyan-950/40 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0 pointer-events-none z-10" />

                {/* Tactical Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 pointer-events-none z-10" />

                {/* Badge Overlay */}
                <div className="absolute bottom-2 left-2 z-20">
                  <span className="border border-cyan-400/40 bg-zinc-950/90 px-2 py-0.5 text-[8px] font-mono text-cyan-300 backdrop-blur-md uppercase tracking-wider">
                    SYS_ENGINEER
                  </span>
                </div>
              </div>

              {/* Status Footer */}
              <div className="mt-2 px-1 py-1 border-t border-zinc-900 flex justify-between font-mono text-[8px] text-zinc-500">
                <span>ID: AM-74839</span>
                <span className="text-cyan-400">120_FPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* NARRATIVE & METRICS (Span 9 Columns) */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* Main Statement */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
              <span className="text-cyan-400 font-bold">[CORE_DIRECTIVE]</span>
              <span className="text-zinc-700">//</span>
              <span className="text-zinc-400">SYSTEM ARCHITECTURE & GAMEPLAY</span>
            </div>

            <p className="text-zinc-100 text-2xl md:text-3xl font-light leading-snug tracking-tight">
              I am a <strong className="text-white font-bold">Computer Science Engineer</strong> specializing in{" "}
              <span className="text-cyan-400 font-mono font-semibold">Gaming Technology</span>. I bridge low-level system design with intuitive gameplay mechanics.
            </p>

            <p className="text-zinc-400 text-base leading-relaxed border-l-2 border-cyan-500/30 pl-4">
              My focus lies in developing intelligent AI behaviors, responsive mechanics, and scalable codebase architecture in Unity. Beyond just making mechanics work, I care deeply about clean C# design patterns, memory optimization, and maintaining target frame rates across platforms.
            </p>
          </div>

          {/* METRIC BARS INLINE GRID */}
          <div className="pt-6 border-t border-zinc-900">
            <div className="flex items-center justify-between mb-4 font-mono text-xs">
              <span className="text-cyan-400 uppercase tracking-widest">[&gt;] SYSTEM_DIAGNOSTICS</span>
              <span className="text-zinc-600 text-[10px]">REALTIME_PROFILING</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-1.5">
                  <div className="flex justify-between font-mono text-[10px] text-zinc-400 tracking-wider">
                    <span>{stat.label}</span>
                    <span className="text-cyan-400 font-bold">{stat.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-950 overflow-hidden border border-zinc-800/80">
                    <div
                      className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500"
                      style={{ width: stat.val }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* HIGHLIGHT MODULE CARDS */}
      {/* ========================= */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {highlights.map((item) => (
          <article
            key={item.code}
            className="group relative bg-zinc-950/90 border border-cyan-500/30 shadow-[0_0_20px_rgba(34,211,238,0.05)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:border-cyan-400 transition-all duration-500 hud-clip cyber-card flex flex-col justify-between p-6"
          >
            {/* Tactical Corner Markers */}
            <span className="absolute top-1.5 left-1.5 text-[9px] font-mono text-cyan-500/40 pointer-events-none z-10">┌</span>
            <span className="absolute top-1.5 right-5 text-[9px] font-mono text-cyan-500/40 pointer-events-none z-10">┐</span>
            <span className="absolute bottom-5 left-1.5 text-[9px] font-mono text-cyan-500/40 pointer-events-none z-10">└</span>

            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-3">
                <span className="text-cyan-400 font-bold">{item.code}</span>
                <span className="text-[9px] tracking-widest uppercase text-zinc-600">
                  [{item.ref}]
                </span>
              </div>

              <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-300 mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-900 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-cyan-400/30 bg-zinc-900/60 px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-cyan-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}