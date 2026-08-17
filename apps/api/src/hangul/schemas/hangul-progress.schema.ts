import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type HangulProgressDocument = HangulProgress & Document;

/**
 * 유저 x 자모 1행. mastery 는 저장하지 않고 score 에서 파생시킨다(값 드리프트 방지).
 */
@Schema({ timestamps: true })
export class HangulProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  characterId: string;

  /** 정답 +1 / 오답 -1 누적. 0 ~ HANGUL_MAX_SCORE 로 클램프된다. */
  @Prop({ default: 0 })
  score: number;

  @Prop({ default: 0 })
  correctCount: number;

  @Prop({ default: 0 })
  wrongCount: number;

  @Prop()
  lastSeenAt: Date;
}

export const HangulProgressSchema =
  SchemaFactory.createForClass(HangulProgress);

HangulProgressSchema.index({ userId: 1, characterId: 1 }, { unique: true });
