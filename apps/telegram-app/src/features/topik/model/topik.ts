import { getContentLang } from "../../../shared/i18n/content-language";
export type TopikAttemptMode = "practice" | "guided" | "mock_exam";
export type TopikLevel = "1" | "2";
export type TopikSection = "reading" | "listening" | "writing";
export type TopikChoiceLayout = "one_column" | "two_columns" | "four_columns";

export interface TopikI18nText {
  ko: string;
  uz: string;
  en: string;
  ru: string;
}

export interface TopikExam {
  id: string;
  code: string;
  title: TopikI18nText;
  description: TopikI18nText;
  examType: "topik_i" | "topik_ii";
  section: TopikSection;
  year?: number;
  round?: number;
  durationMinutes: number;
  totalQuestions: number;
  totalPoints: number;
  listeningAudioUrl: string;
  version: number;
}

export interface TopikCompletedExam {
  examId: string;
  latestAttemptId: string;
  latestMode: TopikAttemptMode;
  submittedAt: string | null;
}

export interface TopikAudioLine {
  speaker: string;
  text: string;
}

export interface TopikAudio {
  key: string;
  audioUrl: string;
  transcript: TopikAudioLine[];
  mockPlaybackLimit: number;
  guidedPlaybackLimit: number;
  guidedAutoRepeatCount?: number;
  speechFallback: boolean;
}

export interface TopikTextSegment {
  type: "text" | "blank" | "underline" | "emphasis" | "insertion_marker";
  text: string;
  key: string;
  label: string;
}

export interface TopikTextBlock {
  type: "paragraph" | "bullet" | "quote" | "caption";
  segments: TopikTextSegment[];
}

export interface TopikStimulus {
  kind:
    | "none"
    | "passage"
    | "advertisement"
    | "notice"
    | "info_card"
    | "chart"
    | "headline"
    | "sentence_set";
  title: string;
  subtitle: string;
  blocks: TopikTextBlock[];
  bulletItems: string[];
  infoItems: Array<{ label: string; value: string }>;
  labeledSentences: Array<{ label: string; blocks: TopikTextBlock[] }>;
  givenText: TopikTextBlock[];
  chart?: {
    title: string;
    subtitle: string;
    headers: string[];
    rows: Array<{ label: string; values: string[]; numericValues: number[] }>;
    unit: string;
    sourceNote: string;
    variant: string;
  };
  imageUrl: string;
  imageAlt: string;
  visualVariant: string;
}

export interface TopikChoice {
  key: string;
  text: string;
  order: number;
  imageAssetKey: string;
  imageAlt: string;
}

export interface TopikQuestion {
  id: string;
  code: string;
  number: number;
  order: number;
  type: string;
  points: number;
  prompt: TopikTextBlock[];
  stimulus: TopikStimulus | null;
  audio: TopikAudio | null;
  writingConfig: {
    fields: Array<{
      key: string;
      label: string;
      minCharacters: number;
      maxCharacters: number;
      multiline: boolean;
    }>;
    recommendedMinutes: number;
    guide: TopikI18nText;
  } | null;
  choices: TopikChoice[];
  presentation: {
    template: string;
    choiceLayout: TopikChoiceLayout;
    visualVariant: string;
    showBorder: boolean;
    preserveChoiceOrder: boolean;
  };
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
  sharedAudio: TopikAudio | null;
  pointsPerQuestion: number;
  questions: TopikQuestion[];
}

export interface TopikQuestionWithGroup extends TopikQuestion {
  group: TopikQuestionGroup;
}

export interface TopikExamSession {
  exam: TopikExam;
  range: { from: number; to: number };
  groups: TopikQuestionGroup[];
}

export interface TopikAttemptAnswer {
  questionId: string;
  selectedChoiceKey: string;
  writtenResponses?: Array<{ fieldKey: string; text: string }>;
  durationMs: number;
  answeredAt: string;
  usedHintKeys: string[];
  hintViewCount: number;
  solutionViewedAt: string | null;
}

export interface TopikAttempt {
  id: string;
  examId: string;
  mode: TopikAttemptMode;
  status: "in_progress" | "submitted" | "abandoned";
  currentQuestionNumber: number;
  elapsedSeconds: number;
  answeredCount: number;
  answers: TopikAttemptAnswer[];
  startedAt: string;
}

export interface TopikSaveAnswer {
  questionId: string;
  selectedChoiceKey?: string;
  writtenResponses?: Array<{ fieldKey: string; text: string }>;
  durationMs: number;
  answeredAt?: string;
  usedHintKeys?: string[];
  hintViewCount?: number;
  solutionViewedAt?: string;
}

export interface TopikHint {
  key: string;
  level: number;
  title: TopikI18nText;
  content: TopikI18nText;
  examples: TopikI18nText[];
  targetSegmentKeys: string[];
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

export interface TopikSolution {
  explanation: TopikI18nText;
  strategy: TopikI18nText;
  keyClues: Array<{
    key: string;
    order: number;
    label: TopikI18nText;
    explanation: TopikI18nText;
    targetSegmentKeys: string[];
  }>;
  sampleAnswer?: string;
  rubric?: TopikI18nText[];
}

export interface TopikRevealedSolution {
  questionId: string;
  selectedChoiceKey: string;
  correctChoiceKey: string;
  isCorrect: boolean | null;
  solution: TopikSolution;
  viewedAt: string;
}

export interface TopikAttemptResult {
  attemptId: string;
  examId: string;
  examCode: string;
  examType: "topik_i" | "topik_ii";
  section: TopikSection;
  mode: TopikAttemptMode;
  status: "submitted";
  correctCount: number;
  totalQuestions: number;
  score: number;
  elapsedSeconds: number;
  submittedAt: string;
  questions: Array<{
    questionId: string;
    number: number;
    selectedChoiceKey: string | null;
    writtenResponses?: Array<{ fieldKey: string; text: string }>;
    correctChoiceKey: string;
    isCorrect: boolean | null;
    solution: TopikSolution;
  }>;
}

export interface TopikTypePerformance {
  questionType: string;
  attempted: number;
  correct: number;
  accuracy: number;
  averageDurationMs: number;
  hintViewCount: number;
  solutionViewCount: number;
  correctWithoutHintCount: number;
}

export interface TopikStatsSummary {
  mockExamCount: number;
  practiceCount: number;
  guidedCount: number;
  totalQuestions: number;
  correctQuestions: number;
  accuracy: number;
  totalStudySeconds: number;
  correctWithoutHintCount: number;
  bestScore: number;
  lastScore: number;
  averageScore: number;
  questionTypes: TopikTypePerformance[];
}

export interface TopikQuestionPerformance {
  questionId: string;
  questionVersion: number;
  examRound: number | null;
  questionNumber: number;
  questionType: string;
  section: TopikSection;
  accuracy: number;
  consecutiveWrong: number;
}

export interface TopikHistoryItem {
  attemptId: string;
  examCode: string;
  section: TopikSection;
  examRound: number | null;
  mode: TopikAttemptMode;
  score: number;
  accuracy: number;
  submittedAt: string;
}

export interface TopikRecipeSummary {
  groupCode: string;
  section: string;
  label: TopikI18nText;
  title: TopikI18nText;
  fromNumber: number;
  toNumber: number;
  targetLevel: number;
  order: number;
  ready: boolean;
  exampleCount: number;
  practiceCount: number;
  grammarCount: number;
}

export interface TopikRecipeTip {
  order: number;
  text: TopikI18nText;
}

export interface TopikGrammarEntry {
  rank: number;
  form: string;
  meanings: TopikI18nText[];
  examples: string[];
  highlights: string[];
}

export interface TopikGrammarSection {
  key: string;
  title: TopikI18nText;
  entries: TopikGrammarEntry[];
  tips: TopikI18nText[];
}

export interface TopikRecipeSolutionStep {
  key: string;
  order: number;
  title: TopikI18nText;
  explanation: TopikI18nText;
}

export interface TopikRecipeChoiceNote {
  choiceKey: string;
  note: TopikI18nText;
}

export interface TopikRecipeSolution {
  explanation: TopikI18nText;
  strategy: TopikI18nText;
  steps: TopikRecipeSolutionStep[];
  choiceNotes: TopikRecipeChoiceNote[];
  sampleAnswer?: string;
  rubric?: TopikI18nText[];
}

export interface TopikRecipeQuestion {
  id: string;
  code: string;
  number: number;
  type: string;
  responseType?: "multiple_choice" | "written";
  points: number;
  prompt: TopikTextBlock[];
  stimulus?: TopikStimulus | null;
  audio?: TopikAudio | null;
  writingConfig?: TopikQuestion["writingConfig"];
  presentation?: TopikQuestion["presentation"];
  choices: TopikChoice[];
  tags: string[];
  difficulty: number;
  correctChoiceKey?: string;
  solution?: TopikRecipeSolution | null;
}

export interface TopikRecipeDetail {
  groupCode: string;
  section: string;
  label: TopikI18nText;
  title: TopikI18nText;
  intro: TopikI18nText;
  targetLevel: number;
  goldenRecipe: TopikRecipeTip[];
  grammarSections: TopikGrammarSection[];
  examples: TopikRecipeQuestion[];
  practiceCount: number;
}

export interface TopikRecipePractice {
  groupCode: string;
  label: TopikI18nText;
  title: TopikI18nText;
  questions: TopikRecipeQuestion[];
}

export interface TopikRecipeSolutionEntry {
  id: string;
  correctChoiceKey: string;
  solution: TopikRecipeSolution | null;
}

/**
 * 읽기에서 한 지문을 여러 문제가 같이 쓰는 묶음인가 ([19~20], [21~22] …).
 * 이런 묶음은 시험지처럼 한 화면에 지문 한 번 + 문제들을 이어서 보여준다 (앱과 같음).
 */
export function isTopikPassageSet(group: TopikQuestionGroup | undefined) {
  return Boolean(group?.sharedStimulus) && (group?.questions.length ?? 0) > 1;
}

export function flattenTopikQuestions(session: TopikExamSession | null) {
  if (!session) return [];
  return session.groups.flatMap((group) =>
    group.questions.map((question) => ({ ...question, group })),
  );
}

/**
 * TOPIK 해설·안내 문구를 설명 언어로 고른다 (앱의 topikText(x, lang) 와 같다).
 * 이름은 예전 그대로 둔다 — 예전엔 **무조건 우즈벡어**를 골라서, 러시아어·영어
 * 사용자도 TOPIK 해설을 우즈벡어로 봤다.
 */
export function topikUzText(value: TopikI18nText | null | undefined) {
  if (!value) return "";
  const lang = getContentLang();
  return value[lang] || value.uz || value.en || value.ko || value.ru || "";
}
