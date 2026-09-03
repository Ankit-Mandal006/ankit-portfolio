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

  constructor(canvas: HTMLCanvasElement) {
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Failed to acquire 2D context");
    this.ctx = context;
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
    this.ctx.fillStyle = "#030712";
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

  public drawSciFiBackground(stars: Star[], nodes: GameNode[]) {
    const ctx = this.ctx;
    const time = Date.now() * 0.001;

    // Constellation lines
    ctx.save();
    ctx.strokeStyle = "rgba(0, 243, 255, 0.07)";
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
        if (d < 950) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.restore();

    // Starfield
    ctx.save();
    stars.forEach((star) => {
      const alpha = Math.abs(Math.sin(time * star.pulseSpeed + star.x)) * 0.7 + 0.2;
      ctx.fillStyle = `rgba(0, 243, 255, ${alpha})`;
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

    ctx.strokeStyle = "#00f3ff";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00f3ff";
    ctx.shadowBlur = 10;
    ctx.strokeRect(0, 0, MAP_SIZE.width, MAP_SIZE.height);
    ctx.restore();
  }

  public drawGravityFields(nodes: GameNode[], player: PlayerPosition) {
    const ctx = this.ctx;
    const time = Date.now() * 0.002;

    nodes.forEach((node) => {
      const distToPlayer = Math.hypot(player.x - node.x, player.y - node.y);
      const isPlayerInside = distToPlayer < node.gravityRadius;

      ctx.save();
      ctx.translate(node.x, node.y);

      ctx.beginPath();
      ctx.arc(0, 0, node.gravityRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isPlayerInside ? "rgba(0, 243, 255, 0.45)" : "rgba(0, 243, 255, 0.12)";
      ctx.setLineDash([6, 8]);
      ctx.lineWidth = isPlayerInside ? 2 : 1;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(0, 0, node.orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = isPlayerInside ? node.color : "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = isPlayerInside ? 2.5 : 1;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isPlayerInside ? 16 : 0;
      ctx.stroke();

      if (isPlayerInside) {
        const ringCount = 8;
        for (let i = 0; i < ringCount; i++) {
          const a = (i / ringCount) * Math.PI * 2 + time;
          const r = node.orbitRadius + ((time * 40) % (node.gravityRadius - node.orbitRadius));
          ctx.fillStyle = node.color;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * r, Math.sin(a) * r, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    });
  }

  public drawNodes(nodes: GameNode[], activeNodeId: string | null) {
    const ctx = this.ctx;
    const time = Date.now() * 0.002;

    nodes.forEach((node) => {
      const isActive = node.id === activeNodeId;
      ctx.save();
      ctx.translate(node.x, node.y);

      const grad = ctx.createRadialGradient(
        -node.radius * 0.3,
        -node.radius * 0.3,
        node.radius * 0.1,
        0,
        0,
        node.radius
      );
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.4, node.color);
      grad.addColorStop(1, "#030712");

      ctx.beginPath();
      ctx.arc(0, 0, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isActive ? 28 : 14;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(0, 0, node.radius + 6 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isActive ? 2.5 : 1.2;
      ctx.stroke();

      const bSize = node.radius + 14;
      ctx.strokeStyle = "rgba(0, 243, 255, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-bSize, -bSize, bSize * 2, bSize * 2);

      ctx.shadowBlur = 0;
      ctx.font = "bold 11px monospace";
      ctx.fillStyle = "#00f3ff";
      ctx.textAlign = "center";
      ctx.fillText(node.title.toUpperCase(), 0, -node.radius - 22);

      if (isActive) {
        ctx.font = "10px monospace";
        ctx.fillStyle = "#ffffff";
        ctx.fillText("[ PRESS E TO INSPECT ]", 0, node.radius + 28);
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
    ctx.lineTo(-14, -14);
    ctx.lineTo(-8, -5);
    ctx.lineTo(-16, -3);
    ctx.lineTo(-16, 3);
    ctx.lineTo(-8, 5);
    ctx.lineTo(-14, 14);
    ctx.closePath();

    ctx.fillStyle = "#090d16";
    ctx.strokeStyle = "#00f3ff";
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00f3ff";
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(4, 0, 6, 3, 0, 0, Math.PI * 2);
    ctx.fillStyle = player.isOrbiting ? "#a855f7" : "#00f3ff";
    ctx.fill();

    ctx.restore();
  }

  public drawParticles(particles: Particle[]) {
    const ctx = this.ctx;
    ctx.save();

    particles.forEach((p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.strokeStyle = p.color;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.lineWidth = 1.5;
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

  // Tactical Cut-Corner Radar Scope
  public drawUIOverlay(nodes: GameNode[], player: PlayerPosition) {
    const ctx = this.ctx;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(this.dpr, this.dpr);

    const { w: viewW } = this.getViewBounds();
    const size = 195;
    const cut = 16;
    const x = viewW - size - 20;
    const y = 20;
    const cx = x + size / 2;
    const cy = y + size / 2;
    const radius = size / 2 - 12;

    // Chamfered Radar Box Background
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + size - cut, y);
    ctx.lineTo(x + size, y + cut);
    ctx.lineTo(x + size, y + size - cut);
    ctx.lineTo(x + size - cut, y + size);
    ctx.lineTo(x, y + size);
    ctx.closePath();

    ctx.fillStyle = "rgba(2, 8, 20, 0.92)";
    ctx.fill();
    ctx.strokeStyle = "#00f3ff";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = "rgba(0, 243, 255, 0.4)";
    ctx.shadowBlur = 12;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Corner Brackets (┌, ┐, └)
    ctx.strokeStyle = "rgba(0, 243, 255, 0.7)";
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 4, y + 4, 8, 8);

    // Radar Header
    ctx.font = "bold 9px monospace";
    ctx.fillStyle = "#00f3ff";
    ctx.fillText("MINIMAP", x + 18, y + 12);
    ctx.fillStyle = "rgba(0, 243, 255, 0.4)";
    ctx.fillText("[ACTIVE]", x + size - 50, y + 12);

    // Radar Concentric Range Rings
    ctx.strokeStyle = "rgba(0, 243, 255, 0.15)";
    ctx.lineWidth = 1;
    [0.3, 0.6, 0.9].forEach((rRatio) => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius * rRatio, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Radar Crosshairs
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(cx - radius, cy);
    ctx.lineTo(cx + radius, cy);
    ctx.moveTo(cx, cy - radius);
    ctx.lineTo(cx, cy + radius);
    ctx.stroke();
    ctx.setLineDash([]);

    // Rotating Radar Sweep Cone
    const sweepAngle = (Date.now() * 0.0025) % (Math.PI * 2);
    ctx.save();
    ctx.translate(cx, cy);

    const grad = ctx.createConicGradient(sweepAngle, 0, 0);
    grad.addColorStop(0, "rgba(0, 243, 255, 0.35)");
    grad.addColorStop(0.12, "rgba(0, 243, 255, 0.05)");
    grad.addColorStop(0.2, "transparent");
    grad.addColorStop(1, "transparent");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Planets on Radar
    nodes.forEach((n) => {
      const mx = x + 12 + (n.x / MAP_SIZE.width) * (size - 24);
      const my = y + 12 + (n.y / MAP_SIZE.height) * (size - 24);

      if (Math.hypot(mx - cx, my - cy) <= radius) {
        ctx.fillStyle = n.color;
        ctx.shadowColor = n.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(mx, my, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "rgba(0, 243, 255, 0.4)";
        ctx.strokeRect(mx - 5, my - 5, 10, 10);
      }
    });

    // Player Direction Vector on Radar
    const px = x + 12 + (player.x / MAP_SIZE.width) * (size - 24);
    const py = y + 12 + (player.y / MAP_SIZE.height) * (size - 24);

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(player.angle);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#00f3ff";
    ctx.shadowBlur = 8;

    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(-4, -4);
    ctx.lineTo(-2, 0);
    ctx.lineTo(-4, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Bottom Radar Ticks
    ctx.font = "8px monospace";
    ctx.fillStyle = "rgba(0, 243, 255, 0.5)";
    ctx.fillText("0.5", cx - 8, cy + radius * 0.3 + 3);
    ctx.fillText("1.0", cx - 8, cy + radius * 0.6 + 3);

    ctx.restore();
  }
}