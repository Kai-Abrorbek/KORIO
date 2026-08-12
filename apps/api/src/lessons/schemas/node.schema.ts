import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { LessonCategory } from './lesson.schema';

export type LessonNodeDocument = LessonNode & Document;

class I18nText {
  @Prop({ default: '' }) ko: string;
  @Prop({ default: '' }) uz: string;
  @Prop({ default: '' }) en: string;
  @Prop({ default: '' }) ru: string;
}

@Schema({ timestamps: true })
export class LessonNode {
  @Prop({ index: true, unique: true, sparse: true })
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

  @Prop({ default: 'lesson', enum: ['lesson', 'chest', 'boss'] })
  nodeType: string; // 노드 종류 (기본 lesson)

  // 학습 카테고리 (어휘/문법/...). 미지정 = 기존 메인(어휘) 트랙.
  // course-categories 에서 문법 등 별도 트랙 노드를 시드할 때 사용.
  @Prop({ enum: LessonCategory })
  category?: LessonCategory;
}

export const LessonNodeSchema = SchemaFactory.createForClass(LessonNode);
