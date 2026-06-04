import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LessonDocument = Lesson & Document;

export enum LessonCategory {
  VOCABULARY = 'vocabulary', // 어휘
  GRAMMAR = 'grammar', // 문법
  EXPRESSION = 'expression', // 표현
  CONVERSATION = 'conversation', // 실전 회화
  LISTENING = 'listening', // 리스닝
}

export enum LessonLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Schema({ timestamps: true })
export class Lesson {
  @Prop({ required: true })
  title: string; // 레슨 제목

  @Prop()
  description: string; // 레슨 설명

  @Prop({ required: true, enum: LessonCategory })
  category: LessonCategory;

  @Prop({ required: true, enum: LessonLevel })
  level: LessonLevel;

  @Prop({ default: 0 })
  order: number; // 로드맵에서 순서

  @Prop({ default: 0 })
  section: number; // 섹션 번호

  @Prop({ default: 0 })
  unit: number; // 유닛 번호

  @Prop([String])
  questionIds: string[]; // Question ID 배열

  @Prop({ default: 0 })
  xpReward: number; // 레슨 완료시 XP

  @Prop({ default: true })
  isActive: boolean;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
