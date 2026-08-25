"use client";

import { useState } from "react";
import { sendContactEmail } from "./actions";

export default function ContactPage() {
  const [status, setStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ loading: true });

    const formData = new FormData(event.currentTarget);
    const result = await sendContactEmail(formData);

    if (result.success) {
      setStatus({
        loading: false,
        success: true,
        message: "Message sent! A confirmation copy has been sent to your email.",
      });
      (event.target as HTMLFormElement).reset();
    } else {
      setStatus({
        loading: false,
        success: false,
        message: result.error || "Something went wrong.",
      });
    }
  }

  return (
    <main className="relative max-w-4xl mx-auto px-6 sm:px-8 pt-36 pb-24 min-h-screen flex flex-col justify-center text-white font-sans overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.1),transparent_70%)] pointer-events-none" />

      <div className="relative z-10">
        {/* ========================= */}
        {/* SECTION HEADER */}
        {/* ========================= */}
        <div className="mb-10 border-l-2 border-cyan-400 pl-4">
          <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em] flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-cyan-400 animate-pulse" />
            // INITIATE_COMMS //
          </p>

          <h1 className="text-4xl sm:text-6xl font-black mt-2 tracking-tight text-white drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
            Let’s Work Together
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg mt-4 max-w-xl leading-relaxed">
            Have a project in mind? Dispatch a message below and both of us will receive a copy in our inbox.
          </p>
        </div>

        {/* ========================= */}
        {/* SYSTEM STATUS FEEDBACK */}
        {/* ========================= */}
        {status.message && (
          <div
            className={`mb-8 p-4 font-mono text-xs border backdrop-blur-md transition-all duration-300 hud-clip-sm ${
              status.success
                ? "bg-cyan-950/50 border-cyan-400/60 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                : "bg-red-950/50 border-red-500/60 text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]"
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1 uppercase tracking-widest">
              <span>{status.success ? "[SYS_OK]" : "[SYS_ERR]"}</span>
              <span>:: TRANSMISSION_STATUS</span>
            </div>
            <p className="text-sm font-sans text-zinc-300">{status.message}</p>
          </div>
        )}

        {/* ========================= */}
        {/* FORM CONTAINER CARD */}
        {/* ========================= */}
        <div className="relative bg-zinc-950/90 border border-cyan-500/30 p-6 sm:p-10 shadow-[0_0_25px_rgba(34,211,238,0.05)] hud-clip">
          {/* Tactical Corner Markers */}
          <span className="absolute top-1 left-1 text-[9px] font-mono text-cyan-500/40 pointer-events-none z-10">┌</span>
          <span className="absolute top-1 right-5 text-[9px] font-mono text-cyan-500/40 pointer-events-none z-10">┐</span>
          <span className="absolute bottom-5 left-1 text-[9px] font-mono text-cyan-500/40 pointer-events-none z-10">└</span>

          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-4 h-[2px] bg-gradient-to-r from-cyan-500 via-teal-400 to-transparent z-10" />

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* SENDER NAME */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                  &gt; SENDER_NAME
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  required
                  className="
                    w-full
                    px-4
                    py-3
                    bg-zinc-900/90
                    border
                    border-zinc-800
                    text-white
                    placeholder-zinc-600
                    font-mono
                    text-sm
                    focus:outline-none
                    focus:border-cyan-400
                    focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]
                    transition
                    duration-200
                    hud-clip-sm
                  "
                />
              </div>

              {/* CONTACT EMAIL */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                  &gt; CONTACT_EMAIL
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="
                    w-full
                    px-4
                    py-3
                    bg-zinc-900/90
                    border
                    border-zinc-800
                    text-white
                    placeholder-zinc-600
                    font-mono
                    text-sm
                    focus:outline-none
                    focus:border-cyan-400
                    focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]
                    transition
                    duration-200
                    hud-clip-sm
                  "
                />
              </div>
            </div>

            {/* TRANSMISSION PAYLOAD */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                &gt; TRANSMISSION_PAYLOAD
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me about your project..."
                required
                className="
                  w-full
                  px-4
                  py-3
                  bg-zinc-900/90
                  border
                  border-zinc-800
                  text-white
                  placeholder-zinc-600
                  font-mono
                  text-sm
                  focus:outline-none
                  focus:border-cyan-400
                  focus:shadow-[0_0_15px_rgba(34,211,238,0.2)]
                  transition
                  duration-200
                  resize-none
                  hud-clip-sm
                "
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={status.loading}
              className="
                group
                flex
                items-center
                justify-center
                gap-2
                w-full
                sm:w-auto
                px-8
                py-4
                bg-cyan-400
                text-black
                font-mono
                text-xs
                font-bold
                uppercase
                tracking-wider
                shadow-[0_0_20px_rgba(34,211,238,0.4)]
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:bg-cyan-300
                disabled:opacity-50
                disabled:cursor-not-allowed
                disabled:hover:scale-100
                hud-clip-sm
                cursor-pointer
              "
            >
              <span>
                {status.loading ? "TRANSMITTING..." : "> DISPATCH_MESSAGE"}
              </span>
              {!status.loading && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}