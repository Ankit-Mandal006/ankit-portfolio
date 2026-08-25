import React from "react";

export default function About() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-white font-sans">
      {/* Header */}
      <div className="mb-10 border-l-2 border-cyan-400 pl-4">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // PROFILE //
        </p>

        <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          About Me
        </h2>
      </div>

      {/* Main Narrative - Unboxed & Scannable */}
      <div className="space-y-6 text-zinc-300 text-lg md:text-xl leading-relaxed max-w-4xl">
        <p>
          I am a <strong className="text-white font-bold">Computer Science Engineer</strong> specializing in <span className="text-cyan-400 font-mono font-semibold">Gaming Technology</span>. I bridge the gap between low-level system architecture and high-level gameplay programming.
        </p>

        <p className="text-zinc-400 text-base md:text-lg">
          My focus lies in developing intelligent AI behaviors, responsive mechanics, and scalable codebase architecture in Unity. Beyond just making mechanics work, I care deeply about clean C# design patterns, memory optimization, and maintaining high frame rates across target platforms.
        </p>
      </div>

      {/* Key Recruiter Highlights */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-zinc-800/80 pt-10">
        <div>
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold mb-1">
            01 // Engineering Mindset
          </p>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Systems & AI Architecture</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Strong emphasis on modular system design, finite state machines, custom NPC behavior, and clean code principles.
          </p>
        </div>

        <div>
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold mb-1">
            02 // Technical Rigor
          </p>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">CS Fundamentals & Math</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Grounded in data structures, algorithm optimization, vector mathematics, and real-time performance tuning.
          </p>
        </div>

        <div>
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest font-bold mb-1">
            03 // Execution & Impact
          </p>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Problem Solving</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            A proactive developer experienced in cross-functional team collaboration, rapid prototyping, and optimizing cross-platform builds.
          </p>
        </div>
      </div>
    </section>
  );
}