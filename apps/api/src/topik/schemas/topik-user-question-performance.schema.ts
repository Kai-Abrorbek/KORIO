import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { TopikQuestionType } from './topik-content.schema';

export type TopikUserQuestionPerformanceDocument =
  HydratedDocument<TopikUserQuestionPerformance>;

export enum TopikMasteryState {
  NEW = 'new',
  LEARNING = 'learning',
  WEAK = 'weak',
  UNSTABLE = 'unstable',
  MASTERED = 'mastered',
}

@Schema({ timestamps: true })
export class TopikUserQuestionPerformance {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'TopikQuestion', required: true })
  questionId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  questionVersion: number;

  @Prop({ type: Types.ObjectId, ref: 'TopikExam', required: true })
  examId: Types.ObjectId;

  @Prop({ required: true })
  questionCode: string;

  @Prop({ required: true, min: 1, max: 50 })
  questionNumber: number;

  @Prop({ type: String, required: true, enum: TopikQuestionType })
  questionType: TopikQuestionType;

  @Prop({ min: 1, max: 5, default: 3 })
  difficulty: number;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ min: 0, default: 0 })
  attemptCount: number;

  @Prop({ min: 0, default: 0 })
  correctCount: number;

  @Prop({ min: 0, default: 0 })
  wrongCount: number;

  @Prop({ min: 0, default: 0 })
  consecutiveCorrect: number;

  @Prop({ min: 0, default: 0 })
  consecutiveWrong: number;

  @Prop({ min: 0, default: 0 })
  consecutiveIndependentCorrect: number;

  @Prop({ min: 0, default: 0 })
  totalDurationMs: number;

  @Prop({ min: 0, default: 0 })
  lastDurationMs: number;

  @Prop({ min: 0, default: 0 })
  fastestCorrectMs: number;

  @Prop({ min: 0, default: 0 })
  hintViewCount: number;

  @Prop({ min: 0, default: 0 })
  solutionViewCount: number;

  @Prop({ min: 0, default: 0 })
  correctWithoutHintCount: number;

  @Prop({ type: Map, of: Number, default: {} })
  selectedChoiceCounts: Map<string, number>;

  @Prop({ default: '' })
  lastSelectedChoiceKey: string;

  @Prop({ type: Boolean, default: null })
  lastResult: boolean | null;

  @Prop({
    type: String,
    required: true,
    enum: TopikMasteryState,
    default: TopikMasteryState.NEW,
  })
  masteryState: TopikMasteryState;

  @Prop()
  firstAnsweredAt?: Date;

  @Prop()
  lastAnsweredAt?: Date;

  @Prop()
  nextReviewAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TopikUserQuestionPerformanceSchema =
  SchemaFactory.createForClass(TopikUserQuestionPerformance);

TopikUserQuestionPerformanceSchema.index(
  { userId: 1, questionId: 1, questionVersion: 1 },
  { unique: true },
);
TopikUserQuestionPerformanceSchema.index({
  userId: 1,
  masteryState: 1,
  consecutiveWrong: -1,
  lastAnsweredAt: -1,
});
TopikUserQuestionPerformanceSchema.index({
  userId: 1,
  questionType: 1,
  lastAnsweredAt: -1,
});
TopikUserQuestionPerformanceSchema.index({ userId: 1, nextReviewAt: 1 });
TopikUserQuestionPerformanceSchema.index({
  questionId: 1,
  attemptCount: -1,
});
