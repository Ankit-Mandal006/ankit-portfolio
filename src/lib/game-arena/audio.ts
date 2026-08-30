// lib/game-arena/audio.ts

export class GameAudio {
  private audioCtx: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor(enabled: boolean = true) {
    this.isEnabled = enabled;
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  private getAudioContext(): AudioContext | null {
    if (!this.isEnabled) return null;

    try {
      if (!this.audioCtx) {
        const AudioContextClass =
          window.AudioContext ||
          (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }

      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      return this.audioCtx;
    } catch {
      return null;
    }
  }

  playHover() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Silently fail
    }
  }

  playSelect() {
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.type = "square";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(660, now + 0.15);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Silently fail
    }
  }

  cleanup() {
    if (this.audioCtx && this.audioCtx.state !== "closed") {
      this.audioCtx.close();
      this.audioCtx = null;
    }
  }
}