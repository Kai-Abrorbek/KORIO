import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  TopikAudio,
  TopikAudioSchema,
  TopikChoice,
  TopikChoiceSchema,
  TopikPresentation,
  TopikPresentationSchema,
  TopikQuestionType,
  TopikSolution,
  TopikSolutionSchema,
  TopikSourceReference,
  TopikSourceReferenceSchema,
  TopikStimulus,
  TopikStimulusSchema,
  TopikTextBlock,
  TopikTextBlockSchema,
} from './topik-content.schema';

export type TopikQuestionDocument = HydratedDocument<TopikQuestion>;

@Schema({ timestamps: true })
export class TopikQuestion {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'TopikExam', required: true })
  examId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'TopikQuestionGroup', required: true })
  groupId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 50 })
  number: number;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ type: String, required: true, enum: TopikQuestionType })
  type: TopikQuestionType;

  @Prop({ required: true, min: 0, default: 2 })
  points: number;

  @Prop({ type: [TopikTextBlockSchema], default: [] })
  prompt: TopikTextBlock[];

  @Prop({ type: TopikStimulusSchema })
  stimulus?: TopikStimulus;

  @Prop({ type: TopikAudioSchema })
  audio?: TopikAudio;

  @Prop({
    type: [TopikChoiceSchema],
    required: true,
    validate: {
      validator: (choices?: TopikChoice[]) => choices?.length === 4,
      message: 'TOPIK multiple-choice questions must have exactly 4 choices',
    },
  })
  choices: TopikChoice[];

  @Prop({ required: true, select: false })
  correctChoiceKey: string;

  @Prop({ type: TopikSolutionSchema, default: {}, select: false })
  solution: TopikSolution;

  @Prop({ type: TopikPresentationSchema, required: true })
  presentation: TopikPresentation;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ min: 1, max: 5, default: 3 })
  difficulty: number;

  @Prop({ type: TopikSourceReferenceSchema, default: {} })
  source: TopikSourceReference;

  @Prop({ required: true, min: 1, default: 1 })
  version: number;

  @Prop({ default: true })
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TopikQuestionSchema = SchemaFactory.createForClass(TopikQuestion);

TopikQuestionSchema.index({ code: 1 }, { unique: true });
TopikQuestionSchema.index({ examId: 1, number: 1 }, { unique: true });
TopikQuestionSchema.index({ groupId: 1, order: 1 }, { unique: true });
TopikQuestionSchema.index({ type: 1, difficulty: 1, isActive: 1 });
TopikQuestionSchema.index({ tags: 1, isActive: 1 });

TopikQuestionSchema.pre('validate', function () {
  const choiceKeys = this.choices.map((choice) => choice.key);

  if (new Set(choiceKeys).size !== choiceKeys.length) {
    this.invalidate('choices', 'Choice keys must be unique within a question');
  }

  if (!choiceKeys.includes(this.correctChoiceKey)) {
    this.invalidate(
      'correctChoiceKey',
      'correctChoiceKey must match one of the question choices',
    );
  }

  const hintKeys = this.solution?.hints?.map((hint) => hint.key) ?? [];
  const hintLevels = this.solution?.hints?.map((hint) => hint.level) ?? [];
  const clueKeys = this.solution?.keyClues?.map((clue) => clue.key) ?? [];
  const stepKeys = this.solution?.steps?.map((step) => step.key) ?? [];

  if (new Set(hintKeys).size !== hintKeys.length) {
    this.invalidate('solution.hints', 'Hint keys must be unique');
  }
  if (new Set(hintLevels).size !== hintLevels.length) {
    this.invalidate('solution.hints', 'Hint levels must be unique');
  }
  if (new Set(clueKeys).size !== clueKeys.length) {
    this.invalidate('solution.keyClues', 'Key clue keys must be unique');
  }
  if (new Set(stepKeys).size !== stepKeys.length) {
    this.invalidate('solution.steps', 'Solution step keys must be unique');
  }
});
