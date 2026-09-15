import type {
  AnswerGradeResult,
  CompleteLessonResult,
  LessonQuestion,
  LessonSession,
  ReportedAnswer,
} from "../model/lesson";

type AuthenticatedRequest = <T>(path: string, init?: RequestInit) => Promise<T>;

export function getLesson(
  request: AuthenticatedRequest,
  lessonId: string,
): Promise<LessonSession> {
  return request<LessonSession>(`/lessons/${encodeURIComponent(lessonId)}?lang=uz`);
}

export function getJumpTest(
  request: AuthenticatedRequest,
  section: number,
  unit: number,
  category?: string,
): Promise<{ attemptId: string | null; heartLimit?: number; questions: LessonQuestion[] }> {
  const query = new URLSearchParams({
    lang: "uz",
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
): Promise<{ questions: LessonQuestion[] }> {
  return request(`/lessons/node-review/${encodeURIComponent(nodeId)}`);
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
    lang: "uz",
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
    body: JSON.stringify({ answer, lang: "uz" }),
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
    mode: "review" | "nodeReview" | "unitReview" | "unitRecap" | "unitVocab" | "unitGrammar" | "unitFinal";
    questionIds: string[];
    speedSeconds: number;
    wrongQuestionIds: string[];
  },
): Promise<{ success: boolean; totalXP: number; xpEarned: number }> {
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
