import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  TopikAudio,
  TopikAudioSchema,
  TopikPresentation,
  TopikPresentationSchema,
  TopikStimulus,
  TopikStimulusSchema,
  TopikTextBlock,
  TopikTextBlockSchema,
} from './topik-content.schema';

export type TopikQuestionGroupDocument = HydratedDocument<TopikQuestionGroup>;

@Schema({ timestamps: true })
export class TopikQuestionGroup {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'TopikExam', required: true })
  examId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ required: true, min: 1, max: 70 })
  startNumber: number;

  @Prop({ required: true, min: 1, max: 70 })
  endNumber: number;

  @Prop({ type: [TopikTextBlockSchema], default: [] })
  instruction: TopikTextBlock[];

  @Prop({ type: TopikStimulusSchema })
  sharedStimulus?: TopikStimulus;

  @Prop({ type: TopikAudioSchema })
  sharedAudio?: TopikAudio;

  @Prop({ required: true, min: 0, default: 2 })
  pointsPerQuestion: number;

  @Prop({ type: TopikPresentationSchema, required: true })
  presentation: TopikPresentation;

  @Prop({ required: true, min: 1, default: 1 })
  version: number;

  @Prop({ default: true })
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TopikQuestionGroupSchema =
  SchemaFactory.createForClass(TopikQuestionGroup);

TopikQuestionGroupSchema.index({ examId: 1, code: 1 }, { unique: true });
TopikQuestionGroupSchema.index({ examId: 1, order: 1 }, { unique: true });
TopikQuestionGroupSchema.index({
  examId: 1,
  startNumber: 1,
  endNumber: 1,
});

TopikQuestionGroupSchema.pre('validate', function () {
  if (this.startNumber > this.endNumber) {
    this.invalidate(
      'endNumber',
      'endNumber must be greater than or equal to startNumber',
    );
  }
});
