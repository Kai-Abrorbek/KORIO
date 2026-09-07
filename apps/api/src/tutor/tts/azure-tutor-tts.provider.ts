import { Injectable, Logger } from '@nestjs/common';
import { Readable } from 'stream';
import {
  TutorTtsError,
  type TutorTtsProvider,
  type TutorTtsRequest,
  type TutorTtsStream,
} from './tutor-tts.types';

/** 업체가 늘어질 때 요청까지 같이 붙잡히지 않게 */
const TIMEOUT_MS = 8000;

/**
 * Azure 신경망 음성.
 *
 * 기본 제공자로 고른 이유: ko-KR 전용으로 훈련돼 발음이 원어민 수준이고,
 * 발음 연습 기능이 이미 같은 키를 쓰고 있어 새로 붙일 게 없다. 우즈벡어
 * 음성(uz-UZ)도 같은 곳에서 나온다.
 *
 * 출력은 mp3 다. wav 는 같은 문장이 5배쯤 커서 느린 회선에서 첫 소리가
 * 늦게 난다 — 회화에서는 그 지연이 그대로 어색함이 된다.
 */
@Injectable()
export class AzureTutorTtsProvider implements TutorTtsProvider {
  readonly name = 'azure';
  private readonly logger = new Logger(AzureTutorTtsProvider.name);

  isConfigured(): boolean {
    return !!process.env.AZURE_SPEECH_KEY?.trim() && !!this.endpoint();
  }

  async synthesizeStream(req: TutorTtsRequest): Promise<TutorTtsStream> {
    const key = process.env.AZURE_SPEECH_KEY?.trim();
    const endpoint = this.endpoint();
    if (!key || !endpoint) {
      throw new TutorTtsError(this.name, 'AZURE_SPEECH_NOT_CONFIGURED');
    }

    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
          'User-Agent': 'korio-tutor',
        },
        body: this.ssml(req),
        signal: ac.signal,
      });

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => '');
        throw new TutorTtsError(
          this.name,
          `azure ${res.status}: ${detail.slice(0, 200)}`,
        );
      }

      return {
        // 전부 받아서 Buffer 로 만들지 않는다. 도착하는 대로 흘려보낸다
        body: Readable.fromWeb(res.body as any),
        contentType: 'audio/mpeg',
        characters: req.text.length,
      };
    } catch (e: any) {
      clearTimeout(timer);
      if (e instanceof TutorTtsError) throw e;
      throw new TutorTtsError(
        this.name,
        e?.name === 'AbortError' ? 'TIMEOUT' : (e?.message ?? 'UNKNOWN'),
      );
    } finally {
      clearTimeout(timer);
    }
  }

  /**
   * speed 1.0 을 SSML 의 rate 로 옮긴다.
   * Azure 는 백분율(+5%, -5%)을 받는다.
   */
  private ssml(req: TutorTtsRequest): string {
    const locale = req.language === 'uz' ? 'uz-UZ' : 'ko-KR';
    const pct = Math.round(((req.speed ?? 1) - 1) * 100);
    const rate = `${pct >= 0 ? '+' : ''}${pct}%`;
    return (
      `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${locale}">` +
      `<voice name="${escapeXml(req.voiceId)}">` +
      `<prosody rate="${rate}">${escapeXml(req.text)}</prosody>` +
      `</voice></speak>`
    );
  }

  private endpoint(): string | null {
    const region = process.env.AZURE_SPEECH_REGION?.trim();
    const custom = process.env.AZURE_SPEECH_ENDPOINT?.trim();
    if (custom) {
      try {
        const url = new URL(custom);
        // 포털이 주는 주소는 합성 엔드포인트가 아니다 — 지역으로 다시 만든다
        if (url.hostname.endsWith('.api.cognitive.microsoft.com') && region) {
          return `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
        }
        url.pathname = `${url.pathname.replace(/\/$/, '')}/cognitiveservices/v1`;
        return url.toString().replace(/\/$/, '');
      } catch {
        this.logger.warn('AZURE_SPEECH_ENDPOINT 가 URL 이 아니다');
        return null;
      }
    }
    return region
      ? `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`
      : null;
  }
}

/** SSML 에 그대로 넣으면 문서가 깨진다. 유저 문장이 들어오는 자리라 필수 */
function escapeXml(v: string): string {
  return v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
