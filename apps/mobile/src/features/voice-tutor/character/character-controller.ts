export type CharacterState = "idle" | "listening" | "thinking" | "speaking" | "reacting";
export type MouthState = "closed" | "small" | "medium" | "open";
export type EyeState = "open" | "half1" | "half2" | "closed";
export type HeadState = "center" | "left" | "right";
export type GestureState =
  | "none"
  | "hand_raise_1"
  | "hand_raise_2"
  | "hand_raise_3"
  | "both_explain_1"
  | "both_explain_2"
  | "both_compare";

export interface CharacterFrame {
  state: CharacterState;
  mouth: MouthState;
  eye: EyeState;
  head: HeadState;
  gesture: GestureState;
  expression: "neutral" | "laughing";
  intensity: number;
}

export interface CharacterInput {
  phase: "setup" | "starting" | "connecting" | "ready" | "recording" | "transcribing" | "thinking" | "speaking" | "ending" | "finished";
  isAudioPlaying: boolean;
  /** Normalized output amplitude (0–1), when the playback engine exposes it. */
  audioAmplitude?: number | null;
  reactionKey?: string | null;
  gesture?: GestureState | null;
  reactionIntensity?: number | null;
  personality?: "friendly" | "close_friend" | "savage" | "chaotic_savage";
  emotion?: string | null;
  delivery?: string | null;
}

export interface CharacterTiming {
  mouthIntervalMs: number;
  blinkStepMs: number;
  blinkMinMs: number;
  blinkMaxMs: number;
  headMinMs: number;
  headMaxMs: number;
  headHoldMs: number;
  gestureMinMs: number;
  gestureMaxMs: number;
  volumeSmoothing: number;
  mouthSmallThreshold: number;
  mouthOpenThreshold: number;
}

export const DEFAULT_CHARACTER_TIMING: CharacterTiming = {
  mouthIntervalMs: 80,
  blinkStepMs: 55,
  blinkMinMs: 3_000,
  blinkMaxMs: 7_000,
  headMinMs: 8_000,
  headMaxMs: 20_000,
  headHoldMs: 220,
  gestureMinMs: 2_000,
  gestureMaxMs: 5_000,
  volumeSmoothing: 0.65,
  mouthSmallThreshold: 0.08,
  mouthOpenThreshold: 0.28,
};

const BLINK_SEQUENCE: EyeState[] = ["open", "half1", "half2", "closed", "half2", "half1", "open"];

/** Client-only animation controller. It never calls AI or waits for the network. */
export class VoiceTutorCharacterController {
  private nextBlinkAt = 0;
  private blinkStartedAt = -1;
  private nextHeadAt = 0;
  private headUntil = 0;
  private head: HeadState = "center";
  private gestureUntil = 0;
  private gestureStartedAt = 0;
  private gesture: GestureState = "none";
  private lastReactionKey: string | null = null;
  private wasSpeaking = false;
  private smoothedVolume = 0;
  private lastMouthAt = -Infinity;
  private mouth: MouthState = "closed";

  constructor(
    private readonly timing: CharacterTiming = DEFAULT_CHARACTER_TIMING,
    private readonly random: () => number = Math.random,
  ) {}

  frame(now: number, input: CharacterInput): CharacterFrame {
    if (!this.nextBlinkAt) this.nextBlinkAt = now + this.between(this.timing.blinkMinMs, this.timing.blinkMaxMs);
    if (!this.nextHeadAt) this.nextHeadAt = now + this.between(this.timing.headMinMs, this.timing.headMaxMs);

    const state = this.stateFor(input);
    // Start the reaction with audible playback, not while the TTS source is loading.
    // Replaying the same teacher message should replay its gesture as well.
    if (state === "speaking" && input.reactionKey &&
        (input.reactionKey !== this.lastReactionKey || !this.wasSpeaking)) {
      this.lastReactionKey = input.reactionKey;
      const hint = input.gesture ?? "none";
      if (hint !== "none") {
        this.gesture = hint;
        this.gestureStartedAt = now;
        const intensity = Math.min(1, Math.max(0, input.reactionIntensity ?? 0.5));
        this.gestureUntil = now + this.timing.gestureMinMs +
          Math.floor((this.timing.gestureMaxMs - this.timing.gestureMinMs) * intensity);
      }
    }
    this.wasSpeaking = state === "speaking";
    if (now >= this.gestureUntil || state !== "speaking") {
      this.gesture = "none";
    }
    const visibleGesture = this.animatedGesture(now);

    let eye: EyeState = "open";
    if (this.blinkStartedAt < 0 && now >= this.nextBlinkAt) this.blinkStartedAt = now;
    if (this.blinkStartedAt >= 0) {
      const index = Math.min(BLINK_SEQUENCE.length - 1, Math.floor((now - this.blinkStartedAt) / this.timing.blinkStepMs));
      eye = BLINK_SEQUENCE[index];
      if (index === BLINK_SEQUENCE.length - 1) {
        this.blinkStartedAt = -1;
        this.nextBlinkAt = now + this.between(this.timing.blinkMinMs, this.timing.blinkMaxMs);
      }
    }

    if (now >= this.headUntil) this.head = "center";
    if (now >= this.nextHeadAt && this.head === "center" && this.gesture === "none") {
      this.head = this.random() < 0.5 ? "left" : "right";
      this.headUntil = now + this.timing.headHoldMs;
      const activity = input.personality === "chaotic_savage" ? 0.7
        : input.personality === "savage" ? 0.85
        : input.personality === "friendly" ? 1.15 : 1;
      this.nextHeadAt = now + Math.floor(this.between(this.timing.headMinMs, this.timing.headMaxMs) * activity);
    }
    if (state === "listening" || state === "speaking") this.head = "center";
    if (state === "thinking" && this.head === "center") this.head = "right";

    if (state !== "speaking") {
      this.mouth = "closed";
      this.smoothedVolume = 0;
    } else if (now - this.lastMouthAt >= this.timing.mouthIntervalMs) {
      this.lastMouthAt = now;
      if (typeof input.audioAmplitude === "number" && Number.isFinite(input.audioAmplitude)) {
        const volume = Math.min(1, Math.max(0, input.audioAmplitude));
        this.smoothedVolume = this.smoothedVolume * this.timing.volumeSmoothing + volume * (1 - this.timing.volumeSmoothing);
        this.mouth = this.smoothedVolume < this.timing.mouthSmallThreshold
          ? "closed"
          : this.smoothedVolume < this.timing.mouthOpenThreshold ? "small" : "open";
      } else {
        // Expo's playback status does not currently expose output amplitude.
        // A bounded speaking cadence is the visual fallback until an envelope is supplied.
        const cycle: MouthState[] = ["small", "medium", "open", "medium", "closed"];
        this.mouth = cycle[Math.floor(now / 120) % cycle.length];
      }
    }

    return {
      state: visibleGesture !== "none" ? "reacting" : state,
      mouth: this.mouth,
      eye,
      head: this.head,
      gesture: visibleGesture,
      expression: state === "speaking" && (input.emotion === "laughing" || input.delivery === "laugh")
        ? "laughing" : "neutral",
      intensity: Math.min(1, Math.max(0, input.reactionIntensity ?? 0)),
    };
  }

  private stateFor(input: CharacterInput): CharacterState {
    if (input.phase === "recording") return "listening";
    if (input.phase === "transcribing" || input.phase === "thinking" || input.phase === "starting") return "thinking";
    if (input.isAudioPlaying) return "speaking";
    if (input.phase === "speaking") return "thinking";
    return "idle";
  }

  private animatedGesture(now: number): GestureState {
    const target = this.gesture;
    if (target === "none") return target;
    const elapsed = now - this.gestureStartedAt;
    const remaining = this.gestureUntil - now;
    if (target === "hand_raise_3") {
      if (elapsed < 140 || remaining < 140) return "hand_raise_1";
      if (elapsed < 280 || remaining < 280) return "hand_raise_2";
    } else if (target === "hand_raise_2") {
      if (elapsed < 160 || remaining < 160) return "hand_raise_1";
    } else if (target === "both_explain_2" || target === "both_compare") {
      if (elapsed < 180 || remaining < 180) return "both_explain_1";
    }
    return target;
  }

  private between(min: number, max: number): number {
    return min + Math.floor(this.random() * (max - min));
  }
}
