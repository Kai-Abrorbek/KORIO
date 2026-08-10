import { create } from "zustand";
import { TopikService } from "@/services/topik.service";
import type {
  TopikAttempt,
  TopikAttemptMode,
  TopikAttemptResult,
  TopikExamSession,
  TopikLearningSupport,
  TopikRevealedSolution,
  TopikSaveAnswer,
} from "@/types/topik";

interface TopikDraftAnswer extends TopikSaveAnswer {
  startedAtMs: number;
}

interface TopikAttemptState {
  examCode: string | null;
  session: TopikExamSession | null;
  attempt: TopikAttempt | null;
  answers: Record<string, TopikDraftAnswer>;
  learningSupport: Record<string, TopikLearningSupport>;
  revealedSolutions: Record<string, TopikRevealedSolution>;
  result: TopikAttemptResult | null;
  currentIndex: number;
  sessionStartedAtMs: number | null;
  questionStartedAtMs: number;
  isLoading: boolean;
  isSaving: boolean;
  errorCode: string | null;
  start: (examCode: string, mode: TopikAttemptMode) => Promise<void>;
  startReview: (
    examCode: string,
    attemptId: string,
    questionNumber: number,
  ) => Promise<void>;
  selectAnswer: (questionId: string, choiceKey: string) => void;
  setCurrentIndex: (index: number) => void;
  saveProgress: () => Promise<void>;
  loadLearningSupport: (questionId: string) => Promise<void>;
  revealNextHint: (questionId: string) => Promise<void>;
  revealSolution: (questionId: string) => Promise<void>;
  submit: () => Promise<TopikAttemptResult>;
  reset: () => void;
}

const initialState = {
  examCode: null,
  session: null,
  attempt: null,
  answers: {},
  learningSupport: {},
  revealedSolutions: {},
  result: null,
  currentIndex: 0,
  sessionStartedAtMs: null,
  questionStartedAtMs: Date.now(),
  isLoading: false,
  isSaving: false,
  errorCode: null,
};

function errorCode(error: unknown) {
  if (error instanceof Error) return error.message;
  return "UNKNOWN_ERROR";
}

function toDraftAnswers(attempt: TopikAttempt) {
  return Object.fromEntries(
    attempt.answers.map((answer) => [
      answer.questionId,
      {
        ...answer,
        solutionViewedAt: answer.solutionViewedAt ?? undefined,
        startedAtMs: Date.now(),
      },
    ]),
  ) as Record<string, TopikDraftAnswer>;
}

export const useTopikAttemptStore = create<TopikAttemptState>((set, get) => ({
  ...initialState,

  start: async (examCode, mode) => {
    if (mode === "mock_exam") {
      set({
        ...initialState,
        examCode,
        questionStartedAtMs: Date.now(),
        isLoading: true,
      });
    } else {
      set({ isLoading: true, errorCode: null });
    }
    try {
      const [session, attempt] = await Promise.all([
        TopikService.getSession(examCode),
        TopikService.startAttempt(examCode, mode, mode !== "mock_exam"),
      ]);
      set({
        examCode,
        session,
        attempt,
        answers: toDraftAnswers(attempt),
        learningSupport: {},
        revealedSolutions: {},
        result: null,
        currentIndex: Math.max(0, attempt.currentQuestionNumber - 1),
        sessionStartedAtMs: Date.now() - attempt.elapsedSeconds * 1000,
        questionStartedAtMs: Date.now(),
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, errorCode: errorCode(error) });
      throw error;
    }
  },

  startReview: async (examCode, attemptId, questionNumber) => {
    set({
      ...initialState,
      examCode,
      questionStartedAtMs: Date.now(),
      isLoading: true,
    });
    try {
      const [session, attempt, result] = await Promise.all([
        TopikService.getSession(examCode),
        TopikService.getAttempt(attemptId),
        TopikService.getResult(attemptId),
      ]);
      if (
        attempt.mode !== "guided" ||
        attempt.status !== "submitted" ||
        result.examCode !== examCode
      ) {
        throw new Error("TOPIK_GUIDED_REVIEW_REQUIRED");
      }

      const revealedSolutions: Record<string, TopikRevealedSolution> =
        Object.fromEntries(
          result.questions.map((question) => [
            question.questionId,
            {
              questionId: question.questionId,
              selectedChoiceKey: question.selectedChoiceKey ?? "",
              correctChoiceKey: question.correctChoiceKey,
              isCorrect: question.isCorrect,
              solution: question.solution,
              viewedAt: result.submittedAt,
            },
          ]),
        );
      const questions = session.groups
        .flatMap((group) => group.questions)
        .sort((left, right) => left.number - right.number);
      const requestedQuestionIndex = questions.findIndex(
        (question) => question.number === questionNumber,
      );

      set({
        examCode,
        session,
        attempt,
        answers: toDraftAnswers(attempt),
        learningSupport: {},
        revealedSolutions,
        result,
        currentIndex: requestedQuestionIndex >= 0 ? requestedQuestionIndex : 0,
        sessionStartedAtMs: null,
        questionStartedAtMs: Date.now(),
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false, errorCode: errorCode(error) });
      throw error;
    }
  },

  selectAnswer: (questionId, choiceKey) => {
    const state = get();
    const now = Date.now();
    const existing = state.answers[questionId];
    const elapsed = Math.max(0, now - state.questionStartedAtMs);

    set({
      answers: {
        ...state.answers,
        [questionId]: {
          questionId,
          selectedChoiceKey: choiceKey,
          durationMs: (existing?.durationMs ?? 0) + elapsed,
          answeredAt: new Date(now).toISOString(),
          usedHintKeys: existing?.usedHintKeys ?? [],
          hintViewCount: existing?.hintViewCount ?? 0,
          solutionViewedAt: existing?.solutionViewedAt,
          startedAtMs: existing?.startedAtMs ?? state.questionStartedAtMs,
        },
      },
      questionStartedAtMs: now,
    });
  },

  setCurrentIndex: (index) =>
    set({ currentIndex: Math.max(0, index), questionStartedAtMs: Date.now() }),

  saveProgress: async () => {
    const state = get();
    if (
      !state.attempt ||
      state.attempt.status !== "in_progress" ||
      state.attempt.mode === "mock_exam"
    ) {
      return;
    }

    const answers = Object.values(state.answers).map(
      ({ startedAtMs: _startedAtMs, ...answer }) => answer,
    );
    if (answers.length === 0) return;

    set({ isSaving: true, errorCode: null });
    try {
      const elapsedSeconds = state.sessionStartedAtMs
        ? Math.floor((Date.now() - state.sessionStartedAtMs) / 1000)
        : state.attempt.elapsedSeconds;
      const saved = await TopikService.saveAnswers(
        state.attempt.id,
        answers,
        state.currentIndex + 1,
        elapsedSeconds,
      );
      set((current) => ({
        attempt: current.attempt
          ? {
              ...current.attempt,
              answeredCount: saved.answeredCount,
              currentQuestionNumber: saved.currentQuestionNumber,
              elapsedSeconds: saved.elapsedSeconds,
              lastSavedAt: saved.lastSavedAt,
            }
          : null,
        isSaving: false,
      }));
    } catch (error) {
      set({ isSaving: false, errorCode: errorCode(error) });
      throw error;
    }
  },

  loadLearningSupport: async (questionId) => {
    const attempt = get().attempt;
    if (
      !attempt ||
      attempt.mode !== "guided" ||
      attempt.status !== "in_progress"
    ) {
      return;
    }

    const support = await TopikService.getLearningSupport(
      attempt.id,
      questionId,
    );
    set((state) => ({
      learningSupport: { ...state.learningSupport, [questionId]: support },
    }));
  },

  revealNextHint: async (questionId) => {
    const state = get();
    const support = state.learningSupport[questionId];
    if (!state.attempt || !support?.nextHint) return;

    const revealed = await TopikService.revealHint(
      state.attempt.id,
      questionId,
      support.nextHint.key,
    );
    const refreshed = await TopikService.getLearningSupport(
      state.attempt.id,
      questionId,
    );
    const answer = state.answers[questionId];

    set((current) => ({
      learningSupport: {
        ...current.learningSupport,
        [questionId]: refreshed,
      },
      answers: answer
        ? {
            ...current.answers,
            [questionId]: {
              ...answer,
              usedHintKeys: revealed.revealedHintKeys,
              hintViewCount: revealed.hintViewCount,
            },
          }
        : current.answers,
    }));
  },

  revealSolution: async (questionId) => {
    const state = get();
    if (!state.attempt) return;

    await state.saveProgress();
    const solution = await TopikService.revealSolution(
      state.attempt.id,
      questionId,
    );
    const support = await TopikService.getLearningSupport(
      state.attempt.id,
      questionId,
    );

    set((current) => ({
      revealedSolutions: {
        ...current.revealedSolutions,
        [questionId]: solution,
      },
      learningSupport: {
        ...current.learningSupport,
        [questionId]: support,
      },
      answers: current.answers[questionId]
        ? {
            ...current.answers,
            [questionId]: {
              ...current.answers[questionId],
              solutionViewedAt: solution.viewedAt,
            },
          }
        : current.answers,
    }));
  },

  submit: async () => {
    const state = get();
    if (!state.attempt) throw new Error("TOPIK_ATTEMPT_NOT_FOUND");

    if (state.attempt.mode === "mock_exam") {
      const answers = Object.values(state.answers).map(
        ({ startedAtMs: _startedAtMs, ...answer }) => answer,
      );
      if (answers.length > 0) {
        const elapsedSeconds = state.sessionStartedAtMs
          ? Math.floor((Date.now() - state.sessionStartedAtMs) / 1000)
          : state.attempt.elapsedSeconds;
        await TopikService.saveAnswers(
          state.attempt.id,
          answers,
          state.currentIndex + 1,
          elapsedSeconds,
        );
      }
    } else {
      await state.saveProgress();
    }
    await TopikService.submitAttempt(state.attempt.id);
    const result = await TopikService.getResult(state.attempt.id);
    set({ result });
    return result;
  },

  reset: () => set({ ...initialState, questionStartedAtMs: Date.now() }),
}));
