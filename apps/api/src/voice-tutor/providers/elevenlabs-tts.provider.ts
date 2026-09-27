import { Injectable } from '@nestjs/common';
import { voiceTutorModels } from '../voice-tutor.config';
import { elevenLabsPerformance } from '../personality/speech-performance';
import type { TutorReaction } from '../voice-tutor.types';
import { VoiceTutorProviderError } from './provider-error';

export interface TtsProvider {
  synthesize(
    text: string,
    providerVoiceId: string,
    reaction?: TutorReaction,
  ): Promise<Buffer>;
}

@Injectable()
export class ElevenLabsTutorTtsProvider implements TtsProvider {
  async synthesize(
    text: string,
    providerVoiceId: string,
    reaction?: TutorReaction,
  ): Promise<Buffer> {
    const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
    if (!apiKey) throw new VoiceTutorProviderError('NOT_CONFIGURED', 'TTS');
    if (!/^[\w-]{8,100}$/.test(providerVoiceId)) {
      throw new VoiceTutorProviderError('INVALID_RESPONSE', 'TTS');
    }
    const model = voiceTutorModels().tts;
    const performance = elevenLabsPerformance(text, model, reaction);
    let response: Response;
    try {
      response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${providerVoiceId}?output_format=mp3_44100_128`,
        {
          method: 'POST',
          headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...performance,
            model_id: model,
          }),
          signal: AbortSignal.timeout(25_000),
        },
      );
    } catch {
      throw new VoiceTutorProviderError('UNAVAILABLE', 'TTS');
    }
    if (!response.ok) throw new VoiceTutorProviderError('UNAVAILABLE', 'TTS');
    const declaredLength = Number(response.headers.get('content-length'));
    if (declaredLength > 4 * 1024 * 1024) {
      throw new VoiceTutorProviderError('INVALID_RESPONSE', 'TTS');
    }
    const data = Buffer.from(await response.arrayBuffer());
    if (!data.length || data.length > 4 * 1024 * 1024) {
      throw new VoiceTutorProviderError('INVALID_RESPONSE', 'TTS');
    }
    return data;
  }
}
