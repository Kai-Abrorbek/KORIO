import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import {
  ServerOptions,
  cli,
  defineAgent,
  llm,
  voice,
  type JobContext,
} from "@livekit/agents";
import * as openai from "@livekit/agents-plugin-openai";
import {
  decodeVoiceTutorDispatchMetadata,
  type VoiceTutorDispatchMetadata,
} from "./voice-tutor-metadata.js";
import { VoiceTutorElevenLabsTTS } from "./voice-tutor-elevenlabs-tts.js";

const AGENT_NAME =
  process.env.VOICE_TUTOR_LIVEKIT_AGENT_NAME?.trim() || "korio-voice-tutor";
const WAIT_FOR_LEARNER_SEC = 30;
const TURN_TIMEOUT_MS = 60_000;

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is required for the Voice Tutor worker`);
  return value;
}

function apiBaseUrl(): URL {
  const url = new URL(requiredEnv("VOICE_TUTOR_API_URL"));
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "VOICE_TUTOR_API_URL must be an HTTP(S) base URL without credentials or query",
    );
  }
  url.pathname = `${url.pathname.replace(/\/$/, "")}/`;
  return url;
}

/** LiveKit requires an LLM instance to schedule a user reply; all actual lesson work stays in the API. */
class ApiDelegatedLLM extends llm.LLM {
  label(): string {
    return "korio.voiceTutorApi";
  }

  get model(): string {
    return "voice-tutor-api";
  }

  get provider(): string {
    return "korio";
  }

  chat(): llm.LLMStream {
    throw new Error("Voice Tutor generation must use VoiceTutorAgent.llmNode");
  }
}

class VoiceTutorAgent extends voice.Agent {
  constructor(
    private readonly metadata: VoiceTutorDispatchMetadata,
    private readonly baseUrl: URL,
  ) {
    super({
      instructions:
        "The KORIO API owns the Voice Tutor lesson and its replies.",
    });
  }

  async llmNode(
    chatCtx: llm.ChatContext,
  ): Promise<ReadableStream<string> | null> {
    const message = [...chatCtx.items]
      .reverse()
      .find(
        (item): item is llm.ChatMessage =>
          item instanceof llm.ChatMessage &&
          item.role === "user" &&
          Boolean(item.textContent?.trim()),
      );
    if (!message?.textContent?.trim()) return null;

    const transcript = message.textContent.trim();
    // Stable across LiveKit retries, short enough for the API idempotency contract.
    const turnId = createHash("sha256")
      .update(this.metadata.sessionId)
      .update(":")
      .update(message.id)
      .digest("hex");
    const url = new URL(
      `voice-tutor/agent/sessions/${this.metadata.sessionId}/turns`,
      this.baseUrl,
    );
    const abort = new AbortController();

    return new ReadableStream<string>({
      start: (controller) => {
        void (async () => {
          try {
            let response: Response | undefined;
            // A callback retry can arrive while the first request still owns
            // the session lock. Keep the same turnId and wait for its saved
            // result instead of turning a transient 409 into a silent tutor.
            for (let attempt = 0; attempt < 120 && !abort.signal.aborted; attempt++) {
              try {
                response = await fetch(url, {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${this.metadata.agentToken}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ turnId, transcript }),
                  signal: AbortSignal.any([
                    abort.signal,
                    AbortSignal.timeout(TURN_TIMEOUT_MS),
                  ]),
                });
                if (response.status !== 409) break;
              } catch (error) {
                if (abort.signal.aborted) throw error;
                // Retry a transient transport failure with the same turnId.
              }
              await new Promise((resolve) => setTimeout(resolve, 500));
            }
            if (!response) throw new Error("Voice Tutor turn callback was cancelled");
            if (!response.ok) {
              console.warn(
                `[voice-tutor ${this.metadata.sessionId}] Turn callback rejected: HTTP ${response.status}`,
              );
              throw new Error(
                `Voice Tutor turn callback failed: HTTP ${response.status}`,
              );
            }
            const result: unknown = await response.json();
            const speechText =
              typeof result === "object" &&
              result !== null &&
              "teacherMessage" in result &&
              typeof result.teacherMessage === "object" &&
              result.teacherMessage !== null &&
              "speechText" in result.teacherMessage &&
              typeof result.teacherMessage.speechText === "string"
                ? result.teacherMessage.speechText.trim()
                : "";
            if (!speechText)
              throw new Error(
                "Voice Tutor turn callback returned no teacher speech",
              );
            controller.enqueue(speechText);
            controller.close();
          } catch (error) {
            if (!abort.signal.aborted) controller.error(error);
          }
        })();
      },
      cancel: () => abort.abort(),
    });
  }
}

export default defineAgent({
  entry: async (ctx: JobContext) => {
    // Parse first and never print raw metadata: the short-lived bearer token lives there.
    const metadata = decodeVoiceTutorDispatchMetadata(ctx.job.metadata);
    const baseUrl = apiBaseUrl();
    const openaiKey = requiredEnv("OPENAI_API_KEY");
    const elevenLabsKey = requiredEnv("ELEVENLABS_API_KEY");
    const log = (message: string) =>
      console.log(`[voice-tutor ${metadata.sessionId}] ${message}`);

    await ctx.connect();
    const learner = await Promise.race([
      ctx.waitForParticipant(),
      new Promise<null>((resolve) =>
        setTimeout(() => resolve(null), WAIT_FOR_LEARNER_SEC * 1000),
      ),
    ]);
    if (!learner) {
      log("Learner did not join; closing room");
      ctx.shutdown("learner_never_joined");
      return;
    }

    const session = new voice.AgentSession({
      stt: new openai.STT({
        apiKey: openaiKey,
        model: "gpt-transcribe",
        useRealtime: true,
        language: ["ko", "uz"],
      }),
      llm: new ApiDelegatedLLM(),
      tts: new VoiceTutorElevenLabsTTS(elevenLabsKey, metadata.voiceId),
      turnHandling: { endpointing: { minDelay: 800, maxDelay: 4500 } },
      ttsReadIdleTimeout: 20_000,
      // Do not strip Eleven v3 directions such as [laughs] before synthesis.
      ttsTextTransforms: null,
    });

    const hardStop = setTimeout(() => {
      log("Session duration limit reached");
      ctx.shutdown("max_duration");
    }, metadata.maxDurationSec * 1000);
    ctx.addShutdownCallback(async () => {
      clearTimeout(hardStop);
      ctx.room.localParticipant?.unregisterRpcMethod("voice_tutor_interrupt");
    });
    session.on(voice.AgentSessionEventTypes.Error, (event) => {
      // Provider errors can include private request data; log only the error class/type.
      log(`Audio pipeline error: ${event.error.type}`);
    });

    await session.start({
      agent: new VoiceTutorAgent(metadata, baseUrl),
      room: ctx.room,
      inputOptions: { closeOnDisconnect: true },
      outputOptions: { transcriptionEnabled: true, syncTranscription: true },
    });

    const localParticipant = ctx.room.localParticipant;
    if (!localParticipant)
      throw new Error("Voice Tutor agent participant is unavailable");
    localParticipant.registerRpcMethod(
      "voice_tutor_interrupt",
      async ({ callerIdentity }) => {
        if (callerIdentity !== learner.identity)
          throw new Error("Only the learner can interrupt this tutor");
        await session.interrupt({ force: true });
        return "ok";
      },
    );
    log(`Ready; agent identity=${localParticipant.identity}`);

    // The API already saved this greeting. Speak it once; no second LLM/API turn.
    await session
      .say(metadata.greeting.speechText, { addToChatCtx: true })
      .waitForPlayout();
  },
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  cli.runApp(
    new ServerOptions({
      agent: fileURLToPath(import.meta.url),
      agentName: AGENT_NAME,
    }),
  );
}
