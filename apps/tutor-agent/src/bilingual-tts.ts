/**
 * 한 목소리로 설명 언어와 한국어를 **깨끗이 나눠** 읽는 TTS.
 *
 *   "Aa, «저는 커피를 마시고 싶어요» demoqchi edingizmi?"
 *     → [우즈벡어] Aa,  ·쉼·  [한국어] 저는 커피를 마시고 싶어요  ·쉼·  [우즈벡어] demoqchi edingizmi?
 *
 * LLM 이 쓴 글을 글자(한글이냐 아니냐)로 자르고(segments.ts), 구간마다 "이건
 * 한국어로 읽어" 를 따로 알려 **같은 목소리**로 합성한 뒤 이어 붙인다.
 * Gemini Live 에서 끝내 못 고친 "한국어가 우즈벡어 억양으로 뭉개짐 / 우즈벡어가
 * 끝나기 전에 한국어가 튀어나옴" 을 구조로 없앤다 — 한 요청에 한 언어뿐이다.
 *
 * ── AgentSession 과의 관계 ──
 *
 * streaming: false 라서 AgentSession 이 StreamAdapter 로 감싸 **문장 단위로**
 * synthesize() 를 부른다 (@livekit/agents voice/agent.js 의 ttsNode). 다음 문장
 * 합성은 앞 문장이 재생되는 동안 이미 시작된다. 여기서는 한 문장 안의 구간들을
 * 동시에 요청해 두고, 순서대로 흘려보낸다.
 *
 * ── 쉼 ──
 *
 * 업체가 붙여 보내는 앞뒤 무음은 걷어내고(없애지 않으면 이음새마다 쉼이 두 배),
 * 구간 사이 쉼은 문장부호로 정한다 (segments.ts 의 pauseAfterMs).
 */
import {
  APIConnectionError,
  APIStatusError,
  AudioByteStream,
  isAPIError,
  shortuuid,
  tts,
  type APIConnectOptions,
} from '@livekit/agents';
import type { AudioFrame } from '@livekit/rtc-node';
import { forSpeech } from './for-speech.js';
import { splitByKorean } from './segments.js';
import { SAMPLE_RATE, VoiceHttpError, type SegmentVoice } from './segment-voices.js';

export class BilingualTTS extends tts.TTS {
  label = 'korio.BilingualTTS';

  constructor(readonly voice: SegmentVoice) {
    super(SAMPLE_RATE, 1, { streaming: false });
  }

  get model(): string {
    return this.voice.model;
  }

  get provider(): string {
    return this.voice.provider;
  }

  synthesize(text: string, connOptions?: APIConnectOptions, abortSignal?: AbortSignal): tts.ChunkedStream {
    return new BilingualChunkedStream(text, this, connOptions, abortSignal);
  }

  stream(): tts.SynthesizeStream {
    // 문장 쪼개기는 AgentSession 의 StreamAdapter 가 한다 (streaming: false)
    throw new Error('BilingualTTS 는 문장 단위 합성만 한다');
  }
}

class BilingualChunkedStream extends tts.ChunkedStream {
  label = 'korio.BilingualChunkedStream';
  readonly #voice: SegmentVoice;

  constructor(text: string, owner: BilingualTTS, connOptions?: APIConnectOptions, abortSignal?: AbortSignal) {
    super(text, owner, connOptions, abortSignal);
    this.#voice = owner.voice;
  }

  protected async run(): Promise<void> {
    const segs = splitByKorean(forSpeech(this.inputText));
    if (!segs.length) return; // 읽을 글자가 없다 (이모지뿐 등)

    const requestId = shortuuid();
    const signal = this.abortSignal;
    // 전부 한꺼번에 요청한다 — 앞 구간이 나가는 동안 뒤 구간이 만들어진다
    const pipes = segs.map((seg) => prefetch(this.#voice.stream(seg, signal)));

    const bstream = new AudioByteStream(SAMPLE_RATE, 1);
    let last: AudioFrame | undefined;
    let played = false;
    const send = (frames: AudioFrame[]) => {
      for (const frame of frames) {
        if (last) this.queue.put({ requestId, segmentId: requestId, frame: last, final: false });
        last = frame;
        played = true;
      }
    };

    try {
      for (let i = 0; i < segs.length; i++) {
        for await (const pcm of trimSilence(pipes[i])) send(bstream.write(pcm));
        const pause = segs[i].pauseAfterMs;
        if (pause) send(bstream.write(new Uint8Array(Math.round((SAMPLE_RATE * pause) / 1000) * 2)));
      }
      send(bstream.flush());
      if (last) this.queue.put({ requestId, segmentId: requestId, frame: last, final: true });
    } catch (e) {
      if (signal.aborted) return; // 끼어들기로 끊긴 것 — 실패가 아니다
      // 이미 소리가 나갔으면 재시도하면 같은 말을 두 번 한다
      throw toApiError(e, !played);
    }
  }
}

function toApiError(e: unknown, retryable: boolean): Error {
  if (isAPIError(e)) return e;
  const message = e instanceof Error ? e.message : String(e);
  const status =
    e instanceof VoiceHttpError
      ? e.status
      : typeof e === 'object' && e !== null && 'status' in e && typeof e.status === 'number'
        ? e.status
        : undefined;
  if (status !== undefined) {
    return new APIStatusError({
      message: `BilingualTTS: ${message}`,
      options: { statusCode: status, retryable: retryable && (status === 429 || status >= 500) },
    });
  }
  return new APIConnectionError({ message: `BilingualTTS: ${message}`, options: { retryable } });
}

/**
 * 비동기 흐름을 **지금 바로** 읽기 시작해서 쌓아 둔다.
 * 안 그러면 두 번째 구간 요청이 첫 구간을 다 틀 때까지 시작도 안 한다.
 */
function prefetch(src: AsyncIterable<Uint8Array>): AsyncIterable<Uint8Array> {
  const chunks: Uint8Array[] = [];
  let done = false;
  let failure: { error: unknown } | null = null;
  let wake: (() => void) | null = null;
  const poke = () => {
    const w = wake;
    wake = null;
    w?.();
  };
  void (async () => {
    try {
      for await (const c of src) {
        chunks.push(c);
        poke();
      }
    } catch (error) {
      failure = { error };
    } finally {
      done = true;
      poke();
    }
  })();
  return {
    async *[Symbol.asyncIterator]() {
      for (;;) {
        const next = chunks.shift();
        if (next) {
          yield next;
          continue;
        }
        if (failure) throw failure.error;
        if (done) return;
        await new Promise<void>((r) => (wake = r));
      }
    },
  };
}

const SILENCE = 500; // |sample| 이 이보다 작으면 무음 (≈ -36 dBFS)
const PAD_BYTES = Math.round(SAMPLE_RATE * 0.04) * 2; // 걷어낸 자리에 남기는 40ms
const HOLD_BYTES = Math.round(SAMPLE_RATE * 0.3) * 2; // 끝 무음 판정을 위해 붙잡아 두는 300ms

function firstLoud(b: Buffer): number {
  for (let i = 0; i + 1 < b.length; i += 2) if (Math.abs(b.readInt16LE(i)) >= SILENCE) return i;
  return -1;
}

function lastLoud(b: Buffer): number {
  for (let i = b.length - 2; i >= 0; i -= 2) if (Math.abs(b.readInt16LE(i)) >= SILENCE) return i;
  return -1;
}

/**
 * 앞뒤 무음을 걷어내며 흘려보낸다. 앞은 첫 소리까지 버리고, 끝은 마지막
 * 300ms 를 붙잡고 있다가 흐름이 끝나면 무음만 잘라내고 내보낸다.
 * (HTTP 조각은 샘플 중간에서 끊길 수 있어서 홀수 바이트를 넘겨 받는다)
 */
async function* trimSilence(src: AsyncIterable<Uint8Array>): AsyncIterable<Uint8Array> {
  let carry = Buffer.alloc(0);
  let pending = Buffer.alloc(0);
  let started = false;
  for await (const chunk of src) {
    let buf = Buffer.concat([carry, Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength)]);
    const odd = buf.length % 2;
    carry = odd ? Buffer.from(buf.subarray(buf.length - 1)) : Buffer.alloc(0);
    if (odd) buf = buf.subarray(0, buf.length - 1);

    pending = Buffer.concat([pending, buf]);
    if (!started) {
      const at = firstLoud(pending);
      if (at < 0) {
        // 아직 무음뿐 — 끝의 40ms 만 들고 있는다 (첫 소리 앞 여유)
        pending = pending.subarray(Math.max(0, pending.length - PAD_BYTES));
        continue;
      }
      started = true;
      pending = pending.subarray(Math.max(0, at - PAD_BYTES));
    }
    if (pending.length > HOLD_BYTES) {
      const cut = pending.length - HOLD_BYTES;
      yield pending.subarray(0, cut - (cut % 2));
      pending = pending.subarray(cut - (cut % 2));
    }
  }
  if (!started) return;
  const end = lastLoud(pending);
  if (end >= 0) yield pending.subarray(0, Math.min(pending.length, end + 2 + PAD_BYTES));
}
