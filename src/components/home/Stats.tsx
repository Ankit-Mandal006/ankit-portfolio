"use client";

import { motion } from "framer-motion";

const stats = [
  {
    id: "SYS-01",
    title: "Engine",
    value: "Unity",
    status: "ACTIVE",
    level: 95,
  },
  {
    id: "SYS-02",
    title: "Focus",
    value: "Stealth",
    status: "OPTIMIZED",
    level: 90,
  },
  {
    id: "SYS-03",
    title: "Role",
    value: "Solo Dev",
    status: "ONLINE",
    level: 100,
  },
  {
    id: "SYS-04",
    title: "Projects",
    value: "5+",
    status: "DEPLOYED",
    level: 85,
  },
];

export default function Stats() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16 text-white font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative group bg-zinc-950/90 border border-cyan-500/30 p-6 shadow-[0_0_20px_rgba(34,211,238,0.05)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:border-cyan-400 transition-all duration-300 overflow-hidden"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
            }}
          >
            {/* Top Cyan Accent Line */}
            <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Tactical Corner Markers */}
            <span className="absolute top-1 left-1 text-[9px] font-mono text-cyan-500/50 pointer-events-none">┌</span>
            <span className="absolute top-1 right-5 text-[9px] font-mono text-cyan-500/50 pointer-events-none">┐</span>
            <span className="absolute bottom-5 left-1 text-[9px] font-mono text-cyan-500/50 pointer-events-none">└</span>

            {/* Header: System ID & Status Indicator */}
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4 font-mono text-xs">
              <span className="text-cyan-400 font-bold tracking-wider">
                {stat.id}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-zinc-400 bg-zinc-900/90 px-2 py-0.5 border border-zinc-800 rounded-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {stat.status}
              </span>
            </div>

            {/* Main Content */}
            <div className="space-y-1">
              <p className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 group-hover:text-cyan-300 transition-colors">
                {stat.title}
              </p>
              <p className="text-3xl md:text-4xl font-black tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)] group-hover:text-cyan-100">
                {stat.value}
              </p>
            </div>

            {/* HUD Capacity / Experience Bar */}
            <div className="mt-6 pt-3 border-t border-zinc-900">
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-1.5">
                <span>SYS_CAPACITY</span>
                <span className="text-cyan-400">{stat.level}%</span>
              </div>
              <div className="w-full bg-zinc-900 h-1.5 overflow-hidden p-[1px] border border-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-teal-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                />
              </div>
            </div>

            {/* Subtle Grid Backdrop */}
            <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:12px_12px] opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}