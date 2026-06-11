import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { QuestionLevel } from './question.schema';

export type LessonDocument = Lesson & Document;

export enum LessonCategory {
  VOCABULARY = 'vocabulary',
  GRAMMAR = 'grammar',
  EXPRESSION = 'expression',
  CONVERSATION = 'conversation',
  LISTENING = 'listening',
}

class I18nText {
  @Prop({ default: '' }) ko: string;
  @Prop({ default: '' }) uz: string;
  @Prop({ default: '' }) en: string;
  @Prop({ default: '' }) ru: string;
}

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ type: Types.ObjectId, ref: 'LessonNode', required: true })
  nodeId: Types.ObjectId;

  @Prop({ type: I18nText, default: {} })
  title: I18nText;

  @Prop({ type: I18nText, default: {} })
  description: I18nText;

  @Prop({ required: true, enum: LessonCategory })
  category: LessonCategory;

  @Prop({ required: true, enum: QuestionLevel })
  level: QuestionLevel;

  @Prop({ default: 0 })
  order: number; // 노드 안에서 레슨 순서 (1, 2, 3, 4)

  @Prop({ default: 0 })
  section: number;

  @Prop({ default: 0 })
  unit: number;

  @Prop({ type: [Types.ObjectId], ref: 'Question', default: [] })
  questionIds: Types.ObjectId[];

  @Prop({ default: 0 })
  xpReward: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
