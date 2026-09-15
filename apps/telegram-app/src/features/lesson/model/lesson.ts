export type QuestionType =
  | "sentence_builder"
  | "translate_builder"
  | "word_arrange"
  | "fill_in_blank"
  | "word_matching"
  | "speaking"
  | "image_choice"
  | "dialog_complete"
  | "type_answer"
  | "listening"
  | "translate_type"
  | "listen_type"
  | "audio_match"
  | "listen_fill"
  | "grammar_blank"
  | "grammar_build"
  | "reply_builder"
  | "reading_quiz"
  | "error_hunt"
  | "cloze_passage"
  | "dialog_order"
  | "verb_transform";

export type AnswerState = "idle" | "correct" | "wrong";

export interface LessonQuestion {
  acceptedAnswers?: string[];
  answer: string;
  answerTranslation?: string;
  audioText?: string;
  audioUrl?: string;
  blankAnswers?: string[];
  buildRows?: {
    correct: string;
    glue?: boolean;
    hints?: Record<string, string>;
    options: string[];
  }[];
  choices?: {
    emoji?: string;
    imageUrl?: string;
    label: string;
    text: string;
  }[];
  dialogLines?: { speaker: "npc" | "user"; text: string }[];
  explanation?: string;
  hint?: string;
  id: string;
  imageUrl?: string;
  level: string;
  npcText?: string;
  options?: string[];
  pairs?: { korean: string; native: string }[];
  passage?: string;
  passageTitle?: string;
  question: string;
  sentencePrefix?: string;
  sentenceSuffix?: string;
  sentenceTemplate?: string;
  smartGradingEnabled?: boolean;
  sourceText?: string;
  tags?: string[];
  targetForm?: string;
  type: QuestionType;
  wrongWord?: string;
  xpReward: number;
  baseWord?: string;
}

export interface LessonSession {
  attemptId?: string | null;
  category: string;
  lessonId: string;
  lessonTitle: string;
  questions: LessonQuestion[];
  totalXp: number;
}

export interface ReportedAnswer {
  durationMs?: number;
  index: number;
  isCorrect: boolean;
  questionId: string;
  questionType?: string;
  skipped?: boolean;
}

export interface AnswerGradeResult {
  correction?: string;
  feedback: string;
  isCorrect: boolean;
  result: "correct" | "almost" | "meaning_correct" | "target_missing" | "incorrect";
  source: "rule" | "ai" | "fallback";
  title: string;
}

export interface CompleteLessonResult {
  chest: { gems: number; grade: "wood" | "silver" | "gold" } | null;
  dailyStreak: {
    longest: number;
    streak: number;
    week: { date: string; studied: boolean; isToday: boolean; future: boolean }[];
  } | null;
  energy: number;
  gems: number;
  success: boolean;
  totalXP: number;
  unitCompleted: { score: number; section: number; unit: number } | null;
  xpEarned: number;
}

export type LessonPhase = "main" | "review";

export interface LessonQueueItem {
  instanceId: string;
  question: LessonQuestion;
  retry: boolean;
}

const PUNCTUATION = /[.,!?~"'`·…“”‘’]/g;

export function normalizeAnswer(value: string): string {
  return (value ?? "")
    .normalize("NFC")
    .toLowerCase()
    .replace(PUNCTUATION, "")
    .replace(/\s+/g, "")
    .trim();
}

export function isAnswerCorrect(value: string, question: LessonQuestion): boolean {
  if (
    question.type === "word_matching" ||
    question.type === "audio_match" ||
    question.type === "dialog_order" ||
    question.type === "speaking"
  ) {
    return value === "all_correct";
  }

  const answer =
    question.type === "cloze_passage" && question.blankAnswers?.length
      ? question.blankAnswers.join("|")
      : question.blankAnswers?.length
        ? fillQuestionTemplate(question, question.blankAnswers)
        : question.answer;
  const received = normalizeAnswer(value);
  if (!received) return false;
  return [answer, ...(question.acceptedAnswers ?? [])].some(
    (candidate) => normalizeAnswer(candidate ?? "") === received,
  );
}

export function questionTemplate(question: LessonQuestion): string {
  if (question.sentenceTemplate?.trim()) return question.sentenceTemplate;
  if (question.sentencePrefix || question.sentenceSuffix) {
    return `${question.sentencePrefix ?? ""}___${question.sentenceSuffix ?? ""}`;
  }
  return "___";
}

export function fillQuestionTemplate(
  question: LessonQuestion,
  values: readonly string[],
): string {
  let index = 0;
  return questionTemplate(question)
    .replace(/_{3,}/g, () => values[index++] ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

export function joinBuildRows(
  rows: NonNullable<LessonQuestion["buildRows"]>,
  values: readonly string[],
): string {
  return values.reduce(
    (result, value, index) =>
      index === 0 || rows[index]?.glue ? result + value : `${result} ${value}`,
    "",
  );
}

export function stableShuffle<T>(items: readonly T[], seedText: string): T[] {
  let seed = 2166136261;
  for (const character of seedText) {
    seed ^= character.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    seed = Math.imul(seed ^ (seed >>> 15), 2246822519);
    const target = Math.abs(seed) % (index + 1);
    [result[index], result[target]] = [result[target] as T, result[index] as T];
  }
  return result;
}

export function backToLearning(category?: string | null, from?: string | null): string {
  if (from === "studyPath") return "/study-path";
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return `/roadmap${query}`;
}
