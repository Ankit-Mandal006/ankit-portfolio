// lib/game-arena/physics.ts

import { PlayerPosition, MAP_SIZE, GAME_CONFIG } from "./types";

export class GamePhysics {
  private keysPressed: { [key: string]: boolean } = {};
  private touchMovement = { dx: 0, dy: 0 };

  setKeyPressed(key: string, pressed: boolean) {
    this.keysPressed[key.toLowerCase()] = pressed;
  }

  setTouchMovement(dx: number, dy: number) {
    this.touchMovement.dx = dx;
    this.touchMovement.dy = dy;
  }

  getTouchMovement() {
    return this.touchMovement;
  }

  updatePlayerPhysics(playerPos: PlayerPosition, boostMultiplier: number = 1.0) {
    let inputX = 0;
    let inputY = 0;

    // Keyboard input
    if (this.keysPressed["w"] || this.keysPressed["arrowup"]) inputY -= 1;
    if (this.keysPressed["s"] || this.keysPressed["arrowdown"]) inputY += 1;
    if (this.keysPressed["a"] || this.keysPressed["arrowleft"]) inputX -= 1;
    if (this.keysPressed["d"] || this.keysPressed["arrowright"]) inputX += 1;

    // Touch input
    inputX += this.touchMovement.dx;
    inputY += this.touchMovement.dy;

    // Normalize diagonal movement
    if (inputX !== 0 && inputY !== 0) {
      inputX *= 0.7071;
      inputY *= 0.7071;
    }

    // Apply physics with boost scaling
    const accel = GAME_CONFIG.physics.acceleration * boostMultiplier;
    const friction = GAME_CONFIG.physics.friction;

    playerPos.vx = (playerPos.vx + inputX * accel) * friction;
    playerPos.vy = (playerPos.vy + inputY * accel) * friction;

    // Clamp velocity with boost scaling
    const maxVel = GAME_CONFIG.physics.maxVelocity * boostMultiplier;
    const velMagnitude = Math.hypot(playerPos.vx, playerPos.vy);
    if (velMagnitude > maxVel) {
      playerPos.vx = (playerPos.vx / velMagnitude) * maxVel;
      playerPos.vy = (playerPos.vy / velMagnitude) * maxVel;
    }

    // Update position with boundaries
    playerPos.x = Math.max(
      50,
      Math.min(MAP_SIZE.width - 50, playerPos.x + playerPos.vx)
    );
    playerPos.y = Math.max(
      50,
      Math.min(MAP_SIZE.height - 50, playerPos.y + playerPos.vy)
    );

    // Update angle based on velocity
    if (Math.abs(playerPos.vx) > 0.1 || Math.abs(playerPos.vy) > 0.1) {
      playerPos.angle = Math.atan2(playerPos.vy, playerPos.vx);
    }
  }

  updateCamera(
    playerPos: PlayerPosition,
    cameraPos: { x: number; y: number }
  ) {
    const smoothing = GAME_CONFIG.camera.smoothing;
    cameraPos.x += (playerPos.x - cameraPos.x) * smoothing;
    cameraPos.y += (playerPos.y - cameraPos.y) * smoothing;
  }
}