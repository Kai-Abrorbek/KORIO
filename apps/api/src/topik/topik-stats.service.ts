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
import { TopikSection } from './schemas/topik-content.schema';
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
      const answerStats = attempt.answers.map((answer) => {
        const question = questionById.get(answer.questionId.toString());

        if (!question) {
          throw new NotFoundException('TOPIK_QUESTION_NOT_FOUND');
        }

        const usedHintKeys = answer.usedHintKeys ?? [];
        const hintViewCount = answer.hintViewCount ?? 0;

        return {
          question,
          questionVersion: answer.questionVersion,
          selectedChoiceKey: answer.selectedChoiceKey,
          durationMs: answer.durationMs,
          answeredAt: answer.answeredAt,
          isCorrect: answer.isCorrect === true,
          hintViewCount,
          solutionViewed: Boolean(answer.solutionViewedAt),
          usedLearningSupport:
            hintViewCount > 0 ||
            usedHintKeys.length > 0 ||
            Boolean(answer.solutionViewedAt),
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

  public async getSummary(userId: string) {
    const summary = await this.summaryModel
      .findOne({
        userId: new Types.ObjectId(userId),
        section: TopikSection.READING,
      })
      .lean();

    if (!summary) {
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

    return {
      mockExamCount: summary.mockExamCount,
      practiceCount: summary.practiceCount,
      guidedCount: summary.guidedCount ?? 0,
      totalQuestions: summary.totalQuestions,
      correctQuestions: summary.correctQuestions,
      accuracy: this.percentage(
        summary.correctQuestions,
        summary.totalQuestions,
      ),
      totalStudySeconds: summary.totalStudySeconds,
      hintViewCount: summary.hintViewCount ?? 0,
      solutionViewCount: summary.solutionViewCount ?? 0,
      correctWithoutHintCount: summary.correctWithoutHintCount ?? 0,
      bestScore: summary.bestScore,
      lastScore: summary.lastScore,
      averageScore:
        summary.mockExamCount === 0
          ? 0
          : Math.round((summary.totalScore / summary.mockExamCount) * 10) / 10,
      lastAttemptAt: summary.lastAttemptAt ?? null,
      questionTypes: summary.typePerformance.map((performance) => ({
        questionType: performance.questionType,
        attempted: performance.attempted,
        correct: performance.correct,
        accuracy: this.percentage(performance.correct, performance.attempted),
        averageDurationMs:
          performance.attempted === 0
            ? 0
            : Math.round(
                performance.totalDurationMs / performance.attempted,
              ),
        hintViewCount: performance.hintViewCount ?? 0,
        solutionViewCount: performance.solutionViewCount ?? 0,
        correctWithoutHintCount: performance.correctWithoutHintCount ?? 0,
        lastAnsweredAt: performance.lastAnsweredAt ?? null,
      })),
    };
  }

  public async getQuestionTypes(userId: string) {
    const summary = await this.getSummary(userId);
    return summary.questionTypes;
  }

  public getWeakQuestions(userId: string, limit: number) {
    return this.getQuestionPerformanceList(
      userId,
      {
        masteryState: {
          $in: [TopikMasteryState.WEAK, TopikMasteryState.UNSTABLE],
        },
      },
      { consecutiveWrong: -1, wrongCount: -1, lastAnsweredAt: -1 },
      limit,
    );
  }

  public getMasteredQuestions(userId: string, limit: number) {
    return this.getQuestionPerformanceList(
      userId,
      { masteryState: TopikMasteryState.MASTERED },
      { consecutiveCorrect: -1, correctCount: -1, lastAnsweredAt: -1 },
      limit,
    );
  }

  public getReviewQueue(userId: string, limit: number) {
    return this.getQuestionPerformanceList(
      userId,
      { nextReviewAt: { $lte: new Date() } },
      { nextReviewAt: 1, consecutiveWrong: -1 },
      limit,
    );
  }

  public async getHistory(userId: string, limit: number) {
    const attempts = await this.attemptModel
      .find({
        userId: new Types.ObjectId(userId),
        status: TopikAttemptStatus.SUBMITTED,
      })
      .sort({ submittedAt: -1 })
      .limit(limit)
      .lean();

    return attempts.map((attempt) => ({
      attemptId: attempt._id.toString(),
      examId: attempt.examId.toString(),
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
        (total, answer) => total + (answer.hintViewCount ?? 0),
        0,
      ),
      solutionViewCount: attempt.answers.filter(
        (answer) => Boolean(answer.solutionViewedAt),
      ).length,
      submittedAt: attempt.submittedAt,
    }));
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
    summary.hintViewCount = (summary.hintViewCount ?? 0) + answerStats.reduce(
      (total, answer) => total + answer.hintViewCount,
      0,
    );
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
        (performance.solutionViewCount ?? 0) +
        (answer.solutionViewed ? 1 : 0);
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
        (performance.solutionViewCount ?? 0) +
        (answer.solutionViewed ? 1 : 0);
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
  ) {
    const performances = await this.questionPerformanceModel
      .find({ userId: new Types.ObjectId(userId), ...filter })
      .sort(sort)
      .limit(limit)
      .lean();

    return performances.map((performance) => ({
      questionId: performance.questionId.toString(),
      questionVersion: performance.questionVersion,
      examId: performance.examId.toString(),
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
    }));
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
