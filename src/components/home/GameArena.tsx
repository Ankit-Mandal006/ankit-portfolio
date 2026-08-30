"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Gamepad2,
  X,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Interactive project nodes placed within the 2D grid
const GAME_PROJECTS = [
  {
    id: "spy-fiction",
    title: "Spy-Fiction",
    category: "Stealth Game Mechanics",
    x: 250,
    y: 200,
    color: "#22d3ee",
    desc: "Mobile stealth action featuring dynamic NPC movement-based noise detection, state machines, and touch controls.",
    tags: ["Unity", "C#", "AI Perception", "Mobile UI"],
  },
  {
    id: "part-time-santa",
    title: "Part-Time Santa",
    category: "Pixel Art Platformer",
    x: 650,
    y: 200,
    color: "#f43f5e",
    desc: "Charming pixel-art holiday platformer with custom dynamic physics and level progression systems.",
    tags: ["Unity 2D", "Pixel Art", "Level Design"],
  },
  {
    id: "adaptive-racing",
    title: "Adaptive Racing AI",
    category: "Systems Architecture",
    x: 450,
    y: 450,
    color: "#10b981",
    desc: "System architecture featuring procedural track adaptation, environment control logic, and competitive AI steering.",
    tags: ["Unity 6", "AI Steering", "Architecture"],
  },
];

interface GameArenaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameArena({ isOpen, onClose }: GameArenaProps) {
  const [activeProject, setActiveProject] = useState<typeof GAME_PROJECTS[0] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const playerPos = useRef({ x: 450, y: 320 });
  const touchMovement = useRef({ dx: 0, dy: 0 });

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const speed = 3.5;
    const playerRadius = 14;

    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      if (e.key === "Escape") onClose();
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const render = () => {
      let dx = 0;
      let dy = 0;

      if (keysPressed.current["w"] || keysPressed.current["arrowup"]) dy -= 1;
      if (keysPressed.current["s"] || keysPressed.current["arrowdown"]) dy += 1;
      if (keysPressed.current["a"] || keysPressed.current["arrowleft"]) dx -= 1;
      if (keysPressed.current["d"] || keysPressed.current["arrowright"]) dx += 1;

      dx += touchMovement.current.dx;
      dy += touchMovement.current.dy;

      if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
      }

      playerPos.current.x = Math.max(
        playerRadius + 20,
        Math.min(canvas.width - playerRadius - 20, playerPos.current.x + dx * speed)
      );
      playerPos.current.y = Math.max(
        playerRadius + 20,
        Math.min(canvas.height - playerRadius - 20, playerPos.current.y + dy * speed)
      );

      // Canvas Rendering
      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.strokeStyle = "#18181b";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Nodes
      let nearNode: typeof GAME_PROJECTS[0] | null = null;
      GAME_PROJECTS.forEach((node) => {
        const dist = Math.hypot(playerPos.current.x - node.x, playerPos.current.y - node.y);
        const isHovered = dist < 45;

        if (isHovered) nearNode = node;

        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? 40 : 30, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? `${node.color}33` : `${node.color}15`;
        ctx.fill();
        ctx.strokeStyle = node.color;
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        ctx.font = "11px monospace";
        ctx.fillStyle = isHovered ? "#ffffff" : "#a1a1aa";
        ctx.textAlign = "center";
        ctx.fillText(node.title.toUpperCase(), node.x, node.y - 48);

        if (isHovered) {
          ctx.font = "10px monospace";
          ctx.fillStyle = node.color;
          ctx.fillText("[ STAND TO INSPECT ]", node.x, node.y + 55);
        }
      });

      setActiveProject(nearNode);

      // Player
      ctx.beginPath();
      ctx.arc(playerPos.current.x, playerPos.current.y, playerRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#22d3ee";
      ctx.shadowColor = "#22d3ee";
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      ctx.arc(
        playerPos.current.x + (dx || 1) * 6,
        playerPos.current.y + dy * 6,
        3,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
        >
          <div className="relative w-full max-w-4xl bg-zinc-900 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 bg-zinc-950 border-b border-zinc-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Gamepad2 className="w-4 h-4" />
                <span>SYS_ARENA // PORTFOLIO_SIMULATOR</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-zinc-500">
                <span>WASD / ARROWS to Move</span>
                <span>ESC to Exit</span>
              </div>
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-cyan-400 transition-colors border border-cyan-500/30 text-xs font-mono"
              >
                <X className="w-4 h-4" />
                <span>TERMINATE_SESSION</span>
              </button>
            </div>

            {/* Canvas */}
            <div className="relative flex justify-center items-center bg-zinc-950">
              <canvas
                ref={canvasRef}
                width={900}
                height={550}
                className="w-full max-w-[900px] h-auto aspect-[16/10]"
              />

              {/* Inspector Popup */}
              <AnimatePresence>
                {activeProject && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 bg-zinc-950/95 border border-cyan-500/40 p-5 rounded-xl backdrop-blur-md shadow-2xl text-left font-sans"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                      <span
                        className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${activeProject.color}22`,
                          color: activeProject.color,
                        }}
                      >
                        {activeProject.category}
                      </span>
                      <span className="text-xs font-mono text-cyan-400 animate-pulse">
                        NODE_CONNECTED
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">{activeProject.title}</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                      {activeProject.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {activeProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/projects"
                      className="flex items-center justify-center gap-2 w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold rounded-lg transition-colors font-mono"
                    >
                      <span>EXECUTE_INSPECT</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Controls */}
            <div className="sm:hidden p-4 bg-zinc-950 border-t border-zinc-800 flex justify-between items-center">
              <span className="text-[10px] font-mono text-cyan-400">TOUCH CONTROLS</span>
              <div className="grid grid-cols-3 gap-1 w-28">
                <div />
                <button
                  onTouchStart={() => (touchMovement.current.dy = -1)}
                  onTouchEnd={() => (touchMovement.current.dy = 0)}
                  className="p-2 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center text-zinc-300 active:bg-cyan-500/20"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <div />
                <button
                  onTouchStart={() => (touchMovement.current.dx = -1)}
                  onTouchEnd={() => (touchMovement.current.dx = 0)}
                  className="p-2 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center text-zinc-300 active:bg-cyan-500/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onTouchStart={() => (touchMovement.current.dy = 1)}
                  onTouchEnd={() => (touchMovement.current.dy = 0)}
                  className="p-2 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center text-zinc-300 active:bg-cyan-500/20"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onTouchStart={() => (touchMovement.current.dx = 1)}
                  onTouchEnd={() => (touchMovement.current.dx = 0)}
                  className="p-2 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center text-zinc-300 active:bg-cyan-500/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}