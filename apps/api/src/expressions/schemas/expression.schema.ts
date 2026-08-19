import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Question } from '../../lessons/schemas/question.schema';
import {
  ExpressionPack,
  LocalizedExpressionText,
  LocalizedExpressionTextSchema,
} from './expression-pack.schema';

export enum ExpressionSpeechLevel {
  POLITE = 'polite',
  CASUAL = 'casual',
  FORMAL = 'formal',
}

@Schema({ _id: false })
export class ExpressionPronunciation {
  @Prop({ default: '' })
  romanization: string;

  @Prop({ default: '' })
  ttsText: string;

  @Prop({ default: '' })
  audioUrl: string;
}

export const ExpressionPronunciationSchema = SchemaFactory.createForClass(
  ExpressionPronunciation,
);

@Schema({ _id: false })
export class ExpressionMedia {
  @Prop({ default: '' })
  emoji: string;

  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ type: LocalizedExpressionTextSchema, default: () => ({}) })
  imageAlt: LocalizedExpressionText;
}

export const ExpressionMediaSchema =
  SchemaFactory.createForClass(ExpressionMedia);

@Schema({ _id: false })
export class ExpressionPlacement {
  @Prop({ required: true, min: 1 })
  section: number;

  @Prop({ required: true, min: 1 })
  unit: number;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ default: true })
  isCore: boolean;
}

export const ExpressionPlacementSchema = SchemaFactory.createForClass(
  ExpressionPlacement,
);

@Schema({ timestamps: true })
export class Expression {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: ExpressionPack.name, required: true })
  packId: Types.ObjectId;

  @Prop({ enum: ['ko'], default: 'ko' })
  targetLanguage: 'ko';

  @Prop({ required: true, trim: true })
  korean: string;

  @Prop({ type: LocalizedExpressionTextSchema, required: true })
  meaning: LocalizedExpressionText;

  @Prop({ type: LocalizedExpressionTextSchema, required: true })
  context: LocalizedExpressionText;

  @Prop({ type: LocalizedExpressionTextSchema, default: () => ({}) })
  usageNote: LocalizedExpressionText;

  @Prop({
    enum: ExpressionSpeechLevel,
    default: ExpressionSpeechLevel.POLITE,
  })
  speechLevel: ExpressionSpeechLevel;

  @Prop({ type: ExpressionPronunciationSchema, default: () => ({}) })
  pronunciation: ExpressionPronunciation;

  @Prop({ type: ExpressionMediaSchema, default: () => ({}) })
  media: ExpressionMedia;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ type: [ExpressionPlacementSchema], default: [] })
  placements: ExpressionPlacement[];

  @Prop({ type: [Types.ObjectId], ref: Question.name, default: [] })
  practiceQuestionIds: Types.ObjectId[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ min: 1, max: 5, default: 1 })
  difficulty: number;

  @Prop({ default: true })
  isActive: boolean;
}

export type ExpressionDocument = HydratedDocument<Expression>;
export const ExpressionSchema = SchemaFactory.createForClass(Expression);

ExpressionSchema.index({ code: 1 }, { unique: true });
ExpressionSchema.index(
  { packId: 1, order: 1 },
  { unique: true, partialFilterExpression: { isActive: true } },
);
ExpressionSchema.index({
  'placements.section': 1,
  'placements.unit': 1,
  'placements.order': 1,
});
ExpressionSchema.index({ packId: 1, isActive: 1, order: 1 });
