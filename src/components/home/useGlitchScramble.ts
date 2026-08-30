"use client";

import { useEffect, useRef, useState } from "react";

const GLITCH_CHARS = "0123456789ABCDEF!@#$%^&*<>[]{}—=+_█▓▒░";

interface UseGlitchScrambleOptions {
  /** ms delay between each letter locking into place */
  staggerMs?: number;
  /** duration (ms) characters scramble before starting lock sequence */
  scrambleDurationMs?: number;
  /** interval (ms) for ambient micro-glitch flickers once locked */
  flickerIntervalMs?: number;
}

/**
 * High-performance rAF-backed text decode scramble hook.
 * Guarantees zero memory leaks, frame-perfect synchronization, and clean cleanup.
 */
export function useGlitchScramble(
  text: string,
  isActive: boolean,
  {
    staggerMs = 35,
    scrambleDurationMs = 200,
    flickerIntervalMs = 1800,
  }: UseGlitchScrambleOptions = {}
) {
  const [display, setDisplay] = useState(text);
  const animFrameRef = useRef<number | null>(null);
  const flickerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Immediate reset on hover off
    if (!isActive) {
      setDisplay(text);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (flickerTimeoutRef.current) clearTimeout(flickerTimeoutRef.current);
      return;
    }

    const chars = text.split("");
    const startTime = performance.now();

    // Smooth frame-based reveal phase
    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      let allLocked = true;

      const next = chars.map((ch, i) => {
        if (ch === " ") return ch;
        const lockTime = scrambleDurationMs + i * staggerMs;
        if (elapsed >= lockTime) return ch;
        allLocked = false;
        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      });

      setDisplay(next.join(""));

      if (!allLocked) {
        animFrameRef.current = requestAnimationFrame(updateFrame);
      } else {
        // Reveal complete -> trigger ambient micro-flickers
        scheduleAmbientFlicker();
      }
    };

    const scheduleAmbientFlicker = () => {
      const delay = flickerIntervalMs + Math.random() * 800;
      flickerTimeoutRef.current = setTimeout(() => {
        const arr = text.split("");
        const flickerCount = 1 + Math.floor(Math.random() * 2);

        for (let n = 0; n < flickerCount; n++) {
          const idx = Math.floor(Math.random() * arr.length);
          if (arr[idx] !== " ") {
            arr[idx] = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          }
        }

        setDisplay(arr.join(""));

        // Snap back to real text quickly
        flickerTimeoutRef.current = setTimeout(() => {
          setDisplay(text);
          scheduleAmbientFlicker();
        }, 80);
      }, delay);
    };

    animFrameRef.current = requestAnimationFrame(updateFrame);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (flickerTimeoutRef.current) clearTimeout(flickerTimeoutRef.current);
    };
  }, [isActive, text, staggerMs, scrambleDurationMs, flickerIntervalMs]);

  return display;
}