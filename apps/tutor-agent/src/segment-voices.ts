/**
 * 한 구간(한국어 또는 설명 언어)을 **같은 목소리로** 소리 내는 업체별 구현.
 *
 * BilingualTTS(bilingual-tts.ts) 가 글을 구간으로 자르고, 구간마다 여기에
 * "이건 한국어로 / 이건 우즈벡어로" 를 알려서 합성한다. 목소리 이름은 그대로,
 * 읽는 언어만 바뀐다 — 그래서 학습자 귀엔 한 사람이다.
 *
 * 전부 24kHz · 16-bit · mono PCM 을 **도착하는 대로** 흘려준다. 한 문장을 다
 * 받고 나서 틀면 첫 소리가 그만큼 늦는다.
 *
 * ⚠️ 읽기 지시문은 scripts/voice-samples.ts 의 듣기 테스트와 같은 문장이다.
 *    Kai 가 귀로 고른 소리가 운영에서 그대로 나와야 한다. 바꾸면 둘 다 바꿔라.
 */
import { GoogleGenAI, Modality } from '@google/genai';
import type { Segment } from './segments.js';

export const SAMPLE_RATE = 24_000;

export interface SegmentVoice {
  readonly provider: string;
  readonly model: string;
  /** 구간 하나를 PCM 조각으로 흘려준다. signal 이 끊기면 요청도 끊는다 */
  stream(seg: Segment, signal: AbortSignal): AsyncIterable<Uint8Array>;
}

/** HTTP 상태가 붙은 실패 — BilingualTTS 가 재시도 여부를 정할 때 본다 */
export class VoiceHttpError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

const LANGUAGE: Record<string, string> = {
  uz: 'Uzbek (Tashkent pronunciation)',
  ru: 'Russian',
  en: 'English',
  ko: 'Korean',
};

const TEACHER = 'a warm, friendly Korean teacher';
const NO_EDIT = 'Do not translate, skip or add any words';

export function segmentInstruction(seg: Segment, teachingLanguage: string): string {
  return seg.lang === 'ko'
    ? `Say this in clear, native Seoul Korean, a little slower so a learner can follow, as ${TEACHER}. ${NO_EDIT}`
    : `Say this in natural, native ${LANGUAGE[teachingLanguage] ?? LANGUAGE.uz}, as ${TEACHER}. ${NO_EDIT}`;
}

// ───────────────────────── Gemini TTS ─────────────────────────

/**
 * Gemini TTS. 목소리 이름이 Gemini Live 와 **같은 30개**라 선생님 목소리
 * (api/src/tutor/gemini/voices.ts)를 그대로 쓴다 — 미리듣기와도 같은 사람이다.
 */
export class GeminiSegmentVoice implements SegmentVoice {
  readonly provider = 'google';
  readonly #client: GoogleGenAI;

  constructor(
    private readonly opts: { apiKey: string; model: string; voiceName: string; teachingLanguage: string },
  ) {
    this.#client = new GoogleGenAI({ apiKey: opts.apiKey });
  }

  get model(): string {
    return this.opts.model;
  }

  async *stream(seg: Segment, signal: AbortSignal): AsyncIterable<Uint8Array> {
    const res = await this.#client.models.generateContentStream({
      model: this.opts.model,
      // beta.TTS 플러그인과 같은 모양: `지시:\n"본문"`
      contents: [
        { role: 'user', parts: [{ text: `${segmentInstruction(seg, this.opts.teachingLanguage)}:\n"${seg.text}"` }] },
      ],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: this.opts.voiceName } } },
        abortSignal: signal,
      },
    });
    for await (const chunk of res) {
      for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
        const d = part.inlineData;
        if (!d?.data || !d.mimeType?.startsWith('audio/')) continue;
        const rate = /rate=(\d+)/.exec(d.mimeType)?.[1];
        if (rate && Number(rate) !== SAMPLE_RATE) {
          throw new VoiceHttpError(502, `Gemini TTS 샘플레이트가 ${rate} 다 (기대 ${SAMPLE_RATE})`);
        }
        yield Buffer.from(d.data, 'base64');
      }
    }
  }
}

// ───────────────────────── OpenAI TTS ─────────────────────────

export class OpenAISegmentVoice implements SegmentVoice {
  readonly provider = 'openai';

  constructor(
    private readonly opts: { apiKey: string; model: string; voice: string; teachingLanguage: string },
  ) {}

  get model(): string {
    return this.opts.model;
  }

  async *stream(seg: Segment, signal: AbortSignal): AsyncIterable<Uint8Array> {
    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: { Authorization: `Bearer ${this.opts.apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.opts.model,
        voice: this.opts.voice,
        input: seg.text,
        instructions: `${segmentInstruction(seg, this.opts.teachingLanguage)}.`,
        // 24kHz 16-bit mono little-endian, 헤더 없음
        response_format: 'pcm',
      }),
      signal,
    });
    if (!res.ok || !res.body) {
      throw new VoiceHttpError(res.status, `openai tts ${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`);
    }
    for await (const chunk of res.body) yield chunk;
  }
}

// ───────────────────────── Azure ─────────────────────────

function escapeXml(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const LOCALE: Record<string, string> = { uz: 'uz-UZ', ru: 'ru-RU', en: 'en-US', ko: 'ko-KR' };

/**
 * Azure. 두 가지로 쓴다:
 *  - multilingualVoice 가 있으면 그 목소리 하나로 <lang> 만 바꿔 읽는다 (한 목소리)
 *  - 없으면 언어별 음성 (koreanVoice / nativeVoice) — 목소리가 둘이 된다
 */
export class AzureSegmentVoice implements SegmentVoice {
  readonly provider = 'azure';
  readonly model = 'azure-neural';

  constructor(
    private readonly opts: {
      key: string;
      endpoint: string;
      teachingLanguage: string;
      multilingualVoice?: string;
      koreanVoice?: string;
      nativeVoice?: string;
    },
  ) {}

  #ssml(seg: Segment): string {
    const locale = seg.lang === 'ko' ? 'ko-KR' : (LOCALE[this.opts.teachingLanguage] ?? 'uz-UZ');
    const text = escapeXml(seg.text);
    if (this.opts.multilingualVoice) {
      return (
        `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${locale}">` +
        `<voice name="${escapeXml(this.opts.multilingualVoice)}"><lang xml:lang="${locale}">${text}</lang></voice></speak>`
      );
    }
    const voice = seg.lang === 'ko' ? this.opts.koreanVoice : this.opts.nativeVoice;
    return (
      `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${locale}">` +
      `<voice name="${escapeXml(voice ?? '')}">${text}</voice></speak>`
    );
  }

  async *stream(seg: Segment, signal: AbortSignal): AsyncIterable<Uint8Array> {
    const res = await fetch(this.opts.endpoint, {
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': this.opts.key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'raw-24khz-16bit-mono-pcm',
        'User-Agent': 'korio-tutor-agent',
      },
      body: this.#ssml(seg),
      signal,
    });
    if (!res.ok || !res.body) {
      throw new VoiceHttpError(res.status, `azure tts ${res.status}: ${(await res.text().catch(() => '')).slice(0, 200)}`);
    }
    for await (const chunk of res.body) yield chunk;
  }
}
