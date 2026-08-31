import {
  GameNode,
  PlayerPosition,
  CameraPosition,
  Particle,
  Asteroid,
  Laser,
  Star,
  MAP_SIZE,
  GAME_CONFIG,
} from "./types";

export class GameRenderer {
  private ctx: CanvasRenderingContext2D;
  private width: number = 0;
  private height: number = 0;
  private dpr: number = 1;
  private scanlinePattern: CanvasPattern | null = null;

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Failed to acquire 2D context");
    this.ctx = context;
    this.createScanlinePattern();
  }

  // Pre-rendered pattern fixes CRT rendering stutter/lag completely
  private createScanlinePattern() {
    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = 1;
    patternCanvas.height = 4;
    const pCtx = patternCanvas.getContext("2d");
    if (pCtx) {
      pCtx.fillStyle = "rgba(0, 0, 0, 0.25)";
      pCtx.fillRect(0, 0, 1, 2);
      this.scanlinePattern = this.ctx.createPattern(patternCanvas, "repeat");
    }
  }

  public resize(width: number, height: number, dpr: number = 1) {
    this.width = width;
    this.height = height;
    this.dpr = dpr;
  }

  public getViewBounds() {
    return {
      w: this.width / this.dpr,
      h: this.height / this.dpr,
    };
  }

  public clear() {
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.fillStyle = "#030408";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  public beginCameraTransform(camera: CameraPosition) {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.dpr, this.dpr);
    const { w: viewW, h: viewH } = this.getViewBounds();

    const shakeX = (Math.random() - 0.5) * camera.shake;
    const shakeY = (Math.random() - 0.5) * camera.shake;

    this.ctx.translate(
      viewW / 2 - camera.x + shakeX,
      viewH / 2 - camera.y + shakeY
    );
  }

  public endCameraTransform() {
    this.ctx.restore();
  }

  public drawStars(stars: Star[]) {
    const ctx = this.ctx;
    ctx.save();
    const time = Date.now() * 0.002;

    stars.forEach((star) => {
      const alpha = Math.abs(Math.sin(time * star.pulseSpeed + star.x)) * 0.6 + 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  public drawGrid() {
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = "rgba(0, 243, 255, 0.04)";
    ctx.lineWidth = 1;
    ctx.beginPath();

    const step = GAME_CONFIG.grid.size;
    for (let x = 0; x <= MAP_SIZE.width; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, MAP_SIZE.height);
    }
    for (let y = 0; y <= MAP_SIZE.height; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(MAP_SIZE.width, y);
    }
    ctx.stroke();

    ctx.strokeStyle = "rgba(0, 243, 255, 0.35)";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, MAP_SIZE.width, MAP_SIZE.height);
    ctx.restore();
  }

  public drawNodes(nodes: GameNode[], activeNodeId: string | null) {
    const ctx = this.ctx;
    const time = Date.now() * 0.0015;

    nodes.forEach((node) => {
      const isActive = node.id === activeNodeId;
      ctx.save();
      ctx.translate(node.x, node.y);

      if (node.hasRing) {
        ctx.save();
        ctx.rotate(node.ringAngle);
        ctx.scale(1, 0.35);
        ctx.beginPath();
        ctx.arc(0, 0, node.radius * 1.8, 0, Math.PI * 2);
        ctx.strokeStyle = node.ringColor;
        ctx.lineWidth = 5;
        ctx.shadowColor = node.ringColor;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.restore();
      }

      const grad = ctx.createRadialGradient(
        -node.radius * 0.3,
        -node.radius * 0.3,
        node.radius * 0.1,
        0,
        0,
        node.radius
      );
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.3, node.color);
      grad.addColorStop(1, "#030712");

      ctx.beginPath();
      ctx.arc(0, 0, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isActive ? 28 : 14;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, node.radius + 3 + Math.sin(time * 2) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isActive ? 3 : 1.5;
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.font = "bold 13px monospace";
      ctx.fillStyle = isActive ? "#ffffff" : "#cbd5e1";
      ctx.textAlign = "center";
      ctx.fillText(node.title.toUpperCase(), 0, -node.radius - 16);

      if (isActive) {
        ctx.font = "10px monospace";
        ctx.fillStyle = node.color;
        ctx.fillText("[ PRESS E TO INSPECT ]", 0, node.radius + 22);
      }

      ctx.restore();
    });
  }

  public drawPlayer(player: PlayerPosition) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.rotate(player.angle);

    if (player.isThrusting) {
      ctx.beginPath();
      ctx.moveTo(-16, -5);
      ctx.lineTo(-28 - Math.random() * 8, 0);
      ctx.lineTo(-16, 5);
      ctx.closePath();
      ctx.fillStyle = "#ff0055";
      ctx.shadowColor = "#ff0055";
      ctx.shadowBlur = 14;
      ctx.fill();
    }

    ctx.beginPath();
    ctx.moveTo(22, 0);
    ctx.lineTo(-14, -16);
    ctx.lineTo(-8, -6);
    ctx.lineTo(-16, -4);
    ctx.lineTo(-16, 4);
    ctx.lineTo(-8, 6);
    ctx.lineTo(-14, 16);
    ctx.closePath();

    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = "#00f3ff";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00f3ff";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(4, 0, 7, 3.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = "#00f3ff";
    ctx.fill();

    ctx.restore();
  }

  public drawMeshParticles(particles: Particle[]) {
    const ctx = this.ctx;
    ctx.save();

    particles.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.lineWidth = 1.2;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;

      ctx.beginPath();
      p.vertices.forEach((v, idx) => {
        const vx = v.x * p.size;
        const vy = v.y * p.size;
        if (idx === 0) ctx.moveTo(vx, vy);
        else ctx.lineTo(vx, vy);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });

    ctx.restore();
  }

  public drawLasers(lasers: Laser[]) {
    const ctx = this.ctx;
    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#ff0055";
    ctx.shadowColor = "#ff0055";
    ctx.shadowBlur = 12;

    lasers.forEach((l) => {
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(l.x - l.vx * 1.4, l.y - l.vy * 1.4);
      ctx.stroke();
    });
    ctx.restore();
  }

  // Render asteroids using their distinct color
  public drawAsteroids(asteroids: Asteroid[]) {
    const ctx = this.ctx;
    ctx.save();

    asteroids.forEach((a) => {
      ctx.save();
      ctx.translate(a.x, a.y);
      ctx.rotate(a.rotation);
      ctx.strokeStyle = a.color;
      ctx.fillStyle = `${a.color}22`;
      ctx.lineWidth = 2;
      ctx.shadowColor = a.color;
      ctx.shadowBlur = 10;

      ctx.beginPath();
      a.vertices.forEach((v, i) => {
        if (i === 0) ctx.moveTo(v.x, v.y);
        else ctx.lineTo(v.x, v.y);
      });
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });
    ctx.restore();
  }

  // Dynamic Minimap Positioning
  public drawUIOverlay(nodes: GameNode[], player: PlayerPosition) {
    const ctx = this.ctx;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(this.dpr, this.dpr);

    const { w: viewW } = this.getViewBounds();
    const size = GAME_CONFIG.minimap.size;
    const x = viewW - size - GAME_CONFIG.minimap.offsetX;
    const y = GAME_CONFIG.minimap.offsetY;

    ctx.fillStyle = "rgba(6, 7, 10, 0.88)";
    ctx.strokeStyle = "rgba(0, 243, 255, 0.35)";
    ctx.lineWidth = 1.5;
    ctx.fillRect(x, y, size, size);
    ctx.strokeRect(x, y, size, size);

    nodes.forEach((n) => {
      const mx = x + (n.x / MAP_SIZE.width) * size;
      const my = y + (n.y / MAP_SIZE.height) * size;
      ctx.fillStyle = n.color;
      ctx.beginPath();
      ctx.arc(mx, my, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    const px = x + (player.x / MAP_SIZE.width) * size;
    const py = y + (player.y / MAP_SIZE.height) * size;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(px, py, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Optimized CRT Overlay (No Stuttering)
  public drawCRTEffect() {
    const ctx = this.ctx;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(this.dpr, this.dpr);

    const { w, h } = this.getViewBounds();

    if (this.scanlinePattern) {
      ctx.fillStyle = this.scanlinePattern;
      ctx.fillRect(0, 0, w, h);
    }

    const vignette = ctx.createRadialGradient(
      w / 2,
      h / 2,
      Math.max(w, h) * 0.4,
      w / 2,
      h / 2,
      Math.max(w, h) * 0.75
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(1, "rgba(0,0,0,0.65)");

    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    ctx.restore();
  }
}