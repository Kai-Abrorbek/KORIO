import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  TopikQuestionType,
  TopikSection,
} from './topik-content.schema';

export type TopikUserSummaryDocument = HydratedDocument<TopikUserSummary>;

@Schema({ _id: false })
export class TopikTypePerformance {
  @Prop({ type: String, required: true, enum: TopikQuestionType })
  questionType: TopikQuestionType;

  @Prop({ min: 0, default: 0 })
  attempted: number;

  @Prop({ min: 0, default: 0 })
  correct: number;

  @Prop({ min: 0, default: 0 })
  totalDurationMs: number;

  @Prop({ min: 0, default: 0 })
  hintViewCount: number;

  @Prop({ min: 0, default: 0 })
  solutionViewCount: number;

  @Prop({ min: 0, default: 0 })
  correctWithoutHintCount: number;

  @Prop()
  lastAnsweredAt?: Date;
}

export const TopikTypePerformanceSchema =
  SchemaFactory.createForClass(TopikTypePerformance);

@Schema({ timestamps: true })
export class TopikUserSummary {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: String, required: true, enum: TopikSection })
  section: TopikSection;

  @Prop({ min: 0, default: 0 })
  mockExamCount: number;

  @Prop({ min: 0, default: 0 })
  practiceCount: number;

  @Prop({ min: 0, default: 0 })
  guidedCount: number;

  @Prop({ min: 0, default: 0 })
  totalQuestions: number;

  @Prop({ min: 0, default: 0 })
  correctQuestions: number;

  @Prop({ min: 0, default: 0 })
  totalStudySeconds: number;

  @Prop({ min: 0, default: 0 })
  hintViewCount: number;

  @Prop({ min: 0, default: 0 })
  solutionViewCount: number;

  @Prop({ min: 0, default: 0 })
  correctWithoutHintCount: number;

  @Prop({ min: 0, default: 0 })
  bestScore: number;

  @Prop({ min: 0, default: 0 })
  lastScore: number;

  @Prop({ min: 0, default: 0 })
  totalScore: number;

  @Prop({ type: [TopikTypePerformanceSchema], default: [] })
  typePerformance: TopikTypePerformance[];

  @Prop()
  lastAttemptAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TopikUserSummarySchema =
  SchemaFactory.createForClass(TopikUserSummary);

TopikUserSummarySchema.index({ userId: 1, section: 1 }, { unique: true });
TopikUserSummarySchema.index({ section: 1, lastAttemptAt: -1 });
