import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Expression } from './expression.schema';

export enum UserExpressionState {
  NEW = 'new',
  LEARNING = 'learning',
  REVIEW = 'review',
  MASTERED = 'mastered',
}

@Schema({ timestamps: true })
export class UserExpressionProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Expression.name, required: true })
  expressionId: Types.ObjectId;

  @Prop({ enum: UserExpressionState, default: UserExpressionState.NEW })
  state: UserExpressionState;

  @Prop({ min: 0, default: 0 })
  viewedCount: number;

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

  @Prop({ default: false })
  isSaved: boolean;

  @Prop({ type: Date, default: null })
  savedAt: Date | null;

  @Prop({ type: Date, default: null })
  firstViewedAt: Date | null;

  @Prop({ type: Date, default: null })
  lastViewedAt: Date | null;

  @Prop({ type: Date, default: null })
  learnedAt: Date | null;

  @Prop({ type: Date, default: null })
  nextReviewAt: Date | null;

  @Prop({ type: Date, default: null })
  lastReviewedAt: Date | null;

  @Prop({ type: Date, default: null })
  masteredAt: Date | null;
}

export type UserExpressionProgressDocument =
  HydratedDocument<UserExpressionProgress>;
export const UserExpressionProgressSchema = SchemaFactory.createForClass(
  UserExpressionProgress,
);

UserExpressionProgressSchema.index(
  { userId: 1, expressionId: 1 },
  { unique: true },
);
UserExpressionProgressSchema.index({
  userId: 1,
  state: 1,
  nextReviewAt: 1,
});
UserExpressionProgressSchema.index({ userId: 1, isSaved: 1, savedAt: -1 });
UserExpressionProgressSchema.index({ userId: 1, lastViewedAt: -1 });
