import { fileURLToPath } from "node:url";
import {
  AutoSubscribe,
  ServerOptions,
  cli,
  defineAgent,
  type JobContext,
} from "@livekit/agents";
import {
  AudioFrame,
  AudioSource,
  AudioStream,
  LocalAudioTrack,
  RoomEvent,
  TrackKind,
  TrackPublishOptions,
  TrackSource,
  type RemoteTrack,
  type RemoteParticipant,
} from "@livekit/rtc-node";
import {
  decodeGrokPromoMetadata,
  grokPromoLearnerIdentity,
} from "./grok-promo-metadata.js";
import {
  GROK_PROMO_SAMPLE_RATE,
  GrokPromoProtocol,
  grokPromoSessionUpdate,
  playedAudioMs,
  type GrokPromoEvent,
  type GrokPromoState,
} from "./grok-promo-protocol.js";

const AGENT_NAME =
  process.env.GROK_PROMO_LIVEKIT_AGENT_NAME?.trim() || "korio-grok-promo";
const GROK_URL = "wss://api.x.ai/v1/realtime?model=grok-voice-latest";
const PCM_FRAME_BYTES = 480 * 2; // 20 ms, mono PCM16 at 24 kHz.
const MAX_PENDING_AUDIO_BYTES = GROK_PROMO_SAMPLE_RATE * 2 * 30;

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required for the Grok promo worker`);
  return value;
}

/** Node's built-in WebSocket uses the documented ephemeral-token subprotocol. */
async function openGrokSocket(apiKey: string): Promise<WebSocket> {
  const response = await fetch("https://api.x.ai/v1/realtime/client_secrets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expires_after: { seconds: 60 } }),
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok)
    throw new Error(`Grok authentication failed (HTTP ${response.status})`);
  const token: unknown = await response.json();
  if (
    !token ||
    typeof token !== "object" ||
    !("value" in token) ||
    typeof token.value !== "string"
  ) {
    throw new Error("Grok authentication returned an invalid token");
  }
  const socket = new WebSocket(GROK_URL, [`xai-client-secret.${token.value}`]);
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      socket.close();
      reject(new Error("Grok WebSocket connection timed out"));
    }, 8_000);
    socket.addEventListener(
      "open",
      () => {
        clearTimeout(timeout);
        resolve(socket);
      },
      { once: true },
    );
    socket.addEventListener(
      "error",
      () => {
        clearTimeout(timeout);
        reject(new Error("Grok WebSocket connection failed"));
      },
      { once: true },
    );
  });
}

export default defineAgent({
  entry: async (ctx: JobContext) => {
    const metadata = decodeGrokPromoMetadata(
      ctx.job.metadata,
      requiredEnv("LIVEKIT_API_SECRET"),
    );
    if (ctx.job.room?.name !== `grok-promo-${metadata.sessionId}`) {
      throw new Error("Grok promo dispatch room mismatch");
    }
    const learnerIdentity = grokPromoLearnerIdentity(metadata.sessionId);
    const log = (message: string) =>
      console.log(`[grok-promo ${metadata.sessionId}] ${message}`);
    await ctx.connect(undefined, AutoSubscribe.AUDIO_ONLY);
    const local = ctx.room.localParticipant;
    if (!local) throw new Error("Grok promo participant unavailable");
    await local.setAttributes({ "lk.agent.state": "initializing" });

    let ending = false;
    let socket: WebSocket | undefined;
    let source: AudioSource | undefined;
    let track: LocalAudioTrack | undefined;
    let hardStop: ReturnType<typeof setTimeout> | undefined;
    let configuredTimer: ReturnType<typeof setTimeout> | undefined;
    let pendingAudio = 0;
    let playbackGeneration = -1;
    let capturedAudioMs = 0;
    let audioChain = Promise.resolve();
    const readers = new Map<
      RemoteTrack,
      ReturnType<AudioStream["getReader"]>
    >();
    let resolveFinished: () => void = () => undefined;
    const finished = new Promise<void>((resolve) => {
      resolveFinished = resolve;
    });
    let protocol: GrokPromoProtocol | undefined;

    const setState = (state: GrokPromoState) => {
      if (!ending)
        void local
          .setAttributes({ "lk.agent.state": state })
          .catch(() => undefined);
    };
    const send = (event: Record<string, unknown>) => {
      if (!ending && socket?.readyState === WebSocket.OPEN)
        socket.send(JSON.stringify(event));
    };
    const cleanup = async () => {
      ending = true;
      clearTimeout(hardStop);
      clearTimeout(configuredTimer);
      protocol?.stop();
      socket?.close();
      local.unregisterRpcMethod("voice_tutor_interrupt");
      local.unregisterRpcMethod("voice_tutor_request");
      for (const reader of readers.values())
        await reader.cancel().catch(() => undefined);
      readers.clear();
      source?.clearQueue();
      await source?.close().catch(() => undefined);
      await track?.close().catch(() => undefined);
      resolveFinished();
    };
    const end = async (reason: string, unavailable = false) => {
      if (ending) return;
      ending = true;
      // No provider details or credentials cross the data channel.
      const publishedReason = unavailable
        ? "unavailable"
        : reason === "max_duration"
          ? "max_duration"
          : undefined;
      if (publishedReason) {
        await local
          .setAttributes({ "korio.end_reason": publishedReason })
          .catch(() => undefined);
        await new Promise<void>((resolve) => setTimeout(resolve, 400));
      }
      await cleanup();
      await ctx.deleteRoom().catch(() => undefined);
      ctx.shutdown(reason);
    };
    const failed = () => {
      void end("grok_provider_unavailable", true);
    };
    ctx.addShutdownCallback(cleanup);
    ctx.room.on(RoomEvent.ParticipantDisconnected, (participant) => {
      if (participant.identity === learnerIdentity)
        void end("owner_disconnected");
    });
    ctx.room.on(RoomEvent.Disconnected, () => {
      if (!ending) void cleanup();
    });

    let joinTimer: ReturnType<typeof setTimeout> | undefined;
    const learner = await Promise.race([
      ctx.waitForParticipant(learnerIdentity),
      new Promise<null>((resolve) => {
        joinTimer = setTimeout(() => resolve(null), 30_000);
      }),
    ]);
    clearTimeout(joinTimer);
    if (!learner) {
      await end("owner_never_joined");
      return;
    }
    // The signed grant is bound to the same learner identity and room.
    if (
      learner.identity !== learnerIdentity ||
      metadata.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      await end("invalid_owner");
      return;
    }
    hardStop = setTimeout(() => {
      void end("max_duration");
    }, metadata.maxDurationSec * 1000);

    try {
      source = new AudioSource(GROK_PROMO_SAMPLE_RATE, 1, 200);
      track = LocalAudioTrack.createAudioTrack("grok-promo-voice", source);
      await local.publishTrack(
        track,
        new TrackPublishOptions({ source: TrackSource.SOURCE_MICROPHONE }),
      );
      socket = await openGrokSocket(requiredEnv("XAI_API_KEY"));
      if (ending) {
        socket.close();
        return;
      }
      protocol = new GrokPromoProtocol({
        send,
        clearAudio: () => source?.clearQueue(),
        playedMs: (generation) =>
          generation === playbackGeneration
            ? playedAudioMs(capturedAudioMs, source?.queuedDuration ?? 0)
            : 0,
        state: setState,
        error: failed,
        audio: (pcm, generation) => {
          pendingAudio += pcm.length;
          if (pendingAudio > MAX_PENDING_AUDIO_BYTES) {
            failed();
            return;
          }
          audioChain = audioChain
            .then(async () => {
              try {
                if (!protocol?.isCurrent(generation) || !source) return;
                if (playbackGeneration !== generation) {
                  playbackGeneration = generation;
                  capturedAudioMs = 0;
                }
                for (
                  let offset = 0;
                  offset < pcm.length;
                  offset += PCM_FRAME_BYTES
                ) {
                  if (!protocol.isCurrent(generation)) return;
                  const bytes = pcm.subarray(
                    offset,
                    Math.min(offset + PCM_FRAME_BYTES, pcm.length),
                  );
                  const samples = new Int16Array(bytes.length / 2);
                  for (let i = 0; i < samples.length; i++)
                    samples[i] = bytes.readInt16LE(i * 2);
                  await source.captureFrame(
                    new AudioFrame(
                      samples,
                      GROK_PROMO_SAMPLE_RATE,
                      1,
                      samples.length,
                    ),
                  );
                  if (protocol.isCurrent(generation))
                    capturedAudioMs +=
                      (samples.length / GROK_PROMO_SAMPLE_RATE) * 1000;
                }
              } finally {
                pendingAudio -= pcm.length;
              }
            })
            .catch(() => {
              if (!ending) failed();
            });
        },
        expression: (emotion) => {
          if (!ending)
            void local
              .setAttributes({ "korio.emotion": emotion })
              .catch(() => undefined);
        },
        finishAudio: (generation, continueAfterTools) => {
          void audioChain
            .then(async () => {
              await source?.waitForPlayout();
              if (protocol?.isCurrent(generation)) {
                if (continueAfterTools) {
                  setState("thinking");
                  send({ type: "response.create" });
                } else setState("listening");
              }
            })
            .catch(() => {
              if (!ending) failed();
            });
        },
        transcript: (role, text, segmentId) => {
          void (async () => {
            const writer = await local.streamText({
              topic: "lk.transcription",
              senderIdentity:
                role === "user" ? learnerIdentity : local.identity,
              destinationIdentities: [learnerIdentity],
              attributes: {
                "lk.transcription_final": "true",
                "lk.segment_id": segmentId,
              },
            });
            await writer.write(text);
            await writer.close();
          })().catch(() => undefined);
        },
      });
      socket.addEventListener("message", (message) => {
        if (
          ending ||
          typeof message.data !== "string" ||
          message.data.length > 1_000_000
        )
          return;
        try {
          const event: unknown = JSON.parse(message.data);
          if (
            !event ||
            typeof event !== "object" ||
            !("type" in event) ||
            typeof event.type !== "string"
          )
            return;
          if (event.type === "session.updated") clearTimeout(configuredTimer);
          protocol?.receive(event as GrokPromoEvent);
        } catch {
          failed();
        }
      });
      socket.addEventListener("error", failed);
      socket.addEventListener("close", () => {
        if (!ending) failed();
      });
      configuredTimer = setTimeout(failed, 8_000);
      send(grokPromoSessionUpdate(metadata.instructions, metadata.voice));

      const consumeTrack = (
        remoteTrack: RemoteTrack,
        participant: RemoteParticipant,
      ) => {
        if (
          ending ||
          participant.identity !== learnerIdentity ||
          remoteTrack.kind !== TrackKind.KIND_AUDIO ||
          readers.has(remoteTrack)
        )
          return;
        const stream = new AudioStream(remoteTrack, {
          sampleRate: GROK_PROMO_SAMPLE_RATE,
          numChannels: 1,
          frameSizeMs: 20,
        });
        const reader = stream.getReader();
        readers.set(remoteTrack, reader);
        void (async () => {
          try {
            while (!ending) {
              const frame = await reader.read();
              if (frame.done) break;
              if (socket?.readyState !== WebSocket.OPEN) break;
              if (socket.bufferedAmount > GROK_PROMO_SAMPLE_RATE * 2 * 5) {
                failed();
                break;
              }
              const bytes = Buffer.from(
                frame.value.data.buffer,
                frame.value.data.byteOffset,
                frame.value.data.byteLength,
              );
              send({
                type: "input_audio_buffer.append",
                audio: bytes.toString("base64"),
              });
            }
          } catch {
            if (!ending) failed();
          } finally {
            readers.delete(remoteTrack);
            await reader.cancel().catch(() => undefined);
          }
        })();
      };
      ctx.room.on(
        RoomEvent.TrackSubscribed,
        (remoteTrack, _publication, participant) =>
          consumeTrack(remoteTrack, participant),
      );
      for (const publication of learner.trackPublications.values()) {
        if (publication.track)
          consumeTrack(publication.track as RemoteTrack, learner);
      }
      local.registerRpcMethod(
        "voice_tutor_interrupt",
        async ({ callerIdentity }) => {
          if (callerIdentity !== learnerIdentity)
            throw new Error("Only the owner can interrupt this tutor");
          protocol?.interrupt();
          return "ok";
        },
      );
      local.registerRpcMethod(
        "voice_tutor_request",
        async ({ callerIdentity, payload }) => {
          if (callerIdentity !== learnerIdentity)
            throw new Error("Only the owner can request a tutor response");
          const instruction =
            payload === "slower"
              ? "Repeat your last explanation more slowly and briefly, then let me answer."
              : payload === "explain"
                ? "Explain the last point simply, in your own words, then ask one question."
                : undefined;
          if (!instruction) throw new Error("Unknown tutor request");
          protocol?.interrupt();
          send({
            type: "conversation.item.create",
            item: {
              type: "message",
              role: "user",
              content: [{ type: "input_text", text: instruction }],
            },
          });
          send({ type: "response.create" });
          return "ok";
        },
      );
      log("Native Grok voice ready");
      await finished;
    } catch {
      // Never log provider response bodies, keys, websocket protocols, or metadata.
      log("Native Grok connection failed");
      await end("grok_provider_unavailable", true);
    }
  },
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  requiredEnv("LIVEKIT_API_SECRET");
  requiredEnv("XAI_API_KEY");
  cli.runApp(
    new ServerOptions({
      agent: fileURLToPath(import.meta.url),
      agentName: AGENT_NAME,
    }),
  );
}
