import type { Section5LocalizedText } from '../grammar/section5.types';

export interface Section5BuildPractice {
  /** 완성된 한국어 문장. 같은 문법의 빈칸 문장과 겹치면 안 된다. */
  ko: string;
  /** 한 어절 안에 한 번만 나타나는 핵심 문법 형태. */
  target: string;
  /** target을 바꿔 넣을 자연스러운 오답 두 개. */
  distractors: readonly [string, string];
  translations: Omit<Section5LocalizedText, 'ko'>;
}

export interface Section5GrammarTrackDefinition {
  grammarCode: string;
  builds: readonly Section5BuildPractice[];
}

export interface Section5BuildRow {
  options: string[];
  correct: string;
}

interface Section5TrackQuestionBase {
  level: '5' | '6';
  lessonCategory: 'grammar';
  instruction: Section5LocalizedText;
  answer: string;
  answerTranslation: Section5LocalizedText;
  hint: Section5LocalizedText;
  explanation: Section5LocalizedText;
  tags: string[];
  acceptedAnswers: string[];
}

export interface Section5BlankQuestion extends Section5TrackQuestionBase {
  type: 'grammar_blank';
  sentencePrefix: string;
  sentenceSuffix: string;
  sentenceTemplate?: string;
  blankAnswers?: string[];
}

export interface Section5BuildQuestion extends Section5TrackQuestionBase {
  type: 'grammar_build';
  buildRows: Section5BuildRow[];
}

export type Section5TrackQuestion =
  | Section5BlankQuestion
  | Section5BuildQuestion;

export interface Section5TrackLesson {
  title: Section5LocalizedText;
  description: Section5LocalizedText;
  category: 'grammar';
  level: '5' | '6';
  order: number;
  grammarCode: string;
  questions: string[];
}

export interface Section5TrackNode {
  code: string;
  title: Section5LocalizedText;
  description: Section5LocalizedText;
  section: 5 | 6;
  unit: number;
  order: number;
  category: 'grammar';
  isActive: true;
  lessons: Section5TrackLesson[];
}
