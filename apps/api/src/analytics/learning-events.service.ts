import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  LessonAttempt,
  LessonAttemptDocument,
} from './schemas/lesson-attempt.schema';
import {
  QuestionAttempt,
  QuestionAttemptDocument,
} from './schemas/question-attempt.schema';
import {
  MAX_ANSWERS_PER_REPORT,
  MAX_QUESTION_DURATION_MS,
  MAX_QUESTION_INDEX,
} from './analytics.const';

/** 앱이 보고하는 답안 하나 */
export interface ReportedAnswer {
  questionId: string;
  index: number;
  isCorrect: boolean;
  skipped?: boolean;
  durationMs?: number;
  questionType?: string;
}

/**
 * 학습 이벤트 기록.
 *
 * ⚠️ **이 서비스는 절대 위로 던지지 않는다.** 분석 기록이 실패했다고 레슨이
 *    멈추면 그건 계측이 제품을 망가뜨리는 것이다. 모든 메서드가 실패를
 *    삼키고 로그만 남긴다 — 그래서 반환값도 "성공했나" 가 아니라 "쓸 수 있는
 *    id 가 있나" 다.
 *
 * 앱이 보내는 값(문제 번호·풀이 시간·정답 여부)은 전부 앱이 신고한다. 서버가
 * 검증할 방법이 없다 — 채점이 앱에 있다. 그래서 이 숫자들은 **학습 보상에
 * 쓰이지 않는다.** XP·보석·진행도는 기존 경로가 그대로 정한다. 여기 값은
 * 어드민이 보는 통계 전용이고, 상한만 걸어 오염을 막는다.
 */
@Injectable()
export class LearningEventsService {
  private readonly logger = new Logger(LearningEventsService.name);

  constructor(
    @InjectModel(LessonAttempt.name)
    private readonly attemptModel: Model<LessonAttemptDocument>,
    @InjectModel(QuestionAttempt.name)
    private readonly answerModel: Model<QuestionAttemptDocument>,
  ) {}

  /**
   * 레슨을 열었다. 한 판이 시작된다.
   *
   * @returns 판 id. 기록에 실패하면 null — 앱은 그냥 계측 없이 진행한다
   */
  async startLesson(params: {
    userId: string;
    lessonId: string;
    nodeId?: string | null;
    section?: number;
    unit?: number;
    category?: string;
    questionCount: number;
  }): Promise<string | null> {
    try {
      const now = new Date();
      const doc = await this.attemptModel.create({
        userId: new Types.ObjectId(params.userId),
        lessonId: new Types.ObjectId(params.lessonId),
        nodeId: params.nodeId ? new Types.ObjectId(params.nodeId) : null,
        section: params.section ?? 0,
        unit: params.unit ?? 0,
        category: params.category ?? '',
        questionCount: Math.max(0, Math.min(MAX_QUESTION_INDEX, params.questionCount)),
        startedAt: now,
        lastSeenAt: now,
        status: 'in_progress',
      });
      return doc._id.toString();
    } catch (e) {
      this.logger.warn(`레슨 시작 기록 실패: user=${params.userId} ${String(e)}`);
      return null;
    }
  }

  /**
   * 진행 중 보고. 앱이 몇 문제마다 한 번씩 부른다.
   *
   * 문제마다 부르지 않는 이유: 레슨 하나에 요청 17개는 과하다. 몇 개씩 묶어
   * 보내도 **어디까지 갔나**(maxQuestionIndex)는 그대로 남고, 그게 퍼널의 전부다.
   */
  async reportProgress(params: {
    userId: string;
    attemptId: string;
    index: number;
    answers?: ReportedAnswer[];
  }): Promise<void> {
    if (!Types.ObjectId.isValid(params.attemptId)) return;
    try {
      const attemptId = new Types.ObjectId(params.attemptId);
      const userId = new Types.ObjectId(params.userId);

      // 남의 판에 쓰지 못하게 userId 를 조건에 건다.
      // $max 로만 올린다 — 복습 라운드에서 앞 문제로 돌아가도 값이 안 내려간다
      const attempt = await this.attemptModel.findOneAndUpdate(
        { _id: attemptId, userId },
        {
          $max: {
            maxQuestionIndex: clampIndex(params.index),
          },
          $set: { lastSeenAt: new Date() },
        },
        { returnDocument: 'after' },
      );
      if (!attempt) return;

      await this.saveAnswers(userId, attempt, params.answers);
    } catch (e) {
      this.logger.warn(`진행 기록 실패: attempt=${params.attemptId} ${String(e)}`);
    }
  }

  /**
   * 판을 닫는다. 완료 처리와 같이 불린다.
   *
   * 앱이 attemptId 를 안 보내는 경우(구버전, 시작 기록 실패)를 위해 **열려 있는
   * 가장 최근 판**으로 떨어진다. 그래야 배포 직후 옛 앱이 남아 있어도 완료가
   * 통계에서 통째로 사라지지 않는다.
   */
  async completeLesson(params: {
    userId: string;
    lessonId: string;
    attemptId?: string | null;
    correctAnswers: number;
    totalAnswers: number;
    speedSeconds: number;
    xpEarned: number;
    answers?: ReportedAnswer[];
  }): Promise<void> {
    try {
      const userId = new Types.ObjectId(params.userId);
      const filter =
        params.attemptId && Types.ObjectId.isValid(params.attemptId)
          ? { _id: new Types.ObjectId(params.attemptId), userId }
          : {
              userId,
              lessonId: new Types.ObjectId(params.lessonId),
              status: 'in_progress' as const,
            };

      const now = new Date();
      const attempt = await this.attemptModel.findOneAndUpdate(
        filter,
        {
          $set: {
            status: 'completed',
            completedAt: now,
            lastSeenAt: now,
            correctAnswers: params.correctAnswers,
            totalAnswers: params.totalAnswers,
            speedSeconds: params.speedSeconds,
            xpEarned: params.xpEarned,
          },
          $max: { maxQuestionIndex: clampIndex(params.totalAnswers) },
        },
        // attemptId 없이 떨어진 경우 가장 최근 판을 고른다
        { sort: { startedAt: -1 }, returnDocument: 'after' },
      );
      if (!attempt) return;

      await this.saveAnswers(userId, attempt, params.answers);
    } catch (e) {
      this.logger.warn(`레슨 완료 기록 실패: user=${params.userId} ${String(e)}`);
    }
  }

  /**
   * 답안을 저장한다.
   *
   * `ordered: false` + 유니크 인덱스 조합으로 중복을 흘려보낸다 — 앱이 진행
   * 보고를 재시도하거나 완료 때 앞 문제를 겹쳐 보내는 일이 실제로 생기는데,
   * 그때마다 통계가 두 배가 되면 안 된다. 중복 키 에러(11000)는 정상 흐름이다.
   */
  private async saveAnswers(
    userId: Types.ObjectId,
    attempt: LessonAttemptDocument,
    answers?: ReportedAnswer[],
  ): Promise<void> {
    if (!answers?.length) return;

    const rows = answers
      .filter((a) => a && Types.ObjectId.isValid(a.questionId))
      .slice(0, MAX_ANSWERS_PER_REPORT)
      .map((a) => ({
        userId,
        attemptId: attempt._id,
        lessonId: attempt.lessonId,
        questionId: new Types.ObjectId(a.questionId),
        questionType: (a.questionType ?? '').slice(0, 40),
        index: clampIndex(a.index),
        isCorrect: !!a.isCorrect,
        skipped: !!a.skipped,
        durationMs: Math.max(
          0,
          Math.min(MAX_QUESTION_DURATION_MS, Math.floor(a.durationMs ?? 0)),
        ),
        answeredAt: new Date(),
      }));
    if (!rows.length) return;

    try {
      await this.answerModel.insertMany(rows, { ordered: false });
    } catch (e: any) {
      // 11000 = 중복 키. 같은 답을 두 번 보고한 것이라 버리는 게 맞다
      if (e?.code !== 11000 && e?.writeErrors?.[0]?.code !== 11000) {
        this.logger.warn(`답안 기록 실패: attempt=${attempt._id} ${String(e)}`);
      }
    }
  }
}

function clampIndex(value: unknown): number {
  const n = Math.floor(Number(value));
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, MAX_QUESTION_INDEX);
}
