import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice', // 객관식
  SENTENCE_BUILDER = 'sentence_builder', // 문장 맞추기
  FILL_IN_BLANK = 'fill_in_blank', // 빈칸 채우기
  LISTENING = 'listening', // 듣고 맞추기
  WORD_MATCHING = 'word_matching', // 단어 매칭
}

export enum QuestionLevel {
  LEVEL_1 = '1',
  LEVEL_2 = '2',
  LEVEL_3 = '3',
  LEVEL_4 = '4',
  LEVEL_5 = '5',
  LEVEL_6 = '6',
}

@Schema({ timestamps: true })
export class Question {
  @Prop({ required: true, enum: QuestionType })
  type: QuestionType;

  @Prop({ required: true, enum: QuestionLevel })
  level: QuestionLevel;

  @Prop({ required: true })
  question: string; // 문제 내용

  @Prop([String])
  options: string[]; // 보기 (객관식, 문장맞추기 등)

  @Prop({ required: true })
  answer: string; // 정답

  @Prop()
  hint: string; // AI 힌트

  @Prop()
  explanation: string; // 정답 설명

  @Prop()
  audioUrl: string; // TTS 음성 URL

  @Prop()
  imageUrl: string; // 문제 이미지

  @Prop({ default: 0 })
  xpReward: number; // 맞추면 얻는 XP
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
