import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type LessonNodeDocument = LessonNode & Document;

class I18nText {
  @Prop({ default: '' }) ko: string;
  @Prop({ default: '' }) uz: string;
  @Prop({ default: '' }) en: string;
  @Prop({ default: '' }) ru: string;
}

@Schema({ timestamps: true })
export class LessonNode {
  @Prop({ index: true, sparse: true })
  code?: string;

  @Prop({ required: true })
  section: number;

  @Prop({ required: true })
  unit: number;

  @Prop({ required: true })
  order: number; // 유닛 안에서 노드 순서 (1, 2, 3, 4)

  @Prop({ type: I18nText, default: {} })
  title: I18nText;

  // 이 노드에 속한 레슨들 (순서 보장)
  @Prop({ type: [Types.ObjectId], ref: 'Lesson', default: [] })
  lessonIds: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;
}

export const LessonNodeSchema = SchemaFactory.createForClass(LessonNode);
