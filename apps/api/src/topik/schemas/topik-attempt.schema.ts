import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type TopikAttemptDocument = HydratedDocument<TopikAttempt>;

export enum TopikAttemptMode {
  PRACTICE = 'practice',
  GUIDED = 'guided',
  MOCK_EXAM = 'mock_exam',
}

export enum TopikAttemptStatus {
  IN_PROGRESS = 'in_progress',
  SUBMITTED = 'submitted',
  ABANDONED = 'abandoned',
}

@Schema({ _id: false })
export class TopikWrittenResponse {
  @Prop({ required: true })
  fieldKey: string;

  @Prop({ default: '' })
  text: string;
}

export const TopikWrittenResponseSchema =
  SchemaFactory.createForClass(TopikWrittenResponse);

@Schema({ _id: false })
export class TopikAttemptAnswer {
  @Prop({ type: Types.ObjectId, ref: 'TopikQuestion', required: true })
  questionId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  questionVersion: number;

  @Prop({ default: '' })
  selectedChoiceKey: string;

  @Prop({ type: [TopikWrittenResponseSchema], default: [] })
  writtenResponses?: TopikWrittenResponse[];

  @Prop({ min: 0, default: 0 })
  durationMs: number;

  @Prop({ default: () => new Date() })
  answeredAt: Date;

  @Prop({ type: [String], default: [] })
  usedHintKeys: string[];

  @Prop({ min: 0, default: 0 })
  hintViewCount: number;

  @Prop({ type: Date, default: null })
  solutionViewedAt?: Date | null;

  @Prop({ type: Boolean, default: null })
  isCorrect: boolean | null;
}

export const TopikAttemptAnswerSchema =
  SchemaFactory.createForClass(TopikAttemptAnswer);

@Schema({ _id: false })
export class TopikAttemptLearningState {
  @Prop({ type: Types.ObjectId, ref: 'TopikQuestion', required: true })
  questionId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  questionVersion: number;

  @Prop({ type: [String], default: [] })
  revealedHintKeys: string[];

  @Prop({ min: 0, default: 0 })
  hintViewCount: number;

  @Prop({ type: Date, default: null })
  lastHintViewedAt?: Date | null;

  @Prop({ type: Date, default: null })
  solutionViewedAt?: Date | null;
}

export const TopikAttemptLearningStateSchema = SchemaFactory.createForClass(
  TopikAttemptLearningState,
);

@Schema({ timestamps: true })
export class TopikAttempt {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'TopikExam', required: true })
  examId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  examVersion: number;

  @Prop({ type: String, required: true, enum: TopikAttemptMode })
  mode: TopikAttemptMode;

  @Prop({
    type: String,
    required: true,
    enum: TopikAttemptStatus,
    default: TopikAttemptStatus.IN_PROGRESS,
  })
  status: TopikAttemptStatus;

  @Prop({ type: [Types.ObjectId], ref: 'TopikQuestion', default: [] })
  questionIds: Types.ObjectId[];

  @Prop({ type: [TopikAttemptAnswerSchema], default: [] })
  answers: TopikAttemptAnswer[];

  @Prop({ type: [TopikAttemptLearningStateSchema], default: [] })
  learningStates: TopikAttemptLearningState[];

  @Prop({ min: 1, max: 54, default: 1 })
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

  @Prop({ type: Date, default: null })
  statsAppliedAt?: Date | null;

  @Prop({ min: 0, default: 0 })
  statsVersion: number;

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
TopikAttemptSchema.index({ status: 1, statsAppliedAt: 1, submittedAt: 1 });

TopikAttemptSchema.pre('validate', function () {
  const questionIds = this.answers.map((answer) =>
    answer.questionId.toString(),
  );

  if (new Set(questionIds).size !== questionIds.length) {
    this.invalidate('answers', 'Only one answer per question can be stored');
  }

  if (this.answers.length > 50) {
    this.invalidate(
      'answers',
      'A TOPIK reading attempt cannot exceed 50 answers',
    );
  }

  for (const answer of this.answers) {
    const writtenFieldKeys = (answer.writtenResponses ?? []).map(
      (response) => response.fieldKey,
    );
    if (new Set(writtenFieldKeys).size !== writtenFieldKeys.length) {
      this.invalidate(
        'answers',
        'Written response field keys must be unique within an answer',
      );
    }

    const usedHintKeys = answer.usedHintKeys ?? [];

    if (new Set(usedHintKeys).size !== usedHintKeys.length) {
      this.invalidate(
        'answers',
        'usedHintKeys must be unique within an answer',
      );
    }
  }

  const learningStates = this.learningStates ?? [];
  const learningQuestionIds = learningStates.map((state) =>
    state.questionId.toString(),
  );
  if (new Set(learningQuestionIds).size !== learningQuestionIds.length) {
    this.invalidate(
      'learningStates',
      'Only one learning state per question can be stored',
    );
  }

  for (const state of learningStates) {
    const revealedHintKeys = state.revealedHintKeys ?? [];

    if (new Set(revealedHintKeys).size !== revealedHintKeys.length) {
      this.invalidate(
        'learningStates',
        'revealedHintKeys must be unique within a learning state',
      );
    }
  }
});
