"use client";

import { useEffect, useRef } from "react";

type Point = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

export default function MeshBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrameId = 0;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    const points: Point[] = Array.from({
      length: 250,
    }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0 || p.x >= width) {
          p.vx *= -1;
        }

        if (p.y <= 0 || p.y >= height) {
          p.vy *= -1;
        }
      }

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;

          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const opacity =
              0.12 * (1 - dist / 180);

            ctx.strokeStyle =
              `rgba(34,211,238,${opacity})`;

            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(
              points[i].x,
              points[i].y
            );
            ctx.lineTo(
              points[j].x,
              points[j].y
            );
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        ctx.fillStyle =
          "rgba(34,211,238,0.35)";

        ctx.beginPath();
        ctx.arc(
          p.x,
          p.y,
          1.8,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      animationFrameId =
        requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr =
        window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        fixed
        inset-0
        -z-10
        opacity-70
        pointer-events-none
      "
    />
  );
}