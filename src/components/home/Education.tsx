import React from "react";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";

export default function Education() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-white font-sans">
      
      {/* Section HUD Header */}
      <div className="mb-12 border-l-2 border-cyan-400 pl-4">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // CAMPAIGN_HISTORY //
        </p>
        <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          Campaign Logs / Education
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
          Operational archive of structural training and computer science specializations.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Continuous Cyber timeline connecting line */}
        <div className="absolute left-3 top-6 bottom-6 w-[2px] border-l border-dashed border-zinc-800 hidden md:block" />
        <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400 to-transparent h-[40%] hidden md:block" />

        <div className="space-y-8">
          
          {/* SRMIST - MISSION 01 */}
          <div className="relative md:pl-10">
            {/* Mission status node */}
            <div className="hidden md:flex absolute left-3 top-7 -translate-x-1/2 w-6 h-6 border-2 border-cyan-400 bg-zinc-950 items-center justify-center z-10 shadow-[0_0_12px_rgba(34,211,238,0.6)] rotate-45">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400 -rotate-45" />
            </div>

            <div
              className="
                group relative bg-zinc-950/90 border border-cyan-500/30 p-6 md:p-7
                shadow-[0_0_20px_rgba(34,211,238,0.03)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]
                hover:border-cyan-400 transition-all duration-300 hud-clip overflow-hidden
              "
            >
              {/* Corner Symbols */}
              <span className="absolute top-1.5 left-1.5 text-[8px] font-mono text-cyan-500/40 pointer-events-none">┌</span>
              <span className="absolute top-1.5 right-5 text-[8px] font-mono text-cyan-500/40 pointer-events-none">┐</span>
              <span className="absolute bottom-5 left-1.5 text-[8px] font-mono text-cyan-500/40 pointer-events-none">└</span>

              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 font-mono">
                    <span className="text-cyan-400 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 border border-cyan-500/40 bg-cyan-950/40 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      MISSION_01 // IN_PROGRESS
                    </span>
                    <p className="text-zinc-400 text-xs font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> 2024 — EXPECTED MAY 2028
                    </p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                    SRM Institute of Science and Technology
                  </h3>

                  <p className="text-zinc-400 text-sm mt-1 font-mono flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>SRMIST • Kattankulathur, Chennai</span>
                  </p>
                </div>

                {/* CGPA Badge */}
                <div className="self-start md:self-center border border-cyan-400/40 bg-zinc-900/90 px-4 py-2.5 font-mono text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] whitespace-nowrap hud-clip-sm group-hover:border-cyan-400 transition-all duration-300">
                  <span className="text-[9px] font-bold block text-cyan-400/70 uppercase tracking-wider">
                    CURRENT_GRADE
                  </span>
                  <span className="text-base font-extrabold text-white">
                    CGPA: <span className="text-cyan-300">9.30</span> / 10
                  </span>
                </div>
              </div>

              {/* Specialization Details */}
              <div className="mt-6 pt-5 border-t border-zinc-900">
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                  QUALIFICATION SLOT
                </p>
                <h4 className="text-lg font-bold mt-1 text-zinc-100 flex items-center gap-2">
                  <span>B.Tech in Computer Science Engineering</span>
                </h4>
                <p className="text-cyan-400/90 text-sm font-mono mt-0.5">
                  » Specialization in Gaming Technology (FSMs, Render pipelines, Vectors, Custom physics Engines)
                </p>
              </div>
            </div>
          </div>

          {/* Tagore Academy - MISSION 02 */}
          <div className="relative md:pl-10">
            {/* Mission status node */}
            <div className="hidden md:flex absolute left-3 top-7 -translate-x-1/2 w-6 h-6 border-2 border-zinc-700 bg-zinc-950 items-center justify-center z-10 rotate-45 group-hover:border-cyan-400 transition-colors">
              <Award className="w-3.5 h-3.5 text-zinc-500 -rotate-45" />
            </div>

            <div
              className="
                group relative bg-zinc-950/90 border border-zinc-800 p-6 md:p-7
                hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]
                transition-all duration-300 hud-clip overflow-hidden
              "
            >
              {/* Corner Symbols */}
              <span className="absolute top-1.5 left-1.5 text-[8px] font-mono text-zinc-600 pointer-events-none">┌</span>
              <span className="absolute top-1.5 right-5 text-[8px] font-mono text-zinc-600 pointer-events-none">┐</span>
              <span className="absolute bottom-5 left-1.5 text-[8px] font-mono text-zinc-600 pointer-events-none">└</span>

              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-zinc-700 to-transparent opacity-50 group-hover:from-cyan-500 group-hover:opacity-100 transition-all duration-300" />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-3 font-mono">
                    <span className="text-zinc-400 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 border border-zinc-800 bg-zinc-900/90 flex items-center gap-1.5">
                      ✓ MISSION_COMPLETED
                    </span>
                    <p className="text-zinc-400 text-xs font-mono flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> MARCH 2024
                    </p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                    Tagore Academy
                  </h3>

                  <p className="text-zinc-400 text-sm mt-1 font-mono flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>ISC Board • Science Stream</span>
                  </p>
                </div>

                {/* Score badge */}
                <div className="self-start md:self-center border border-zinc-800 bg-zinc-900/90 px-4 py-2.5 font-mono text-zinc-300 whitespace-nowrap hud-clip-sm group-hover:border-cyan-500/30 transition-all duration-300">
                  <span className="text-[9px] font-bold block text-zinc-500 uppercase tracking-wider">
                    FINAL_SCORE
                  </span>
                  <span className="text-base font-extrabold text-white">
                    84% Aggregate
                  </span>
                </div>
              </div>

              {/* Qualification details */}
              <div className="mt-6 pt-5 border-t border-zinc-900">
                <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                  QUALIFICATION SLOT
                </p>
                <h4 className="text-lg font-bold mt-1 text-zinc-100">
                  Indian School Certificate (ISC)
                </h4>
                <p className="text-zinc-400 text-sm font-mono mt-0.5">
                  » High School Matriculation
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}