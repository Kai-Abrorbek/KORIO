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
  previewUrl?: string;
  supportedLanguages?: string[];
  enabled: boolean;
}

export const VOICE_TUTOR_LANGUAGES = ['en', 'ru', 'uz', 'ko'] as const;

export const TEACHING_LANGUAGE_NAMES: Record<ExplanationLanguage, string> = {
  ko: 'Korean',
  en: 'English',
  ru: 'Russian',
  uz: 'Uzbek',
};
export const VOICE_TUTOR_STYLES = ['polite', 'casual'] as const;
export const VOICE_TUTOR_MAX_AUDIO_BYTES = 10 * 1024 * 1024;
export const VOICE_TUTOR_PROGRESS_INTERVAL = 6;
export const VOICE_TUTOR_RECENT_MESSAGES = 12;

export function tutorLanguageEnabled(language: ExplanationLanguage): boolean {
  return (
    process.env[`VOICE_TUTOR_${language.toUpperCase()}_ENABLED`] !== 'false'
  );
}

/** Provider IDs and public voice metadata are deployment configuration, never source defaults. */
export function voiceTutorVoices(): VoiceTutorVoice[] {
  const raw = process.env.VOICE_TUTOR_VOICES_JSON?.trim();
  let parsed: unknown = [];
  if (raw) {
    try {
      parsed = JSON.parse(raw);
    } catch {
      return [];
    }
  } else if (process.env.ELEVENLABS_DEFAULT_VOICE_ID?.trim()) {
    parsed = [
      {
        id: 'default',
        name: 'Teacher',
        providerVoiceId: process.env.ELEVENLABS_DEFAULT_VOICE_ID.trim(),
        enabled: true,
      },
    ];
  }
  if (!Array.isArray(parsed)) return [];
  return parsed
    .filter((item): item is VoiceTutorVoice => {
      if (!item || typeof item !== 'object') return false;
      const voice = item as Record<string, unknown>;
      return (
        typeof voice.id === 'string' &&
        /^[\w-]{1,40}$/.test(voice.id) &&
        typeof voice.name === 'string' &&
        voice.name.length > 0 &&
        typeof voice.providerVoiceId === 'string' &&
        /^[\w-]{8,100}$/.test(voice.providerVoiceId) &&
        voice.enabled !== false
      );
    })
    .map((voice) => ({
      id: voice.id,
      name: voice.name,
      providerVoiceId: voice.providerVoiceId,
      gender: typeof voice.gender === 'string' ? voice.gender : undefined,
      description:
        typeof voice.description === 'string' ? voice.description : undefined,
      previewUrl:
        typeof voice.previewUrl === 'string' ? voice.previewUrl : undefined,
      supportedLanguages: Array.isArray(voice.supportedLanguages)
        ? voice.supportedLanguages.filter(
            (value): value is string => typeof value === 'string',
          )
        : undefined,
      enabled: true,
    }));
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

export const voiceTutorModels = () => ({
  lesson: process.env.VOICE_TUTOR_LESSON_MODEL?.trim() || 'gpt-4o-mini',
  progress: process.env.VOICE_TUTOR_PROGRESS_MODEL?.trim() || 'gpt-4o-mini',
  planning: process.env.VOICE_TUTOR_PLANNING_MODEL?.trim() || 'gpt-4o-mini',
  stt: process.env.VOICE_TUTOR_STT_MODEL?.trim() || 'gpt-4o-mini-transcribe',
  tts: ttsModel(),
});
