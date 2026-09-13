import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

/**
 * 말하기 연습을 주제(표현 팩)별로 어디까지 했는지.
 *
 * UserExpressionProgress(표현 단위 학습 진도)와 일부러 분리했다. 저쪽은
 * "이 표현을 봤나 / 외웠나" 를 SM-2 간격으로 관리하는 기록이고, 여기는
 * "이 주제를 말하기로 몇 번째 문장까지 갔나" 라는 **세션 커서**다. 성격이
 * 다르고, 저쪽 문서에 커서를 섞으면 복습 스케줄 계산이 지저분해진다.
 */
@Schema({ timestamps: true })
export class UserSpeakingProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  /** 표현 팩 코드. ObjectId 가 아니라 코드로 잡는다 — 앱이 코드로 라우팅한다 */
  @Prop({ required: true, trim: true })
  packCode: string;

  /** 다음에 시작할 문장 번호 (0-based) */
  @Prop({ min: 0, default: 0 })
  index: number;

  /**
   * 저장 당시의 문장 수. 시드가 늘어나면 index 를 그대로 믿어도 되는지
   * 판단하는 데 쓴다 (줄어든 경우 클램프).
   */
  @Prop({ min: 0, default: 0 })
  total: number;

  /** 이 주제를 끝까지 마친 횟수. 끝내면 index 는 0 으로 돌아간다 */
  @Prop({ min: 0, default: 0 })
  completedCount: number;

  @Prop({ type: Date, default: null })
  lastSpokenAt: Date | null;
}

export type UserSpeakingProgressDocument =
  HydratedDocument<UserSpeakingProgress>;
export const UserSpeakingProgressSchema = SchemaFactory.createForClass(
  UserSpeakingProgress,
);

UserSpeakingProgressSchema.index({ userId: 1, packCode: 1 }, { unique: true });
