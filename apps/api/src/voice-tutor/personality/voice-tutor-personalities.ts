export const VOICE_TUTOR_PERSONALITY_IDS = [
  'friendly',
  'close_friend',
  'savage',
  'chaotic_savage',
] as const;
export type PublicTutorPersonality =
  (typeof VOICE_TUTOR_PERSONALITY_IDS)[number];

/**
 * 촬영용 — 모델 대신 script/filming-script.ts 의 대사를 한 줄씩 그대로 말한다.
 * super_admin 계정에만 보이고 고를 수 있다 (canUseScriptedTutor).
 */
export const SCRIPTED_PERSONALITY = 'scripted' as const;
export const VOICE_TUTOR_ALL_PERSONALITY_IDS = [
  ...VOICE_TUTOR_PERSONALITY_IDS,
  SCRIPTED_PERSONALITY,
] as const;
export type TutorPersonality = (typeof VOICE_TUTOR_ALL_PERSONALITY_IDS)[number];

export function canUseScriptedTutor(user?: {
  adminRole?: string | null;
}): boolean {
  return user?.adminRole === 'super_admin';
}
