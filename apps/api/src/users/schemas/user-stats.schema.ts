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
}

export const UserStatsSchema = SchemaFactory.createForClass(UserStats);
