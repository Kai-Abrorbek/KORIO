import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

/**
 * 틀린 문제 장부.
 *
 * 예전엔 오답이 UserProgress.wrongQuestionIds 에만 쌓였다. 그건 레슨 단위라
 * lessonId 가 반드시 있어야 하는데, 학습 로드 모드는 유닛 전체에서 문제를
 * 뽑아 오므로 넣을 lessonId 가 없어 오답이 통째로 유실됐다. 복습·마무리
 * 노드는 "틀린 것부터" 뽑으려고 이 기록을 보는데 늘 비어 있던 것이다.
 *
 * 여기는 레슨과 무관하게 "누가 어떤 문제를 틀렸나"만 남긴다. 어느 모드에서
 * 풀든 recordStudy 하나만 거치면 기록된다.
 */
@Schema({ timestamps: true })
export class UserMistake {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: Types.ObjectId;

  /** 누적 오답 횟수 */
  @Prop({ min: 0, default: 0 })
  wrongCount: number;

  /** 마지막으로 틀린 뒤로 연속 정답 횟수. 틀리면 0으로 돌아간다 */
  @Prop({ min: 0, default: 0 })
  streak: number;

  @Prop({ type: Date, default: null })
  lastWrongAt: Date | null;

  /**
   * 해소 시각. 틀린 뒤 연속 두 번 맞히면 채워진다.
   * null 인 것만 복습 대상이다 — 한 번 맞혔다고 지우면 요행으로 맞힌
   * 문제가 영영 안 돌아온다.
   */
  @Prop({ type: Date, default: null })
  resolvedAt: Date | null;
}

export type UserMistakeDocument = HydratedDocument<UserMistake>;
export const UserMistakeSchema = SchemaFactory.createForClass(UserMistake);

UserMistakeSchema.index({ userId: 1, questionId: 1 }, { unique: true });
// 복습 뽑기: 아직 해소 안 된 것 중 최근에 틀린 순
UserMistakeSchema.index({ userId: 1, resolvedAt: 1, lastWrongAt: -1 });
