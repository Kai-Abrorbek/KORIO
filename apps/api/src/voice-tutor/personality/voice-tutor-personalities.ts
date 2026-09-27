export const VOICE_TUTOR_PERSONALITY_IDS = [
  'friendly',
  'close_friend',
  'savage',
  'chaotic_savage',
] as const;
export type TutorPersonality = (typeof VOICE_TUTOR_PERSONALITY_IDS)[number];

export interface TutorPersonalityConfig {
  id: TutorPersonality;
  name: string;
  swearingLevel: number;
  roastLevel: number;
  jokeFrequency: number;
  reactionIntensity: number;
  emotionalVolatility: number;
  codeSwitchingFrequency: number;
  exaggerationLevel: number;
  vowelElongationLevel: number;
}

export const TUTOR_PERSONALITIES: TutorPersonalityConfig[] = [
  {
    id: 'friendly',
    name: 'Friendly Teacher',
    swearingLevel: 0,
    roastLevel: 0,
    jokeFrequency: 0.1,
    reactionIntensity: 0.25,
    emotionalVolatility: 0.1,
    codeSwitchingFrequency: 0.05,
    exaggerationLevel: 0.1,
    vowelElongationLevel: 0,
  },
  {
    id: 'close_friend',
    name: 'Close Friend',
    swearingLevel: 0,
    roastLevel: 0.2,
    jokeFrequency: 0.4,
    reactionIntensity: 0.45,
    emotionalVolatility: 0.3,
    codeSwitchingFrequency: 0.2,
    exaggerationLevel: 0.25,
    vowelElongationLevel: 0.2,
  },
  {
    id: 'savage',
    name: 'Savage Friend',
    swearingLevel: 0.3,
    roastLevel: 0.65,
    jokeFrequency: 0.6,
    reactionIntensity: 0.7,
    emotionalVolatility: 0.5,
    codeSwitchingFrequency: 0.35,
    exaggerationLevel: 0.55,
    vowelElongationLevel: 0.45,
  },
  {
    id: 'chaotic_savage',
    name: 'Chaotic Savage',
    swearingLevel: 0.75,
    roastLevel: 0.9,
    jokeFrequency: 0.85,
    reactionIntensity: 0.95,
    emotionalVolatility: 0.85,
    codeSwitchingFrequency: 0.7,
    exaggerationLevel: 0.95,
    vowelElongationLevel: 0.9,
  },
];

export function personalityConfig(
  id: TutorPersonality,
): TutorPersonalityConfig {
  return (
    TUTOR_PERSONALITIES.find((item) => item.id === id) ?? TUTOR_PERSONALITIES[0]
  );
}
