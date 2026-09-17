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
  points: number;
  prompt: TopikTextBlock[];
  stimulus: TopikStimulus | null;
  audio: TopikAudio | null;
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
  selectedChoiceKey: string;
  durationMs: number;
  answeredAt: string;
  usedHintKeys: string[];
  hintViewCount: number;
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
  examCode: string;
  mode: TopikAttemptMode;
  status: "submitted";
  score: number;
  elapsedSeconds: number;
  submittedAt: string;
  questions: Array<{
    questionId: string;
    number: number;
    selectedChoiceKey: string | null;
    correctChoiceKey: string;
    isCorrect: boolean | null;
    solution: TopikSolution;
  }>;
}

export function flattenTopikQuestions(session: TopikExamSession | null) {
  if (!session) return [];
  return session.groups.flatMap((group) =>
    group.questions.map((question) => ({ ...question, group })),
  );
}

export function topikUzText(value: TopikI18nText | null | undefined) {
  if (!value) return "";
  return value.uz || value.ko || value.en || value.ru || "";
}
