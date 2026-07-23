import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserStatsDocument = UserStats & Document;

@Schema({ timestamps: true })
export class UserStats {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ default: 0 })
  studyTimeSeconds: number;

  @Prop({ default: 0 })
  totalQuestions: number;

  @Prop({ default: 0 })
  correctQuestions: number;

  @Prop({ default: 0 })
  xpEarned: number;

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

  // 기존 vocabularyCount ~ listeningCount 5개 @Prop 전부 삭제하고 ↓
  /**
   * 카테고리별 문제 수. { vocab: 12, grammar: 8, topik: 4, ... }
   * 컬럼 대신 Map 이라 카테고리를 추가/삭제해도 스키마 변경이 필요 없다.
   * 키는 StudyCategory 값과 동일.
   */
  @Prop({ type: Map, of: Number, default: {} })
  categoryCounts: Map<string, number>;
}

export const UserStatsSchema = SchemaFactory.createForClass(UserStats);
