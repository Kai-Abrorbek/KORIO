import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { ClientSession, Connection, Model, Types } from 'mongoose';
import {
  UserStats,
  UserStatsDocument,
} from '../users/schemas/user-stats.schema';
import {
  TopikAttempt,
  TopikAttemptDocument,
  TopikAttemptMode,
  TopikAttemptStatus,
} from './schemas/topik-attempt.schema';
import {
  TopikExamType,
  TopikQuestionType,
  TopikSection,
} from './schemas/topik-content.schema';
import { TopikExam, TopikExamDocument } from './schemas/topik-exam.schema';
import {
  TopikQuestion,
  TopikQuestionDocument,
} from './schemas/topik-question.schema';
import {
  TopikMasteryState,
  TopikUserQuestionPerformance,
  TopikUserQuestionPerformanceDocument,
} from './schemas/topik-user-question-performance.schema';
import {
  TopikUserSummary,
  TopikUserSummaryDocument,
} from './schemas/topik-user-summary.schema';
import { calculateTopikMastery } from './topik-mastery.util';

const TOPIK_STATS_VERSION = 1;

interface SubmittedAnswerStat {
  question: TopikQuestionDocument;
  questionVersion: number;
  selectedChoiceKey: string;
  durationMs: number;
  answeredAt: Date;
  isCorrect: boolean;
  hintViewCount: number;
  solutionViewed: boolean;
  usedLearningSupport: boolean;
}

@Injectable()
export class TopikStatsService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectModel(TopikAttempt.name)
    private readonly attemptModel: Model<TopikAttemptDocument>,
    @InjectModel(TopikExam.name)
    private readonly examModel: Model<TopikExamDocument>,
    @InjectModel(TopikQuestion.name)
    private readonly questionModel: Model<TopikQuestionDocument>,
    @InjectModel(TopikUserSummary.name)
    private readonly summaryModel: Model<TopikUserSummaryDocument>,
    @InjectModel(TopikUserQuestionPerformance.name)
    private readonly questionPerformanceModel: Model<TopikUserQuestionPerformanceDocument>,
    @InjectModel(UserStats.name)
    private readonly userStatsModel: Model<UserStatsDocument>,
  ) {}

  public async applySubmittedAttempt(attemptId: string) {
    await this.connection.transaction(async (session) => {
      const attempt = await this.attemptModel
        .findOne({
          _id: new Types.ObjectId(attemptId),
          status: TopikAttemptStatus.SUBMITTED,
        })
        .session(session);

      if (!attempt) {
        throw new NotFoundException('TOPIK_ATTEMPT_NOT_FOUND');
      }
      if (attempt.statsAppliedAt) {
        return;
      }

      const questions = await this.questionModel
        .find({ _id: { $in: attempt.questionIds } })
        .session(session);
      const questionById = new Map(
        questions.map((question) => [question._id.toString(), question]),
      );
      const learningStateByQuestion = new Map(
        (attempt.learningStates ?? []).map((state) => [
          state.questionId.toString(),
          state,
        ]),
      );
      const answerStats = attempt.answers
        .filter((answer) => typeof answer.isCorrect === 'boolean')
        .map((answer) => {
          const questionId = answer.questionId.toString();
          const question = questionById.get(questionId);

          if (!question) {
            throw new NotFoundException('TOPIK_QUESTION_NOT_FOUND');
          }

          const learningState = learningStateByQuestion.get(questionId);
          const usedHintKeys = [
            ...new Set([
              ...(answer.usedHintKeys ?? []),
              ...(learningState?.revealedHintKeys ?? []),
            ]),
          ];
          const hintViewCount = Math.max(
            answer.hintViewCount ?? 0,
            learningState?.hintViewCount ?? 0,
          );
          const solutionViewed = Boolean(
            answer.solutionViewedAt ?? learningState?.solutionViewedAt,
          );

          return {
            question,
            questionVersion: answer.questionVersion,
            selectedChoiceKey: answer.selectedChoiceKey,
            durationMs: answer.durationMs,
            answeredAt: answer.answeredAt,
            isCorrect: answer.isCorrect === true,
            hintViewCount,
            solutionViewed,
            usedLearningSupport:
              hintViewCount > 0 || usedHintKeys.length > 0 || solutionViewed,
          };
        });
      const appliedAt = new Date();

      await this.updateDailyStats(attempt, answerStats.length, session);
      await this.updateTopikSummary(attempt, answerStats, session);
      await this.updateQuestionPerformance(attempt, answerStats, session);

      attempt.statsAppliedAt = appliedAt;
      attempt.statsVersion = TOPIK_STATS_VERSION;
      await attempt.save({ session });
    });
  }

  public async getSummary(
    userId: string,
    examType: TopikExamType,
    section?: TopikSection,
  ) {
    const { examIds } = await this.getExamScope(examType, section);
    if (examIds.length === 0) return this.emptySummary();

    const attempts = await this.attemptModel
      .find({
        userId: new Types.ObjectId(userId),
        examId: { $in: examIds },
        status: TopikAttemptStatus.SUBMITTED,
      })
      .sort({ submittedAt: -1 })
      .lean();
    const questionIds = attempts.flatMap((attempt) =>
      attempt.answers.map((answer) => answer.questionId),
    );
    const questions =
      questionIds.length > 0
        ? await this.questionModel
            .find({ _id: { $in: questionIds } })
            .select('_id type')
            .lean()
        : [];
    const questionById = new Map(
      questions.map((question) => [question._id.toString(), question]),
    );
    const typePerformance = new Map<
      TopikQuestionType,
      {
        attempted: number;
        correct: number;
        totalDurationMs: number;
        hintViewCount: number;
        solutionViewCount: number;
        correctWithoutHintCount: number;
        lastAnsweredAt: Date | null;
      }
    >();
    let totalQuestions = 0;
    let correctQuestions = 0;
    let hintViewCount = 0;
    let solutionViewCount = 0;
    let correctWithoutHintCount = 0;

    for (const attempt of attempts) {
      const learningStateByQuestion = new Map(
        (attempt.learningStates ?? []).map((state) => [
          state.questionId.toString(),
          state,
        ]),
      );

      for (const answer of attempt.answers) {
        const questionId = answer.questionId.toString();
        const question = questionById.get(questionId);
        const learningState = learningStateByQuestion.get(questionId);
        const answerHintCount = Math.max(
          answer.hintViewCount ?? 0,
          learningState?.hintViewCount ?? 0,
        );
        const solutionViewed = Boolean(
          answer.solutionViewedAt ?? learningState?.solutionViewedAt,
        );
        const usedLearningSupport =
          answerHintCount > 0 ||
          (answer.usedHintKeys?.length ?? 0) > 0 ||
          solutionViewed;

        hintViewCount += answerHintCount;
        solutionViewCount += solutionViewed ? 1 : 0;

        if (!question || typeof answer.isCorrect !== 'boolean') continue;

        totalQuestions += 1;
        correctQuestions += answer.isCorrect ? 1 : 0;
        correctWithoutHintCount +=
          answer.isCorrect && !usedLearningSupport ? 1 : 0;

        const performance = typePerformance.get(question.type) ?? {
          attempted: 0,
          correct: 0,
          totalDurationMs: 0,
          hintViewCount: 0,
          solutionViewCount: 0,
          correctWithoutHintCount: 0,
          lastAnsweredAt: null,
        };
        performance.attempted += 1;
        performance.correct += answer.isCorrect ? 1 : 0;
        performance.totalDurationMs += answer.durationMs;
        performance.hintViewCount += answerHintCount;
        performance.solutionViewCount += solutionViewed ? 1 : 0;
        performance.correctWithoutHintCount +=
          answer.isCorrect && !usedLearningSupport ? 1 : 0;
        if (
          !performance.lastAnsweredAt ||
          answer.answeredAt > performance.lastAnsweredAt
        ) {
          performance.lastAnsweredAt = answer.answeredAt;
        }
        typePerformance.set(question.type, performance);
      }
    }

    const mockAttempts = attempts.filter(
      (attempt) => attempt.mode === TopikAttemptMode.MOCK_EXAM,
    );
    const scoredMockAttempts = mockAttempts.filter((attempt) =>
      attempt.answers.some((answer) => typeof answer.isCorrect === 'boolean'),
    );
    const totalScore = scoredMockAttempts.reduce(
      (total, attempt) => total + attempt.score,
      0,
    );

    return {
      mockExamCount: mockAttempts.length,
      practiceCount: attempts.filter(
        (attempt) => attempt.mode === TopikAttemptMode.PRACTICE,
      ).length,
      guidedCount: attempts.filter(
        (attempt) => attempt.mode === TopikAttemptMode.GUIDED,
      ).length,
      totalQuestions,
      correctQuestions,
      accuracy: this.percentage(correctQuestions, totalQuestions),
      totalStudySeconds: attempts.reduce(
        (total, attempt) => total + attempt.elapsedSeconds,
        0,
      ),
      hintViewCount,
      solutionViewCount,
      correctWithoutHintCount,
      bestScore: scoredMockAttempts.reduce(
        (best, attempt) => Math.max(best, attempt.score),
        0,
      ),
      lastScore: scoredMockAttempts[0]?.score ?? 0,
      averageScore:
        scoredMockAttempts.length === 0
          ? 0
          : Math.round((totalScore / scoredMockAttempts.length) * 10) / 10,
      lastAttemptAt: attempts[0]?.submittedAt ?? null,
      questionTypes: Array.from(typePerformance.entries())
        .map(([questionType, performance]) => ({
          questionType,
          attempted: performance.attempted,
          correct: performance.correct,
          accuracy: this.percentage(performance.correct, performance.attempted),
          averageDurationMs:
            performance.attempted === 0
              ? 0
              : Math.round(performance.totalDurationMs / performance.attempted),
          hintViewCount: performance.hintViewCount,
          solutionViewCount: performance.solutionViewCount,
          correctWithoutHintCount: performance.correctWithoutHintCount,
          lastAnsweredAt: performance.lastAnsweredAt,
        }))
        .sort(
          (left, right) =>
            right.attempted - left.attempted || left.accuracy - right.accuracy,
        ),
    };
  }

  public async getQuestionTypes(
    userId: string,
    examType: TopikExamType,
    section?: TopikSection,
  ) {
    const summary = await this.getSummary(userId, examType, section);
    return summary.questionTypes;
  }

  public getWeakQuestions(
    userId: string,
    limit: number,
    examType: TopikExamType,
    section?: TopikSection,
  ) {
    return this.getQuestionPerformanceList(
      userId,
      {
        masteryState: {
          $in: [TopikMasteryState.WEAK, TopikMasteryState.UNSTABLE],
        },
      },
      { consecutiveWrong: -1, wrongCount: -1, lastAnsweredAt: -1 },
      limit,
      examType,
      section,
    );
  }

  public getMasteredQuestions(
    userId: string,
    limit: number,
    examType: TopikExamType,
    section?: TopikSection,
  ) {
    return this.getQuestionPerformanceList(
      userId,
      { masteryState: TopikMasteryState.MASTERED },
      { consecutiveCorrect: -1, correctCount: -1, lastAnsweredAt: -1 },
      limit,
      examType,
      section,
    );
  }

  public getReviewQueue(
    userId: string,
    limit: number,
    examType: TopikExamType,
    section?: TopikSection,
  ) {
    return this.getQuestionPerformanceList(
      userId,
      { nextReviewAt: { $lte: new Date() } },
      { nextReviewAt: 1, consecutiveWrong: -1 },
      limit,
      examType,
      section,
    );
  }

  public async getHistory(
    userId: string,
    limit: number,
    examType: TopikExamType,
    section?: TopikSection,
  ) {
    const { examIds, examById } = await this.getExamScope(examType, section);
    if (examIds.length === 0) return [];

    const attempts = await this.attemptModel
      .find({
        userId: new Types.ObjectId(userId),
        examId: { $in: examIds },
        status: TopikAttemptStatus.SUBMITTED,
      })
      .sort({ submittedAt: -1 })
      .limit(limit)
      .lean();

    return attempts.map((attempt) => {
      const exam = examById.get(attempt.examId.toString());
      const learningStateByQuestion = new Map(
        (attempt.learningStates ?? []).map((state) => [
          state.questionId.toString(),
          state,
        ]),
      );

      return {
        attemptId: attempt._id.toString(),
        examId: attempt.examId.toString(),
        examCode: exam?.code ?? '',
        examType: exam?.examType ?? examType,
        section: exam?.section ?? section ?? TopikSection.READING,
        examRound: exam?.round ?? null,
        mode: attempt.mode,
        correctCount: attempt.correctCount,
        totalQuestions: attempt.questionIds.length,
        accuracy: this.percentage(
          attempt.correctCount,
          attempt.questionIds.length,
        ),
        score: attempt.score,
        elapsedSeconds: attempt.elapsedSeconds,
        hintViewCount: attempt.answers.reduce(
          (total, answer) =>
            total +
            Math.max(
              answer.hintViewCount ?? 0,
              learningStateByQuestion.get(answer.questionId.toString())
                ?.hintViewCount ?? 0,
            ),
          0,
        ),
        solutionViewCount: attempt.answers.filter(
          (answer) =>
            Boolean(answer.solutionViewedAt) ||
            Boolean(
              learningStateByQuestion.get(answer.questionId.toString())
                ?.solutionViewedAt,
            ),
        ).length,
        submittedAt: attempt.submittedAt,
      };
    });
  }

  private async updateDailyStats(
    attempt: TopikAttemptDocument,
    answeredCount: number,
    session: ClientSession,
  ) {
    const date = new Date(attempt.submittedAt ?? new Date());
    date.setHours(0, 0, 0, 0);

    await this.userStatsModel.findOneAndUpdate(
      { userId: attempt.userId, date },
      {
        $inc: {
          studyTimeSeconds: attempt.elapsedSeconds,
          totalQuestions: answeredCount,
          correctQuestions: attempt.correctCount,
          'categoryCounts.topik': answeredCount,
        },
      },
      { upsert: true, session },
    );
  }

  private async updateTopikSummary(
    attempt: TopikAttemptDocument,
    answerStats: SubmittedAnswerStat[],
    session: ClientSession,
  ) {
    let summary = await this.summaryModel
      .findOne({ userId: attempt.userId, section: TopikSection.READING })
      .session(session);

    if (!summary) {
      summary = new this.summaryModel({
        userId: attempt.userId,
        section: TopikSection.READING,
      });
    }

    if (attempt.mode === TopikAttemptMode.MOCK_EXAM) {
      summary.mockExamCount += 1;
      summary.totalScore += attempt.score;
      summary.lastScore = attempt.score;
      summary.bestScore = Math.max(summary.bestScore, attempt.score);
    } else if (attempt.mode === TopikAttemptMode.GUIDED) {
      summary.guidedCount = (summary.guidedCount ?? 0) + 1;
    } else {
      summary.practiceCount += 1;
    }

    summary.totalQuestions += answerStats.length;
    summary.correctQuestions += answerStats.filter(
      (answer) => answer.isCorrect,
    ).length;
    summary.totalStudySeconds += attempt.elapsedSeconds;
    summary.hintViewCount =
      (summary.hintViewCount ?? 0) +
      answerStats.reduce((total, answer) => total + answer.hintViewCount, 0);
    summary.solutionViewCount =
      (summary.solutionViewCount ?? 0) +
      answerStats.filter((answer) => answer.solutionViewed).length;
    summary.correctWithoutHintCount =
      (summary.correctWithoutHintCount ?? 0) +
      answerStats.filter(
        (answer) => answer.isCorrect && !answer.usedLearningSupport,
      ).length;
    summary.lastAttemptAt = attempt.submittedAt ?? new Date();

    const performanceByType = new Map(
      summary.typePerformance.map((performance) => [
        performance.questionType,
        performance,
      ]),
    );

    for (const answer of answerStats) {
      const questionType = answer.question.type;
      let performance = performanceByType.get(questionType);

      if (!performance) {
        summary.typePerformance.push({
          questionType,
          attempted: 0,
          correct: 0,
          totalDurationMs: 0,
          hintViewCount: 0,
          solutionViewCount: 0,
          correctWithoutHintCount: 0,
        });
        performance =
          summary.typePerformance[summary.typePerformance.length - 1];
        performanceByType.set(questionType, performance);
      }

      performance.attempted += 1;
      performance.correct += answer.isCorrect ? 1 : 0;
      performance.totalDurationMs += answer.durationMs;
      performance.hintViewCount =
        (performance.hintViewCount ?? 0) + answer.hintViewCount;
      performance.solutionViewCount =
        (performance.solutionViewCount ?? 0) + (answer.solutionViewed ? 1 : 0);
      performance.correctWithoutHintCount =
        (performance.correctWithoutHintCount ?? 0) +
        (answer.isCorrect && !answer.usedLearningSupport ? 1 : 0);
      performance.lastAnsweredAt = answer.answeredAt;
    }

    summary.markModified('typePerformance');
    await summary.save({ session });
  }

  private async updateQuestionPerformance(
    attempt: TopikAttemptDocument,
    answerStats: SubmittedAnswerStat[],
    session: ClientSession,
  ) {
    const existing = await this.questionPerformanceModel
      .find({
        userId: attempt.userId,
        questionId: {
          $in: answerStats.map((answer) => answer.question._id),
        },
      })
      .session(session);
    const performanceByQuestion = new Map(
      existing.map((performance) => [
        `${performance.questionId}:${performance.questionVersion}`,
        performance,
      ]),
    );

    for (const answer of answerStats) {
      const question = answer.question;
      const key = `${question._id}:${answer.questionVersion}`;
      let performance = performanceByQuestion.get(key);

      if (!performance) {
        performance = new this.questionPerformanceModel({
          userId: attempt.userId,
          questionId: question._id,
          questionVersion: answer.questionVersion,
          examId: attempt.examId,
          questionCode: question.code,
          questionNumber: question.number,
          questionType: question.type,
          difficulty: question.difficulty,
          tags: question.tags,
          firstAnsweredAt: answer.answeredAt,
        });
      }

      performance.attemptCount += 1;
      performance.correctCount += answer.isCorrect ? 1 : 0;
      performance.wrongCount += answer.isCorrect ? 0 : 1;
      performance.consecutiveCorrect = answer.isCorrect
        ? performance.consecutiveCorrect + 1
        : 0;
      performance.consecutiveWrong = answer.isCorrect
        ? 0
        : performance.consecutiveWrong + 1;
      performance.consecutiveIndependentCorrect =
        answer.isCorrect && !answer.usedLearningSupport
          ? (performance.consecutiveIndependentCorrect ?? 0) + 1
          : 0;
      performance.totalDurationMs += answer.durationMs;
      performance.lastDurationMs = answer.durationMs;
      if (
        answer.isCorrect &&
        (performance.fastestCorrectMs === 0 ||
          answer.durationMs < performance.fastestCorrectMs)
      ) {
        performance.fastestCorrectMs = answer.durationMs;
      }

      const selectedCount =
        performance.selectedChoiceCounts.get(answer.selectedChoiceKey) ?? 0;
      performance.selectedChoiceCounts.set(
        answer.selectedChoiceKey,
        selectedCount + 1,
      );
      performance.lastSelectedChoiceKey = answer.selectedChoiceKey;
      performance.lastResult = answer.isCorrect;
      performance.lastAnsweredAt = answer.answeredAt;
      performance.hintViewCount =
        (performance.hintViewCount ?? 0) + answer.hintViewCount;
      performance.solutionViewCount =
        (performance.solutionViewCount ?? 0) + (answer.solutionViewed ? 1 : 0);
      performance.correctWithoutHintCount =
        (performance.correctWithoutHintCount ?? 0) +
        (answer.isCorrect && !answer.usedLearningSupport ? 1 : 0);

      const mastery = calculateTopikMastery({
        attemptCount: performance.attemptCount,
        correctCount: performance.correctCount,
        consecutiveCorrect: performance.consecutiveCorrect,
        consecutiveWrong: performance.consecutiveWrong,
        consecutiveIndependentCorrect:
          performance.consecutiveIndependentCorrect,
        isCorrect: answer.isCorrect,
        usedLearningSupport: answer.usedLearningSupport,
        answeredAt: answer.answeredAt,
      });
      performance.masteryState = mastery.masteryState;
      performance.nextReviewAt = mastery.nextReviewAt;
      performance.markModified('selectedChoiceCounts');
      await performance.save({ session });
    }
  }

  private async getQuestionPerformanceList(
    userId: string,
    filter: Record<string, unknown>,
    sort: Record<string, 1 | -1>,
    limit: number,
    examType: TopikExamType,
    section?: TopikSection,
  ) {
    const { examIds, examById } = await this.getExamScope(examType, section);
    if (examIds.length === 0) return [];

    const performances = await this.questionPerformanceModel
      .find({
        userId: new Types.ObjectId(userId),
        questionType: {
          $nin: [
            TopikQuestionType.WRITING_SENTENCE_COMPLETION,
            TopikQuestionType.WRITING_DATA_DESCRIPTION,
            TopikQuestionType.WRITING_ARGUMENTATIVE_ESSAY,
          ],
        },
        ...filter,
        examId: { $in: examIds },
      })
      .sort(sort)
      .limit(limit)
      .lean();

    return performances.map((performance) => {
      const exam = examById.get(performance.examId.toString());

      return {
        questionId: performance.questionId.toString(),
        questionVersion: performance.questionVersion,
        examId: performance.examId.toString(),
        examCode: exam?.code ?? '',
        examType: exam?.examType ?? examType,
        section: exam?.section ?? section ?? TopikSection.READING,
        examRound: exam?.round ?? null,
        questionCode: performance.questionCode,
        questionNumber: performance.questionNumber,
        questionType: performance.questionType,
        difficulty: performance.difficulty,
        tags: performance.tags,
        attemptCount: performance.attemptCount,
        correctCount: performance.correctCount,
        wrongCount: performance.wrongCount,
        accuracy: this.percentage(
          performance.correctCount,
          performance.attemptCount,
        ),
        consecutiveCorrect: performance.consecutiveCorrect,
        consecutiveWrong: performance.consecutiveWrong,
        consecutiveIndependentCorrect:
          performance.consecutiveIndependentCorrect ?? 0,
        averageDurationMs:
          performance.attemptCount === 0
            ? 0
            : Math.round(
                performance.totalDurationMs / performance.attemptCount,
              ),
        lastDurationMs: performance.lastDurationMs,
        fastestCorrectMs: performance.fastestCorrectMs,
        hintViewCount: performance.hintViewCount ?? 0,
        solutionViewCount: performance.solutionViewCount ?? 0,
        correctWithoutHintCount: performance.correctWithoutHintCount ?? 0,
        selectedChoiceCounts: this.formatChoiceCounts(
          performance.selectedChoiceCounts,
        ),
        lastSelectedChoiceKey: performance.lastSelectedChoiceKey,
        lastResult: performance.lastResult,
        masteryState: performance.masteryState,
        firstAnsweredAt: performance.firstAnsweredAt,
        lastAnsweredAt: performance.lastAnsweredAt,
        nextReviewAt: performance.nextReviewAt,
      };
    });
  }

  private async getExamScope(examType: TopikExamType, section?: TopikSection) {
    const exams = await this.examModel
      .find({
        examType,
        ...(section ? { section } : {}),
      })
      .select('_id code examType section round')
      .lean();

    return {
      examIds: exams.map((exam) => exam._id),
      examById: new Map(exams.map((exam) => [exam._id.toString(), exam])),
    };
  }

  private emptySummary() {
    return {
      mockExamCount: 0,
      practiceCount: 0,
      guidedCount: 0,
      totalQuestions: 0,
      correctQuestions: 0,
      accuracy: 0,
      totalStudySeconds: 0,
      hintViewCount: 0,
      solutionViewCount: 0,
      correctWithoutHintCount: 0,
      bestScore: 0,
      lastScore: 0,
      averageScore: 0,
      lastAttemptAt: null,
      questionTypes: [],
    };
  }

  private percentage(value: number, total: number) {
    return total === 0 ? 0 : Math.round((value / total) * 1000) / 10;
  }

  private formatChoiceCounts(value: unknown) {
    if (value instanceof Map) {
      return Object.fromEntries(value);
    }

    return value ?? {};
  }
}
