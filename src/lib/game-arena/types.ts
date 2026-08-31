export interface Project {
  slug: string;
  title: string;
  description?: string;
  tagline?: string;
  engine?: string;
  technologies?: string[];
}

export interface GameNode {
  id: string;
  slug: string;
  title: string;
  category: string;
  x: number;
  y: number;
  color: string;
  desc: string;
  tags: string[];
  raw: Project;
  radius: number;
  hasRing: boolean;
  ringAngle: number;
  ringColor: string;
}

export interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
}

export interface PlayerPosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  isThrusting?: boolean;
}

export interface CameraPosition {
  x: number;
  y: number;
  shake: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
  alpha: number;
  rotation: number;
  vRot: number;
  vertices: { x: number; y: number }[];
}

export interface Asteroid {
  id: string;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  points: number;
  color: string;
  vertices: { x: number; y: number }[];
  rotation: number;
  vRot: number;
}

export interface Laser {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export const MAP_SIZE = {
  width: 3600,
  height: 2400,
};

export const ASTEROID_COLORS = [
  "#a855f7",
  "#e11d48",
  "#f59e0b",
  "#06b6d4",
  "#84cc16",
];

export const NODE_COLORS = [
  "#00f3ff",
  "#ff0055",
  "#a855f7",
  "#3b82f6",
  "#10b981",
  "#f59e0b",
];

export const GAME_CONFIG = {
  grid: { size: 120 },
  camera: { lerp: 0.12 },
  minimap: { size: 150, offsetX: 20, offsetY: 20 },
};