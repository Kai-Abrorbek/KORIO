import type { TutorDelivery, TutorReaction } from '../voice-tutor.types';

const AUDIO_TAGS: Partial<Record<TutorDelivery, string>> = {
  shout: '[shouts]',
  whisper: '[whispers]',
  laugh: '[laughs]',
  dramatic: '[dramatic]',
};

function v3AudioTag(reaction?: TutorReaction): string | undefined {
  if (!reaction) return undefined;
  const explicit = AUDIO_TAGS[reaction.delivery];
  if (explicit) return explicit;
  if (reaction.emotion === 'laughing') return '[laughs]';
  if (
    (reaction.emotion === 'shocked' || reaction.emotion === 'disbelief') &&
    reaction.intensity >= 0.75
  ) {
    return '[shouts]';
  }
  return undefined;
}

/** Eleven v3 and v4 (incl. Turbo) read inline audio tags; v2 models do not. */
export function supportsAudioTags(model: string): boolean {
  return model.startsWith('eleven_v3') || model.startsWith('eleven_v4');
}

/**
 * Chat-style laughter is a subtitle notation, not something to pronounce.
 * "ㅋㅋㅋㅋ" read aloud is "크크크크" — exactly the flat reading the old tutor had.
 * Runs of ㅋ/ㅎ become a real laugh; crying marks (ㅠㅠ, ㅜㅜ) are dropped.
 * Spelled-out laughter such as "AHAHAHA" or "하하하" is left alone: the voice
 * performs that as written, the way the reference tutor does.
 */
export function performLaughNotation(text: string, tags: boolean): string {
  return text
    .replace(/[ㅋㅎ]{2,}/g, tags ? ' [laughs] ' : ' ')
    .replace(/[ㅠㅜ]{2,}/g, ' ')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
}

/** Maps neutral reaction metadata to the configured provider model, not the lesson prompt. */
export function elevenLabsPerformance(
  text: string,
  model: string,
  reaction?: TutorReaction,
) {
  const clean = text
    .replace(
      /\[(?:shouting|shouts|laughing|laughs|whispering|whispers|dramatic)\]/gi,
      '',
    )
    .trim()
    .slice(0, 1500);
  const intensity = Math.min(1, Math.max(0, reaction?.intensity ?? 0));
  if (supportsAudioTags(model)) {
    const tag = v3AudioTag(reaction);
    const spoken = performLaughNotation(clean, true);
    return {
      text: tag ? `${tag} ${spoken}` : spoken,
      voice_settings: undefined,
    };
  }
  // Audio tags are v3/v4-only. Multilingual v2 uses restrained voice settings so
  // the chosen identity and Korean pronunciation remain stable across languages.
  return {
    text: performLaughNotation(clean, false),
    voice_settings: {
      stability: Number((0.58 - intensity * 0.18).toFixed(2)),
      similarity_boost: 0.8,
      style: Number((intensity * 0.22).toFixed(2)),
      use_speaker_boost: true,
    },
  };
}
