import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ElevenLabsTutorTtsProvider } from '../providers/elevenlabs-tts.provider';
import {
  voiceTutorVoices,
  type TutorTargetLanguage,
} from '../voice-tutor.config';

/**
 * What a voice says on the setup screen: the language being learned, with a
 * laugh in it, because how a voice laughs and reacts is what the learner is
 * choosing. ElevenLabs' own samples are English narration for every voice.
 */
export const VOICE_PREVIEW_LINES: Record<TutorTargetLanguage, string> = {
  ko: '[excited] 안녕! 오늘 나랑 한국어로 수다 떨어 보자. [laughs] 틀려도 괜찮아, 대신 내가 좀 놀릴 거야!',
  en: "[excited] Hey! Let's talk in English today. [laughs] Mistakes are fine — I'll just tease you a little!",
};

/** Voices × courses is small; the cap only guards against a runaway catalog. */
const MAX_CACHED = 200;

@Injectable()
export class VoiceTutorVoicePreviewService {
  private readonly cache = new Map<string, Promise<Buffer>>();

  constructor(private readonly tts: ElevenLabsTutorTtsProvider) {}

  /**
   * One clip per voice and course, made once and kept in memory, so the public
   * preview route costs a single synthesis no matter how often it is played.
   */
  async preview(
    voiceId: string,
    targetLanguage: TutorTargetLanguage,
  ): Promise<Buffer> {
    const voice = voiceTutorVoices().find((item) => item.id === voiceId);
    if (!voice) throw new NotFoundException('VOICE_TUTOR_VOICE_NOT_FOUND');
    const key = `${voice.providerVoiceId}:${targetLanguage}`;
    let clip = this.cache.get(key);
    if (!clip) {
      if (this.cache.size >= MAX_CACHED) {
        const [oldest] = this.cache.keys();
        if (oldest) this.cache.delete(oldest);
      }
      clip = this.tts.synthesize(
        VOICE_PREVIEW_LINES[targetLanguage],
        voice.providerVoiceId,
      );
      this.cache.set(key, clip);
      // A failed synthesis must not be served from the cache forever.
      void clip.catch(() => this.cache.delete(key));
    }
    try {
      return await clip;
    } catch {
      throw new ServiceUnavailableException('VOICE_TUTOR_TTS_UNAVAILABLE');
    }
  }
}
