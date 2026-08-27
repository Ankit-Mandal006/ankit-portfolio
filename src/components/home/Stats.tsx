"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const stats = [
  {
    id: "STAT-01",
    title: "Engine Compatibility",
    value: "Unity & C#",
    status: "ACTIVE",
    level: 95,
    perks: [
      "Modular Architecture Design",
      "DOTS / ECS Optimization",
      "Custom Shader Graph & VFX"
    ]
  },
  {
    id: "STAT-02",
    title: "Gameplay Focus",
    value: "Stealth & Action AI",
    status: "OPTIMIZED",
    level: 90,
    perks: [
      "Complex Finite State Machines",
      "Sensor Line-of-Sight Tracing",
      "Noise Distraction Mechanics"
    ]
  },
  {
    id: "STAT-03",
    title: "Operational Role",
    value: "Lead Systems Dev",
    status: "ONLINE",
    level: 100,
    perks: [
      "Rapid Prototype Iteration",
      "Multiplatform Deployment",
      "Code Refactoring & Clean Architecture"
    ]
  },
  {
    id: "STAT-04",
    title: "Telemetry / Records",
    value: "5+ Shipped",
    status: "DEPLOYED",
    level: 85,
    perks: [
      "WebGL Performance Tuning",
      "Itch.io & Steam Pipelines",
      "Memory Profiling & GC Management"
    ]
  },
];

// Helper to render ticking segment progress bar
function SegmentedBar({ level, active }: { level: number; active: boolean }) {
  const segments = 10;
  const activeSegments = Math.round((level / 100) * segments);

  return (
    <div className="flex gap-1 w-full mt-2">
      {Array.from({ length: segments }).map((_, idx) => (
        <div
          key={idx}
          className={`h-2 flex-grow transition-all duration-300 ${
            idx < activeSegments
              ? active
                ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                : "bg-cyan-500/70"
              : "bg-zinc-900 border border-zinc-800"
          }`}
        />
      ))}
    </div>
  );
}

// Ticking number component
function TickerNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = target / (duration / 16);
    
    const handle = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(handle);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(handle);
  }, [target]);

  return <span>{count}%</span>;
}

export default function Stats() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 text-white font-sans">
      
      {/* Section HUD Header */}
      <div className="mb-12 border-l-2 border-cyan-400 pl-4">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // DIAGNOSTICS_REPORT //
        </p>
        <h2 className="text-3xl md:text-5xl font-black mt-2 tracking-tight text-white uppercase drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          Character Sheet / Core Attributes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const isHovered = hoveredCard === stat.id;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(stat.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="relative group bg-zinc-950/95 border border-cyan-500/25 p-6 shadow-[0_0_20px_rgba(34,211,238,0.03)] hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] hover:border-cyan-400 transition-all duration-300 overflow-hidden min-h-[300px] flex flex-col justify-between"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              }}
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent" />

              {/* Corner Symbols */}
              <span className="absolute top-1.5 left-1.5 text-[8px] font-mono text-cyan-500/40 pointer-events-none">┌</span>
              <span className="absolute top-1.5 right-5 text-[8px] font-mono text-cyan-500/40 pointer-events-none">┐</span>
              <span className="absolute bottom-5 left-1.5 text-[8px] font-mono text-cyan-500/40 pointer-events-none">└</span>

              <div>
                {/* Header: ID, Status */}
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4 font-mono text-xs">
                  <span className="text-cyan-400 font-bold tracking-widest">{stat.id}</span>
                  <span className={`text-[9px] px-2 py-0.5 border rounded-sm font-semibold flex items-center gap-1.5 transition-colors ${
                    isHovered 
                      ? "border-cyan-400/80 bg-cyan-950/30 text-cyan-300"
                      : "border-zinc-800 bg-zinc-900/50 text-zinc-400"
                  }`}>
                    <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
                    {stat.status}
                  </span>
                </div>

                {/* RPG Title & Value */}
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500">
                    {stat.title}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors drop-shadow-md">
                    {stat.value}
                  </h3>
                </div>

                {/* Hover Passive Unlocked Perks */}
                <div className="mt-4 space-y-2">
                  <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest">// PASSIVE_PERKS</div>
                  <ul className="space-y-1.5 font-mono text-[10px]">
                    {stat.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-1.5 text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        <span className="text-cyan-400/80 mt-0.5">»</span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Progress Seek bar styled like game XP bar */}
              <div className="mt-6 pt-3 border-t border-zinc-900/80">
                <div className="flex justify-between items-center text-[9px] font-mono text-zinc-500 mb-1">
                  <span>CAPACITY_XP</span>
                  <span className="text-cyan-400 font-bold font-mono">
                    <TickingLevel target={stat.level} active={isHovered} />
                  </span>
                </div>
                <SegmentedBar level={stat.level} active={isHovered} />
              </div>

              {/* Grid Backdrop Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:10px_10px] opacity-[0.02] pointer-events-none group-hover:opacity-[0.06] transition-opacity" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// Wrapper to tick level on render
function TickingLevel({ target, active }: { target: number; active: boolean }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return visible ? <TickerNumber target={target} /> : <span>0%</span>;
}