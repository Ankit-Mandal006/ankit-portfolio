import React from "react";

export default function Skills() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-white font-sans">
      {/* Header */}
      <div className="mb-14 border-l-2 border-cyan-400 pl-4">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // TECHNICAL_CAPABILITIES //
        </p>

        <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          Skills
        </h2>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Core Engine & Language (Primary Hero Card) */}
        <div className="md:col-span-2 relative bg-zinc-950 border border-cyan-500/40 p-6 sm:p-7 hud-clip group transition-all duration-300 hover:border-cyan-400">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400">
              01 // Primary Stack
            </h3>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 hud-clip-sm">
              CORE_COMPETENCY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 group-hover:border-zinc-700/80 transition-colors hud-clip-sm">
              <span className="text-xl font-bold text-white block">Unity Engine</span>
              <p className="text-xs font-mono text-zinc-400 mt-2 leading-relaxed">
                Mobile optimization, WebGL builds, asset management, and profiling.
              </p>
            </div>

            <div className="bg-zinc-900/50 border border-zinc-800/80 p-5 group-hover:border-zinc-700/80 transition-colors hud-clip-sm">
              <span className="text-xl font-bold text-white block">C#</span>
              <p className="text-xs font-mono text-zinc-400 mt-2 leading-relaxed">
                OOP architecture, clean design patterns, performance & memory management.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Systems & Design */}
        <div className="relative bg-zinc-950 border border-zinc-800 p-6 sm:p-7 hud-clip group transition-all duration-300 hover:border-cyan-500/50">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors">
              02 // Systems & Design
            </h3>
            <span className="text-[10px] font-mono text-zinc-600 tracking-wider">[SYS_ARCH]</span>
          </div>

          <ul className="space-y-3 font-mono text-xs">
            <li className="flex items-start gap-3 p-2.5 bg-zinc-900/40 border border-zinc-800/80 hud-clip-sm">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <div>
                <span className="text-zinc-100 font-bold block text-sm">AI Systems</span>
                <span className="text-[10px] text-zinc-500">FSMs, pathfinding, NPC detection</span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-2.5 bg-zinc-900/40 border border-zinc-800/80 hud-clip-sm">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <div>
                <span className="text-zinc-100 font-bold block text-sm">Game Design</span>
                <span className="text-[10px] text-zinc-500">Mechanics, balance & loops</span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-2.5 bg-zinc-900/40 border border-zinc-800/80 hud-clip-sm">
              <span className="text-cyan-400 font-bold">&gt;</span>
              <div>
                <span className="text-zinc-100 font-bold block text-sm">Level Design</span>
                <span className="text-[10px] text-zinc-500">Pacing & spatial flow</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Card 3: CS Languages */}
        <div className="relative bg-zinc-950 border border-zinc-800 p-6 sm:p-7 hud-clip group transition-all duration-300 hover:border-cyan-500/50">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors">
              03 // CS Languages
            </h3>
            <span className="text-[10px] font-mono text-zinc-600 tracking-wider">[LANG_CORE]</span>
          </div>

          <div className="space-y-2.5 font-mono">
            <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all duration-200 hud-clip-sm">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-xs">&gt;</span>
                <span className="text-zinc-200 font-bold text-sm">C#</span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                Game Dev / OOP
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all duration-200 hud-clip-sm">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-xs">&gt;</span>
                <span className="text-zinc-200 font-bold text-sm">C++</span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                High Perf / Memory
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all duration-200 hud-clip-sm">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-xs">&gt;</span>
                <span className="text-zinc-200 font-bold text-sm">C</span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                Systems / Low-Level
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all duration-200 hud-clip-sm">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-xs">&gt;</span>
                <span className="text-zinc-200 font-bold text-sm">Java</span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                OOP / Core CS
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all duration-200 hud-clip-sm">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 text-xs">&gt;</span>
                <span className="text-zinc-200 font-bold text-sm">Python</span>
              </div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider bg-zinc-950 px-2 py-0.5 border border-zinc-800">
                Scripting / Logic
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Tools & Pipelines */}
        <div className="md:col-span-2 relative bg-zinc-950 border border-zinc-800 p-6 sm:p-7 hud-clip group transition-all duration-300 hover:border-cyan-500/50 flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors">
                04 // Tools & Workflow
              </h3>
              <span className="text-[10px] font-mono text-zinc-600 tracking-wider">[DEV_ENV]</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs">
              <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 transition-colors hud-clip-sm flex items-center justify-between">
                <div>
                  <span className="text-zinc-200 font-bold text-sm block">Git</span>
                  <span className="text-[10px] text-zinc-500">Version Control</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/80 bg-zinc-950 px-2 py-1 border border-zinc-800">
                  [VCS]
                </span>
              </div>

              <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 transition-colors hud-clip-sm flex items-center justify-between">
                <div>
                  <span className="text-zinc-200 font-bold text-sm block">GitHub</span>
                  <span className="text-[10px] text-zinc-500">CI / Remote Repos</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/80 bg-zinc-950 px-2 py-1 border border-zinc-800">
                  [HUB]
                </span>
              </div>

              <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 transition-colors hud-clip-sm flex items-center justify-between">
                <div>
                  <span className="text-zinc-200 font-bold text-sm block">Blender</span>
                  <span className="text-[10px] text-zinc-500">3D Asset Pipeline</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/80 bg-zinc-950 px-2 py-1 border border-zinc-800">
                  [3D]
                </span>
              </div>

              <div className="p-4 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 transition-colors hud-clip-sm flex items-center justify-between">
                <div>
                  <span className="text-zinc-200 font-bold text-sm block">Unity Profiler</span>
                  <span className="text-[10px] text-zinc-500">Performance Optimization</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-400/80 bg-zinc-950 px-2 py-1 border border-zinc-800">
                  [PERF]
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}