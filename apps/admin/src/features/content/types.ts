export const LANGUAGES = ["ko", "uz", "en", "ru"] as const;
export type Language = (typeof LANGUAGES)[number];
export type LocalizedText = Record<Language, string>;

export const QUESTION_TYPES = [
  "sentence_builder", "translate_builder", "word_arrange", "speaking",
  "image_choice", "dialog_complete", "type_answer", "word_matching",
  "listening", "fill_in_blank", "listen_type", "listen_fill",
  "translate_type", "audio_match", "grammar_blank", "grammar_build",
  "reply_builder", "reading_quiz", "error_hunt", "cloze_passage",
  "dialog_order", "verb_transform",
] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];

export interface ContentNode {
  id: string;
  code: string;
  section: number;
  unit: number;
  order: number;
  title: LocalizedText;
  nodeType: "lesson" | "chest" | "boss";
  category?: "vocabulary" | "grammar" | "expression" | "conversation" | "listening" | "topik";
  isActive: boolean;
}

export interface ContentLesson {
  id: string;
  code: string;
  nodeId: string;
  title: LocalizedText;
  description: LocalizedText;
  category: NonNullable<ContentNode["category"]>;
  level: "1" | "2" | "3" | "4" | "5" | "6";
  section: number;
  unit: number;
  order: number;
  grammarCode?: string;
  xpReward: number;
  isActive: boolean;
}

export interface QuestionChoice { text: string; label: string; emoji: string; imageUrl: string }
export interface QuestionDraft {
  id: string;
  code: string;
  lessonId: string;
  order: number;
  type: QuestionType;
  level: ContentLesson["level"];
  lessonCategory: ContentLesson["category"];
  instruction: LocalizedText;
  npcText: string;
  npcTextI18n: LocalizedText;
  sentencePrefix: string;
  sentenceSuffix: string;
  options: string[];
  optionsI18n: Record<Language, string[]>;
  choices: QuestionChoice[];
  answer: string;
  answerI18n: LocalizedText;
  answerTranslation: LocalizedText;
  hint: LocalizedText;
  explanation: LocalizedText;
  sentenceTemplate: string;
  blankAnswers: string[];
  acceptedAnswers: string[];
  dialogLines: { speaker: "npc" | "user"; text: string }[];
  pairs: { korean: string; native: string }[];
  grading?: { mode: "exact" | "semantic" | "targetExpression"; expectedMeaning: string; targetExpressions: string[]; acceptedAnswers: string[] };
  buildRows: { options: string[]; correct: string; glue?: boolean }[];
  audioText: string;
  audioUrl: string;
  imageUrl: string;
  passage: string;
  passageTitle: string;
  wrongWord: string;
  baseWord: string;
  targetForm: string;
  difficulty: number;
  tags: string[];
  xpReward: number;
  isActive: boolean;
  metrics: { attempts: number; correctRate: number; skipRate: number; avgDurationMs: number; dropOffRate: number };
}

export interface GrammarItem {
  kind: "grammar";
  id: string;
  code: string;
  pattern: string;
  summary: LocalizedText;
  explanation: LocalizedText;
  section: number;
  unit: number;
  order: number;
  isActive: boolean;
}
export interface ExpressionItem {
  kind: "expression";
  id: string;
  code: string;
  packCode: string;
  nodeCode: string;
  korean: string;
  meaning: LocalizedText;
  context: LocalizedText;
  section: number;
  unit: number;
  order: number;
  isActive: boolean;
}
export interface HangulItem {
  kind: "hangul";
  id: string;
  char: string;
  name: string;
  romanization: string;
  category: "consonant" | "vowel";
  examples: { word: string; romanization: string }[];
}
export type LibraryItem = GrammarItem | ExpressionItem | HangulItem;

export interface ContentSnapshot {
  nodes: ContentNode[];
  lessons: ContentLesson[];
  questions: QuestionDraft[];
  library: LibraryItem[];
}

/** Matches the future API boundary; the mock repository is the only implementation today. */
export interface ContentRepository {
  load(): Promise<ContentSnapshot>;
  saveLesson(lesson: ContentLesson): Promise<ContentSnapshot>;
  deleteLesson(id: string): Promise<ContentSnapshot>;
  reorderLesson(id: string, targetId: string): Promise<ContentSnapshot>;
  saveQuestion(question: QuestionDraft): Promise<ContentSnapshot>;
  deleteQuestion(id: string): Promise<ContentSnapshot>;
  reorderQuestion(id: string, targetId: string): Promise<ContentSnapshot>;
  saveLibraryItem(item: LibraryItem): Promise<ContentSnapshot>;
}

export const localized = (ko: string, uz = "", en = "", ru = ""): LocalizedText => ({ ko, uz, en, ru });
