/**
 * The language the tutor TEACHES IN (Korean is always what is taught).
 * ko = full immersion; en/ru/uz = a tutor who speaks that language and teaches
 * Korean phrases through it. Kept as `explanationLanguage` for stored data.
 */
export type ExplanationLanguage = 'ko' | 'en' | 'ru' | 'uz';
export type SpeechStyle = 'polite' | 'casual';

export interface VoiceTutorVoice {
  id: string;
  name: string;
  providerVoiceId: string;
  gender?: string;
  description?: string;
  /** A sample the operator configured by hand; wins over every other preview. */
  previewUrl?: string;
  /** ElevenLabs' own English sample, used when the server cannot make one. */
  elevenLabsPreviewUrl?: string;
  supportedLanguages?: string[];
  /** Short traits for the voice card ("playful", "young"). */
  tags?: string[];
  /** A comic, expressive voice — the natural match for the roasting tutors. */
  fun?: boolean;
  enabled: boolean;
}

/** What ElevenLabs reports about a voice; loaded by VoiceTutorVoiceCatalogService. */
export interface ElevenLabsVoiceInfo {
  providerVoiceId: string;
  name: string;
  category?: string;
  gender?: string;
  description?: string;
  tags: string[];
  previewUrl?: string;
}

export const VOICE_TUTOR_LANGUAGES = ['en', 'ru', 'uz', 'ko'] as const;

export const TEACHING_LANGUAGE_NAMES: Record<ExplanationLanguage, string> = {
  ko: 'Korean',
  en: 'English',
  ru: 'Russian',
  uz: 'Uzbek',
};
/**
 * The language being LEARNED (the course), a different axis from the teaching
 * language above. Korean keeps the original top-level fields; every other tutor
 * stores its settings and memory under courses.<language>.
 */
export const VOICE_TUTOR_TARGET_LANGUAGES = ['ko', 'en'] as const;
export type TutorTargetLanguage = (typeof VOICE_TUTOR_TARGET_LANGUAGES)[number];

/** Anything missing or unknown is the original Korean tutor. */
export function tutorTargetLanguage(value: unknown): TutorTargetLanguage {
  return value === 'en' ? 'en' : 'ko';
}

export const VOICE_TUTOR_STYLES = ['polite', 'casual'] as const;
export const VOICE_TUTOR_MAX_AUDIO_BYTES = 10 * 1024 * 1024;
export const VOICE_TUTOR_PROGRESS_INTERVAL = 6;
/** ~12 exchanges: short ping-pong turns made 16 messages barely two minutes. */
export const VOICE_TUTOR_RECENT_MESSAGES = 24;

export function tutorLanguageEnabled(language: ExplanationLanguage): boolean {
  return (
    process.env[`VOICE_TUTOR_${language.toUpperCase()}_ENABLED`] !== 'false'
  );
}

let elevenLabsCatalog: ElevenLabsVoiceInfo[] = [];

/** Replaced on every catalog refresh; read synchronously by voiceTutorVoices(). */
export function setElevenLabsVoiceCatalog(voices: ElevenLabsVoiceInfo[]) {
  elevenLabsCatalog = voices;
}

const VOICE_ID = /^[\w-]{1,40}$/;
const PROVIDER_VOICE_ID = /^[\w-]{8,100}$/;
/** Words in a voice's name or labels that mark it as comic. */
const FUN_VOICE =
  /funny|comic|comedy|goofy|quirky|playful|silly|cartoon|cheeky|zany|wacky|hyper/i;

const textField = (value: unknown, max: number) =>
  typeof value === 'string' && value.trim()
    ? value.trim().slice(0, max)
    : undefined;

const httpsUrl = (value: unknown) =>
  typeof value === 'string' && /^https:\/\//.test(value) ? value : undefined;

type ConfiguredVoice = Partial<Omit<VoiceTutorVoice, 'providerVoiceId'>> & {
  providerVoiceId: string;
};

/**
 * Voices the operator listed. Only providerVoiceId is required: name, gender,
 * traits and the sample are filled in from ElevenLabs, so adding a voice is
 * pasting its ID. Provider IDs are deployment configuration, never source defaults.
 */
function configuredVoices(): ConfiguredVoice[] {
  const raw = process.env.VOICE_TUTOR_VOICES_JSON?.trim();
  if (!raw) {
    const fallback = process.env.ELEVENLABS_DEFAULT_VOICE_ID?.trim();
    return fallback && PROVIDER_VOICE_ID.test(fallback)
      ? [{ id: 'default', providerVoiceId: fallback }]
      : [];
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed.flatMap((item): ConfiguredVoice[] => {
    if (!item || typeof item !== 'object') return [];
    const voice = item as Record<string, unknown>;
    const providerVoiceId = voice.providerVoiceId;
    if (
      typeof providerVoiceId !== 'string' ||
      !PROVIDER_VOICE_ID.test(providerVoiceId) ||
      voice.enabled === false
    )
      return [];
    const id = typeof voice.id === 'string' ? voice.id : providerVoiceId;
    if (!VOICE_ID.test(id)) return [];
    return [
      {
        id,
        providerVoiceId,
        name: textField(voice.name, 40),
        gender: textField(voice.gender, 20),
        description: textField(voice.description, 120),
        previewUrl: httpsUrl(voice.previewUrl),
        supportedLanguages: Array.isArray(voice.supportedLanguages)
          ? voice.supportedLanguages.filter(
              (value): value is string => typeof value === 'string',
            )
          : undefined,
        tags: Array.isArray(voice.tags)
          ? voice.tags.flatMap((tag) => textField(tag, 24) ?? []).slice(0, 3)
          : undefined,
        fun: typeof voice.fun === 'boolean' ? voice.fun : undefined,
      },
    ];
  });
}

/** IDs the catalog must describe even if the account list leaves them out. */
export function configuredVoiceIds(): string[] {
  return configuredVoices().map((voice) => voice.providerVoiceId);
}

const looksFun = (
  voice: Pick<VoiceTutorVoice, 'name' | 'description' | 'tags'>,
) =>
  FUN_VOICE.test(
    [voice.name, voice.description, ...(voice.tags ?? [])].join(' '),
  );

/**
 * The voices learners can pick: the configured list, described by ElevenLabs,
 * plus — with VOICE_TUTOR_VOICES_FROM_ELEVENLABS=true — every voice added to the
 * ElevenLabs account ("My Voices") except the stock premade ones, so a new voice
 * is added in ElevenLabs instead of a deployment.
 */
export function voiceTutorVoices(): VoiceTutorVoice[] {
  const described = new Map(
    elevenLabsCatalog.map((voice) => [voice.providerVoiceId, voice]),
  );
  const voices: VoiceTutorVoice[] = configuredVoices().map((voice, index) => {
    const remote = described.get(voice.providerVoiceId);
    const merged = {
      id: voice.id ?? voice.providerVoiceId,
      name:
        voice.name ??
        remote?.name ??
        (voice.id === 'default' ? 'Teacher' : `Teacher ${index + 1}`),
      providerVoiceId: voice.providerVoiceId,
      gender: voice.gender ?? remote?.gender,
      description: voice.description ?? remote?.description,
      previewUrl: voice.previewUrl,
      elevenLabsPreviewUrl: remote?.previewUrl,
      supportedLanguages: voice.supportedLanguages,
      tags: voice.tags ?? remote?.tags ?? [],
      enabled: true,
    };
    return { ...merged, fun: voice.fun ?? looksFun(merged) };
  });
  if (process.env.VOICE_TUTOR_VOICES_FROM_ELEVENLABS?.trim() === 'true') {
    for (const remote of elevenLabsCatalog) {
      if (remote.category === 'premade') continue;
      if (
        voices.some(
          (voice) =>
            voice.providerVoiceId === remote.providerVoiceId ||
            voice.id === remote.providerVoiceId,
        ) ||
        !VOICE_ID.test(remote.providerVoiceId)
      )
        continue;
      const added = {
        id: remote.providerVoiceId,
        name: remote.name,
        providerVoiceId: remote.providerVoiceId,
        gender: remote.gender,
        description: remote.description,
        elevenLabsPreviewUrl: remote.previewUrl,
        tags: remote.tags,
        enabled: true,
      };
      voices.push({ ...added, fun: looksFun(added) });
    }
  }
  return voices;
}

/**
 * What the setup screen plays. A hand-configured sample first; otherwise the
 * server's own clip in the language being learned (ElevenLabs' samples are
 * English); ElevenLabs' sample only when the server cannot make one.
 */
export function voicePreviewUrl(
  voice: VoiceTutorVoice,
  targetLanguage: TutorTargetLanguage,
): string | undefined {
  if (voice.previewUrl) return voice.previewUrl;
  const base = process.env.PUBLIC_API_URL?.trim().replace(/\/+$/, '');
  if (base && process.env.ELEVENLABS_API_KEY?.trim())
    return `${base}/voice-tutor/voices/${encodeURIComponent(voice.id)}/preview?target=${targetLanguage}`;
  return voice.elevenLabsPreviewUrl;
}

/**
 * Expressive ElevenLabs models this tutor can drive. They all accept inline
 * audio tags ([laughs], [shouts]) and keep one voice identity across Korean,
 * English, Russian and Uzbek. Older v2 models are refused on purpose: they
 * drop the tags and flatten the chaotic_savage performance.
 *
 * eleven_v4_turbo is the default because it is built for live conversation
 * (~100ms). If a voice sounds worse on it, set VOICE_TUTOR_TTS_MODEL=eleven_v3.
 */
export const VOICE_TUTOR_TTS_MODELS = [
  'eleven_v4_turbo',
  'eleven_v4',
  'eleven_v3',
] as const;
export const VOICE_TUTOR_DEFAULT_TTS_MODEL = 'eleven_v4_turbo';

function ttsModel(): string {
  const requested = process.env.VOICE_TUTOR_TTS_MODEL?.trim();
  return requested &&
    (VOICE_TUTOR_TTS_MODELS as readonly string[]).includes(requested)
    ? requested
    : VOICE_TUTOR_DEFAULT_TTS_MODEL;
}

/**
 * GPT-5.6 and the GPT-6 family reason before answering unless told not to. The
 * reasoning counts against the small live-turn token budget, so the tutor runs
 * them with reasoning off by default. VOICE_TUTOR_REASONING_EFFORT=low trades
 * some latency for sharper comebacks; the provider adds token headroom for it.
 */
export const VOICE_TUTOR_REASONING_EFFORTS = ['none', 'low', 'medium'] as const;
export type VoiceTutorReasoningEffort =
  (typeof VOICE_TUTOR_REASONING_EFFORTS)[number];

export function isReasoningTutorModel(model: string): boolean {
  return /^gpt-(5\.6|6)(?:[.-]|$)/.test(model);
}

export function voiceTutorReasoningEffort(): VoiceTutorReasoningEffort {
  const requested = process.env.VOICE_TUTOR_REASONING_EFFORT?.trim();
  return (VOICE_TUTOR_REASONING_EFFORTS as readonly string[]).includes(
    requested ?? '',
  )
    ? (requested as VoiceTutorReasoningEffort)
    : 'none';
}

/**
 * Fallbacks when the env leaves a model unset. gpt-4o-mini used to be the
 * default and could not hold the savage characters; GPT-5.6 Terra/Luna are the
 * models the deployment examples already run.
 */
export const voiceTutorModels = () => ({
  lesson: process.env.VOICE_TUTOR_LESSON_MODEL?.trim() || 'gpt-5.6-terra',
  progress: process.env.VOICE_TUTOR_PROGRESS_MODEL?.trim() || 'gpt-5.6-luna',
  planning: process.env.VOICE_TUTOR_PLANNING_MODEL?.trim() || 'gpt-5.6-terra',
  stt: process.env.VOICE_TUTOR_STT_MODEL?.trim() || 'gpt-4o-mini-transcribe',
  tts: ttsModel(),
});
