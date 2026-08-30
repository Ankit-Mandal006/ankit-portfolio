"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlitchScramble } from "./useGlitchScramble";

interface GlitchTitleProps {
  onClick?: () => void;
  label?: string;
}

export default function GlitchTitle({
  onClick,
  label = "TARGET_ACQUIRED",
}: GlitchTitleProps) {
  const [isHovering, setIsHovering] = useState(false);

  const ankitText = useGlitchScramble("ANKIT", isHovering, {
    staggerMs: 40,
    scrambleDurationMs: 180,
    flickerIntervalMs: 2000,
  });

  const mandalText = useGlitchScramble("MANDAL", isHovering, {
    staggerMs: 40,
    scrambleDurationMs: 180,
    flickerIntervalMs: 1700,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative inline-block cursor-pointer select-none p-6 md:p-8 group"
    >
      <style jsx>{`
        /* Scan beam strictly contained inside text clipping mask */
        @keyframes text-scan-sweep {
          0% {
            background-position: 0% -200%;
          }
          100% {
            background-position: 0% 300%;
          }
        }

        /* Chromatic RGB split jitter — applied to text glyphs only */
        @keyframes chromatic-jitter-a {
          0%, 100% {
            text-shadow: -2px 0 #00f3ff, 2px 0 #ff0055;
            transform: translate(0, 0);
          }
          25% {
            text-shadow: -3px 1px #00f3ff, 1px -1px #ff0055;
            transform: translate(-1px, 1px);
          }
          50% {
            text-shadow: 2px -1px #00f3ff, -2px 1px #ff0055;
            transform: translate(1px, -1px);
          }
          75% {
            text-shadow: -1px -2px #00f3ff, 3px 0 #ff0055;
            transform: translate(-1px, 0);
          }
        }

        @keyframes chromatic-jitter-b {
          0%, 100% {
            text-shadow: 2px 0 #00f3ff, -2px 0 #3b82f6;
            transform: translate(0, 0);
          }
          33% {
            text-shadow: -2px 1px #00f3ff, 2px -1px #3b82f6;
            transform: translate(1px, 0);
          }
          66% {
            text-shadow: 1px -1px #00f3ff, -3px 1px #3b82f6;
            transform: translate(-1px, 1px);
          }
        }

        @keyframes corner-pulse {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 2px #22d3ee); }
          50% { opacity: 1; filter: drop-shadow(0 0 8px #22d3ee); }
        }

        .chromatic-ankit {
          animation: chromatic-jitter-a 0.25s steps(2, end) infinite;
        }

        .chromatic-mandal {
          animation: chromatic-jitter-b 0.3s steps(2, end) infinite;
        }

        .corner-bracket {
          animation: corner-pulse 1.8s ease-in-out infinite;
        }

        .text-scan-overlay {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(34, 211, 238, 0.8) 50%,
            transparent 100%
          );
          background-size: 100% 300%;
          animation: text-scan-sweep 2s ease-in-out infinite;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>

      {/* Modern Tactical HUD Corner Reticles */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Top-Left Corner */}
            <div className="corner-bracket absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400">
              <span className="absolute -top-[3px] -left-[3px] w-1 h-1 bg-cyan-300" />
            </div>
            {/* Top-Right Corner */}
            <div className="corner-bracket absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400">
              <span className="absolute -top-[3px] -right-[3px] w-1 h-1 bg-cyan-300" />
            </div>
            {/* Bottom-Left Corner */}
            <div className="corner-bracket absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400">
              <span className="absolute -bottom-[3px] -left-[3px] w-1 h-1 bg-cyan-300" />
            </div>
            {/* Bottom-Right Corner */}
            <div className="corner-bracket absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400">
              <span className="absolute -bottom-[3px] -right-[3px] w-1 h-1 bg-cyan-300" />
            </div>

            {/* Target Crosshairs */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-[1px] bg-cyan-400/60" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-[1px] bg-cyan-400/60" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top HUD Telemetry Badge */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-1 left-6 right-6 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400/90 pointer-events-none"
          >
            <span>// SYS_LOCK</span>
            <span className="text-cyan-300 font-semibold">// {label} //</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Title Block */}
      <h1 className="relative text-7xl md:text-9xl font-black leading-none tracking-tight">
        {/* FIRST NAME: ANKIT */}
        <span className="relative block">
          {/* Chromatic Aberration Ghost Layer (Masked purely to text glyphs) */}
          {isHovering && (
            <span
              aria-hidden="true"
              className="chromatic-ankit absolute inset-0 text-white opacity-70 pointer-events-none z-0"
            >
              {ankitText}
            </span>
          )}

          {/* Base Solid Text */}
          <span className="relative z-10 block text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            {ankitText}
          </span>

          {/* Text-Masked Beam Sweep (No rectangular box) */}
          {isHovering && (
            <span
              aria-hidden="true"
              className="text-scan-overlay absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
            >
              {ankitText}
            </span>
          )}
        </span>

        {/* LAST NAME: MANDAL */}
        <span className="relative block mt-1">
          {/* Chromatic Aberration Ghost Layer */}
          {isHovering && (
            <span
              aria-hidden="true"
              className="chromatic-mandal absolute inset-0 opacity-80 pointer-events-none z-0 bg-gradient-to-b from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent"
            >
              {mandalText}
            </span>
          )}

          {/* Base Gradient Text */}
          <span className="relative z-10 block bg-gradient-to-b from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(34,211,238,0.45)]">
            {mandalText}
          </span>

          {/* Text-Masked Beam Sweep */}
          {isHovering && (
            <span
              aria-hidden="true"
              className="text-scan-overlay absolute inset-0 z-20 pointer-events-none mix-blend-overlay"
            >
              {mandalText}
            </span>
          )}
        </span>
      </h1>

      {/* Bottom HUD Telemetry Status */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -2 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-1 left-6 right-6 flex justify-between items-center font-mono text-[8px] uppercase tracking-[0.2em] text-cyan-400/60 pointer-events-none"
          >
            <span>SIG_STRENGTH: 99.8%</span>
            <span>SEC_LEVEL_01</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}