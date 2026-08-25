import React from "react";

export default function Education() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-white font-sans">
      {/* Header */}
      <div className="mb-12 border-l-2 border-cyan-400 pl-4">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // ACADEMIC_JOURNEY //
        </p>

        <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          Education
        </h2>

        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
          My academic background in computer science and gaming technology.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Continuous Cyber Timeline Line */}
        <div className="absolute left-3 top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-500 via-cyan-500/30 to-zinc-800 hidden md:block" />

        <div className="space-y-8">
          {/* SRMIST */}
          <div className="relative md:pl-10">
            {/* Timeline Dot / HUD Node (Centered at left-3) */}
            <div className="hidden md:flex absolute left-3 top-7 -translate-x-1/2 w-6 h-6 border-2 border-cyan-400 bg-zinc-950 items-center justify-center z-10 shadow-[0_0_12px_rgba(34,211,238,0.6)] rotate-45">
              <div className="w-2 h-2 bg-cyan-400 animate-pulse" />
            </div>

            <div
              className="
                group relative bg-zinc-950/90 border border-cyan-500/30 p-6 md:p-7
                shadow-[0_0_20px_rgba(34,211,238,0.05)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]
                hover:border-cyan-400 transition-all duration-300 hud-clip overflow-hidden
              "
            >
              {/* Tactical Corner Markers */}
              <span className="absolute top-1 left-1 text-[9px] font-mono text-cyan-500/40 pointer-events-none">┌</span>
              <span className="absolute top-1 right-5 text-[9px] font-mono text-cyan-500/40 pointer-events-none">┐</span>
              <span className="absolute bottom-5 left-1 text-[9px] font-mono text-cyan-500/40 pointer-events-none">└</span>

              {/* Top Cyan Accent Line */}
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 border border-cyan-500/40 bg-cyan-950/40 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      ACAD-01 :: IN_PROGRESS
                    </span>
                    <p className="text-zinc-400 text-xs font-mono">
                      2024 — Expected May 2028
                    </p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                    SRM Institute of Science and Technology
                  </h3>

                  <p className="text-zinc-400 text-sm mt-1 font-mono flex items-center gap-2">
                    <span className="text-cyan-400">&gt;</span> SRMIST • Kattankulathur
                  </p>
                </div>

                {/* CGPA HUD Badge */}
                <div className="self-start md:self-center border border-cyan-400/40 bg-zinc-900/90 px-4 py-2.5 font-mono text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] whitespace-nowrap hud-clip-sm">
                  <span className="text-[10px] font-bold block text-cyan-400/70 uppercase tracking-wider">
                    CURRENT_GRADE
                  </span>
                  <span className="text-base font-extrabold text-white">
                    CGPA: <span className="text-cyan-300">9.30</span> / 10
                  </span>
                </div>
              </div>

              {/* Degree Details */}
              <div className="mt-6 pt-5 border-t border-zinc-900">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                  DEGREE & SPECIALIZATION
                </p>
                <h4 className="text-lg font-bold mt-1 text-zinc-100">
                  B.Tech in Computer Science
                </h4>
                <p className="text-cyan-400/90 text-sm font-mono mt-0.5">
                  Specialization in Gaming Technology
                </p>
              </div>
            </div>
          </div>

          {/* Tagore Academy */}
          <div className="relative md:pl-10">
            {/* Timeline Dot / HUD Node (Centered at left-3) */}
            <div className="hidden md:flex absolute left-3 top-7 -translate-x-1/2 w-6 h-6 border-2 border-zinc-700 bg-zinc-950 items-center justify-center z-10 rotate-45">
              <div className="w-2 h-2 bg-zinc-600" />
            </div>

            <div
              className="
                group relative bg-zinc-950/90 border border-zinc-800 p-6 md:p-7
                hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]
                transition-all duration-300 hud-clip overflow-hidden
              "
            >
              {/* Tactical Corner Markers */}
              <span className="absolute top-1 left-1 text-[9px] font-mono text-zinc-600 pointer-events-none">┌</span>
              <span className="absolute top-1 right-5 text-[9px] font-mono text-zinc-600 pointer-events-none">┐</span>
              <span className="absolute bottom-5 left-1 text-[9px] font-mono text-zinc-600 pointer-events-none">└</span>

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-zinc-700 to-transparent opacity-50 group-hover:from-cyan-500 group-hover:opacity-100 transition-all duration-300" />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 border border-zinc-800 bg-zinc-900/90">
                      ACAD-02 :: COMPLETED
                    </span>
                    <p className="text-zinc-400 text-xs font-mono">
                      March 2024
                    </p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                    Tagore Academy
                  </h3>

                  <p className="text-zinc-400 text-sm mt-1 font-mono flex items-center gap-2">
                    <span className="text-zinc-500">&gt;</span> ISC Board
                  </p>
                </div>

                {/* Percentage Badge */}
                <div className="self-start md:self-center border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 font-mono text-zinc-300 whitespace-nowrap hud-clip-sm group-hover:border-cyan-500/30 transition-colors">
                  <span className="text-[10px] font-bold block text-zinc-500 uppercase tracking-wider">
                    FINAL_SCORE
                  </span>
                  <span className="text-base font-extrabold text-white">
                    84% Aggregate
                  </span>
                </div>
              </div>

              {/* Qualification Details */}
              <div className="mt-6 pt-5 border-t border-zinc-900">
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                  QUALIFICATION
                </p>
                <h4 className="text-lg font-bold mt-1 text-zinc-100">
                  Indian School Certificate (ISC)
                </h4>
                <p className="text-zinc-400 text-sm font-mono mt-0.5">
                  Science Stream
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}