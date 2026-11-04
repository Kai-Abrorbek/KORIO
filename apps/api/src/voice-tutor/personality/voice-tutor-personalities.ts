export const VOICE_TUTOR_PERSONALITY_IDS = [
  'friendly',
  'close_friend',
  'savage',
  'chaotic_savage',
] as const;
export type PublicTutorPersonality =
  (typeof VOICE_TUTOR_PERSONALITY_IDS)[number];

export type TutorPersonality = PublicTutorPersonality;

/** Retired or unrecognized saved values use the ordinary friendly tutor. */
export function resolveTutorPersonality(value: unknown): TutorPersonality {
  return VOICE_TUTOR_PERSONALITY_IDS.find((id) => id === value) ?? 'friendly';
}
