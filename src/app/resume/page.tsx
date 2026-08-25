import Link from "next/link";

export default function ResumePage() {
  const resumeUrl = "/resume.pdf";

  return (
    <main className="min-h-screen max-w-6xl mx-auto px-6 pt-36 pb-24 text-white font-sans">
      {/* Top Header */}
      <section className="border-l-2 border-cyan-400 pl-4 md:pl-6">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
          // DOCUMENT_VIEWER //
        </p>
        <h1 className="text-4xl md:text-6xl font-black mt-3 tracking-tight text-white drop-shadow-[0_0_12px_rgba(34,211,238,0.2)]">
          Curriculum Vitae
        </h1>
        <p className="text-zinc-400 font-mono text-sm mt-3 max-w-2xl">
          Access telemetry, qualifications, technical proficiency, and project records.
        </p>
      </section>

      {/* Action Controls & Interactive Buttons */}
      <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs">
        {/* Download Button */}
        <a
          href={resumeUrl}
          download="Resume.pdf"
          className="
            pointer-events-auto
            px-6
            py-3
            bg-cyan-400
            text-black
            font-bold
            uppercase
            tracking-wider
            shadow-[0_0_15px_rgba(34,211,238,0.3)]
            hover:bg-cyan-300
            hover:scale-105
            transition-all
            duration-200
            hud-clip-sm
            flex
            items-center
            gap-2
          "
        >
          <span>⬇ DOWNLOAD_PDF</span>
        </a>

        {/* View in New Tab Button */}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            pointer-events-auto
            px-6
            py-3
            bg-zinc-950/90
            border
            border-zinc-700
            text-zinc-200
            font-bold
            uppercase
            tracking-wider
            backdrop-blur-md
            hover:border-cyan-400
            hover:text-cyan-300
            hover:scale-105
            transition-all
            duration-200
            hud-clip-sm
            flex
            items-center
            gap-2
          "
        >
          <span>↗ OPEN_FULLSCREEN</span>
        </a>
      </div>

      {/* Embedded PDF View Window */}
      <section className="mt-10 relative bg-zinc-950 border border-zinc-800 hud-clip group hover:border-cyan-500/40 transition-all">
        <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="flex items-center justify-between p-4 border-b border-zinc-800/80 bg-zinc-900/50">
          <span className="text-xs font-mono text-cyan-400 tracking-widest">
            // PREVIEW_STREAM: RESUME.PDF
          </span>
          <span className="text-[10px] font-mono text-zinc-500">[STATUS: READY]</span>
        </div>

        <div className="w-full h-[800px] bg-zinc-900">
          <iframe
            src={`${resumeUrl}#toolbar=0`}
            title="Resume PDF"
            className="w-full h-full border-none"
          />
        </div>
      </section>
    </main>
  );
}