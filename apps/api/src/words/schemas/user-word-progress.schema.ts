import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export enum UserWordState {
  NEW = 'new',
  LEARNING = 'learning',
  REVIEW = 'review',
  MASTERED = 'mastered',
}

@Schema({ timestamps: true })
export class UserWordProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Word', required: true })
  wordId: Types.ObjectId;

  @Prop({ enum: UserWordState, default: UserWordState.NEW })
  state: UserWordState;

  @Prop({ min: 0, default: 0 })
  correctCount: number;

  @Prop({ min: 0, default: 0 })
  incorrectCount: number;

  @Prop({ min: 0, default: 0 })
  consecutiveCorrect: number;

  @Prop({ min: 1.3, max: 3, default: 2.5 })
  easeFactor: number;

  @Prop({ min: 0, default: 0 })
  intervalDays: number;

  @Prop({ type: Date, default: null })
  nextReviewAt: Date | null;

  @Prop({ type: Date, default: null })
  lastReviewedAt: Date | null;

  @Prop({ type: Date, default: null })
  masteredAt: Date | null;
}

export type UserWordProgressDocument = HydratedDocument<UserWordProgress>;
export const UserWordProgressSchema =
  SchemaFactory.createForClass(UserWordProgress);

UserWordProgressSchema.index({ userId: 1, wordId: 1 }, { unique: true });
UserWordProgressSchema.index({ userId: 1, state: 1, nextReviewAt: 1 });
