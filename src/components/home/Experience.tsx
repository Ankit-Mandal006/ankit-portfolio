import React from "react";
import {
  Briefcase,
  Calendar,
  Building2,
  ChevronRight,
  Award,
  ExternalLink,
  Terminal,
} from "lucide-react";

export default function Experience() {
  const experiences = [
    {
      id: "jabsz-internship",
      role: "Game Developer Intern",
      company: "Jabsz Gaming Studios LLP",
      period: "AUG 2025 — DEC 2025",
      highlights: [
        "Architected core gameplay systems and built internal tooling for a Unity-based multiplayer title.",
        "Integrated Photon Fusion networking protocols for real-time state synchronization and multiplayer mechanics.",
        "Enhanced bot AI behavior logic and redesigned player-facing HUD/UI elements for improved responsiveness.",
        "Collaborated on map implementation and playtesting under strict project confidentiality standards.",
      ],
      techStack: [
        "UNITY",
        "C#",
        "PHOTON FUSION",
        "BOT AI",
        "MULTIPLAYER NETCODE",
        "UI/UX",
      ],
      certificatePath: "/certificates/jabsz-internship-certificate.pdf",
    },
  ];

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-white font-sans">
      {/* Section HUD Header */}
      <div className="mb-12 border-l-2 border-cyan-400 pl-4">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // OPERATIONAL_HISTORY //
        </p>
        <h2 className="text-4xl md:text-6xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          Campaign Logs / Experience
        </h2>
        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-xl leading-relaxed">
          Operational archive of game engineering contributions, studio deployments, and verified credentials.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Continuous Cyber timeline connecting line */}
        <div className="absolute left-3 top-6 bottom-6 w-[2px] border-l border-dashed border-zinc-800 hidden md:block" />
        <div className="absolute left-[11px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-cyan-400 to-transparent h-[40%] hidden md:block" />

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative md:pl-10">
              
              {/* Mission Status Diamond Node */}
              <div className="hidden md:flex absolute left-3 top-7 -translate-x-1/2 w-6 h-6 border-2 border-cyan-400 bg-zinc-950 items-center justify-center z-10 shadow-[0_0_12px_rgba(34,211,238,0.6)] rotate-45">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400 -rotate-45" />
              </div>

              {/* HUD Experience Card */}
              <div className="group relative bg-zinc-950/90 border border-cyan-500/30 p-6 md:p-7 shadow-[0_0_20px_rgba(34,211,238,0.03)] hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] hover:border-cyan-400 transition-all duration-300 hud-clip overflow-hidden">
                
                {/* Corner Symbols */}
                <span className="absolute top-1.5 left-1.5 text-[8px] font-mono text-cyan-500/40 pointer-events-none">┌</span>
                <span className="absolute top-1.5 right-5 text-[8px] font-mono text-cyan-500/40 pointer-events-none">┐</span>
                <span className="absolute bottom-5 left-1.5 text-[8px] font-mono text-cyan-500/40 pointer-events-none">└</span>

                {/* Top Accent line */}
                <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-400 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />

                {/* Card Header Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-zinc-900">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 font-mono">
                      <span className="text-cyan-400 text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 border border-cyan-500/40 bg-cyan-950/40 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        DEPLOYMENT_0{index + 1}
                      </span>
                      <p className="text-zinc-400 text-xs font-mono flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400/80" /> {exp.period}
                      </p>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold mt-3 tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                      {exp.role}
                    </h3>

                    <p className="text-zinc-300 text-sm mt-1 font-mono flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-zinc-200">{exp.company}</span>
                    </p>
                  </div>

                  {/* Studio Badge */}
                  <div className="self-start md:self-center border border-cyan-400/40 bg-zinc-900/90 px-4 py-2 font-mono text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] whitespace-nowrap hud-clip-sm group-hover:border-cyan-400 transition-all duration-300">
                    <span className="text-[9px] font-bold block text-cyan-400/70 uppercase tracking-wider">
                      ORGANIZATION
                    </span>
                    <span className="text-sm font-extrabold text-white flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400" /> GAME_STUDIO
                    </span>
                  </div>
                </div>

                {/* Card Content Grid: Details (Left) + Certificate Preview Box (Right) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
                  
                  {/* LEFT: Responsibilities & Tech Stack (7 Cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    <div>
                      <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-3">
                        KEY_RESPONSIBILITIES & DELIVERABLES
                      </p>

                      <ul className="space-y-2.5">
                        {exp.highlights.map((point, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-zinc-300 text-sm leading-relaxed">
                            <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="pt-4 border-t border-zinc-900/80 flex flex-wrap gap-2">
                      {exp.techStack.map((tech, i) => (
                        <span
                          key={i}
                          className="border border-cyan-400/30 bg-zinc-900/80 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-cyan-300 hover:border-cyan-400 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: Embedded Certificate Mini Window (5 Cols) */}
                  <div className="lg:col-span-5">
                    <div className="relative bg-zinc-950 border border-cyan-500/40 p-3 shadow-[0_0_20px_rgba(34,211,238,0.08)] hover:border-cyan-300 transition-all duration-300 hud-clip">
                      
                      {/* Box Bar Header */}
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3 font-mono text-[10px]">
                        <span className="text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-cyan-400" />
                          // ATTACHED_CERTIFICATE
                        </span>
                        <span className="text-zinc-500 text-[9px]">OFFICIAL_DOC</span>
                      </div>

                      {/* PDF View Container */}
                      <div className="relative w-full h-[250px] bg-zinc-900 border border-zinc-800 overflow-hidden group/pdf">
                        <iframe
                          src={`${exp.certificatePath}#toolbar=0&navpanes=0&scrollbar=0`}
                          title="Internship Certificate PDF"
                          className="w-full h-full border-0"
                        />
                        <div className="absolute inset-0 pointer-events-none border border-cyan-500/20 group-hover/pdf:border-cyan-400/50 transition-colors" />
                      </div>

                      {/* Action Button */}
                      <div className="mt-3 pt-2 border-t border-zinc-900 flex justify-end">
                        <a
                          href={exp.certificatePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 border border-cyan-400/50 bg-zinc-900/90 px-3 py-1 font-mono text-[10px] font-bold uppercase text-cyan-300 hover:border-cyan-300 hover:bg-cyan-400 hover:text-black transition-all duration-300 hud-clip-sm"
                        >
                          <span>VIEW_FULL_PDF</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}