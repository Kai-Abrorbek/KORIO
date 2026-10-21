export interface LocalizedText {
  ko: string;
  uz: string;
  en: string;
  ru: string;
}

export interface EnglishGrammarDrill {
  /** 정답 자리를 정확히 하나의 ___ 로 표시한다. */
  template: string;
  answer: string;
  translation: LocalizedText;
  /** 각 행은 [정답, 자연스러운 오답 1, 자연스러운 오답 2]다. */
  rows: readonly (readonly [string, string, string])[];
  /** 빈칸·페이지 퀴즈 보기. 생략하면 answer 가 들어 있는 rows 행을 쓴다. */
  blankOptions?: readonly [string, string, string];
  /** 빈칸에 넣을 수 있는 다른 정답. 문장 조립 정답은 helper가 완성 문장으로 바꾼다. */
  acceptedAnswers?: readonly string[];
}

export interface EnglishGrammarDialogue {
  speaker: string;
  side: 'left' | 'right';
  text: string;
  gloss: LocalizedText;
  highlight?: string;
}

export interface EnglishGrammarSpec {
  sourceUnit: number;
  code: string;
  pattern: string;
  summary: LocalizedText;
  categoryTag: LocalizedText;
  explanation: LocalizedText;
  rule: LocalizedText;
  forms: readonly { base: string; result: string }[];
  drills: readonly EnglishGrammarDrill[];
  dialogue: readonly EnglishGrammarDialogue[];
  cautions: readonly LocalizedText[];
  similar?: { pattern: string; note: LocalizedText };
}

export interface EnglishGrammarUnit {
  section: number;
  unit: number;
  title: LocalizedText;
  description: LocalizedText;
  level: '1' | '2' | '3' | '4' | '5' | '6';
  specs: readonly EnglishGrammarSpec[];
}

export interface GrammarTrackLessonSeed {
  title: LocalizedText;
  description: LocalizedText;
  category: 'grammar';
  level: EnglishGrammarUnit['level'];
  order: number;
  grammarCode: string;
  questions: string[];
  courseId: string;
  targetLanguage: string;
}

export interface EnglishGrammarPageSeed {
  courseId: 'en-general';
  targetLanguage: 'en';
  sourceUnit: number;
  code: string;
  pattern: string;
  section: number;
  unit: number;
  order: number;
  isActive: boolean;
  summary: LocalizedText;
  tags: LocalizedText[];
  explanation: LocalizedText;
  conjugationRule: LocalizedText;
  conjugations: readonly { base: string; result: string }[];
  examples: {
    text: string;
    gloss: LocalizedText;
    highlight: string;
  }[];
  dialogue: readonly EnglishGrammarDialogue[];
  similar?: { pattern: string; note: LocalizedText };
  cautions: readonly LocalizedText[];
  quiz: {
    prompt: string;
    options: { text: string; correct: boolean }[];
  }[];
}

interface EnglishGrammarQuestionBase {
  courseId: 'en-general';
  targetLanguage: 'en';
  level: EnglishGrammarUnit['level'];
  lessonCategory: 'grammar';
  instruction: LocalizedText;
  answer: string;
  answerTranslation: LocalizedText;
  hint: LocalizedText;
  explanation: LocalizedText;
  tags: string[];
  acceptedAnswers: string[];
}

export interface EnglishGrammarBlankQuestion extends EnglishGrammarQuestionBase {
  type: 'grammar_blank';
  sentencePrefix: string;
  sentenceSuffix: string;
}

export interface EnglishGrammarBuildQuestion extends EnglishGrammarQuestionBase {
  type: 'grammar_build';
  buildRows: { options: string[]; correct: string }[];
}

export type EnglishGrammarTrackQuestion =
  | EnglishGrammarBlankQuestion
  | EnglishGrammarBuildQuestion;

export interface EnglishGrammarNodeSeed {
  courseId: 'en-general';
  targetLanguage: 'en';
  code: string;
  title: LocalizedText;
  description: LocalizedText;
  section: number;
  unit: number;
  order: number;
  category: 'grammar';
  isActive: boolean;
  lessons: GrammarTrackLessonSeed[];
}
