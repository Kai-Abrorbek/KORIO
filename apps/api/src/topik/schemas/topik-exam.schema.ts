import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  TopikExamType,
  TopikI18nText,
  TopikI18nTextSchema,
  TopikPublishStatus,
  TopikSection,
} from './topik-content.schema';

export type TopikExamDocument = HydratedDocument<TopikExam>;

@Schema({ _id: false })
export class TopikExamSource {
  @Prop({ default: '' })
  title: string;

  @Prop({ default: '' })
  edition: string;

  @Prop({ default: '' })
  publisher: string;

  @Prop({ default: '' })
  reference: string;
}

export const TopikExamSourceSchema =
  SchemaFactory.createForClass(TopikExamSource);

@Schema({ timestamps: true })
export class TopikExam {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ type: TopikI18nTextSchema, required: true })
  title: TopikI18nText;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  description: TopikI18nText;

  @Prop({ type: String, required: true, enum: TopikExamType })
  examType: TopikExamType;

  @Prop({ type: String, required: true, enum: TopikSection })
  section: TopikSection;

  @Prop({ min: 2000, max: 2100 })
  year?: number;

  @Prop({ min: 1 })
  round?: number;

  @Prop({ required: true, min: 1 })
  durationMinutes: number;

  @Prop({ required: true, min: 1, max: 50, default: 50 })
  totalQuestions: number;

  @Prop({ required: true, min: 1, default: 100 })
  totalPoints: number;

  @Prop({ default: '' })
  listeningAudioUrl: string;

  @Prop({ required: true, min: 1, default: 1 })
  version: number;

  @Prop({
    type: String,
    required: true,
    enum: TopikPublishStatus,
    default: TopikPublishStatus.DRAFT,
  })
  status: TopikPublishStatus;

  @Prop({ type: TopikExamSourceSchema, default: {} })
  source: TopikExamSource;

  @Prop()
  publishedAt?: Date;

  @Prop({ default: true })
  isActive: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TopikExamSchema = SchemaFactory.createForClass(TopikExam);

TopikExamSchema.index({ code: 1 }, { unique: true });
TopikExamSchema.index({
  examType: 1,
  section: 1,
  status: 1,
  publishedAt: -1,
});
TopikExamSchema.index({ year: -1, round: 1, section: 1, version: -1 });
