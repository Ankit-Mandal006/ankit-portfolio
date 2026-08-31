import {
  PlayerPosition,
  CameraPosition,
  GameNode,
  MAP_SIZE,
  GAME_CONFIG,
} from "./types";

export class GamePhysics {
  private keys: Record<string, boolean> = {};
  private touchMoveX: number = 0;
  private touchMoveY: number = 0;

  public setKeyPressed(key: string, pressed: boolean) {
    this.keys[key.toLowerCase()] = pressed;
  }

  public setTouchDirection(moveX: number, moveY: number) {
    this.touchMoveX = moveX;
    this.touchMoveY = moveY;
  }

  public updatePlayerPhysics(player: PlayerPosition, nodes: GameNode[]) {
    const accel = 0.75;
    const friction = 0.94;

    let inputX = 0;
    let inputY = 0;

    if (this.keys["w"] || this.keys["arrowup"]) inputY -= 1;
    if (this.keys["s"] || this.keys["arrowdown"]) inputY += 1;
    if (this.keys["a"] || this.keys["arrowleft"]) inputX -= 1;
    if (this.keys["d"] || this.keys["arrowright"]) inputX += 1;

    if (this.touchMoveX !== 0 || this.touchMoveY !== 0) {
      inputX = this.touchMoveX;
      inputY = this.touchMoveY;
    }

    const hasInput = inputX !== 0 || inputY !== 0;

    if (hasInput) {
      const len = Math.hypot(inputX, inputY);
      inputX /= len;
      inputY /= len;
    }

    let capturedByPlanet = false;

    // Planetary Gravity Mechanics
    for (const node of nodes) {
      const dx = node.x - player.x;
      const dy = node.y - player.y;
      const dist = Math.hypot(dx, dy);

      if (dist < node.gravityRadius) {
        capturedByPlanet = true;

        // Gravitational force formula
        const force = (GAME_CONFIG.gravityConstant * node.mass) / Math.max(dist * dist, 4000);
        const gravAngle = Math.atan2(dy, dx);

        // Apply gravitational pull toward node center
        player.vx += Math.cos(gravAngle) * force;
        player.vy += Math.sin(gravAngle) * force;

        // Auto Orbit Capture Phase
        if (dist <= node.orbitRadius && !player.isOrbiting && !hasInput) {
          player.isOrbiting = true;
          player.orbitNodeId = node.id;
          player.orbitRadius = dist;
          player.orbitAngle = Math.atan2(player.y - node.y, player.x - node.x);
          
          // Determine orbital direction using cross product
          const cross = dx * player.vy - dy * player.vx;
          player.orbitSpeed = cross >= 0 ? 0.022 : -0.022;
        }

        // Break orbit with thrusters
        if (player.isOrbiting && hasInput) {
          player.isOrbiting = false;
          player.orbitNodeId = null;
        }

        if (player.isOrbiting && player.orbitNodeId === node.id) {
          player.orbitAngle += player.orbitSpeed;
          player.x = node.x + Math.cos(player.orbitAngle) * player.orbitRadius;
          player.y = node.y + Math.sin(player.orbitAngle) * player.orbitRadius;

          // Tangential velocity vector while locked in orbit
          const tangentAngle = player.orbitAngle + (player.orbitSpeed > 0 ? Math.PI / 2 : -Math.PI / 2);
          player.vx = Math.cos(tangentAngle) * (player.orbitRadius * Math.abs(player.orbitSpeed));
          player.vy = Math.sin(tangentAngle) * (player.orbitRadius * Math.abs(player.orbitSpeed));
          player.angle = tangentAngle;
          break;
        }
      }
    }

    if (!capturedByPlanet) {
      player.isOrbiting = false;
      player.orbitNodeId = null;
    }

    // Standard free flight dynamics
    if (!player.isOrbiting) {
      player.vx += inputX * accel;
      player.vy += inputY * accel;

      player.vx *= friction;
      player.vy *= friction;

      player.x += player.vx;
      player.y += player.vy;

      const currentSpeed = Math.hypot(player.vx, player.vy);
      if (currentSpeed > 0.3) {
        const targetAngle = Math.atan2(player.vy, player.vx);
        let diff = targetAngle - player.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        player.angle += diff * 0.25;
      }
    }

    player.isThrusting = hasInput;

    // Hard boundary clamping
    player.x = Math.max(30, Math.min(MAP_SIZE.width - 30, player.x));
    player.y = Math.max(30, Math.min(MAP_SIZE.height - 30, player.y));
  }

  // Clamped camera bounds to avoid void clipping
  public updateCamera(
    player: PlayerPosition,
    camera: CameraPosition,
    viewWidth: number,
    viewHeight: number
  ) {
    camera.x += (player.x - camera.x) * GAME_CONFIG.camera.lerp;
    camera.y += (player.y - camera.y) * GAME_CONFIG.camera.lerp;

    const halfW = viewWidth / 2;
    const halfH = viewHeight / 2;

    if (MAP_SIZE.width > viewWidth) {
      camera.x = Math.max(halfW, Math.min(MAP_SIZE.width - halfW, camera.x));
    } else {
      camera.x = MAP_SIZE.width / 2;
    }

    if (MAP_SIZE.height > viewHeight) {
      camera.y = Math.max(halfH, Math.min(MAP_SIZE.height - halfH, camera.y));
    } else {
      camera.y = MAP_SIZE.height / 2;
    }

    if (camera.shake > 0) {
      camera.shake *= 0.88;
      if (camera.shake < 0.1) camera.shake = 0;
    }
  }
}