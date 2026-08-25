import React from "react";

export default function Education() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-white">
      {/* Header */}
      <div className="mb-10">
        <p className="text-cyan-400 font-semibold uppercase tracking-[0.25em] text-xs md:text-sm">
          Academic Journey
        </p>

        <h2 className="text-5xl md:text-7xl font-black mt-2 tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
          Education
        </h2>

        <p className="text-zinc-400 text-base md:text-lg mt-3 max-w-xl leading-relaxed">
          My academic background in computer science and gaming technology.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Continuous Timeline Line */}
        <div className="absolute left-[11px] top-4 bottom-4 w-px bg-gradient-to-b from-cyan-500/50 via-zinc-800 to-transparent hidden md:block" />

        <div className="space-y-6">
          {/* SRMIST */}
          <div className="relative md:pl-10">
            {/* Timeline Dot */}
            <div className="hidden md:flex absolute left-0 top-5 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-zinc-950 bg-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.6)] items-center justify-center z-10" />

            <div className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm p-6 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(34,211,238,0.06)] transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-400 text-[11px] font-mono font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-800/40">
                      In Progress
                    </span>
                    <p className="text-zinc-400 text-xs font-medium">
                      2024 — Expected May 2028
                    </p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                    SRM Institute of Science and Technology
                  </h3>

                  <p className="text-zinc-400 text-base mt-0.5 font-medium">
                    SRMIST • Kattankulathur
                  </p>
                </div>

                {/* CGPA Badge */}
                <div className="self-start md:self-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-cyan-300 font-bold text-base shadow-[0_0_12px_rgba(34,211,238,0.12)] whitespace-nowrap">
                  <span className="text-[10px] font-medium block text-cyan-400/70 uppercase tracking-wider">Current Grade</span>
                  CGPA: 9.30 / 10
                </div>
              </div>

              {/* Degree Details */}
              <div className="mt-5 pt-5 border-t border-zinc-800/80">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                  Degree & Specialization
                </p>
                <h4 className="text-lg font-bold mt-1 text-zinc-100">
                  B.Tech in Computer Science
                </h4>
                <p className="text-cyan-300/90 text-sm font-medium mt-0.5">
                  Specialization in Gaming Technology
                </p>
              </div>
            </div>
          </div>

          {/* Tagore Academy */}
          <div className="relative md:pl-10">
            {/* Timeline Dot */}
            <div className="hidden md:block absolute left-0 top-5 -translate-x-1/2 w-5 h-5 rounded-full border-4 border-zinc-950 bg-zinc-700 z-10" />

            <div className="group relative rounded-2xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm p-6 hover:border-zinc-700 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-zinc-400 text-[11px] font-mono font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800">
                      Completed
                    </span>
                    <p className="text-zinc-400 text-xs font-medium">
                      March 2024
                    </p>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight group-hover:text-zinc-200 transition-colors">
                    Tagore Academy
                  </h3>

                  <p className="text-zinc-400 text-base mt-0.5 font-medium">
                    ISC Board
                  </p>
                </div>

                {/* Percentage Badge */}
                <div className="self-start md:self-center rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-2 text-zinc-200 font-bold text-base whitespace-nowrap">
                  <span className="text-[10px] font-medium block text-zinc-500 uppercase tracking-wider">Final Score</span>
                  84% Aggregate
                </div>
              </div>

              {/* Qualification Details */}
              <div className="mt-5 pt-5 border-t border-zinc-800/80">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                  Qualification
                </p>
                <h4 className="text-lg font-bold mt-1 text-zinc-100">
                  Indian School Certificate (ISC)
                </h4>
                <p className="text-zinc-400 text-sm font-medium mt-0.5">
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