import { PlayerPosition, CameraPosition, MAP_SIZE, GAME_CONFIG } from "./types";

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

  public updatePlayerPhysics(player: PlayerPosition) {
    const accel = 0.65;
    const friction = 0.93;

    let moveX = 0;
    let moveY = 0;

    if (this.keys["w"] || this.keys["arrowup"]) moveY -= 1;
    if (this.keys["s"] || this.keys["arrowdown"]) moveY += 1;
    if (this.keys["a"] || this.keys["arrowleft"]) moveX -= 1;
    if (this.keys["d"] || this.keys["arrowright"]) moveX += 1;

    if (this.touchMoveX !== 0 || this.touchMoveY !== 0) {
      moveX = this.touchMoveX;
      moveY = this.touchMoveY;
    }

    if (moveX !== 0 && moveY !== 0) {
      const len = Math.hypot(moveX, moveY);
      moveX /= len;
      moveY /= len;
    }

    player.vx += moveX * accel;
    player.vy += moveY * accel;

    player.vx *= friction;
    player.vy *= friction;

    player.x += player.vx;
    player.y += player.vy;

    const speed = Math.hypot(player.vx, player.vy);
    if (speed > 0.3) {
      const targetAngle = Math.atan2(player.vy, player.vx);
      let diff = targetAngle - player.angle;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      player.angle += diff * 0.22;
    }

    player.isThrusting = speed > 0.5;

    // Hard boundary clamping for ship in world
    player.x = Math.max(30, Math.min(MAP_SIZE.width - 30, player.x));
    player.y = Math.max(30, Math.min(MAP_SIZE.height - 30, player.y));
  }

  // Camera clamping prevents camera from showing black void outside map
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