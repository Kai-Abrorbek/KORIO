export type TopikLanguage = "ko" | "uz" | "en" | "ru";

export interface TopikI18nText {
  ko: string;
  uz: string;
  en: string;
  ru: string;
}

export type TopikAttemptMode = "practice" | "guided" | "mock_exam";
export type TopikAttemptStatus = "in_progress" | "submitted" | "abandoned";
export type TopikChoiceLayout =
  | "one_column"
  | "two_columns"
  | "four_columns";
export type TopikQuestionType =
  | "grammar_fill_blank"
  | "underlined_meaning"
  | "practical_text_topic"
  | "passage_content_match"
  | "sentence_ordering"
  | "passage_fill_blank"
  | "passage_topic"
  | "author_emotion"
  | "headline_interpretation"
  | "sentence_insertion"
  | "author_attitude"
  | "author_purpose";
export type TopikStimulusKind =
  | "none"
  | "passage"
  | "advertisement"
  | "notice"
  | "info_card"
  | "chart"
  | "headline"
  | "sentence_set";
export type TopikTextSegmentType =
  | "text"
  | "blank"
  | "underline"
  | "emphasis"
  | "insertion_marker";
export type TopikTextBlockType =
  | "paragraph"
  | "bullet"
  | "quote"
  | "caption";
export type TopikVisualTemplate =
  | "exam_sentence"
  | "exam_passage"
  | "exam_advertisement"
  | "exam_notice"
  | "exam_info_card"
  | "exam_chart"
  | "exam_headline"
  | "exam_sentence_set"
  | "exam_insertion";

export interface TopikTextSegment {
  type: TopikTextSegmentType;
  text: string;
  key: string;
  label: string;
}

export interface TopikTextBlock {
  type: TopikTextBlockType;
  segments: TopikTextSegment[];
}

export interface TopikLabeledSentence {
  label: string;
  blocks: TopikTextBlock[];
}

export interface TopikInfoItem {
  label: string;
  value: string;
}

export interface TopikChartRow {
  label: string;
  values: string[];
  numericValues: number[];
}

export interface TopikChartData {
  title: string;
  subtitle: string;
  headers: string[];
  rows: TopikChartRow[];
  unit: string;
  sourceNote: string;
  variant: string;
}

export interface TopikStimulus {
  kind: TopikStimulusKind;
  title: string;
  subtitle: string;
  blocks: TopikTextBlock[];
  bulletItems: string[];
  infoItems: TopikInfoItem[];
  labeledSentences: TopikLabeledSentence[];
  givenText: TopikTextBlock[];
  chart?: TopikChartData;
  imageUrl: string;
  imageAlt: string;
  visualVariant: string;
}

export interface TopikChoice {
  key: string;
  text: string;
  order: number;
}

export interface TopikPresentation {
  template: TopikVisualTemplate;
  choiceLayout: TopikChoiceLayout;
  visualVariant: string;
  showBorder: boolean;
  preserveChoiceOrder: boolean;
}

export interface TopikQuestion {
  id: string;
  code: string;
  number: number;
  order: number;
  type: TopikQuestionType;
  points: number;
  prompt: TopikTextBlock[];
  stimulus: TopikStimulus | null;
  choices: TopikChoice[];
  presentation: TopikPresentation;
  tags: string[];
  difficulty: number;
  version: number;
}

export interface TopikQuestionGroup {
  id: string;
  code: string;
  order: number;
  startNumber: number;
  endNumber: number;
  instruction: TopikTextBlock[];
  sharedStimulus: TopikStimulus | null;
  pointsPerQuestion: number;
  presentation: TopikPresentation;
  version: number;
  questions: TopikQuestion[];
}

export interface TopikExam {
  id: string;
  code: string;
  title: TopikI18nText;
  description: TopikI18nText;
  examType: "topik_i" | "topik_ii";
  section: "reading" | "listening" | "writing";
  year?: number;
  round?: number;
  durationMinutes: number;
  totalQuestions: number;
  totalPoints: number;
  version: number;
}

export interface TopikExamSession {
  exam: TopikExam;
  range: { from: number; to: number };
  groups: TopikQuestionGroup[];
}

export interface TopikAttemptAnswer {
  questionId: string;
  selectedChoiceKey: string;
  durationMs: number;
  answeredAt: string;
  usedHintKeys: string[];
  hintViewCount: number;
  solutionViewedAt: string | null;
}

export interface TopikLearningState {
  questionId: string;
  questionVersion: number;
  revealedHintKeys: string[];
  hintViewCount: number;
  lastHintViewedAt: string | null;
  solutionViewedAt: string | null;
}

export interface TopikAttempt {
  id: string;
  examId: string;
  examVersion: number;
  mode: TopikAttemptMode;
  status: TopikAttemptStatus;
  currentQuestionNumber: number;
  elapsedSeconds: number;
  answeredCount: number;
  answers: TopikAttemptAnswer[];
  learningStates: TopikLearningState[];
  startedAt: string;
  lastSavedAt: string;
}

export interface TopikSaveAnswer {
  questionId: string;
  selectedChoiceKey: string;
  durationMs: number;
  answeredAt?: string;
  usedHintKeys?: string[];
  hintViewCount?: number;
  solutionViewedAt?: string;
}

export interface TopikSaveProgressResponse {
  attemptId: string;
  answeredCount: number;
  currentQuestionNumber: number;
  elapsedSeconds: number;
  lastSavedAt: string;
}

export interface TopikHint {
  key: string;
  level: number;
  title: TopikI18nText;
  content: TopikI18nText;
  examples: TopikI18nText[];
  targetSegmentKeys: string[];
}

export interface TopikKeyClue {
  key: string;
  order: number;
  label: TopikI18nText;
  explanation: TopikI18nText;
  targetSegmentKeys: string[];
}

export interface TopikSolutionStep {
  key: string;
  order: number;
  title: TopikI18nText;
  explanation: TopikI18nText;
  targetSegmentKeys: string[];
}

export interface TopikChoiceNote {
  choiceKey: string;
  note: TopikI18nText;
}

export interface TopikSolution {
  explanation: TopikI18nText;
  strategy: TopikI18nText;
  keyClues: TopikKeyClue[];
  steps: TopikSolutionStep[];
  hints: TopikHint[];
  choiceNotes: TopikChoiceNote[];
}

export interface TopikLearningSupport {
  questionId: string;
  hintCount: number;
  revealedHints: TopikHint[];
  nextHint: Pick<TopikHint, "key" | "level" | "title"> | null;
  hintViewCount: number;
  canRevealSolution: boolean;
  solutionViewedAt: string | null;
}

export interface TopikRevealedHint {
  questionId: string;
  hint: TopikHint;
  revealedHintKeys: string[];
  hintViewCount: number;
}

export interface TopikRevealedSolution {
  questionId: string;
  selectedChoiceKey: string;
  correctChoiceKey: string;
  isCorrect: boolean;
  solution: TopikSolution;
  viewedAt: string;
}

export interface TopikSubmission {
  attemptId: string;
  status: "submitted";
  correctCount: number;
  totalQuestions: number;
  score: number;
  elapsedSeconds: number;
  submittedAt: string;
}

export interface TopikQuestionResult {
  questionId: string;
  number: number;
  selectedChoiceKey: string | null;
  correctChoiceKey: string;
  isCorrect: boolean;
  points: number;
  solution: TopikSolution;
}

export interface TopikAttemptResult extends TopikSubmission {
  questions: TopikQuestionResult[];
}

export interface TopikTypePerformance {
  questionType: TopikQuestionType;
  attempted: number;
  correct: number;
  accuracy: number;
  averageDurationMs: number;
  hintViewCount: number;
  solutionViewCount: number;
  correctWithoutHintCount: number;
  lastAnsweredAt: string | null;
}

export interface TopikStatsSummary {
  mockExamCount: number;
  practiceCount: number;
  guidedCount: number;
  totalQuestions: number;
  correctQuestions: number;
  accuracy: number;
  totalStudySeconds: number;
  hintViewCount: number;
  solutionViewCount: number;
  correctWithoutHintCount: number;
  bestScore: number;
  lastScore: number;
  averageScore: number;
  lastAttemptAt: string | null;
  questionTypes: TopikTypePerformance[];
}

export type TopikMasteryState =
  | "new"
  | "learning"
  | "weak"
  | "unstable"
  | "mastered";

export interface TopikQuestionPerformance {
  questionId: string;
  questionVersion: number;
  examId: string;
  questionCode: string;
  questionNumber: number;
  questionType: TopikQuestionType;
  difficulty: number;
  tags: string[];
  attemptCount: number;
  correctCount: number;
  wrongCount: number;
  accuracy: number;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  consecutiveIndependentCorrect: number;
  averageDurationMs: number;
  lastDurationMs: number;
  fastestCorrectMs: number;
  hintViewCount: number;
  solutionViewCount: number;
  correctWithoutHintCount: number;
  selectedChoiceCounts: Record<string, number>;
  lastSelectedChoiceKey: string;
  lastResult: boolean | null;
  masteryState: TopikMasteryState;
  firstAnsweredAt: string;
  lastAnsweredAt: string;
  nextReviewAt: string;
}

export interface TopikHistoryItem {
  attemptId: string;
  examId: string;
  mode: TopikAttemptMode;
  correctCount: number;
  totalQuestions: number;
  accuracy: number;
  score: number;
  elapsedSeconds: number;
  hintViewCount: number;
  solutionViewCount: number;
  submittedAt: string;
}

export interface TopikQuestionWithGroup extends TopikQuestion {
  group: TopikQuestionGroup;
}

export function flattenTopikQuestions(
  session: TopikExamSession | null,
): TopikQuestionWithGroup[] {
  if (!session) return [];

  return session.groups.flatMap((group) =>
    group.questions.map((question) => ({ ...question, group })),
  );
}

export function topikText(
  value: TopikI18nText | null | undefined,
  language: TopikLanguage = "ko",
) {
  if (!value) return "";
  return value[language] || value.ko || value.en || value.uz || value.ru || "";
}
