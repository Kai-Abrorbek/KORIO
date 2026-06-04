import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserStatsDocument = UserStats & Document;

@Schema({ timestamps: true })
export class UserStats {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  date: Date; // 날짜별 기록

  @Prop({ default: 0 })
  studyTimeSeconds: number; // 학습 시간 (초)

  @Prop({ default: 0 })
  totalQuestions: number; // 푼 문제 수

  @Prop({ default: 0 })
  correctQuestions: number; // 맞은 문제 수

  @Prop({ default: 0 })
  xpEarned: number; // 획득 XP

  // 카테고리별 학습량
  @Prop({ default: 0 })
  vocabularyCount: number;

  @Prop({ default: 0 })
  grammarCount: number;

  @Prop({ default: 0 })
  expressionCount: number;

  @Prop({ default: 0 })
  conversationCount: number;

  @Prop({ default: 0 })
  listeningCount: number;
}

export const UserStatsSchema = SchemaFactory.createForClass(UserStats);
