"use client";

import { useEffect } from "react";

export default function Starfield() {
  useEffect(() => {
    const container = document.getElementById("starfield");

    if (!container) return;

    for (let i = 0; i < 120; i++) {
      const star = document.createElement("div");

      star.className = "star";

      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;

      star.style.animationDelay =
        `${Math.random() * 4}s`;

      container.appendChild(star);
    }
  }, []);

  return (
    <div
      id="starfield"
      className="
        fixed
        inset-0
        overflow-hidden
        pointer-events-none
        -z-20
      "
    />
  );
}