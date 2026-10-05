import type {
  AnswerGradeResult,
  CompleteLessonResult,
  LessonQuestion,
  LessonSession,
  ReportedAnswer,
} from "../model/lesson";
import { getContentLang } from "../../../shared/i18n/content-language";
import type { StudyCelebration } from "../../misc/model/streak-chest-route";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getLesson(
  request: AuthenticatedRequest,
  lessonId: string,
): Promise<LessonSession> {
  return request<LessonSession>(`/lessons/${encodeURIComponent(lessonId)}?lang=${getContentLang()}`);
}

export function getJumpTest(
  request: AuthenticatedRequest,
  section: number,
  unit: number,
  category?: string,
): Promise<{ attemptId: string | null; heartLimit?: number; questions: LessonQuestion[] }> {
  const query = new URLSearchParams({
    lang: getContentLang(),
    section: String(section),
    unit: String(unit),
  });
  if (category) query.set("category", category);
  return request(`/lessons/jump-test?${query.toString()}`);
}

export function completeJumpTest(
  request: AuthenticatedRequest,
  attemptId: string,
  wrongQuestionIds: string[],
): Promise<{
  completed?: number;
  heartLimit: number;
  passed: boolean;
  section?: number;
  unit?: number;
  wrongCount: number;
}> {
  return request("/lessons/jump-complete", {
    body: JSON.stringify({ attemptId, wrongQuestionIds }),
    method: "POST",
  });
}

export function getNodeReview(
  request: AuthenticatedRequest,
  nodeId: string,
  limit?: number,
): Promise<{ questions: LessonQuestion[] }> {
  const query = new URLSearchParams({ lang: getContentLang() });
  if (limit) query.set("limit", String(limit));
  return request(`/lessons/node-review/${encodeURIComponent(nodeId)}?${query.toString()}`);
}

export function completeLegend(
  request: AuthenticatedRequest,
  nodeId: string,
): Promise<{
  alreadyDone: boolean;
  success: boolean;
  totalXP: number;
  xpEarned: number;
}> {
  return request(`/lessons/nodes/${encodeURIComponent(nodeId)}/legend-complete`, {
    method: "POST",
  });
}

export function getUnitPractice(
  request: AuthenticatedRequest,
  params: {
    group: number;
    kind: string;
    lesson: number;
    section: number;
    unit: number;
  },
): Promise<{ questions: LessonQuestion[] }> {
  const query = new URLSearchParams({
    group: String(params.group),
    kind: params.kind,
    lang: getContentLang(),
    lesson: String(params.lesson),
    section: String(params.section),
    unit: String(params.unit),
  });
  return request(`/lessons/unit-practice?${query.toString()}`);
}

export function gradeTypedAnswer(
  request: AuthenticatedRequest,
  questionId: string,
  answer: string,
): Promise<AnswerGradeResult> {
  return request(`/lessons/questions/${encodeURIComponent(questionId)}/grade`, {
    body: JSON.stringify({ answer, lang: getContentLang() }),
    method: "POST",
  });
}

export function reportLessonProgress(
  request: AuthenticatedRequest,
  attemptId: string,
  index: number,
  answers: ReportedAnswer[],
): Promise<{ ok: boolean }> {
  return request(`/lessons/attempts/${encodeURIComponent(attemptId)}/progress`, {
    body: JSON.stringify({ answers, index }),
    method: "POST",
  });
}

export function completeLesson(
  request: AuthenticatedRequest,
  lessonId: string,
  body: {
    answers?: ReportedAnswer[];
    attemptId?: string | null;
    combo: number;
    correctAnswers: number;
    isCompleted: boolean;
    speedSeconds: number;
    totalAnswers: number;
    wrongQuestionIds: string[];
    xpEarned: number;
    /** 에너지로 칠 정답 수 — 본풀이만 (틀린 문제 다시 풀기는 무료) */
    energySpent?: number;
  },
): Promise<CompleteLessonResult> {
  return request(`/lessons/${encodeURIComponent(lessonId)}/complete`, {
    body: JSON.stringify(body),
    method: "POST",
  });
}

export function completePractice(
  request: AuthenticatedRequest,
  body: {
    combo: number;
    mode: "review" | "wordPractice" | "nodeReview" | "unitReview" | "unitRecap" | "unitVocab" | "unitGrammar" | "unitFinal";
    questionIds: string[];
    speedSeconds: number;
    wrongQuestionIds: string[];
    /** 본풀이 정답 수 (에너지). 학습 로드 문제 레슨만 서버가 깎는다 */
    energySpent?: number;
  },
): Promise<{
  /** 학습 로드 문제 노드 완료 = 그날 학습 완료 → 도장·연속 상자 */
  celebration?: StudyCelebration | null;
  energy?: number;
  success: boolean;
  totalXP: number;
  xpEarned: number;
}> {
  return request("/lessons/practice-complete", {
    body: JSON.stringify(body),
    method: "POST",
  });
}

export function completeStudyNode(
  request: AuthenticatedRequest,
  body: { group: number; kind: string; lesson: number; section: number; unit: number },
): Promise<{ key: string; success: boolean }> {
  return request("/study-path/complete", {
    body: JSON.stringify(body),
    method: "POST",
  });
}

export interface SpeechAssessResult {
  passed: boolean;
  referenceText: string;
  scores: {
    accuracy: number;
    completeness: number;
    fluency: number;
    pron: number;
    prosody: number | null;
  };
  status: "success" | "no_speech" | "error";
  threshold: { completeness: number; pron: number; tier: "lenient" | "normal" | "strict" };
  transcript: string;
  /** 단어별 정확도 — 어디가 문제였는지 칩으로 보여 준다 */
  words?: { word: string; accuracy: number; errorType: string }[];
}

export function assessSpeech(
  request: AuthenticatedRequest,
  questionId: string,
  wav: ArrayBuffer,
): Promise<SpeechAssessResult> {
  return request(`/speech/assess?questionId=${encodeURIComponent(questionId)}`, {
    body: wav,
    headers: { "Content-Type": "audio/wav" },
    method: "POST",
  });
}

export function transcribeSpeech(
  request: AuthenticatedRequest,
  wav: ArrayBuffer,
): Promise<{ status: "success" | "no_speech" | "error"; text: string }> {
  return request("/speech/transcribe", {
    body: wav,
    headers: { "Content-Type": "audio/wav" },
    method: "POST",
  });
}

/** 오답 복습 (연습 화면 "틀린 문제") — 앱 LessonService.getMistakeQuestions */
export function getMistakeQuestions(request: AuthenticatedRequest) {
  return request<{ questions: LessonQuestion[] }>(`/lessons/mistake-questions?lang=${getContentLang()}`);
}

/** 배운 단어 짝맞추기 연습 — 앱 LessonService.getWordPractice */
export function getWordPractice(request: AuthenticatedRequest) {
  return request<{ questions: LessonQuestion[] }>(`/lessons/word-practice?lang=${getContentLang()}`);
}

/** 복습에서 맞힌 문제를 오답 목록에서 뺀다 */
export function resolveMistakes(request: AuthenticatedRequest, correctIds: string[]) {
  return request<{ removed: number }>("/lessons/mistakes/resolve", {
    body: JSON.stringify({ correctIds }),
    method: "POST",
  });
}

/**
 * 4연속 정답 보너스 에너지. 횟수·간격은 서버가 막는다 — 앱 EnergyService.comboBonus.
 * 응답의 energy 에는 이번 레슨에서 화면상 깎은 만큼이 아직 안 빠져 있다.
 */
export function claimComboBonus(request: AuthenticatedRequest, spent = 0) {
  // spent = 이번 레슨에서 지금까지 쓴 에너지 (서버는 완료 때 깎으므로 이걸 알아야 "적다" 를 판단)
  return request<{ bonusGranted: number; energy: number; gems: number }>("/energy/combo-bonus", {
    body: JSON.stringify({ spent }),
    method: "POST",
  });
}
