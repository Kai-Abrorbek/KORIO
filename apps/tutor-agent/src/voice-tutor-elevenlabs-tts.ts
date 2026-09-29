import {
  AudioByteStream,
  shortuuid,
  tts,
  type APIConnectOptions,
} from "@livekit/agents";
import type { AudioFrame } from "@livekit/rtc-node";
import { voiceTutorTtsModel } from "./voice-tutor-speech.js";

const SAMPLE_RATE = 24_000;
/**
 * VOICE_TUTOR_TTS_MODEL (default eleven_v4_turbo — built for live talk, ~100ms).
 * If ElevenLabs refuses that model for this voice/account, the worker drops to
 * eleven_v3 for the rest of the process instead of going silent, and says so.
 */
let activeModel = voiceTutorTtsModel();
const FALLBACK_MODEL = "eleven_v3";

/** Expressive Eleven models are driven over HTTP audio streaming, per sentence. */
export class VoiceTutorElevenLabsTTS extends tts.TTS {
  label = "korio.voiceTutorElevenLabsTTS";

  constructor(
    private readonly apiKey: string,
    private readonly voiceId: string,
  ) {
    // LiveKit's StreamAdapter splits LLM output into sentences and calls synthesize().
    super(SAMPLE_RATE, 1, { streaming: false });
  }

  get model(): string {
    return activeModel;
  }

  get provider(): string {
    return "elevenlabs";
  }

  synthesize(
    text: string,
    connOptions?: APIConnectOptions,
    abortSignal?: AbortSignal,
  ): tts.ChunkedStream {
    return new ElevenLabsV3ChunkedStream(
      text,
      this,
      this.apiKey,
      this.voiceId,
      connOptions,
      abortSignal,
    );
  }

  stream(): tts.SynthesizeStream {
    throw new Error(
      "Eleven v3 uses HTTP streaming, not the legacy TTS WebSocket",
    );
  }
}

class ElevenLabsV3ChunkedStream extends tts.ChunkedStream {
  label = "korio.elevenLabsV3ChunkedStream";

  constructor(
    text: string,
    owner: VoiceTutorElevenLabsTTS,
    private readonly apiKey: string,
    private readonly voiceId: string,
    connOptions?: APIConnectOptions,
    abortSignal?: AbortSignal,
  ) {
    super(text, owner, connOptions, abortSignal);
  }

  private request(
    path: "stream" | "plain",
    model = activeModel,
  ): Promise<Response> {
    const suffix = path === "stream" ? "/stream" : "";
    return fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}${suffix}?output_format=pcm_24000`,
      {
        method: "POST",
        headers: {
          "xi-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        // Keep Eleven v3's [laughs], [shouts], and [whispers] directives verbatim.
        body: JSON.stringify({ text: this.inputText, model_id: model }),
        signal: AbortSignal.any([
          this.abortSignal,
          AbortSignal.timeout(30_000),
        ]),
      },
    );
  }

  protected async run(): Promise<void> {
    try {
      await this.synthesizeFrames();
    } catch (error) {
      // 세션이 닫히거나 끼어들기로 끊긴 건 실패가 아니다. 예전엔 이게 tts_error 와
      // "Unhandled promise rejection" 으로 찍혀서 진짜 원인(STT) 을 가렸다
      if (this.abortSignal.aborted) return;
      throw error;
    }
  }

  private async synthesizeFrames(): Promise<void> {
    let response = await this.request("stream");
    if (
      (response.status === 400 || response.status === 422) &&
      activeModel !== FALLBACK_MODEL
    ) {
      const detail = (await response.text().catch(() => "")).slice(0, 200);
      console.warn(
        `Voice Tutor TTS model ${activeModel} rejected (HTTP ${response.status} ${detail}) → switching to ${FALLBACK_MODEL}`,
      );
      activeModel = FALLBACK_MODEL;
      response = await this.request("stream");
    }
    if (!response.ok || !response.body) {
      // 거절 이유(detail.status)를 남긴다. 예전엔 상태 코드만 찍혀서
      // "목소리가 안 나온다" 가 모델 문제인지 요금제·voice ID 문제인지 알 수 없었다
      const detail = (await response.text().catch(() => "")).slice(0, 200);
      console.warn(
        `Voice Tutor ElevenLabs ${activeModel} stream rejected: HTTP ${response.status} ${detail}`,
      );
      // 스트리밍이 막힌 계정/모델이어도 목소리는 나가야 한다 — 한 번에 받는 경로로 한 번 더
      if (response.status >= 400 && response.status < 500 && response.status !== 401) {
        response = await this.request("plain");
      }
    }
    if (!response.ok || !response.body) {
      const detail = response.bodyUsed
        ? ""
        : (await response.text().catch(() => "")).slice(0, 200);
      console.warn(
        `Voice Tutor ElevenLabs ${activeModel} rejected: HTTP ${response.status} ${detail}`,
      );
      throw new Error(
        `ElevenLabs v3 speech request failed: HTTP ${response.status}`,
      );
    }

    const requestId = shortuuid();
    const bytes = new AudioByteStream(SAMPLE_RATE, 1);
    let last: AudioFrame | undefined;
    const send = (frames: AudioFrame[]) => {
      for (const frame of frames) {
        if (last)
          this.queue.put({
            requestId,
            segmentId: requestId,
            frame: last,
            final: false,
          });
        last = frame;
      }
    };

    for await (const chunk of response.body) send(bytes.write(chunk));
    send(bytes.flush());
    if (!last) throw new Error("ElevenLabs v3 returned no audio");
    this.queue.put({
      requestId,
      segmentId: requestId,
      frame: last,
      final: true,
    });
  }
}
