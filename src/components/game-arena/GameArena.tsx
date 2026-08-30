"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  X,
  ExternalLink,
  Volume2,
  VolumeX,
  Zap,
  Globe,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Compass,
} from "lucide-react";

import { GameRenderer } from "@/lib/game-arena/renderer";
import { GamePhysics } from "@/lib/game-arena/physics";
import { GameAudio } from "@/lib/game-arena/audio";
import {
  type Project,
  type GameNode,
  type PlayerPosition,
  type CameraPosition,
  type Particle,
  MAP_SIZE,
  NODE_COLORS,
  GAME_CONFIG,
} from "@/lib/game-arena/types";

interface GameArenaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameArena({ isOpen, onClose }: GameArenaProps) {
  // Data state
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeNode, setActiveNode] = useState<GameNode | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<GameRenderer | null>(null);
  const physicsRef = useRef(new GamePhysics());
  const audioRef = useRef(new GameAudio(true));
  const nodesRef = useRef<GameNode[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  // Game state refs
  const playerPosRef = useRef<PlayerPosition>({
    x: MAP_SIZE.width / 2,
    y: MAP_SIZE.height / 2,
    vx: 0,
    vy: 0,
    angle: 0,
  });

  const cameraPosRef = useRef<CameraPosition>({
    x: MAP_SIZE.width / 2,
    y: MAP_SIZE.height / 2,
  });

  const activeNodeIdRef = useRef<string | null>(null);
  const lastHoveredNodeRef = useRef<string | null>(null);

  // ============ Data Loading ============
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    const loadProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data) && data.length > 0) {
            setProjects(data);
            setLoading(false);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to load projects:", error);
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // ============ Node & Particle Initialization ============
  useEffect(() => {
    if (projects.length === 0) return;

    const centerX = MAP_SIZE.width / 2;
    const centerY = MAP_SIZE.height / 2;
    const radius = Math.min(MAP_SIZE.width, MAP_SIZE.height) * 0.32;

    const nodes: GameNode[] = projects.map((project, index) => {
      const angle = (index / projects.length) * Math.PI * 2 - Math.PI / 2;
      const x = Math.round(centerX + Math.cos(angle) * radius);
      const y = Math.round(centerY + Math.sin(angle) * radius);
      const color = NODE_COLORS[index % NODE_COLORS.length];

      return {
        id: project.slug,
        slug: project.slug,
        title: project.title,
        category: project.engine || "Game Systems",
        x,
        y,
        color,
        desc: project.tagline || project.description || "",
        tags: project.technologies || ["Unity", "C#"],
        raw: project,
      };
    });

    nodesRef.current = nodes;

    // Initialize particles matching updated Particle interface
    const particles: Particle[] = [];
    for (let i = 0; i < GAME_CONFIG.particles.count; i++) {
      particles.push({
        x: Math.random() * MAP_SIZE.width,
        y: Math.random() * MAP_SIZE.height,
        vx: 0,
        vy: -(Math.random() * 0.3 + 0.1),
        size: Math.random() * 2 + 1,
        life: 0,
        maxLife: Infinity,
        color: `rgba(34, 211, 238, ${Math.random() * 0.6 + 0.2})`,
      });
    }
    particlesRef.current = particles;
  }, [projects]);

  // ============ Canvas Setup ============
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      if (rendererRef.current) {
        rendererRef.current.setCanvasSize(canvas.width, canvas.height);
      }
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    handleResize();

    return () => resizeObserver.disconnect();
  }, [isOpen]);

  // ============ Audio Management ============
  useEffect(() => {
    audioRef.current.setEnabled(soundEnabled);
  }, [soundEnabled]);

  // ============ Game Loop ============
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize renderer
    rendererRef.current = new GameRenderer(canvas);

    let animationFrameId: number;

    // ---- Input Handlers ----
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      physicsRef.current.setKeyPressed(key, true);

      if (e.key === "Escape") onClose();

      if (key === "e" && activeNodeIdRef.current) {
        audioRef.current.playSelect();
        window.open(
          `/projects/${activeNodeIdRef.current}`,
          "_blank",
          "noopener,noreferrer"
        );
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      physicsRef.current.setKeyPressed(e.key.toLowerCase(), false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // ---- Render Loop ----
    const render = () => {
      if (!rendererRef.current) return;

      // Update physics
      physicsRef.current.updatePlayerPhysics(playerPosRef.current);
      physicsRef.current.updateCamera(playerPosRef.current, cameraPosRef.current);

      // Update particles
      particlesRef.current.forEach((p) => {
        p.y += p.vy;
        if (p.y < 0) p.y = MAP_SIZE.height;
      });

      // Clear and render
      rendererRef.current.clear();
      rendererRef.current.setupCamera(
        playerPosRef.current,
        cameraPosRef.current
      );

      // Draw world elements
      rendererRef.current.drawArenaFrame();
      rendererRef.current.drawGrid();
      rendererRef.current.drawParticles(particlesRef.current);
      rendererRef.current.drawNodeConnections(nodesRef.current);

      // Draw nodes and handle hover
      rendererRef.current.drawNodes(
        nodesRef.current,
        playerPosRef.current,
        (node) => {
          const nextNodeId = node?.id || null;
          if (activeNodeIdRef.current !== nextNodeId) {
            activeNodeIdRef.current = nextNodeId;
            setActiveNode(node);
          }

          if (node && lastHoveredNodeRef.current !== node.id) {
            audioRef.current.playHover();
            lastHoveredNodeRef.current = node.id;
          } else if (!node) {
            lastHoveredNodeRef.current = null;
          }
        }
      );

      // Draw player
      rendererRef.current.drawPlayerShip(playerPosRef.current);

      // Restore camera
      rendererRef.current.restoreCamera();

      // Draw UI elements (after camera restore)
      rendererRef.current.drawMinimap(nodesRef.current, playerPosRef.current);
      rendererRef.current.drawCRTEffect();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen, onClose]);

  // ============ Cleanup ============
  useEffect(() => {
    return () => {
      audioRef.current.cleanup();
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-2 sm:p-4 select-none"
        >
          <div className="relative w-full h-[94vh] bg-zinc-950 border border-cyan-500/40 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(34,211,238,0.2)] flex flex-col">
            {/* Header */}
            <GameArenaHeader
              soundEnabled={soundEnabled}
              onSoundToggle={() => setSoundEnabled(!soundEnabled)}
              onClose={onClose}
            />

            {/* Canvas Container */}
            <div
              ref={containerRef}
              className="relative flex-1 bg-zinc-950 overflow-hidden flex items-center justify-center min-h-0"
            >
              {loading ? (
                <GameLoadingState />
              ) : (
                <>
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full block cursor-crosshair"
                  />
                  {/* CRT Effect Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
                </>
              )}

              {/* Inspector Modal */}
              <GameNodeInspector activeNode={activeNode} />
            </div>

            {/* Mobile Controls */}
            <GameMobileControls physics={physicsRef.current} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============ Subcomponents ============

interface GameArenaHeaderProps {
  soundEnabled: boolean;
  onSoundToggle: () => void;
  onClose: () => void;
}

function GameArenaHeader({
  soundEnabled,
  onSoundToggle,
  onClose,
}: GameArenaHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 bg-zinc-950/95 border-b border-cyan-500/20 text-xs font-mono z-20 gap-3 sm:gap-4 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex-shrink-0">
          <Gamepad2 className="w-4 h-4 animate-pulse" />
        </div>
        <div className="min-w-0">
          <p className="text-cyan-300 font-bold tracking-wider truncate text-[11px] sm:text-sm leading-tight">
            SYS_ARENA // PORTFOLIO_v5
          </p>
          <p className="hidden md:inline text-[9px] text-zinc-500 ml-2">
            MAP: 2200×1500
          </p>
        </div>
      </div>

      {/* Controls Hint - Hidden on mobile */}
      <div className="hidden xl:flex items-center gap-3 text-zinc-400 text-[10px] flex-shrink-0">
        <span className="flex items-center gap-1">
          <kbd className="px-1 py-0.5 rounded bg-zinc-800/80 border border-zinc-700 text-cyan-300 text-[10px] font-bold">
            WASD
          </kbd>
          <span className="text-zinc-600">/</span>
          <kbd className="px-1 py-0.5 rounded bg-zinc-800/80 border border-zinc-700 text-cyan-300 text-[10px] font-bold">
            Arrows
          </kbd>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1 py-0.5 rounded bg-zinc-800/80 border border-zinc-700 text-cyan-300 text-[10px] font-bold">
            E
          </kbd>
          <span>Inspect</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-1 py-0.5 rounded bg-zinc-800/80 border border-zinc-700 text-cyan-300 text-[10px] font-bold">
            ESC
          </kbd>
          <span>Exit</span>
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
        <button
          onClick={onSoundToggle}
          className="p-1.5 sm:p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-cyan-400 transition-colors border border-zinc-800/60 hover:border-zinc-700"
          title={soundEnabled ? "Mute audio" : "Unmute audio"}
          aria-label="Toggle audio"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        <button
          onClick={onClose}
          className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-red-950/30 text-cyan-400 hover:text-red-400 transition-colors border border-cyan-500/20 hover:border-red-500/40 text-xs font-mono font-bold"
        >
          <X className="w-4 h-4" />
          <span className="hidden sm:inline text-[11px]">EXIT</span>
        </button>
      </div>
    </div>
  );
}

function GameLoadingState() {
  return (
    <div className="flex flex-col items-center gap-4 font-mono text-cyan-400">
      <Zap className="w-10 h-10 animate-bounce text-cyan-400" />
      <span className="text-sm uppercase tracking-widest animate-pulse">
        INITIALIZING SYSTEM...
      </span>
      <div className="w-48 h-1 bg-zinc-900 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-pulse"></div>
      </div>
    </div>
  );
}

interface GameNodeInspectorProps {
  activeNode: GameNode | null;
}

function GameNodeInspector({ activeNode }: GameNodeInspectorProps) {
  return (
    <AnimatePresence>
      {activeNode && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.92 }}
          transition={{ duration: 0.15 }}
          className="absolute bottom-5 left-4 right-4 sm:bottom-8 sm:right-8 sm:w-[460px] bg-zinc-950/98 border border-cyan-500/40 p-5 sm:p-7 rounded-lg sm:rounded-2xl backdrop-blur-2xl shadow-[0_0_50px_rgba(34,211,238,0.25)] text-left font-sans z-30"
        >
          {/* Category Badge */}
          <div className="flex items-center justify-between border-b border-zinc-800/50 pb-3 mb-4">
            <span
              className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded border"
              style={{
                backgroundColor: `${activeNode.color}12`,
                borderColor: `${activeNode.color}35`,
                color: activeNode.color,
              }}
            >
              {activeNode.category}
            </span>
            <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1.5 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LINKED</span>
            </span>
          </div>

          {/* Content */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            {activeNode.title}
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed mb-5">
            {activeNode.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {activeNode.tags.slice(0, 5).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded border bg-zinc-900/60 border-zinc-800/80 text-[11px] font-mono text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2.5">
            <a
              href={`/projects/${activeNode.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-zinc-950 text-sm font-bold rounded-lg transition-all duration-200 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
            >
              <span>VIEW PROJECT</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {activeNode.raw.itch && (
              <a
                href={activeNode.raw.itch}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-cyan-400 border border-zinc-800/60 hover:border-zinc-700 text-sm font-mono rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>ITCH.IO</span>
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface GameMobileControlsProps {
  physics: InstanceType<typeof GamePhysics>;
}

function GameMobileControls({ physics }: GameMobileControlsProps) {
  return (
    <div className="lg:hidden p-4 sm:p-5 bg-zinc-950/95 border-t border-cyan-500/20 flex justify-between items-center z-20 gap-4 backdrop-blur-sm">
      <div className="flex items-center gap-2.5 text-cyan-400 text-xs sm:text-sm font-mono flex-shrink-0">
        <Compass className="w-4 h-4 animate-spin" />
        <span className="hidden sm:inline text-[12px]">TOUCH_CONTROLS</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 w-auto">
        <div />
        <button
          onPointerDown={() => physics.setTouchMovement(0, -1)}
          onPointerUp={() => physics.setTouchMovement(0, 0)}
          onPointerLeave={() => physics.setTouchMovement(0, 0)}
          className="w-12 h-12 bg-zinc-900/80 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400 active:bg-cyan-500/30 active:border-cyan-500/60 active:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all touch-none font-mono"
          aria-label="Move up"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
        <div />

        <button
          onPointerDown={() => physics.setTouchMovement(-1, 0)}
          onPointerUp={() => physics.setTouchMovement(0, 0)}
          onPointerLeave={() => physics.setTouchMovement(0, 0)}
          className="w-12 h-12 bg-zinc-900/80 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400 active:bg-cyan-500/30 active:border-cyan-500/60 active:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all touch-none font-mono"
          aria-label="Move left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onPointerDown={() => physics.setTouchMovement(0, 1)}
          onPointerUp={() => physics.setTouchMovement(0, 0)}
          onPointerLeave={() => physics.setTouchMovement(0, 0)}
          className="w-12 h-12 bg-zinc-900/80 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400 active:bg-cyan-500/30 active:border-cyan-500/60 active:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all touch-none font-mono"
          aria-label="Move down"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        <button
          onPointerDown={() => physics.setTouchMovement(1, 0)}
          onPointerUp={() => physics.setTouchMovement(0, 0)}
          onPointerLeave={() => physics.setTouchMovement(0, 0)}
          className="w-12 h-12 bg-zinc-900/80 rounded-lg border border-cyan-500/30 flex items-center justify-center text-cyan-400 active:bg-cyan-500/30 active:border-cyan-500/60 active:shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all touch-none font-mono"
          aria-label="Move right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}