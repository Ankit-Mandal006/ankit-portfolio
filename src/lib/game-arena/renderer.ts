import {
  GameNode,
  PlayerPosition,
  CameraPosition,
  Particle,
  MAP_SIZE,
  GAME_CONFIG,
} from "./types";

export class GameRenderer {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");
    this.ctx = ctx;
    this.width = canvas.width;
    this.height = canvas.height;
  }

  setCanvasSize(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  clear() {
    this.ctx.fillStyle = "#050508";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawArenaFrame() {
    this.ctx.save();
    this.ctx.strokeStyle = "#22d3ee44";
    this.ctx.lineWidth = 4;
    this.ctx.shadowColor = "#22d3ee";
    this.ctx.shadowBlur = 20;
    this.ctx.strokeRect(0, 0, MAP_SIZE.width, MAP_SIZE.height);
    this.ctx.shadowBlur = 0;
    this.ctx.restore();
  }

  drawGrid() {
    this.ctx.strokeStyle = "#121218";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    const gridSize = GAME_CONFIG.grid.size;

    for (let x = 0; x <= MAP_SIZE.width; x += gridSize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, MAP_SIZE.height);
    }

    for (let y = 0; y <= MAP_SIZE.height; y += gridSize) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(MAP_SIZE.width, y);
    }

    this.ctx.stroke();
  }

  drawParticles(particles: Particle[]) {
    particles.forEach((p) => {
      this.ctx.fillStyle = `rgba(34, 211, 238, ${p.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawNodeConnections(nodes: GameNode[]) {
    this.ctx.lineWidth = 1.5;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);

        if (dist < GAME_CONFIG.nodeRadius.connectionDistance) {
          const opacity =
            0.15 * (1 - dist / GAME_CONFIG.nodeRadius.connectionDistance);
          this.ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
          this.ctx.beginPath();
          this.ctx.moveTo(n1.x, n1.y);
          this.ctx.lineTo(n2.x, n2.y);
          this.ctx.stroke();
        }
      }
    }
  }

  drawPlayerToNodeLine(
    playerPos: PlayerPosition,
    node: GameNode,
    color: string
  ) {
    this.ctx.strokeStyle = `${color}66`;
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(playerPos.x, playerPos.y);
    this.ctx.lineTo(node.x, node.y);
    this.ctx.stroke();
  }

  drawNode(node: GameNode, isHovered: boolean, time: number) {
    const pulse = Math.sin(time + node.x) * 8;
    const radius = isHovered
      ? GAME_CONFIG.nodeRadius.hover + 4
      : GAME_CONFIG.nodeRadius.default + 2;

    // Outer glow circle
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, radius + pulse, 0, Math.PI * 2);
    this.ctx.fillStyle = isHovered ? `${node.color}45` : `${node.color}25`;
    this.ctx.fill();

    // Border ring with glow
    this.ctx.strokeStyle = node.color;
    this.ctx.lineWidth = isHovered ? 4 : 2.5;
    this.ctx.shadowColor = node.color;
    this.ctx.shadowBlur = isHovered ? 35 : 15;
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    // Secondary ring
    if (isHovered) {
      this.ctx.strokeStyle = `${node.color}60`;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
      this.ctx.stroke();
    }

    // Center dot
    this.ctx.beginPath();
    this.ctx.arc(node.x, node.y, 12, 0, Math.PI * 2);
    this.ctx.fillStyle = "#ffffff";
    this.ctx.shadowColor = node.color;
    this.ctx.shadowBlur = 8;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Title
    this.ctx.font = "bold 14px monospace";
    this.ctx.fillStyle = isHovered ? "#ffffff" : "#d4d4d8";
    this.ctx.textAlign = "center";
    this.ctx.fillText(node.title.toUpperCase(), node.x, node.y - 65);

    // Category label
    this.ctx.font = "11px monospace";
    this.ctx.fillStyle = node.color;
    this.ctx.fillText(`[ ${node.category.toUpperCase()} ]`, node.x, node.y - 46);

    // Interaction hint
    if (isHovered) {
      this.ctx.font = "bold 11px monospace";
      this.ctx.fillStyle = node.color;
      this.ctx.fillText("PRESS [E] TO INSPECT", node.x, node.y + 72);
    }
  }

  drawNodes(
    nodes: GameNode[],
    playerPos: PlayerPosition,
    onNodeHover: (node: GameNode | null) => void
  ): GameNode | null {
    const time = Date.now() * 0.003;
    let nearNode: GameNode | null = null;

    nodes.forEach((node) => {
      const dist = Math.hypot(
        playerPos.x - node.x,
        playerPos.y - node.y
      );
      const isHovered = dist < GAME_CONFIG.nodeRadius.interactDistance;

      if (isHovered) {
        nearNode = node;
      }

      if (dist < 180) {
        this.drawPlayerToNodeLine(playerPos, node, node.color);
      }

      this.drawNode(node, isHovered, time);
    });

    onNodeHover(nearNode);
    return nearNode;
  }

  drawPlayerShip(playerPos: PlayerPosition) {
    const pX = playerPos.x;
    const pY = playerPos.y;
    const angle = playerPos.angle;

    this.ctx.save();
    this.ctx.translate(pX, pY);
    this.ctx.rotate(angle);

    // Thrust effect
    if (Math.abs(playerPos.vx) > 0.2 || Math.abs(playerPos.vy) > 0.2) {
      this.ctx.beginPath();
      this.ctx.moveTo(-14, 0);
      this.ctx.lineTo(-24 + Math.random() * 6, -5);
      this.ctx.lineTo(-24 + Math.random() * 6, 5);
      this.ctx.closePath();
      this.ctx.fillStyle = "#f43f5e";
      this.ctx.shadowColor = "#f43f5e";
      this.ctx.shadowBlur = 15;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    // Ship body
    this.ctx.beginPath();
    this.ctx.moveTo(16, 0);
    this.ctx.lineTo(-12, -11);
    this.ctx.lineTo(-6, 0);
    this.ctx.lineTo(-12, 11);
    this.ctx.closePath();
    this.ctx.fillStyle = "#22d3ee";
    this.ctx.shadowColor = "#22d3ee";
    this.ctx.shadowBlur = 20;
    this.ctx.fill();
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();
    this.ctx.shadowBlur = 0;

    this.ctx.restore();
  }

  drawMinimap(nodes: GameNode[], playerPos: PlayerPosition) {
    const miniSize = GAME_CONFIG.minimap.size;
    const miniX = this.width - miniSize - GAME_CONFIG.minimap.offsetX;
    const miniY = GAME_CONFIG.minimap.offsetY;

    // Background
    const gradient = this.ctx.createLinearGradient(
      miniX,
      miniY,
      miniX,
      miniY + miniSize
    );
    gradient.addColorStop(0, "rgba(5, 5, 8, 0.9)");
    gradient.addColorStop(1, "rgba(5, 5, 8, 0.7)");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(miniX, miniY, miniSize, miniSize);

    // Border
    this.ctx.strokeStyle = "#22d3ee88";
    this.ctx.lineWidth = 1.5;
    this.ctx.shadowColor = "#22d3ee";
    this.ctx.shadowBlur = 8;
    this.ctx.strokeRect(miniX, miniY, miniSize, miniSize);
    this.ctx.shadowBlur = 0;

    // Nodes
    nodes.forEach((n) => {
      const mx = miniX + (n.x / MAP_SIZE.width) * miniSize;
      const my = miniY + (n.y / MAP_SIZE.height) * miniSize;
      this.ctx.fillStyle = n.color;
      this.ctx.beginPath();
      this.ctx.arc(mx, my, 3, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // Player marker
    const pmx = miniX + (playerPos.x / MAP_SIZE.width) * miniSize;
    const pmy = miniY + (playerPos.y / MAP_SIZE.height) * miniSize;
    this.ctx.fillStyle = "#ffffff";
    this.ctx.shadowColor = "#22d3ee";
    this.ctx.shadowBlur = 8;
    this.ctx.beginPath();
    this.ctx.arc(pmx, pmy, 3.5, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Crosshair
    this.ctx.strokeStyle = "#22d3ee44";
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(miniX + miniSize / 2 - 2, miniY + miniSize / 2);
    this.ctx.lineTo(miniX + miniSize / 2 + 2, miniY + miniSize / 2);
    this.ctx.moveTo(miniX + miniSize / 2, miniY + miniSize / 2 - 2);
    this.ctx.lineTo(miniX + miniSize / 2, miniY + miniSize / 2 + 2);
    this.ctx.stroke();
  }

  setupCamera(playerPos: PlayerPosition, cameraPos: CameraPosition) {
    this.ctx.save();
    this.ctx.translate(this.width / 2, this.height / 2);
    this.ctx.scale(GAME_CONFIG.camera.zoom, GAME_CONFIG.camera.zoom);
    this.ctx.translate(-cameraPos.x, -cameraPos.y);
  }

  restoreCamera() {
    this.ctx.restore();
  }

  drawCRTEffect() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }
}