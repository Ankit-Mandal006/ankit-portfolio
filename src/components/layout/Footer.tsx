"use client";

import { useState } from "react";
import { sendContactEmail } from "@/app/contact/actions";

export default function Footer() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    success?: boolean;
    error?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const result = await sendContactEmail(formData);

    setIsSubmitting(false);

    if (result.success) {
      setStatus({ success: true });
      (e.target as HTMLFormElement).reset();
    } else {
      setStatus({ error: result.error || "Something went wrong." });
    }
  }

  return (
    <footer
      id="contact"
      className="relative border-t border-zinc-900 mt-32 scroll-mt-24 bg-[#050505] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20">
        {/* ========================================== */}
        {/* GAMIFIED CONTACT SECTION (SOLID - NO BLUR) */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 border-b border-zinc-900">
          
          {/* LEFT COLUMN: Tactical Header & Status Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-cyan-500/40 text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-4 hud-clip-sm">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                // INITIATE_COMMS //
              </div>

              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                Let’s Work <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-200">
                  Together
                </span>
              </h2>

              <p className="text-zinc-400 text-base mt-4 leading-relaxed max-w-md">
                Have a project in mind, engine mechanics to solve, or collaboration inquiries? Send a direct transmission below.
              </p>
            </div>

            {/* Tactical Info Cards (Solid Dark) */}
            <div className="mt-8 lg:mt-0 space-y-4">
              <div className="p-4 bg-zinc-950 border border-zinc-800 hud-clip-sm space-y-1 font-mono text-xs">
                <div className="text-zinc-500">// OPERATIONAL_STATUS</div>
                <div className="text-cyan-300 font-bold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                  AVAILABLE FOR PROJECTS & ROLES
                </div>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800 hud-clip-sm space-y-1 font-mono text-xs">
                <div className="text-zinc-500">// DIRECT_EMAIL</div>
                <a
                  href="mailto:mandal.ankit190506@gmail.com"
                  className="text-zinc-200 hover:text-cyan-400 transition-colors block font-sans text-sm font-semibold"
                >
                  mandal.ankit190506@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form (Solid BG, Zero Blur, Sharp HUD Clip) */}
          <div className="lg:col-span-7">
            <div className="relative bg-zinc-950 border border-cyan-500/40 p-6 sm:p-8 hud-clip shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              {/* Tactical Corner Indicators */}
              <span className="absolute top-1 left-2 text-[10px] font-mono text-cyan-500/50 pointer-events-none">┌ SEC_01</span>
              <span className="absolute top-1 right-6 text-[10px] font-mono text-cyan-500/50 pointer-events-none">SYS_READY ┐</span>
              
              {/* Top Accent Neon Line */}
              <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-400 via-teal-300 to-transparent" />

              {status?.success ? (
                <div className="p-6 bg-zinc-900 border border-cyan-400/60 text-cyan-300 hud-clip-sm font-mono text-xs space-y-3">
                  <div className="text-cyan-400 font-bold tracking-widest text-sm flex items-center gap-2">
                    <span>[SYS_OK]</span>
                    <span>:: TRANSMISSION_DISPATCHED</span>
                  </div>
                  <p className="text-zinc-300 font-sans text-sm">
                    Message received! A confirmation copy has been sent to your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {status?.error && (
                    <div className="p-4 bg-red-950 border border-red-500/60 text-red-400 font-mono text-xs hud-clip-sm">
                      <span className="font-bold mr-2">[SYS_ERR]</span>
                      <span>{status.error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="relative group/field">
                      <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex justify-between">
                        <span>&gt; SENDER_NAME</span>
                        <span className="text-[9px] text-zinc-600 opacity-0 group-focus-within/field:opacity-100 transition-opacity font-mono">// READY</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-650 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:bg-zinc-950 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-200 hud-clip-sm"
                      />
                    </div>

                    <div className="relative group/field">
                      <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex justify-between">
                        <span>&gt; CONTACT_EMAIL</span>
                        <span className="text-[9px] text-zinc-600 opacity-0 group-focus-within/field:opacity-100 transition-opacity font-mono">// VERIFYING</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-650 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:bg-zinc-950 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-200 hud-clip-sm"
                      />
                    </div>
                  </div>

                  <div className="relative group/field">
                    <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 flex justify-between">
                      <span>&gt; TRANSMISSION_PAYLOAD</span>
                      <span className="text-[9px] text-zinc-600 opacity-0 group-focus-within/field:opacity-100 transition-opacity font-mono">// COMPILING_PAYLOAD</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project, mechanics, or inquiry..."
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-650 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:bg-zinc-950 focus:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all duration-200 resize-none hud-clip-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-3.5 bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-200 hover:bg-cyan-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed hud-clip-sm cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-pulse">TRANSMITTING OVER LINK...</span>
                        <span className="w-12 h-1 bg-black/30 overflow-hidden relative inline-block rounded-sm">
                          <span className="absolute top-0 bottom-0 left-0 bg-black w-[70%] animate-pulse" />
                        </span>
                      </span>
                    ) : (
                      <>
                        <span>&gt; DISPATCH_MESSAGE</span>
                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* FOOTER BOTTOM SECTION (BACKDROP BLUR & GLOW ADDED HERE) */}
        {/* ========================================== */}
        <div className="relative mt-12 pt-6 pb-6 px-8 backdrop-blur-md bg-zinc-950/40 border border-zinc-900/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Ambient Glow Background Accent */}
          <div className="absolute inset-0 bg-cyan-500/5 blur-2xl rounded-2xl pointer-events-none" />

          <div className="relative z-10 text-center sm:text-left">
            <h3 className="font-black text-xl text-white tracking-wider">
              ANKIT MANDAL
            </h3>
            <p className="text-cyan-400/80 font-mono text-xs uppercase tracking-widest mt-1">
              // UNITY_DEVELOPER :: GAME_DESIGNER //
            </p>
          </div>

          <p className="relative z-10 text-zinc-500 font-mono text-xs">
            © {new Date().getFullYear()} ANKIT MANDAL. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}