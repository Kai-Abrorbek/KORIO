import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import {
  TutorTtsError,
  type TutorTtsProvider,
  type TutorTtsRequest,
  type TutorTtsStream,
} from './tutor-tts.types';

const TIMEOUT_MS = 8000;

/**
 * ElevenLabs.
 *
 * 아직 기본이 아니다 — 키를 넣으면 그때부터 쓸 수 있다. 선생님 프로필의
 * tts.provider 를 'elevenlabs' 로 바꾸고 voiceId 를 그쪽 것으로 넣으면 된다.
 *
 * 이 어댑터를 미리 넣어둔 이유는, 나중에 한국어 음질을 비교할 때 튜터 로직을
 * 건드리지 않고 선생님 한 명만 바꿔서 A/B 를 돌릴 수 있게 하려는 것이다.
 */
@Injectable()
export class ElevenLabsTutorTtsProvider implements TutorTtsProvider {
  readonly name = 'elevenlabs';

  isConfigured(): boolean {
    return !!process.env.ELEVENLABS_API_KEY?.trim();
  }

  async synthesizeStream(req: TutorTtsRequest): Promise<TutorTtsStream> {
    const key = process.env.ELEVENLABS_API_KEY?.trim();
    if (!key) throw new TutorTtsError(this.name, 'ELEVENLABS_NOT_CONFIGURED');

    const model =
      process.env.ELEVENLABS_MODEL?.trim() || 'eleven_turbo_v2_5';
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(req.voiceId)}/stream?output_format=mp3_22050_32`,
        {
          method: 'POST',
          headers: {
            'xi-api-key': key,
            'Content-Type': 'application/json',
            Accept: 'audio/mpeg',
          },
          body: JSON.stringify({
            text: req.text,
            model_id: model,
            language_code: req.language,
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
              // 선생님별 speechRate 를 그대로 넘길 자리가 없어서 속도는
              // 프롬프트(문장 길이)와 voice 선택으로 조절한다
              speed: req.speed ?? 1,
            },
          }),
          signal: ac.signal,
        },
      );

      if (!res.ok || !res.body) {
        const detail = await res.text().catch(() => '');
        throw new TutorTtsError(
          this.name,
          `elevenlabs ${res.status}: ${detail.slice(0, 200)}`,
        );
      }

      return {
        body: Readable.fromWeb(res.body as any),
        contentType: 'audio/mpeg',
        characters: req.text.length,
      };
    } catch (e: any) {
      if (e instanceof TutorTtsError) throw e;
      throw new TutorTtsError(
        this.name,
        e?.name === 'AbortError' ? 'TIMEOUT' : (e?.message ?? 'UNKNOWN'),
      );
    } finally {
      clearTimeout(timer);
    }
  }
}
