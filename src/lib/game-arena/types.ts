export type Project = {
  id?: number;
  slug: string;
  title: string;
  tagline?: string;
  description?: string;
  engine?: string;
  role?: string;
  duration?: string;
  cover?: string;
  technologies?: string[];
  itch?: string;
  github?: string;
  featured?: boolean;
};

export interface Asteroid {
  id: string;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
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
}

export interface PlayerPosition {
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
}

export interface CameraPosition {
  x: number;
  y: number;
}

export const MAP_SIZE = {
  width: 2200,
  height: 1500,
} as const;

export const NODE_COLORS = [
  "#22d3ee", // cyan
  "#f43f5e", // rose
  "#10b981", // emerald
  "#a855f7", // purple
  "#eab308", // yellow
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#ec4899", // pink
] as const;

export const GAME_CONFIG = {
  nodeRadius: {
    default: 48,
    hover: 64,
    interactDistance: 90,
    connectionDistance: 900,
  },
  physics: {
    acceleration: 0.8,
    friction: 0.85,
    maxVelocity: 12,
  },
  camera: {
    smoothing: 0.08,
    zoom: 0.3,
  },
  particles: {
    count: 1200,
  },
  grid: {
    size: 100,
  },
  minimap: {
    size: 30,
    offsetX: 5,
    offsetY: 5,
  },
} as const;