import type {
  ExplanationLanguage,
  SpeechStyle,
  TutorTargetLanguage,
} from './voice-tutor.config';
import type { TutorPersonality } from './personality/voice-tutor-personalities';

export interface TutorSettings {
  voiceId: string;
  speechStyle: SpeechStyle;
  explanationLanguage: ExplanationLanguage;
  /** Level in the language being learned (kept as koreanLevel on the wire). */
  koreanLevel: string;
  personality: TutorPersonality;
  characterId: 'female_01' | 'male_01';
  /** Language being learned; absent on sessions saved before the English tutor. */
  targetLanguage?: TutorTargetLanguage;
}

export interface TutorPlan {
  lessonGoal: string;
  reviewTopics: string[];
  newTopics: string[];
  targetVocabulary: string[];
  grammarFocus: string[];
  conversationScenario: string;
  difficulty: string;
  /** Legacy saved plans may contain stages; teaching no longer follows a fixed timetable. */
  curriculum?: string[];
  /** The conversation topic the learner picked for this lesson, if any. */
  topic?: string;
}

export interface TutorProgress {
  grammarMistakes: string[];
  repeatedMistakes: string[];
  learnedVocabulary: string[];
  weakVocabulary: string[];
  strongPoints: string[];
  weakPoints: string[];
  estimatedLevel: string;
  notes: string;
}

export interface TutorMessage {
  id: string;
  role: 'user' | 'teacher';
  text: string;
  displayText?: string;
  speechText?: string;
  emotion?: TutorEmotion;
  delivery?: TutorDelivery;
  intensity?: number;
  correction?: TutorCorrection;
  gesture?: TutorGesture;
  language: string;
  audioUrl?: string | null;
  timestamp: Date;
}

export type TutorEmotion =
  | 'neutral'
  | 'happy'
  | 'laughing'
  | 'shocked'
  | 'angry'
  | 'mocking'
  | 'disbelief'
  | 'excited'
  | 'explaining';
export type TutorDelivery =
  | 'normal'
  | 'shout'
  | 'whisper'
  | 'laugh'
  | 'dramatic';
export type TutorGesture =
  | 'none'
  | 'hand_raise_1'
  | 'hand_raise_2'
  | 'hand_raise_3'
  | 'both_explain_1'
  | 'both_explain_2'
  | 'both_compare';

export interface TutorCorrection {
  wrong?: string;
  correct?: string;
  explanation?: string;
}

export interface TutorReaction {
  displayText: string;
  speechText: string;
  emotion: TutorEmotion;
  delivery: TutorDelivery;
  intensity: number;
  correction?: TutorCorrection;
  gesture?: TutorGesture;
  language: string;
  /** 이번 턴에 처음 가르친 한국어 (단어·표현·문법). 같은 걸 또 "새로" 가르치지 않게 쌓는다 */
  taught?: string[];
}
