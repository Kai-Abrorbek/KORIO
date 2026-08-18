import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash, randomUUID } from 'node:crypto';
import {
  SynthesizeSpeechDto,
  type SpeechLanguage,
} from './dto/synthesize-speech.dto';

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const CACHE_MAX_ENTRIES = 256;
const CACHE_MAX_BYTES = 32 * 1024 * 1024;
const AZURE_TIMEOUT_MS = 15_000;
const VOICE_CACHE_TTL_MS = 12 * 60 * 60 * 1000;

interface CachedSpeech {
  audio: Buffer;
  cacheKey: string;
  expiresAt: number;
}

export interface PreparedSpeech {
  audioId: string;
  expiresAt: number;
}

export interface SpeechVoice {
  shortName: string;
  displayName: string;
  localName: string;
  gender: 'female' | 'male';
  voiceType: string;
  status: string;
  styles: string[];
}

interface AzureVoiceResponse {
  ShortName: string;
  DisplayName?: string;
  LocalName?: string;
  Gender: 'Female' | 'Male';
  Locale: string;
  VoiceType?: string;
  Status?: string;
  StyleList?: string[];
}

const VOICES: Record<
  SpeechLanguage,
  Record<'female' | 'male', string>
> = {
  'ko-KR': {
    female: 'ko-KR-SunHiNeural',
    male: 'ko-KR-InJoonNeural',
  },
  'uz-UZ': {
    female: 'uz-UZ-MadinaNeural',
    male: 'uz-UZ-SardorNeural',
  },
  'en-US': {
    female: 'en-US-JennyNeural',
    male: 'en-US-GuyNeural',
  },
  'ru-RU': {
    female: 'ru-RU-SvetlanaNeural',
    male: 'ru-RU-DmitryNeural',
  },
};

@Injectable()
export class TtsService {
  private readonly logger = new Logger(TtsService.name);
  private readonly cache = new Map<string, CachedSpeech>();
  private readonly audioIdByCacheKey = new Map<string, string>();
  private readonly inFlight = new Map<string, Promise<Buffer>>();
  private cacheBytes = 0;
  private voicesCache: { expiresAt: number; voices: SpeechVoice[] } | null =
    null;

  constructor(private readonly configService: ConfigService) {}

  async listKoreanVoices(): Promise<SpeechVoice[]> {
    if (this.voicesCache && this.voicesCache.expiresAt > Date.now()) {
      return this.voicesCache.voices;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), AZURE_TIMEOUT_MS);
    try {
      const response = await fetch(this.resolveVoiceListEndpoint(), {
        headers: {
          'Ocp-Apim-Subscription-Key': this.getSubscriptionKey(),
        },
        signal: controller.signal,
      });
      if (!response.ok) {
        this.logger.error(
          `Azure Speech voice list failed (${response.status})`,
        );
        throw new BadGatewayException('AZURE_SPEECH_VOICES_FAILED');
      }

      const payload: unknown = await response.json();
      if (!Array.isArray(payload)) {
        throw new BadGatewayException('AZURE_SPEECH_VOICES_INVALID');
      }
      const voices = payload
        .filter(this.isAzureKoreanVoice)
        .map<SpeechVoice>((voice) => ({
          shortName: voice.ShortName,
          displayName: voice.DisplayName ?? voice.ShortName,
          localName: voice.LocalName ?? voice.DisplayName ?? voice.ShortName,
          gender: voice.Gender === 'Male' ? 'male' : 'female',
          voiceType: voice.VoiceType ?? '',
          status: voice.Status ?? '',
          styles: Array.isArray(voice.StyleList) ? voice.StyleList : [],
        }))
        .sort((a, b) => {
          if (a.gender !== b.gender) return a.gender === 'female' ? -1 : 1;
          return a.localName.localeCompare(b.localName, 'ko');
        });
      if (voices.length === 0) {
        throw new BadGatewayException('AZURE_SPEECH_VOICES_EMPTY');
      }

      this.voicesCache = {
        expiresAt: Date.now() + VOICE_CACHE_TTL_MS,
        voices,
      };
      return voices;
    } catch (error) {
      if (
        error instanceof BadGatewayException ||
        error instanceof ServiceUnavailableException
      ) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ServiceUnavailableException('AZURE_SPEECH_TIMEOUT');
      }
      this.logger.error('Azure Speech voice list could not be loaded');
      throw new BadGatewayException('AZURE_SPEECH_VOICES_FAILED');
    } finally {
      clearTimeout(timeout);
    }
  }

  async prepare(dto: SynthesizeSpeechDto): Promise<PreparedSpeech> {
    const text = dto.text.trim();
    if (!text) {
      throw new BadRequestException('EMPTY_SPEECH_TEXT');
    }

    const language = dto.language ?? 'ko-KR';
    const rate = Math.min(2, Math.max(0.25, dto.rate ?? 1));
    const gender = dto.gender ?? 'female';
    const requestedVoice = dto.voice?.trim();
    if (requestedVoice && !requestedVoice.startsWith(`${language}-`)) {
      throw new BadRequestException('SPEECH_VOICE_LANGUAGE_MISMATCH');
    }
    const voice = requestedVoice || VOICES[language][gender];
    const cacheKey = createHash('sha256')
      .update(JSON.stringify({ language, rate, text, voice }))
      .digest('hex');
    const cached = this.getByCacheKey(cacheKey);
    if (cached) return cached;

    let synthesis = this.inFlight.get(cacheKey);
    if (!synthesis) {
      synthesis = this.synthesize(text, language, rate, voice);
      this.inFlight.set(cacheKey, synthesis);
    }

    try {
      const audio = await synthesis;
      const existing = this.getByCacheKey(cacheKey);
      if (existing) return existing;
      return this.store(cacheKey, audio);
    } finally {
      if (this.inFlight.get(cacheKey) === synthesis) {
        this.inFlight.delete(cacheKey);
      }
    }
  }

  getAudio(audioId: string): Buffer {
    const cached = this.cache.get(audioId);
    if (!cached || cached.expiresAt <= Date.now()) {
      if (cached) this.delete(audioId, cached);
      throw new NotFoundException('SPEECH_AUDIO_EXPIRED');
    }

    this.cache.delete(audioId);
    this.cache.set(audioId, cached);
    return cached.audio;
  }

  private getByCacheKey(cacheKey: string): PreparedSpeech | null {
    const audioId = this.audioIdByCacheKey.get(cacheKey);
    if (!audioId) return null;

    const cached = this.cache.get(audioId);
    if (!cached || cached.expiresAt <= Date.now()) {
      if (cached) this.delete(audioId, cached);
      else this.audioIdByCacheKey.delete(cacheKey);
      return null;
    }

    this.cache.delete(audioId);
    this.cache.set(audioId, cached);
    return { audioId, expiresAt: cached.expiresAt };
  }

  private store(cacheKey: string, audio: Buffer): PreparedSpeech {
    this.pruneExpired();
    while (
      this.cache.size >= CACHE_MAX_ENTRIES ||
      (this.cacheBytes + audio.byteLength > CACHE_MAX_BYTES &&
        this.cache.size > 0)
    ) {
      const oldest = this.cache.entries().next().value as
        | [string, CachedSpeech]
        | undefined;
      if (!oldest) break;
      this.delete(oldest[0], oldest[1]);
    }

    const audioId = randomUUID();
    const expiresAt = Date.now() + CACHE_TTL_MS;
    const cached = { audio, cacheKey, expiresAt };
    this.cache.set(audioId, cached);
    this.audioIdByCacheKey.set(cacheKey, audioId);
    this.cacheBytes += audio.byteLength;
    return { audioId, expiresAt };
  }

  private pruneExpired() {
    const now = Date.now();
    for (const [audioId, cached] of this.cache) {
      if (cached.expiresAt <= now) this.delete(audioId, cached);
    }
  }

  private delete(audioId: string, cached: CachedSpeech) {
    this.cache.delete(audioId);
    if (this.audioIdByCacheKey.get(cached.cacheKey) === audioId) {
      this.audioIdByCacheKey.delete(cached.cacheKey);
    }
    this.cacheBytes = Math.max(0, this.cacheBytes - cached.audio.byteLength);
  }

  private async synthesize(
    text: string,
    language: SpeechLanguage,
    rate: number,
    voice: string,
  ): Promise<Buffer> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), AZURE_TIMEOUT_MS);

    try {
      const response = await fetch(this.resolveEndpoint(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/ssml+xml',
          'Ocp-Apim-Subscription-Key': this.getSubscriptionKey(),
          'User-Agent': 'Korio',
          'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
        },
        body: this.buildSsml(text, language, rate, voice),
        signal: controller.signal,
      });

      if (!response.ok) {
        this.logger.error(`Azure Speech synthesis failed (${response.status})`);
        throw new BadGatewayException('AZURE_SPEECH_FAILED');
      }

      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (
        error instanceof BadGatewayException ||
        error instanceof ServiceUnavailableException
      ) {
        throw error;
      }
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ServiceUnavailableException('AZURE_SPEECH_TIMEOUT');
      }
      this.logger.error('Azure Speech request could not be completed');
      throw new BadGatewayException('AZURE_SPEECH_FAILED');
    } finally {
      clearTimeout(timeout);
    }
  }

  private resolveEndpoint(): string {
    const region = this.configService
      .get<string>('AZURE_SPEECH_REGION')
      ?.trim();
    const configuredEndpoint = this.configService
      .get<string>('AZURE_SPEECH_ENDPOINT')
      ?.trim();

    if (configuredEndpoint) {
      try {
        const url = new URL(configuredEndpoint);
        if (url.pathname.includes('/cognitiveservices/v1')) {
          return url.toString().replace(/\/$/, '');
        }
        if (url.hostname.endsWith('.api.cognitive.microsoft.com') && region) {
          return `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
        }
        url.pathname = `${url.pathname.replace(/\/$/, '')}/cognitiveservices/v1`;
        return url.toString().replace(/\/$/, '');
      } catch {
        throw new ServiceUnavailableException('AZURE_SPEECH_ENDPOINT_INVALID');
      }
    }

    if (region) {
      return `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;
    }
    throw new ServiceUnavailableException('AZURE_SPEECH_NOT_CONFIGURED');
  }

  private resolveVoiceListEndpoint(): string {
    const region = this.configService
      .get<string>('AZURE_SPEECH_REGION')
      ?.trim();
    const configuredEndpoint = this.configService
      .get<string>('AZURE_SPEECH_ENDPOINT')
      ?.trim();

    if (configuredEndpoint) {
      try {
        const url = new URL(configuredEndpoint);
        if (
          url.hostname.endsWith('.api.cognitive.microsoft.com') ||
          url.hostname.endsWith('.tts.speech.microsoft.com')
        ) {
          const endpointRegion = region ?? url.hostname.split('.')[0];
          return `https://${endpointRegion}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
        }
        url.pathname = '/tts/cognitiveservices/voices/list';
        url.search = '';
        return url.toString().replace(/\/$/, '');
      } catch {
        throw new ServiceUnavailableException('AZURE_SPEECH_ENDPOINT_INVALID');
      }
    }

    if (region) {
      return `https://${region}.tts.speech.microsoft.com/cognitiveservices/voices/list`;
    }
    throw new ServiceUnavailableException('AZURE_SPEECH_NOT_CONFIGURED');
  }

  private getSubscriptionKey(): string {
    const subscriptionKey = this.configService
      .get<string>('AZURE_SPEECH_KEY')
      ?.trim();
    if (!subscriptionKey) {
      throw new ServiceUnavailableException('AZURE_SPEECH_NOT_CONFIGURED');
    }
    return subscriptionKey;
  }

  private isAzureKoreanVoice(
    this: void,
    value: unknown,
  ): value is AzureVoiceResponse {
    if (!value || typeof value !== 'object') return false;
    const voice = value as Partial<AzureVoiceResponse>;
    return (
      voice.Locale === 'ko-KR' &&
      typeof voice.ShortName === 'string' &&
      (voice.Gender === 'Female' || voice.Gender === 'Male')
    );
  }

  private buildSsml(
    text: string,
    language: SpeechLanguage,
    rate: number,
    voice: string,
  ) {
    const ratePercent = Math.round((rate - 1) * 100);
    const rateValue = `${ratePercent >= 0 ? '+' : ''}${ratePercent}%`;
    return [
      `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${language}">`,
      `<voice name="${this.escapeXml(voice)}"><prosody rate="${rateValue}">`,
      this.escapeXml(text),
      '</prosody></voice></speak>',
    ].join('');
  }

  private escapeXml(value: string) {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');
  }
}
