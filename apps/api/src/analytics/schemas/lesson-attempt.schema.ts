import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonAttemptDocument = LessonAttempt & Document;

export type LessonAttemptStatus = 'in_progress' | 'completed';

/**
 * 레슨 한 판의 기록.
 *
 * **왜 새로 만드나.** 지금까지 레슨은 *끝났을 때만* 흔적이 남았다
 * (UserProgress 는 완료 시에만 upsert 된다). 그래서 이런 걸 아무도 답할 수 없었다:
 *
 *   · 이 레슨을 몇 명이 시작했나
 *   · 시작한 사람 중 몇 %가 끝냈나
 *   · 끝내지 못한 사람은 **몇 번째 문제에서** 나갔나
 *
 * 마지막 질문이 어드민에서 제일 중요한 화면(문제별 퍼널)의 전부인데, 완료
 * 기록만으로는 영원히 알 수 없다 — 나간 사람은 데이터에 존재하지도 않으니까.
 *
 * 이 구조는 이 레포에 이미 있다. `topik/schemas/topik-attempt.schema.ts` 가
 * 같은 문제를 이미 이렇게 풀고 있다 (startedAt · status · 문제별 기록).
 * TOPIK 트랙만 계측돼 있고 정작 메인 레슨 엔진이 빠져 있었다.
 *
 * ⚠️ 이 컬렉션은 **분석 전용**이다. 학습 로직(진행도·XP·보상)은 여전히
 *    UserProgress 가 진실이다. 여기 없는 값 때문에 학습이 막히면 안 된다 —
 *    기록에 실패해도 레슨은 그대로 진행돼야 한다.
 */
@Schema({ timestamps: true })
export class LessonAttempt {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true })
  lessonId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'LessonNode', default: null })
  nodeId: Types.ObjectId | null;

  /** 레슨에서 복사해 둔다. 분석 쿼리가 매번 조인하지 않게 */
  @Prop({ default: 0 })
  section: number;

  @Prop({ default: 0 })
  unit: number;

  @Prop({ default: '' })
  category: string;

  /** 서버가 이번 판에 실제로 내준 문제 수. 퍼널의 분모다 */
  @Prop({ default: 0 })
  questionCount: number;

  @Prop({ required: true })
  startedAt: Date;

  @Prop({ enum: ['in_progress', 'completed'], default: 'in_progress' })
  status: LessonAttemptStatus;

  /**
   * 도달한 **최대** 문제 번호 (0-based). 문제별 퍼널이 이 한 필드로 그려진다.
   *
   * 최대값만 들고 있는 이유: 복습 라운드에서 앞 문제로 되돌아가는데, 그때마다
   * 값이 내려가면 "어디까지 갔나" 를 잃는다. 갱신은 $max 로만 한다.
   */
  @Prop({ default: 0 })
  maxQuestionIndex: number;

  /**
   * 마지막으로 살아있다는 신호가 온 시각.
   *
   * 중도 이탈을 별도 cron 으로 정리하지 않는다 — 앱이 죽거나 비행기 모드가 되면
   * "끝냈다" 신호가 영영 안 온다. 대신 분석 시점에 `status: 'in_progress'` 이고
   * 이 값이 충분히 오래됐으면 이탈로 센다. 상태를 나중에 바꾸는 것보다
   * 읽을 때 판단하는 쪽이 틀릴 여지가 적다.
   */
  @Prop({ default: Date.now })
  lastSeenAt: Date;

  @Prop({ default: null })
  completedAt: Date | null;

  // ── 완료 시에만 채워진다 (UserProgress 와 같은 값. 조인 없이 보려고 복사) ──
  @Prop({ default: 0 })
  correctAnswers: number;

  @Prop({ default: 0 })
  totalAnswers: number;

  @Prop({ default: 0 })
  speedSeconds: number;

  @Prop({ default: 0 })
  xpEarned: number;
}

export const LessonAttemptSchema = SchemaFactory.createForClass(LessonAttempt);

// 어떤 유저가 이 레슨을 언제 했나 (유저 상세 화면)
LessonAttemptSchema.index({ userId: 1, startedAt: -1 });
// 레슨별 퍼널 — 어드민에서 제일 많이 도는 쿼리
LessonAttemptSchema.index({ lessonId: 1, startedAt: -1 });
// 기간별 전체 집계 (DAU 성 지표, 섹션·유닛 완료율)
LessonAttemptSchema.index({ startedAt: -1, status: 1 });
// 이탈 판정 — in_progress 인데 오래된 것
LessonAttemptSchema.index({ status: 1, lastSeenAt: 1 });
