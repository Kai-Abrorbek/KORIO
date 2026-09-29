import type { ExplanationLanguage, SpeechStyle } from './voice-tutor.config';
import type { TutorPersonality } from './personality/voice-tutor-personalities';

export interface TutorSettings {
  voiceId: string;
  speechStyle: SpeechStyle;
  explanationLanguage: ExplanationLanguage;
  koreanLevel: string;
  personality: TutorPersonality;
  characterId: 'female_01' | 'male_01';
}

export interface TutorPlan {
  lessonGoal: string;
  reviewTopics: string[];
  newTopics: string[];
  targetVocabulary: string[];
  grammarFocus: string[];
  conversationScenario: string;
  difficulty: string;
  /**
   * 이번 수업을 몇 단계로 깊게 가는지. 없으면 lessonCurriculum() 이 계획에서
   * 기본 단계를 만든다. 주제 수업은 planForTopic() 이 채운다.
   */
  curriculum?: string[];
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
