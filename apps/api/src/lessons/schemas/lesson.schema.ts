import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { UserLevel } from '../../common/enums/level.enum';

export type LessonDocument = Lesson & Document;

export enum LessonCategory {
  VOCABULARY = 'vocabulary',
  GRAMMAR = 'grammar',
  EXPRESSION = 'expression',
  CONVERSATION = 'conversation',
  LISTENING = 'listening',
}

// 다국어 텍스트
class I18nText {
  @Prop({ default: '' }) ko: string;
  @Prop({ default: '' }) uz: string;
  @Prop({ default: '' }) en: string;
  @Prop({ default: '' }) ru: string;
}

@Schema({ timestamps: true })
export class Lesson {
  // 레슨 제목 - 다국어
  @Prop({ type: I18nText, default: {} })
  title: I18nText;

  // 레슨 설명 - 다국어
  @Prop({ type: I18nText, default: {} })
  description: I18nText;

  @Prop({ required: true, enum: LessonCategory })
  category: LessonCategory;

  @Prop({ required: true, enum: UserLevel })
  level: UserLevel;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: 0 })
  section: number;

  @Prop({ default: 0 })
  unit: number;

  // Question ObjectId 배열
  @Prop({ type: [Types.ObjectId], ref: 'Question', default: [] })
  questionIds: Types.ObjectId[];

  @Prop({ default: 0 })
  xpReward: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
