import { Injectable, Logger } from '@nestjs/common';
import { AzureTutorTtsProvider } from './azure-tutor-tts.provider';
import { ElevenLabsTutorTtsProvider } from './elevenlabs-tutor-tts.provider';
import {
  TutorTtsError,
  type TutorTtsProvider,
  type TutorTtsRequest,
  type TutorTtsStream,
} from './tutor-tts.types';

/**
 * 선생님이 고른 provider 이름을 실제 어댑터로 잇는다.
 *
 * 여기가 있는 이유는 하나다 — 부르는 쪽 어디에도 업체 이름이 나오면 안 되기
 * 때문이다. `if (teacher === 'seoyeon') callElevenLabs()` 같은 코드는 업체를
 * 바꾸는 순간 튜터 전체를 뒤져야 한다.
 */
@Injectable()
export class TutorTtsRegistry {
  private readonly logger = new Logger(TutorTtsRegistry.name);
  private readonly providers = new Map<string, TutorTtsProvider>();

  constructor(
    azure: AzureTutorTtsProvider,
    eleven: ElevenLabsTutorTtsProvider,
  ) {
    for (const p of [azure, eleven]) this.providers.set(p.name, p);
  }

  get(name: string): TutorTtsProvider | undefined {
    return this.providers.get(name);
  }

  /** 설정이 끝난 provider 중 아무거나. 폴백에 쓴다 */
  private firstConfigured(exclude?: string): TutorTtsProvider | undefined {
    for (const p of this.providers.values()) {
      if (p.name !== exclude && p.isConfigured()) return p;
    }
    return undefined;
  }

  /**
   * 지정한 provider 로 합성하되, 실패하면 한 번 재시도하고 그래도 안 되면
   * 다른 provider 로 넘어간다.
   *
   * ⚠️ Realtime 자체 음성으로 떨어지는 폴백은 만들지 않는다. 목소리를 바꾼 게
   *    이 작업의 목적인데, 실패했다고 그 목소리가 갑자기 나오면 유저는 앱이
   *    고장난 줄 안다. 소리를 못 내면 화면의 글자로 버틴다.
   */
  async synthesize(
    providerName: string,
    req: TutorTtsRequest,
  ): Promise<TutorTtsStream & { provider: string }> {
    const primary = this.get(providerName);
    if (primary?.isConfigured()) {
      try {
        return { ...(await primary.synthesizeStream(req)), provider: primary.name };
      } catch (e) {
        this.logger.warn(
          `${primary.name} 1차 실패: ${(e as Error).message} — 한 번 더 시도`,
        );
        try {
          return {
            ...(await primary.synthesizeStream(req)),
            provider: primary.name,
          };
        } catch (e2) {
          this.logger.warn(`${primary.name} 재시도도 실패 — 폴백으로 넘어간다`);
        }
      }
    }

    const fallback = this.firstConfigured(providerName);
    if (!fallback) {
      throw new TutorTtsError(providerName, 'NO_TTS_PROVIDER_CONFIGURED');
    }
    this.logger.warn(`TTS 폴백: ${providerName} → ${fallback.name}`);
    return { ...(await fallback.synthesizeStream(req)), provider: fallback.name };
  }

  /** 부팅 로그용 */
  configuredNames(): string[] {
    return [...this.providers.values()]
      .filter((p) => p.isConfigured())
      .map((p) => p.name);
  }
}
