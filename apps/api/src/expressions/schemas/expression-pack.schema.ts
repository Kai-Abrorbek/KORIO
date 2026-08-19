import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export const EXPRESSION_LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;
export type ExpressionLanguage = (typeof EXPRESSION_LANGUAGES)[number];

@Schema({ _id: false })
export class LocalizedExpressionText {
  @Prop({ default: '' })
  ko: string;

  @Prop({ default: '' })
  uz: string;

  @Prop({ default: '' })
  en: string;

  @Prop({ default: '' })
  ru: string;
}

export const LocalizedExpressionTextSchema = SchemaFactory.createForClass(
  LocalizedExpressionText,
);

@Schema({ _id: false })
export class ExpressionPackMedia {
  @Prop({ default: '' })
  emoji: string;

  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ type: LocalizedExpressionTextSchema, default: () => ({}) })
  imageAlt: LocalizedExpressionText;
}

export const ExpressionPackMediaSchema = SchemaFactory.createForClass(
  ExpressionPackMedia,
);

@Schema({ timestamps: true })
export class ExpressionPack {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ type: LocalizedExpressionTextSchema, required: true })
  title: LocalizedExpressionText;

  @Prop({ type: LocalizedExpressionTextSchema, required: true })
  description: LocalizedExpressionText;

  @Prop({ type: ExpressionPackMediaSchema, default: () => ({}) })
  media: ExpressionPackMedia;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ default: true })
  isActive: boolean;
}

export type ExpressionPackDocument = HydratedDocument<ExpressionPack>;
export const ExpressionPackSchema =
  SchemaFactory.createForClass(ExpressionPack);

ExpressionPackSchema.index({ code: 1 }, { unique: true });
ExpressionPackSchema.index({ isActive: 1, order: 1 });
