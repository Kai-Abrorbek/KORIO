import {
  AudioByteStream,
  shortuuid,
  tts,
  type APIConnectOptions,
} from "@livekit/agents";
import type { AudioFrame } from "@livekit/rtc-node";

const SAMPLE_RATE = 24_000;
const MODEL = "eleven_v3";

/** Eleven v3 does not support ElevenLabs' legacy TTS WebSocket. Use HTTP audio streaming. */
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
    return MODEL;
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

  protected async run(): Promise<void> {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}/stream?output_format=pcm_24000`,
      {
        method: "POST",
        headers: {
          "xi-api-key": this.apiKey,
          "Content-Type": "application/json",
        },
        // Keep Eleven v3's [laughs], [shouts], and [whispers] directives verbatim.
        body: JSON.stringify({ text: this.inputText, model_id: MODEL }),
        signal: AbortSignal.any([
          this.abortSignal,
          AbortSignal.timeout(30_000),
        ]),
      },
    );
    if (!response.ok || !response.body) {
      console.warn(`Voice Tutor ElevenLabs v3 rejected: HTTP ${response.status}`);
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
