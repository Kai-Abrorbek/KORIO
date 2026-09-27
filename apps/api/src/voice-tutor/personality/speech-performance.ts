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
  if (model.startsWith('eleven_v3')) {
    const tag = v3AudioTag(reaction);
    return { text: tag ? `${tag} ${clean}` : clean, voice_settings: undefined };
  }
  // Audio tags are v3-only. Multilingual v2 uses restrained voice settings so
  // the chosen identity and Korean pronunciation remain stable across languages.
  return {
    text: clean,
    voice_settings: {
      stability: Number((0.58 - intensity * 0.18).toFixed(2)),
      similarity_boost: 0.8,
      style: Number((intensity * 0.22).toFixed(2)),
      use_speaker_boost: true,
    },
  };
}
