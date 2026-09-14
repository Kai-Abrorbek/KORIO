import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionAttemptDocument = QuestionAttempt & Document;

/**
 * 문제 하나를 푼 기록. **한 번 풀 때마다 한 행.**
 *
 * **왜 UserMistake 로는 안 되나.** UserMistake 는 (유저 × 문제) 하나당 한 행에
 * 누적 카운트를 쌓는 장부다. 그래서:
 *
 *   · 한 번도 안 틀린 문제는 **행이 아예 안 생긴다** → 정답률의 분모가 없다
 *   · 언제 몇 초 걸려 풀었는지가 남지 않는다
 *   · 같은 문제를 다섯 번 푼 것과 한 번 푼 것이 구분되지 않는다
 *
 * 즉 "이 문제 정답률이 몇 %냐" 를 지금 데이터로는 **계산할 수 없다.** 어드민
 * 문제 품질 화면(정답률·풀이시간·skip·너무 쉬움/어려움)이 통째로 이 컬렉션
 * 위에 선다.
 *
 * ⚠️ 행이 빠르게 늘어난다 (유저당 레슨 하나에 17행). 그래서 필드를 최소로 두고,
 *    분석은 이 원본이 아니라 집계 결과를 쓰는 쪽으로 가야 한다. 보존 기간이
 *    필요해지면 TTL 인덱스를 거는 게 맞다 — 지금은 데이터가 없어서 안 건다.
 */
@Schema({ timestamps: true })
export class QuestionAttempt {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  /** 어느 판에서 나온 답인지. 퍼널에서 레슨 한 판과 묶는 열쇠 */
  @Prop({ type: Types.ObjectId, ref: 'LessonAttempt', required: true })
  attemptId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true })
  lessonId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: Types.ObjectId;

  /** 문제 타입별 정답률 비교에 쓴다. 조인 없이 보려고 복사해 둔다 */
  @Prop({ default: '' })
  questionType: string;

  /** 이 판에서 몇 번째로 나온 문제인지 (0-based) */
  @Prop({ default: 0 })
  index: number;

  @Prop({ default: false })
  isCorrect: boolean;

  /**
   * 건너뛴 문제.
   *
   * 지금 레슨 UI 에는 건너뛰기가 없지만, 말하기·발음처럼 못 하고 넘어가는
   * 자리가 생기면 여기로 들어온다. 없는 개념을 미리 만든 게 아니라
   * "정답도 오답도 아닌" 경우를 0 이나 오답으로 오염시키지 않으려는 자리다.
   */
  @Prop({ default: false })
  skipped: boolean;

  /** 이 문제에 쓴 시간 (ms). 앱이 잰다 */
  @Prop({ default: 0 })
  durationMs: number;

  @Prop({ default: Date.now })
  answeredAt: Date;
}

export const QuestionAttemptSchema =
  SchemaFactory.createForClass(QuestionAttempt);

// 문제별 집계 — 정답률·평균 풀이시간
QuestionAttemptSchema.index({ questionId: 1, answeredAt: -1 });
// 레슨 한 판 안의 순서 (문제별 퍼널)
QuestionAttemptSchema.index({ attemptId: 1, index: 1 });
// 같은 판에서 같은 문제를 두 번 보고해도 한 번만 남는다.
// 앱이 진행 보고를 재시도하거나 완료 때 겹쳐 보내는 일이 실제로 생긴다
QuestionAttemptSchema.index(
  { attemptId: 1, questionId: 1, index: 1 },
  { unique: true },
);
// 타입별 비교
QuestionAttemptSchema.index({ questionType: 1, answeredAt: -1 });
