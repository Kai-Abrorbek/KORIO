import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TopikAttemptDocument = HydratedDocument<TopikAttempt>;

export enum TopikAttemptMode {
  PRACTICE = 'practice',
  MOCK_EXAM = 'mock_exam',
}

export enum TopikAttemptStatus {
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  ABANDONED = 'abandoned',
}

@Schema({ _id: false })
export class TopikAttemptAnswer {
  @Prop({ type: Types.ObjectId, ref: 'TopikQuestion', required: true })
  questionId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  questionVersion: number;

  @Prop({ required: true })
  selectedChoiceKey: string;

  @Prop({ min: 0, default: 0 })
  durationMs: number;

  @Prop({ default: () => new Date() })
  answeredAt: Date;

  @Prop({ type: Boolean, default: null })
  isCorrect: boolean | null;
}

export const TopikAttemptAnswerSchema =
  SchemaFactory.createForClass(TopikAttemptAnswer);

@Schema({ timestamps: true })
export class TopikAttempt {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'TopikExam', required: true })
  examId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  examVersion: number;

  @Prop({ required: true, enum: TopikAttemptMode })
  mode: TopikAttemptMode;

  @Prop({
    required: true,
    enum: TopikAttemptStatus,
    default: TopikAttemptStatus.IN_PROGRESS,
  })
  status: TopikAttemptStatus;

  @Prop({ type: [Types.ObjectId], ref: 'TopikQuestion', default: [] })
  questionIds: Types.ObjectId[];

  @Prop({ type: [TopikAttemptAnswerSchema], default: [] })
  answers: TopikAttemptAnswer[];

  @Prop({ min: 1, max: 50, default: 1 })
  currentQuestionNumber: number;

  @Prop({ min: 0, default: 0 })
  elapsedSeconds: number;

  @Prop({ min: 0, default: 0 })
  correctCount: number;

  @Prop({ min: 0, default: 0 })
  score: number;

  @Prop({ default: () => new Date() })
  startedAt: Date;

  @Prop({ default: () => new Date() })
  lastSavedAt: Date;

  @Prop()
  submittedAt?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TopikAttemptSchema = SchemaFactory.createForClass(TopikAttempt);

TopikAttemptSchema.index({ userId: 1, status: 1, updatedAt: -1 });
TopikAttemptSchema.index({
  userId: 1,
  examId: 1,
  mode: 1,
  createdAt: -1,
});
TopikAttemptSchema.index({ examId: 1, submittedAt: -1 });

TopikAttemptSchema.pre('validate', function () {
  const questionIds = this.answers.map((answer) => answer.questionId.toString());

  if (new Set(questionIds).size !== questionIds.length) {
    this.invalidate('answers', 'Only one answer per question can be stored');
  }

  if (this.answers.length > 50) {
    this.invalidate('answers', 'A TOPIK reading attempt cannot exceed 50 answers');
  }
});
