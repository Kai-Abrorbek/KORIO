export const VOICE_TUTOR_PERSONALITY_IDS = [
  'friendly',
  'close_friend',
  'savage',
  'chaotic_savage',
] as const;
export type TutorPersonality = (typeof VOICE_TUTOR_PERSONALITY_IDS)[number];
