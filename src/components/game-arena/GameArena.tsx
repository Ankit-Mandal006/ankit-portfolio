"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gamepad2,
  X,
  ExternalLink,
  Zap,
  Trophy,
  Crosshair,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Activity,
  Cpu,
} from "lucide-react";

import { GameRenderer } from "@/lib/game-arena/renderer";
import { GamePhysics } from "@/lib/game-arena/physics";
import {
  type Project,
  type GameNode,
  type PlayerPosition,
  type CameraPosition,
  type Particle,
  type Asteroid,
  type Laser,
  type Star,
  MAP_SIZE,
  ASTEROID_COLORS,
  NODE_COLORS,
} from "@/lib/game-arena/types";

interface GameArenaProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GameArena({ isOpen, onClose }: GameArenaProps) {
  const [loading, setLoading] = useState(true);
  const [activeNode, setActiveNode] = useState<GameNode | null>(null);
  const [score, setScore] = useState(0);

  const scoreRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<GameRenderer | null>(null);
  const physicsRef = useRef(new GamePhysics());

  const nodesRef = useRef<GameNode[]>([]);
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const lasersRef = useRef<Laser[]>([]);

  const playerPosRef = useRef<PlayerPosition>({
    x: MAP_SIZE.width / 2,
    y: MAP_SIZE.height / 2,
    vx: 0,
    vy: 0,
    angle: -Math.PI / 2,
    isOrbiting: false,
    orbitNodeId: null,
    orbitAngle: 0,
    orbitRadius: 180,
    orbitSpeed: 0.02,
  });

  const cameraPosRef = useRef<CameraPosition>({
    x: MAP_SIZE.width / 2,
    y: MAP_SIZE.height / 2,
    shake: 0,
    glitchIntensity: 0,
  });

  const activeNodeIdRef = useRef<string | null>(null);
  const lastShotTimeRef = useRef<number>(0);

  const addScore = (pts: number) => {
    scoreRef.current += pts;
    setScore(scoreRef.current);
  };

  const generateStars = (count = 280) => {
    const stars: Star[] = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * MAP_SIZE.width,
        y: Math.random() * MAP_SIZE.height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random(),
        pulseSpeed: Math.random() * 2 + 1,
      });
    }
    starsRef.current = stars;
  };

  const spawnAsteroids = (count: number) => {
    const list: Asteroid[] = [];
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 24 + 18;
      const vertexCount = Math.floor(Math.random() * 4) + 7;
      const vertices: { x: number; y: number }[] = [];

      for (let j = 0; j < vertexCount; j++) {
        const angle = (j / vertexCount) * Math.PI * 2;
        const r = radius * (0.75 + Math.random() * 0.45);
        vertices.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r });
      }

      list.push({
        id: Math.random().toString(36).substring(2, 9),
        x: Math.random() * MAP_SIZE.width,
        y: Math.random() * MAP_SIZE.height,
        radius,
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2,
        points: Math.round(radius * 10),
        color: ASTEROID_COLORS[Math.floor(Math.random() * ASTEROID_COLORS.length)],
        vertices,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.025,
      });
    }
    asteroidsRef.current = [...asteroidsRef.current, ...list];
  };

  const createMeshExplosion = (x: number, y: number, color: string, count = 24) => {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 2;

      const shardVertices = [
        { x: 0, y: -1.2 },
        { x: 0.8, y: 0.4 },
        { x: 0, y: 1.2 },
        { x: -0.8, y: 0.2 },
      ];

      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 4 + 2,
        life: 0,
        maxLife: Math.random() * 25 + 15,
        color,
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        vertices: shardVertices,
      });
    }
  };

  const fireLaser = (targetWorldX?: number, targetWorldY?: number) => {
    const now = Date.now();
    if (now - lastShotTimeRef.current < 120) return;
    lastShotTimeRef.current = now;

    const p = playerPosRef.current;
    let angle = p.angle;

    if (targetWorldX !== undefined && targetWorldY !== undefined) {
      angle = Math.atan2(targetWorldY - p.y, targetWorldX - p.x);
      p.angle = angle;
    }

    lasersRef.current.push({
      id: Math.random().toString(),
      x: p.x + Math.cos(angle) * 24,
      y: p.y + Math.sin(angle) * 24,
      vx: Math.cos(angle) * 22,
      vy: Math.sin(angle) * 22,
      life: 0,
      maxLife: 55,
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    scoreRef.current = 0;
    setScore(0);
    generateStars();

    let isMounted = true;
    const loadProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data: Project[] = res.ok ? await res.json() : [];

        if (isMounted) {
          const padding = 400;
          nodesRef.current = data.map((proj, idx) => {
            const radius = Math.random() * 18 + 32;
            return {
              id: proj.slug,
              slug: proj.slug,
              title: proj.title,
              category: proj.engine || "System",
              x: Math.random() * (MAP_SIZE.width - padding * 2) + padding,
              y: Math.random() * (MAP_SIZE.height - padding * 2) + padding,
              color: NODE_COLORS[idx % NODE_COLORS.length],
              desc: proj.tagline || proj.description || "",
              tags: proj.technologies || [],
              raw: proj,
              radius,
              gravityRadius: radius * 8.5,
              orbitRadius: radius * 3.2,
              mass: 1.2,
              hasRing: Math.random() > 0.4,
              ringAngle: (Math.random() - 0.5) * 0.8,
              ringColor: NODE_COLORS[(idx + 2) % NODE_COLORS.length],
              glitchTimer: 0,
            };
          });

          spawnAsteroids(26);
          setLoading(false);
        }
      } catch {
        if (isMounted) setLoading(false);
      }
    };

    loadProjects();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    rendererRef.current = new GameRenderer(canvas);

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      rendererRef.current?.resize(canvas.width, canvas.height, dpr);
    };

    handleResize();
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    let frameId: number;

    const handleKeyDown = (e: KeyboardEvent) => {
      physicsRef.current.setKeyPressed(e.key, true);
      if (e.code === "Space") {
        e.preventDefault();
        fireLaser();
      }
      if (e.key === "Escape") onClose();
      if (e.key.toLowerCase() === "e" && activeNodeIdRef.current) {
        window.open(`/projects/${activeNodeIdRef.current}`, "_blank");
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      physicsRef.current.setKeyPressed(e.key, false);
    };

    const handlePointerDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName !== "CANVAS") return;

      const rect = canvas.getBoundingClientRect();
      const mouseCanvasX = e.clientX - rect.left;
      const mouseCanvasY = e.clientY - rect.top;

      const renderer = rendererRef.current;
      if (!renderer) return;

      const { w: viewW, h: viewH } = renderer.getViewBounds();
      const camera = cameraPosRef.current;

      const worldX = camera.x + (mouseCanvasX - viewW / 2);
      const worldY = camera.y + (mouseCanvasY - viewH / 2);

      fireLaser(worldX, worldY);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("mousedown", handlePointerDown);

    const loop = () => {
      const renderer = rendererRef.current;
      const physics = physicsRef.current;
      const player = playerPosRef.current;
      const camera = cameraPosRef.current;

      if (renderer) {
        const { w: viewW, h: viewH } = renderer.getViewBounds();

        physics.updatePlayerPhysics(player, nodesRef.current);
        physics.updateCamera(player, camera, viewW, viewH);

        lasersRef.current.forEach((l) => {
          l.x += l.vx;
          l.y += l.vy;
          l.life++;
        });
        lasersRef.current = lasersRef.current.filter((l) => l.life < l.maxLife);

        asteroidsRef.current.forEach((a) => {
          a.x += a.vx;
          a.y += a.vy;
          a.rotation += a.vRot;

          if (a.x < 0) a.x = MAP_SIZE.width;
          if (a.x > MAP_SIZE.width) a.x = 0;
          if (a.y < 0) a.y = MAP_SIZE.height;
          if (a.y > MAP_SIZE.height) a.y = 0;
        });

        particlesRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.vRot;
          p.life++;
          p.alpha = Math.max(0, 1 - p.life / p.maxLife);
        });
        particlesRef.current = particlesRef.current.filter((p) => p.life < p.maxLife);

        // Collisions
        lasersRef.current.forEach((laser) => {
          asteroidsRef.current.forEach((ast, index) => {
            const dist = Math.hypot(laser.x - ast.x, laser.y - ast.y);
            if (dist < ast.radius) {
              laser.life = laser.maxLife;
              createMeshExplosion(ast.x, ast.y, ast.color, 24);
              camera.shake = Math.min(22, camera.shake + 8);
              addScore(ast.points);
              asteroidsRef.current.splice(index, 1);
            }
          });
        });

        const playerRadius = 18;
        asteroidsRef.current.forEach((ast, index) => {
          const dist = Math.hypot(player.x - ast.x, player.y - ast.y);
          if (dist < ast.radius + playerRadius) {
            camera.shake = 24;
            createMeshExplosion(ast.x, ast.y, ast.color, 28);

            const bumpAngle = Math.atan2(player.y - ast.y, player.x - ast.x);
            player.vx += Math.cos(bumpAngle) * 12;
            player.vy += Math.sin(bumpAngle) * 12;

            addScore(Math.round(ast.points / 2));
            asteroidsRef.current.splice(index, 1);
          }
        });

        if (asteroidsRef.current.length < 10) {
          spawnAsteroids(6);
        }

        let nearestId: string | null = null;
        let nearestNode: GameNode | null = null;

        nodesRef.current.forEach((n) => {
          const dist = Math.hypot(player.x - n.x, player.y - n.y);
          if (dist < n.orbitRadius + 40) {
            nearestId = n.id;
            nearestNode = n;
          }
        });

        if (activeNodeIdRef.current !== nearestId) {
          activeNodeIdRef.current = nearestId;
          setActiveNode(nearestNode);
        }

        renderer.clear();
        renderer.beginCameraTransform(camera);
        renderer.drawSciFiBackground(starsRef.current, nodesRef.current);
        renderer.drawGrid();
        renderer.drawGravityFields(nodesRef.current, player);
        renderer.drawParticles(particlesRef.current);
        renderer.drawLasers(lasersRef.current);
        renderer.drawAsteroids(asteroidsRef.current);
        renderer.drawNodes(nodesRef.current, activeNodeIdRef.current);
        renderer.drawPlayer(player);
        renderer.endCameraTransform();

        renderer.drawUIOverlay(nodesRef.current, player);
      }

      frameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("mousedown", handlePointerDown);
      observer.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [isOpen, loading, onClose]);

  const chamferCutStyle = {
    clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 0 100%)",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#030712] flex flex-col p-2 sm:p-4 select-none"
        >
          <div
            style={chamferCutStyle}
            className="relative flex-1 w-full h-full bg-[#030712] border border-cyan-500/50 flex flex-col shadow-[0_0_40px_rgba(0,243,255,0.18)]"
          >
            {/* Top Bar Game HUD */}
            <div className="flex justify-between items-center px-4 sm:px-6 py-2.5 bg-black/90 border-b border-cyan-500/40 text-xs font-mono z-10 shrink-0">
              <div className="flex items-center gap-3 text-cyan-400">
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span className="tracking-widest font-bold hidden sm:inline text-cyan-300">
                  SPACE ARENA
                </span>
                <span className="sm:hidden font-bold">ARENA</span>
              </div>

              <div className="flex items-center gap-3">
                <div
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
                  className="flex items-center gap-2 text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 px-3 py-1 text-[11px] font-bold tracking-wider"
                >
                  <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                  <span>STATUS: ONLINE</span>
                </div>

                <div
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)" }}
                  className="flex items-center gap-2 text-amber-400 bg-amber-950/60 border border-amber-500/40 px-3 py-1 text-[11px] font-bold tracking-wider"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>SCORE: {score}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors hover:bg-cyan-950/60 rounded border border-transparent hover:border-cyan-500/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Viewport */}
            <div ref={containerRef} className="relative flex-1 w-full h-full overflow-hidden">
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center text-cyan-400 font-mono tracking-widest bg-[#030712]">
                  <Zap className="w-6 h-6 animate-bounce mr-2 text-cyan-400" />
                  LOADING ARENA...
                </div>
              ) : (
                <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />
              )}

              {/* Precise Cut-Corner Information Card Matching Reference Image */}
              {activeNode && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={chamferCutStyle}
                  className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-[420px] bg-[#030914]/95 border border-cyan-500/70 p-5 text-white font-mono backdrop-blur-md z-20 shadow-[0_0_30px_rgba(0,243,255,0.25)]"
                >

                  {/* Header Strip */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
                      TARGET_NODE
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-wide mb-2">{activeNode.title}</h3>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4 line-clamp-3">
                    {activeNode.desc || "High-priority orbital system node mapped to target architecture database."}
                  </p>

                  <div className="border-t border-cyan-900/60 pt-3 mb-4">
                    {activeNode.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {activeNode.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 px-2.5 py-1 tracking-wider uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <a
                    href={`/projects/${activeNode.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
                    className="flex items-center justify-center gap-2 py-2.5 bg-cyan-500 text-black font-extrabold hover:bg-cyan-400 transition-colors text-xs tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                  >
                    INSPECT PLANET DATA <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </motion.div>
              )}
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden p-3 bg-[#030712]/95 border-t border-cyan-500/30 flex justify-between items-center z-10 shrink-0">
              <div className="grid grid-cols-3 gap-1">
                <div />
                <button
                  onPointerDown={() => physicsRef.current.setTouchDirection(0, -1)}
                  onPointerUp={() => physicsRef.current.setTouchDirection(0, 0)}
                  className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center text-cyan-400 active:bg-cyan-500/40"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
                <div />
                <button
                  onPointerDown={() => physicsRef.current.setTouchDirection(-1, 0)}
                  onPointerUp={() => physicsRef.current.setTouchDirection(0, 0)}
                  className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center text-cyan-400 active:bg-cyan-500/40"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onPointerDown={() => physicsRef.current.setTouchDirection(0, 1)}
                  onPointerUp={() => physicsRef.current.setTouchDirection(0, 0)}
                  className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center text-cyan-400 active:bg-cyan-500/40"
                >
                  <ArrowDown className="w-5 h-5" />
                </button>
                <button
                  onPointerDown={() => physicsRef.current.setTouchDirection(1, 0)}
                  onPointerUp={() => physicsRef.current.setTouchDirection(0, 0)}
                  className="w-10 h-10 bg-cyan-500/20 border border-cyan-500/50 rounded flex items-center justify-center text-cyan-400 active:bg-cyan-500/40"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={() => fireLaser()}
                className="px-6 h-11 bg-rose-500/20 border border-rose-500/50 rounded flex items-center justify-center text-rose-400 font-mono font-bold active:bg-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]"
              >
                <Crosshair className="w-5 h-5 mr-1" /> FIRE
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}