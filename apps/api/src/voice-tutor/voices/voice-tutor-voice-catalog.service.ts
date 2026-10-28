import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  configuredVoiceIds,
  setElevenLabsVoiceCatalog,
  type ElevenLabsVoiceInfo,
} from '../voice-tutor.config';

const API = 'https://api.elevenlabs.io';
const REFRESH_MS = 30 * 60 * 1000;
const FIRST_LOAD_WAIT_MS = 5_000;
const MAX_PAGES = 5;

/** Label keys worth showing on a voice card, most telling first. */
const TRAIT_LABELS = [
  'descriptive',
  'description',
  'use_case',
  'age',
  'accent',
];

const label = (value: unknown) =>
  typeof value === 'string' && value.trim()
    ? value.trim().replace(/_/g, ' ').slice(0, 24)
    : undefined;

function parseVoice(item: unknown): ElevenLabsVoiceInfo | null {
  if (!item || typeof item !== 'object') return null;
  const voice = item as Record<string, unknown>;
  if (
    typeof voice.voice_id !== 'string' ||
    !/^[\w-]{8,100}$/.test(voice.voice_id) ||
    typeof voice.name !== 'string' ||
    !voice.name.trim()
  )
    return null;
  const labels =
    voice.labels && typeof voice.labels === 'object'
      ? (voice.labels as Record<string, unknown>)
      : {};
  const tags = [
    ...new Set(TRAIT_LABELS.flatMap((key) => label(labels[key]) ?? [])),
  ].slice(0, 3);
  // Account voices carry marketing paragraphs; the card has room for a line.
  const description =
    typeof voice.description === 'string' && voice.description.trim()
      ? voice.description
          .trim()
          .split(/(?<=[.!?])\s/)[0]
          .slice(0, 120)
      : undefined;
  return {
    providerVoiceId: voice.voice_id,
    // "Jessica - Playful, Bright, Warm" → the name; the rest is already in labels.
    name: voice.name
      .split(/\s+[-–|]\s+/)[0]
      .trim()
      .slice(0, 40),
    category: typeof voice.category === 'string' ? voice.category : undefined,
    gender: label(labels.gender),
    description,
    tags,
    previewUrl:
      typeof voice.preview_url === 'string' &&
      voice.preview_url.startsWith('https://')
        ? voice.preview_url
        : undefined,
  };
}

/** The `voices` array of an ElevenLabs voice list response (v1 or v2). */
export function parseElevenLabsVoices(body: unknown): ElevenLabsVoiceInfo[] {
  const voices =
    body && typeof body === 'object'
      ? (body as { voices?: unknown }).voices
      : undefined;
  return Array.isArray(voices)
    ? voices.flatMap((item) => parseVoice(item) ?? [])
    : [];
}

/**
 * Keeps the voice list in step with the ElevenLabs account, so a voice is added
 * or renamed in ElevenLabs rather than in a deployment. Refreshed in the
 * background; voiceTutorVoices() stays synchronous and falls back to the
 * configured IDs while ElevenLabs is unreachable.
 */
@Injectable()
export class VoiceTutorVoiceCatalogService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(VoiceTutorVoiceCatalogService.name);
  private timer?: NodeJS.Timeout;

  async onModuleInit() {
    // A slow ElevenLabs must not hold up boot; the refresh keeps going.
    let waited: NodeJS.Timeout | undefined;
    await Promise.race([
      this.refresh(),
      new Promise<void>((resolve) => {
        waited = setTimeout(resolve, FIRST_LOAD_WAIT_MS);
        waited.unref?.();
      }),
    ]);
    clearTimeout(waited);
    this.timer = setInterval(() => void this.refresh(), REFRESH_MS);
    this.timer.unref?.();
  }

  onModuleDestroy() {
    clearInterval(this.timer);
  }

  async refresh(): Promise<void> {
    const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
    if (!apiKey) return;
    try {
      const voices = await this.list(apiKey);
      const listed = new Set(voices.map((voice) => voice.providerVoiceId));
      // Stock voices can be missing from the account list; describe them one by one.
      for (const id of configuredVoiceIds()
        .filter((id) => !listed.has(id))
        .slice(0, 20)) {
        const voice = await this.one(apiKey, id).catch(() => null);
        if (voice) voices.push(voice);
      }
      setElevenLabsVoiceCatalog(voices);
      this.logger.log(`ElevenLabs voice catalog: ${voices.length} voices`);
    } catch (error) {
      // Keep the last good catalog; the configured IDs still work for speech.
      this.logger.warn(
        `ElevenLabs voice catalog unavailable: ${(error as Error).message}`,
      );
    }
  }

  private request(apiKey: string, url: URL | string) {
    return fetch(url, {
      headers: { 'xi-api-key': apiKey },
      signal: AbortSignal.timeout(10_000),
    });
  }

  /** v2 is paginated; v1 is the legacy whole-list route, kept as a fallback. */
  private async list(apiKey: string): Promise<ElevenLabsVoiceInfo[]> {
    const voices: ElevenLabsVoiceInfo[] = [];
    let token: string | undefined;
    for (let page = 0; page < MAX_PAGES; page++) {
      const url = new URL('/v2/voices', API);
      url.searchParams.set('page_size', '100');
      if (token) url.searchParams.set('next_page_token', token);
      const response = await this.request(apiKey, url);
      if (!response.ok) {
        if (page > 0) break;
        return this.listLegacy(apiKey);
      }
      const body = (await response.json()) as {
        has_more?: unknown;
        next_page_token?: unknown;
      };
      voices.push(...parseElevenLabsVoices(body));
      if (body.has_more !== true || typeof body.next_page_token !== 'string')
        break;
      token = body.next_page_token;
    }
    return voices;
  }

  private async listLegacy(apiKey: string): Promise<ElevenLabsVoiceInfo[]> {
    const response = await this.request(apiKey, `${API}/v1/voices`);
    if (!response.ok) {
      const body = await response.text().catch(() => '');
      // A key restricted to text-to-speech is the usual cause: say which switch.
      throw new Error(
        /missing the permission voices_read/.test(body)
          ? 'the ElevenLabs key lacks the "Voices: Read" permission (ElevenLabs → Developers → API Keys); configured voices still speak, without names or traits'
          : `HTTP ${response.status}`,
      );
    }
    return parseElevenLabsVoices(await response.json());
  }

  private async one(
    apiKey: string,
    id: string,
  ): Promise<ElevenLabsVoiceInfo | null> {
    const response = await this.request(
      apiKey,
      `${API}/v1/voices/${encodeURIComponent(id)}`,
    );
    if (!response.ok) return null;
    return (
      parseElevenLabsVoices({ voices: [await response.json()] })[0] ?? null
    );
  }
}
