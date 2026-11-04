/** xAI native realtime protocol. No OpenAI transcription or TTS providers are used. */
export const GROK_PROMO_SAMPLE_RATE = 24_000;
export type GrokPromoState =
  | "initializing"
  | "listening"
  | "thinking"
  | "speaking";
export type GrokPromoEvent = Record<string, unknown> & { type: string };
export const GROK_PROMO_EMOTIONS = [
  "neutral",
  "happy",
  "laughing",
  "shocked",
  "angry",
  "mocking",
  "disbelief",
  "excited",
  "explaining",
] as const;
export type GrokPromoEmotion = (typeof GROK_PROMO_EMOTIONS)[number];

/** rtc-node AudioSource.queuedDuration is milliseconds, as are captured PCM durations. */
export function playedAudioMs(capturedMs: number, queuedMs: number): number {
  if (!Number.isFinite(capturedMs) || !Number.isFinite(queuedMs)) return 0;
  return Math.max(0, capturedMs - Math.max(0, queuedMs));
}

export interface GrokPromoProtocolHooks {
  send: (event: Record<string, unknown>) => void;
  audio: (pcm: Buffer, generation: number) => void;
  clearAudio: () => void;
  playedMs: (generation: number) => number;
  finishAudio: (generation: number, continueAfterTools: boolean) => void;
  expression?: (emotion: GrokPromoEmotion) => void;
  transcript: (role: "user" | "tutor", text: string, segmentId: string) => void;
  state: (state: GrokPromoState) => void;
  error: () => void;
}

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : {};
}

export function grokPromoSessionUpdate(instructions: string, voice: string) {
  return {
    type: "session.update",
    session: {
      instructions,
      voice,
      reasoning: { effort: "none" },
      turn_detection: { type: "server_vad" },
      tools: [
        {
          type: "function",
          name: "set_expression",
          description:
            "Silently update your on-screen face when your expression changes. Optional; use at most once before speaking in each user turn, then speak naturally without calling it again. Never announce this tool or read its arguments aloud.",
          parameters: {
            type: "object",
            properties: {
              emotion: { type: "string", enum: GROK_PROMO_EMOTIONS },
            },
            required: ["emotion"],
            additionalProperties: false,
          },
        },
      ],
      audio: {
        input: { format: { type: "audio/pcm", rate: GROK_PROMO_SAMPLE_RATE } },
        output: { format: { type: "audio/pcm", rate: GROK_PROMO_SAMPLE_RATE } },
      },
    },
  };
}

/** Keeps late cancelled packets out of the speaker and limits untrusted frames. */
export class GrokPromoProtocol {
  generation = 0;
  private responseId: string | undefined;
  private responseActive = false;
  private audioItemId: string | undefined;
  private audioContentIndex = 0;
  private audioDurationMs = 0;
  private pendingToolReply = false;
  private toolRounds = 0;
  private readonly toolCalls = new Set<string>();
  private readonly cancelled = new Set<string>();
  private configured = false;
  private stopped = false;

  constructor(private readonly hooks: GrokPromoProtocolHooks) {}

  isCurrent(generation: number): boolean {
    return !this.stopped && generation === this.generation;
  }

  interrupt(manual = true): void {
    if (this.stopped) return;
    if (this.responseId) {
      this.cancelled.add(this.responseId);
      if (this.cancelled.size > 128)
        this.cancelled.delete(this.cancelled.values().next().value!);
    }
    if (manual && this.responseActive)
      this.hooks.send({ type: "response.cancel" });
    const played = this.hooks.playedMs(this.generation);
    const playedMs = Number.isFinite(played)
      ? Math.max(0, Math.floor(played))
      : 0;
    if (this.audioItemId && playedMs < this.audioDurationMs) {
      // Keep the model's history aligned with what actually reached the speaker.
      this.hooks.send(
        playedMs > 0
          ? {
              type: "conversation.item.truncate",
              item_id: this.audioItemId,
              content_index: this.audioContentIndex,
              audio_end_ms: playedMs,
            }
          : { type: "conversation.item.delete", item_id: this.audioItemId },
      );
    }
    this.audioItemId = undefined;
    this.pendingToolReply = false;
    this.toolRounds = 0;
    this.responseActive = false;
    this.generation++;
    this.hooks.clearAudio();
    this.hooks.state("listening");
  }

  stop(): void {
    if (this.stopped) return;
    this.stopped = true;
    this.generation++;
    this.hooks.clearAudio();
  }

  receive(event: GrokPromoEvent): void {
    if (this.stopped) return;
    const response = object(event.response);
    const eventResponseId =
      typeof event.response_id === "string" ? event.response_id : undefined;
    if (eventResponseId && this.cancelled.has(eventResponseId)) return;
    switch (event.type) {
      case "session.updated":
        if (this.configured) return;
        this.configured = true;
        this.hooks.state("thinking");
        // The persona tells Grok to open with its own question. No spoken line is seeded.
        this.hooks.send({ type: "response.create" });
        return;
      case "input_audio_buffer.speech_started":
        // In server_vad mode xAI already cancels generation; clear local playout too.
        this.interrupt(false);
        return;
      case "input_audio_buffer.speech_stopped":
        this.hooks.state("thinking");
        return;
      case "response.created":
        this.responseId =
          typeof response.id === "string" ? response.id : undefined;
        this.responseActive = true;
        this.generation++;
        this.audioItemId = undefined;
        this.audioDurationMs = 0;
        this.pendingToolReply = false;
        this.hooks.state("thinking");
        return;
      case "response.audio.delta":
      case "response.output_audio.delta": {
        if (!this.responseActive || typeof event.delta !== "string") return;
        if (
          event.delta.length > 512_000 ||
          !/^[A-Za-z0-9+/]*={0,2}$/.test(event.delta)
        ) {
          this.hooks.error();
          return;
        }
        const pcm = Buffer.from(event.delta, "base64");
        if (pcm.length === 0) return;
        if (pcm.length % 2) {
          this.hooks.error();
          return;
        }
        this.audioItemId =
          typeof event.item_id === "string" ? event.item_id : this.audioItemId;
        this.audioContentIndex =
          typeof event.content_index === "number" ? event.content_index : 0;
        this.audioDurationMs +=
          (pcm.length / (GROK_PROMO_SAMPLE_RATE * 2)) * 1000;
        this.hooks.state("speaking");
        this.hooks.audio(pcm, this.generation);
        return;
      }
      case "conversation.item.input_audio_transcription.completed":
        if (typeof event.transcript === "string" && event.transcript.trim()) {
          this.hooks.transcript(
            "user",
            event.transcript.slice(0, 16_000),
            String(event.item_id ?? "user"),
          );
        }
        return;
      case "response.audio_transcript.done":
      case "response.output_audio_transcript.done":
        if (typeof event.transcript === "string" && event.transcript.trim()) {
          this.hooks.transcript(
            "tutor",
            event.transcript.slice(0, 16_000),
            String(event.item_id ?? this.responseId ?? "tutor"),
          );
        }
        return;
      case "response.function_call_arguments.done": {
        if (
          typeof event.call_id !== "string" ||
          !event.call_id ||
          event.call_id.length > 128 ||
          this.toolCalls.has(event.call_id)
        )
          return;
        this.toolCalls.add(event.call_id);
        if (this.toolCalls.size > 128)
          this.toolCalls.delete(this.toolCalls.values().next().value!);
        let valid = false;
        if (
          event.name === "set_expression" &&
          typeof event.arguments === "string" &&
          event.arguments.length <= 2048
        ) {
          try {
            const args = object(JSON.parse(event.arguments));
            if (
              GROK_PROMO_EMOTIONS.includes(args.emotion as GrokPromoEmotion)
            ) {
              this.hooks.expression?.(args.emotion as GrokPromoEmotion);
              valid = true;
            }
          } catch {
            /* Return an invalid-arguments result rather than speaking one. */
          }
        }
        this.hooks.send({
          type: "conversation.item.create",
          item: {
            type: "function_call_output",
            call_id: event.call_id,
            output: JSON.stringify({ ok: valid }),
          },
        });
        this.pendingToolReply = true;
        return;
      }
      case "response.done":
        if (!this.responseActive) return;
        if (response.status === "failed") {
          this.hooks.error();
          return;
        }
        if (typeof response.id === "string" && this.cancelled.has(response.id))
          return;
        this.responseActive = false;
        // All parallel function outputs are submitted before one continuation.
        if (this.pendingToolReply && ++this.toolRounds > 3) {
          this.hooks.error();
          return;
        }
        this.hooks.finishAudio(this.generation, this.pendingToolReply);
        this.pendingToolReply = false;
        return;
      case "error":
        // A manual stop can race the server finishing the same response.
        if (
          object(event.error).code === "response_cancel_not_active" &&
          !this.responseActive
        )
          return;
        this.hooks.error();
        return;
    }
  }
}
