import { createHash } from "node:crypto";
import { ReadableStream as WebReadableStream } from "node:stream/web";
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
import {
  LaughNotationTransformer,
  NdjsonLineReader,
  openingAudioTag,
  type TutorSpeechMeta,
} from "./voice-tutor-speech.js";

const AGENT_NAME =
  process.env.VOICE_TUTOR_LIVEKIT_AGENT_NAME?.trim() || "korio-voice-tutor";
const WAIT_FOR_LEARNER_SEC = 30;
const TURN_TIMEOUT_MS = 60_000;

/** App buttons → a learner turn the lesson agent recognises as a button press. */
const BUTTON_REQUESTS: Record<string, string> = {
  slower:
    "[[button: slower]] Say your last line again, slowly and clearly, with the same words. Then wait for me.",
  explain:
    "[[button: explain]] I didn't get that. Explain what you just said (especially the Korean part) briefly in my teaching language, then give me the Korean again.",
};
/**
 * API 콜백이 끝내 실패했을 때 대신 하는 말.
 *
 * 예전엔 실패하면 조용히 끝났다. 학습자 입장에선 "내 말이 안 간다" 와 "선생님이
 * 대답을 안 한다" 가 구분이 안 됐고, 원인은 워커 로그에만 남았다.
 */
const TURN_FALLBACK_SPEECH: Record<string, string> = {
  ko: "잠깐 연결이 불안정해요. 다시 한 번 말씀해 주시겠어요?",
  en: "Sorry, the connection glitched for a second. Could you say that again?",
  ru: "Ой, связь на секунду пропала. Повторите, пожалуйста?",
  uz: "Kechirasiz, aloqa bir soniya uzilib qoldi. Yana bir marta aytib bera olasizmi?",
};

/** 로그에 남길 에러 설명. provider 메시지는 키를 담지 않지만 길이는 자른다 */
function describeError(error: unknown): string {
  if (error instanceof Error) {
    const cause =
      error.cause instanceof Error ? ` (cause: ${error.cause.message})` : "";
    return `${error.name}: ${error.message}${cause}`.slice(0, 300);
  }
  return String(error).slice(0, 300);
}

/**
 * 받아쓰기 언어 힌트.
 *
 * ⚠️ OpenAI 실시간 받아쓰기는 **우즈벡어(uz)를 힌트로 받지 않는다.** 예전엔
 *    ["ko", "uz"] 를 고정으로 넘겨서 첫 오디오에서 "Invalid value: 'uz'" 가 났고,
 *    STT 에러는 복구 불가라 AgentSession 이 통째로 닫혔다 — 인사말까지 중간에
 *    끊기고(AbortError) 그 뒤 학습자 말은 아무 데도 안 갔다.
 *
 * 러시아어·영어 학습자는 ko + 모국어 힌트. 우즈벡어 학습자는 힌트 없이 자동 감지 —
 * ["ko"] 만 주면 우즈벡어로 한 말이 한글 소리표기로 적혀 GPT 가 못 알아듣는다.
 */
const STT_HINT_LANGUAGES = new Set(["en", "ru"]);

/**
 * 받아쓰기 방식.
 *
 * 기본은 **구간 받아쓰기** — 세션 VAD(silero)가 말 한 덩어리를 잘라서
 * /v1/audio/transcriptions 로 보낸다. API 의 예전 음성 수업(STT)이 쓰던 것과 같은
 * 경로라 이 계정에서 검증된 길이다.
 *
 * ⚠️ 실시간 받아쓰기(WebSocket)는 실기기에서 "목소리는 1.4초 들렸는데(VAD)
 *    받아쓰기가 끝내 안 옴" 이 났다. 에러도 없이 조용히 비어서 원인을 못 잡았다.
 *    다시 켜려면 VOICE_TUTOR_STT_REALTIME=true.
 */
const STT_REALTIME = process.env.VOICE_TUTOR_STT_REALTIME?.trim() === "true";
const ENDPOINTING_MIN_MS = (() => {
  const value = Number(process.env.VOICE_TUTOR_ENDPOINTING_MIN_MS);
  return Number.isFinite(value) && value >= 200 && value <= 3000 ? value : 600;
})();
const STT_MODEL = process.env.VOICE_TUTOR_STT_MODEL?.trim() || "gpt-transcribe";

const ENDPOINTING_MAX_MS = (() => {
  const value = Number(process.env.VOICE_TUTOR_ENDPOINTING_MAX_MS);
  return Number.isFinite(value) && value >= 1000 && value <= 6000 ? value : 2500;
})();

function sttLanguageOptions(
  explanationLanguage: VoiceTutorDispatchMetadata["explanationLanguage"],
): { language: string[]; detectLanguage: boolean } {
  // 한국어 몰입 수업: 한국어만 기대한다 — 힌트를 좁힐수록 한국어 인식이 정확하다
  if (explanationLanguage === "ko") return { language: ["ko"], detectLanguage: false };
  if (explanationLanguage && STT_HINT_LANGUAGES.has(explanationLanguage)) {
    return { language: ["ko", explanationLanguage], detectLanguage: false };
  }
  return { language: ["ko"], detectLanguage: true };
}

const STT_LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  ru: "Russian (Cyrillic)",
  uz: "Uzbek (Latin script)",
};

/**
 * 받아쓰기 문맥. "학습자 발음을 제멋대로 다른 단어로 듣는다" 대책.
 *
 * - 한국어 수업이고 어떤 언어가 섞이는지 알려 준다
 * - 억양이 센 학습자도 있으니 **하려던 한국어 단어**로 적되, 확실히 다른 말·지어낸
 *   말·다른 언어는 들은 그대로 둔다 (드립 소재는 살리고, 발음 탓 오인식은 줄인다)
 * - 선생님이 방금 한 말을 붙인다 — 학습자는 거기에 대답하는 중이라 이게 가장
 *   강한 힌트다 ("배고파라고 말해 봐" 뒤의 "배코파" → "배고파")
 * 끄려면 VOICE_TUTOR_STT_PROMPT=false.
 */
const STT_PROMPT_ENABLED = process.env.VOICE_TUTOR_STT_PROMPT?.trim() !== "false";

function sttPrompt(
  explanationLanguage: VoiceTutorDispatchMetadata["explanationLanguage"],
  teacherJustSaid?: string,
): string | undefined {
  if (!STT_PROMPT_ENABLED) return undefined;
  const other =
    explanationLanguage && explanationLanguage !== "ko"
      ? STT_LANGUAGE_NAMES[explanationLanguage]
      : undefined;
  const base = other
    ? `A Korean language lesson. The learner speaks Korean mixed with ${other}, often with a foreign accent. Write Korean in Hangul and ${other} as spoken. For accented Korean, write the Korean word the learner is trying to say; keep clearly different words, made-up words and other languages exactly as said.`
    : "A Korean language lesson. The learner speaks Korean, often with a foreign accent. Write the Korean word the learner is trying to say in Hangul; keep clearly different words, made-up words and other languages exactly as said.";
  const context = teacherJustSaid
    ?.replace(/[\s"]+/g, " ")
    .trim()
    .slice(-220);
  return context
    ? `${base} The teacher just said: "${context}" — the learner is answering that.`
    : base;
}

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
  /** @meta of the reply being spoken right now (set before its first word). */
  private speechMeta: TutorSpeechMeta | undefined;

  constructor(
    private readonly metadata: VoiceTutorDispatchMetadata,
    private readonly baseUrl: URL,
    /** Called with what the teacher actually said out loud (not unheard drafts). */
    private readonly onTeacherSpoke?: (text: string) => void,
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
    const abort = new AbortController();
    this.speechMeta = undefined;

    return new ReadableStream<string>({
      start: (controller) => {
        void (async () => {
          let spoke = false;
          const speak = (text: string) => {
            if (!text || abort.signal.aborted) return;
            spoke = true;
            controller.enqueue(text);
          };
          try {
            const streamed = await this.streamTurn(
              turnId,
              transcript,
              abort.signal,
              speak,
            );
            // An API that predates the stream route answers 404: use the
            // whole-reply JSON route so an older deployment still talks.
            if (!streamed)
              speak(await this.jsonTurn(turnId, transcript, abort.signal));
            if (!abort.signal.aborted) controller.close();
          } catch (error) {
            if (abort.signal.aborted) return;
            console.warn(
              `[voice-tutor ${this.metadata.sessionId}] Turn failed: ${describeError(error)}`,
            );
            // 침묵 대신 한 마디 — 학습자가 다시 말하면 된다는 걸 알게.
            // 이미 말을 시작했다면 덧붙이지 않는다 (반쯤 한 말 + 사과는 더 이상하다)
            if (!spoke)
              controller.enqueue(
                TURN_FALLBACK_SPEECH[this.metadata.explanationLanguage ?? "ko"] ??
                  TURN_FALLBACK_SPEECH.ko,
              );
            controller.close();
          }
        })();
      },
      cancel: () => abort.abort(),
    });
  }

  /**
   * TTS adapter: the lesson text is also the subtitle, so provider markup is
   * added only here — an opening [shouts]/[laughs] from @meta, and ㅋㅋㅋ turned
   * into a real laugh instead of "크크크".
   */
  async ttsNode(
    text: Parameters<voice.Agent["ttsNode"]>[0],
    modelSettings: voice.ModelSettings,
  ) {
    const laugh = new LaughNotationTransformer();
    const performed = new WebReadableStream<string>({
      start: async (controller) => {
        let first = true;
        let said = "";
        try {
          for await (const chunk of text as AsyncIterable<string>) {
            said += chunk;
            let out = laugh.push(chunk);
            if (first && out.trim()) {
              first = false;
              const tag = openingAudioTag(this.speechMeta);
              if (tag) out = `${tag} ${out.trimStart()}`;
            }
            if (out) controller.enqueue(out);
          }
          const rest = laugh.flush();
          if (rest.trim()) controller.enqueue(rest);
          controller.close();
          // ttsNode only runs for speech that is actually played (preemptive
          // drafts stop at llmNode), so this is what the learner really heard.
          if (said.trim()) this.onTeacherSpoke?.(said);
        } catch (error) {
          controller.error(error);
        }
      },
    });
    return voice.Agent.default.ttsNode(this, performed, modelSettings);
  }

  private turnUrl(path: "turns" | "turns/stream"): URL {
    return new URL(
      `voice-tutor/agent/sessions/${this.metadata.sessionId}/${path}`,
      this.baseUrl,
    );
  }

  /**
   * POST a turn, retrying 409 (the first request still holds the session lock)
   * and transient transport failures with the same turnId, so a retry can never
   * produce a second reply.
   */
  private async postTurn(
    url: URL,
    turnId: string,
    transcript: string,
    signal: AbortSignal,
  ): Promise<Response> {
    let response: Response | undefined;
    for (let attempt = 0; attempt < 120 && !signal.aborted; attempt++) {
      try {
        response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.metadata.agentToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ turnId, transcript }),
          signal: AbortSignal.any([signal, AbortSignal.timeout(TURN_TIMEOUT_MS)]),
        });
        if (response.status !== 409) break;
      } catch (error) {
        if (signal.aborted) throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    if (!response) throw new Error("Voice Tutor turn callback was cancelled");
    return response;
  }

  private async rejectTurn(url: URL, response: Response): Promise<never> {
    const body = (await response.text().catch(() => "")).slice(0, 200);
    // 404 = 그 주소의 API 에 /voice-tutor/agent 경로가 없다 (배포 안 된 버전을 가리킴).
    // 로컬 API 로 세션을 만들고 워커는 운영 API 를 부르면 정확히 이렇게 된다
    const hint =
      response.status === 404
        ? " → VOICE_TUTOR_API_URL 이 이 세션을 만든 API(같은 코드 버전)를 가리키는지 확인"
        : response.status === 401
          ? " → API 와 워커의 LIVEKIT_API_SECRET 이 같은지 확인"
          : "";
    console.warn(
      `[voice-tutor ${this.metadata.sessionId}] Turn callback rejected: HTTP ${response.status} ${url.origin} ${body}${hint}`,
    );
    throw new Error(`Voice Tutor turn callback failed: HTTP ${response.status}`);
  }

  /** Streaming route. Returns false only when the API does not have it (404). */
  private async streamTurn(
    turnId: string,
    transcript: string,
    signal: AbortSignal,
    speak: (text: string) => void,
  ): Promise<boolean> {
    const url = this.turnUrl("turns/stream");
    const response = await this.postTurn(url, turnId, transcript, signal);
    if (response.status === 404) {
      await response.body?.cancel().catch(() => undefined);
      return false;
    }
    if (!response.ok || !response.body) await this.rejectTurn(url, response);
    const started = Date.now();
    let firstWordMs: number | undefined;
    const reader = new NdjsonLineReader();
    let done = false;
    for await (const chunk of response.body as AsyncIterable<Uint8Array>) {
      for (const line of reader.push(chunk)) {
        if (!line || typeof line !== "object") continue;
        const event = line as Record<string, unknown>;
        if (event.t === "meta") {
          this.speechMeta = {
            emotion: typeof event.emotion === "string" ? event.emotion : undefined,
            delivery: typeof event.delivery === "string" ? event.delivery : undefined,
            intensity: typeof event.intensity === "number" ? event.intensity : undefined,
          };
        } else if (event.t === "speech" && typeof event.d === "string") {
          firstWordMs ??= Date.now() - started;
          speak(event.d);
        } else if (event.t === "error") {
          throw new Error("Voice Tutor API stream broke mid-turn");
        } else if (event.t === "done") {
          done = true;
        }
      }
    }
    console.log(
      `[voice-tutor ${this.metadata.sessionId}] Turn streamed: first word ${firstWordMs ?? "-"}ms, total ${Date.now() - started}ms${
        this.speechMeta?.intensity !== undefined
          ? `, ${this.speechMeta.emotion}/${this.speechMeta.delivery}@${this.speechMeta.intensity}`
          : ""
      }`,
    );
    if (!done) throw new Error("Voice Tutor API stream ended without done");
    return true;
  }

  /** Whole-reply JSON route (older API deployments). */
  private async jsonTurn(
    turnId: string,
    transcript: string,
    signal: AbortSignal,
  ): Promise<string> {
    const url = this.turnUrl("turns");
    const response = await this.postTurn(url, turnId, transcript, signal);
    if (!response.ok) await this.rejectTurn(url, response);
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
      throw new Error("Voice Tutor turn callback returned no teacher speech");
    return speechText;
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

    const sttLanguages = sttLanguageOptions(metadata.explanationLanguage);
    log(
      `Job accepted; api=${baseUrl.origin} voice=…${metadata.voiceId.slice(-4)} stt=${STT_MODEL}/${
        STT_REALTIME ? "realtime" : "segment"
      }/${sttLanguages.detectLanguage ? "auto" : sttLanguages.language.join("+")} keywords=${
        metadata.sttKeywords?.length ?? 0
      } teach=${metadata.explanationLanguage ?? "?"} endpointing=${ENDPOINTING_MIN_MS}-${ENDPOINTING_MAX_MS}ms`,
    );
    // 콜백을 받을 API 가 살아 있는지 먼저 본다. 여기서 틀리면 인사만 하고
    // 그 뒤로는 학습자가 무슨 말을 해도 대답이 없다
    void fetch(new URL("ready", baseUrl), { signal: AbortSignal.timeout(5_000) })
      .then((res) => {
        if (!res.ok) log(`⚠️ API ${baseUrl.origin}/ready → HTTP ${res.status}`);
      })
      .catch((error: unknown) =>
        log(`⚠️ API ${baseUrl.origin} 에 닿지 않는다: ${describeError(error)}`),
      );

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

    const stt = new openai.STT({
      apiKey: openaiKey,
      model: STT_MODEL,
      useRealtime: STT_REALTIME,
      ...sttLanguageOptions(metadata.explanationLanguage),
      prompt: sttPrompt(metadata.explanationLanguage),
      // keywords 는 gpt-transcribe 계열만 받는다 (다른 모델이면 플러그인이 throw)
      ...(metadata.sttKeywords?.length &&
      /^gpt-(live-)?transcribe/.test(STT_MODEL)
        ? { keywords: metadata.sttKeywords }
        : {}),
    });
    const session = new voice.AgentSession({
      stt,
      llm: new ApiDelegatedLLM(),
      tts: new VoiceTutorElevenLabsTTS(elevenLabsKey, metadata.voiceId),
      // 말이 끝나고 이만큼 조용하면 턴을 넘긴다. 레퍼런스 튜터는 학습자가 멈추고
      // ~1.5초 안에 말을 시작한다 — 0.8초 대기만으로 예산 절반이 날아갔다.
      // 학습자가 말하다 자주 끊긴다면 VOICE_TUTOR_ENDPOINTING_MIN_MS 를 올릴 것
      turnHandling: {
        // maxDelay: 턴 감지기가 "아직 말하는 중" 이라고 볼 때 최대 대기. 학습자의
        // 더듬거리는 한국어는 자주 "미완성" 으로 판정돼 예전엔 4.5초까지 멍하니
        // 기다렸다 — 이게 "생각이 길다" 의 큰 몫. 대신 preemptive generation(기본 켜짐)
        // 이 문장이 들어오자마자 답을 미리 만들어 둔다 (API 가 버려진 초안을 정리한다)
        endpointing: { minDelay: ENDPOINTING_MIN_MS, maxDelay: ENDPOINTING_MAX_MS },
      },
      ttsReadIdleTimeout: 20_000,
      // Eleven v3 는 첫 소리까지 느리다. 기본 10초면 합성은 끝났는데 출력이 먼저
      // 닫혀서 선생님 말이 통째로 사라진다 (합성 쪽 ttsReadIdleTimeout 과 맞춘다)
      forwardAudioIdleTimeout: 20_000,
      // 목소리는 들렸는데(VAD) 받아쓰기가 끝내 안 온 경우를 알린다 — "내 말이 안 간다" 의 진단용
      transcriptionTimeout: 5_000,
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
      // type 만 찍으면 STT/TTS 중 뭐가 왜 죽었는지 알 수가 없었다.
      // provider 메시지는 키를 담지 않는다 — 길이만 잘라서 남긴다
      const inner = (event.error as { error?: unknown }).error;
      log(
        `Audio pipeline error: ${event.error.type}${inner ? ` — ${describeError(inner)}` : ""}`,
      );
    });
    session.on(voice.AgentSessionEventTypes.UserInputTranscribed, (event) => {
      if (event.isFinal) log(`Heard learner (${event.transcript.length} chars)`);
    });
    session.on(voice.AgentSessionEventTypes.UserTranscriptionTimeout, (event) => {
      log(
        `⚠️ Learner spoke ${Math.round(event.speechDuration)}ms but STT returned nothing (${STT_MODEL}/${
          STT_REALTIME ? "realtime" : "segment"
        }) — OpenAI STT 모델/키 확인`,
      );
    });

    await session.start({
      agent: new VoiceTutorAgent(metadata, baseUrl, (said) => {
        if (!STT_PROMPT_ENABLED) return;
        try {
          stt.updateOptions({
            prompt: sttPrompt(metadata.explanationLanguage, said),
          });
        } catch (error) {
          log(`STT context update skipped: ${describeError(error)}`);
        }
      }),
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
    // 통화 화면의 "천천히" / "설명해 줘" 버튼. 말이 아니라 버튼이라 받아쓰기를
    // 거치지 않고 바로 한 턴을 만든다 — API 프롬프트가 [[button: …]] 을 버튼으로 읽는다
    localParticipant.registerRpcMethod(
      "voice_tutor_request",
      async ({ callerIdentity, payload }) => {
        if (callerIdentity !== learner.identity)
          throw new Error("Only the learner can ask the tutor");
        const request = BUTTON_REQUESTS[payload.trim()];
        if (!request) throw new Error("Unknown tutor request");
        try {
          await session.interrupt({ force: true });
        } catch {
          // Nothing was playing — fine.
        }
        session.generateReply({ userInput: request });
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
