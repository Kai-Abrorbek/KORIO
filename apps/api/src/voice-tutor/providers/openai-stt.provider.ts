import { Injectable } from '@nestjs/common';
import { voiceTutorModels } from '../voice-tutor.config';
import { VoiceTutorProviderError } from './provider-error';

export interface SttProvider {
  transcribe(audio: Buffer, mimeType: string): Promise<string>;
}

const AUDIO_EXTENSIONS: Record<string, string> = {
  'audio/webm': 'webm',
  'audio/mp4': 'm4a',
  'audio/x-m4a': 'm4a',
  'audio/m4a': 'm4a',
  'audio/mpeg': 'mp3',
  'audio/mp3': 'mp3',
  'audio/wav': 'wav',
  'audio/x-wav': 'wav',
  'audio/ogg': 'ogg',
};

export function supportedAudioMime(mimeType: string): boolean {
  return mimeType.split(';')[0].trim().toLowerCase() in AUDIO_EXTENSIONS;
}

@Injectable()
export class OpenAiSttProvider implements SttProvider {
  async transcribe(audio: Buffer, mimeType: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY?.trim();
    if (!apiKey) throw new VoiceTutorProviderError('NOT_CONFIGURED', 'STT');
    const normalizedMime = mimeType.split(';')[0].trim().toLowerCase();
    const extension = AUDIO_EXTENSIONS[normalizedMime];
    if (!extension)
      throw new VoiceTutorProviderError('INVALID_RESPONSE', 'STT');

    const form = new FormData();
    form.append(
      'file',
      new Blob([new Uint8Array(audio)], { type: normalizedMime }),
      `speech.${extension}`,
    );
    form.append('model', voiceTutorModels().stt);
    form.append('response_format', 'json');
    // Do not force one language: a learner may switch between Korean and a native language.
    let response: Response;
    try {
      response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
        signal: AbortSignal.timeout(25_000),
      });
    } catch {
      throw new VoiceTutorProviderError('UNAVAILABLE', 'STT');
    }
    if (!response.ok) throw new VoiceTutorProviderError('UNAVAILABLE', 'STT');
    const payload = (await response.json()) as { text?: unknown };
    if (typeof payload.text !== 'string') {
      throw new VoiceTutorProviderError('INVALID_RESPONSE', 'STT');
    }
    return payload.text.trim().slice(0, 3000);
  }
}
