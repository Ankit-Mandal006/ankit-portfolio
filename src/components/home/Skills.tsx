import React from "react";
import { Wrench, ShieldAlert, Code2, Cpu } from "lucide-react";

// Dot rating indicator helper
function SkillMeter({ filled }: { filled: number }) {
  return (
    <div className="flex gap-1 items-center mt-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <span
          key={idx}
          className={`w-2.5 h-1.5 rounded-sm transition-all duration-300 ${
            idx < filled
              ? "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]"
              : "bg-zinc-800 border border-zinc-900"
          }`}
        />
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 text-white font-sans">
      
      {/* Section HUD Header */}
      <div className="mb-14 border-l-2 border-cyan-400 pl-4">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // WEAPONS_LOADOUT //
        </p>
        <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          Arsenal & Skill Loadout
        </h2>
      </div>

      {/* Game Inventory Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Core Engine & Language (Primary Weapon Slot) */}
        <div className="md:col-span-2 relative bg-zinc-950 border border-cyan-500/40 p-6 sm:p-7 hud-clip group transition-all duration-300 hover:border-cyan-400">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              SLOT_01 // PRIMARY_WEAPONS
            </h3>
            <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 hud-clip-sm">
              MAX_LEVEL
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 hover:border-cyan-500/30 transition-all duration-300 hud-clip-sm group/item">
              <div className="flex justify-between items-start">
                <span className="text-lg font-bold text-white block group-hover/item:text-cyan-300 transition-colors">Unity Engine</span>
                <span className="text-[9px] font-mono text-emerald-400">+35% GRAPHICS_OPT</span>
              </div>
              <SkillMeter filled={5} />
              <p className="text-xs font-mono text-zinc-400 mt-3 leading-relaxed">
                Mobile optimization, WebGL pipeline, asset profiling, and custom render graphs.
              </p>
            </div>

            <div className="bg-zinc-900/40 border border-zinc-800/80 p-5 hover:border-cyan-500/30 transition-all duration-300 hud-clip-sm group/item">
              <div className="flex justify-between items-start">
                <span className="text-lg font-bold text-white block group-hover/item:text-cyan-300 transition-colors">C# Architecture</span>
                <span className="text-[9px] font-mono text-emerald-400">+40% MEMORY_EFFICENCY</span>
              </div>
              <SkillMeter filled={5} />
              <p className="text-xs font-mono text-zinc-400 mt-3 leading-relaxed">
                OOP architecture, clean state machine design patterns, and GC memory profiling.
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Systems & AI Modifiers */}
        <div className="relative bg-zinc-950 border border-zinc-800 p-6 sm:p-7 hud-clip group transition-all duration-300 hover:border-cyan-500/50">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
              SLOT_02 // AI_SYSTEM_MODULES
            </h3>
            <span className="text-[9px] font-mono text-zinc-600 tracking-wider">[ACTIVE]</span>
          </div>

          <ul className="space-y-3 font-mono text-xs">
            <li className="flex items-start gap-3 p-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 transition-all duration-200 hud-clip-sm group/perk">
              <span className="text-cyan-400 font-bold group-hover/perk:animate-pulse">&gt;</span>
              <div>
                <div className="flex justify-between w-full">
                  <span className="text-zinc-100 font-bold block text-sm group-hover/perk:text-cyan-300 transition-colors">AI Architectures</span>
                  <span className="text-[9px] text-cyan-400">LVL 4</span>
                </div>
                <span className="text-[10px] text-zinc-500">NPC pathfinding, FSM sensory tracking</span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 transition-all duration-200 hud-clip-sm group/perk">
              <span className="text-cyan-400 font-bold group-hover/perk:animate-pulse">&gt;</span>
              <div>
                <div className="flex justify-between w-full">
                  <span className="text-zinc-100 font-bold block text-sm group-hover/perk:text-cyan-300 transition-colors">Game Design Loops</span>
                  <span className="text-[9px] text-cyan-400">LVL 5</span>
                </div>
                <span className="text-[10px] text-zinc-500">Core game mechanics, economy & loop balance</span>
              </div>
            </li>
            <li className="flex items-start gap-3 p-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 transition-all duration-200 hud-clip-sm group/perk">
              <span className="text-cyan-400 font-bold group-hover/perk:animate-pulse">&gt;</span>
              <div>
                <div className="flex justify-between w-full">
                  <span className="text-zinc-100 font-bold block text-sm group-hover/perk:text-cyan-300 transition-colors">Level Mechanics</span>
                  <span className="text-[9px] text-cyan-400">LVL 4</span>
                </div>
                <span className="text-[10px] text-zinc-500">Environmental pacing & puzzle routing</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Card 3: Code Core Languages */}
        <div className="relative bg-zinc-950 border border-zinc-800 p-6 sm:p-7 hud-clip group transition-all duration-300 hover:border-cyan-500/50">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
              <Code2 className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
              SLOT_03 // CODE_LANGUAGES
            </h3>
            <span className="text-[9px] font-mono text-zinc-600 tracking-wider">[COMPILE]</span>
          </div>

          <div className="space-y-2.5 font-mono">
            {[
              { lang: "C#", details: "Game Dev / OOP Core", lv: 5 },
              { lang: "Java", details: "Object Architectures", lv: 5 },
              { lang: "C++", details: "Memory Opt / low-level", lv: 4 },
              { lang: "C", details: "Memory management", lv: 4 },
              { lang: "Python", details: "Workflow Automation", lv: 3 },
            ].map((item) => (
              <div
                key={item.lang}
                className="flex items-center justify-between p-2.5 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all duration-200 hud-clip-sm group/lang"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 text-xs group-hover/lang:animate-pulse">&gt;</span>
                    <span className="text-zinc-200 font-bold text-sm group-hover/lang:text-cyan-300">{item.lang}</span>
                  </div>
                  <span className="text-[9px] text-zinc-500 mt-0.5">{item.details}</span>
                </div>
                <SkillMeter filled={item.lv} />
              </div>
            ))}
          </div>
        </div>

        {/* Card 4: Tools & Pipelines */}
        <div className="md:col-span-2 relative bg-zinc-950 border border-zinc-800 p-6 sm:p-7 hud-clip group transition-all duration-300 hover:border-cyan-500/50 flex flex-col justify-between">
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 group-hover:text-cyan-400 transition-colors flex items-center gap-2">
                <Wrench className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                SLOT_04 // ENGINEERING_UTILITIES
              </h3>
              <span className="text-[9px] font-mono text-zinc-600 tracking-wider">[INTEGRATED]</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 font-mono text-xs">
              {[
                { name: "Git", details: "Version control tree", tag: "[VCS]", skill: 5 },
                { name: "GitHub", details: "CI/CD & remote repositories", tag: "[REMOTE]", skill: 5 },
                { name: "Blender", details: "3D mesh and texture pipelines", tag: "[3D_PIPELINE]", skill: 3 },
                { name: "Unity Profiler", details: "Memory & CPU footprint profiling", tag: "[PERFORMANCE]", skill: 4 },
              ].map((tool) => (
                <div
                  key={tool.name}
                  className="p-4 bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 transition-all duration-300 hud-clip-sm flex flex-col gap-2 group/tool"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-zinc-200 font-bold text-sm block group-hover/tool:text-cyan-300 transition-colors">{tool.name}</span>
                      <span className="text-[10px] text-zinc-500 leading-tight">{tool.details}</span>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-400/80 bg-zinc-950 px-2 py-0.5 border border-zinc-850">
                      {tool.tag}
                    </span>
                  </div>
                  <div className="pt-1 border-t border-zinc-900/60">
                    <SkillMeter filled={tool.skill} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}