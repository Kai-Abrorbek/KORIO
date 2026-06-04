import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserProgressDocument = UserProgress & Document;

@Schema({ timestamps: true })
export class UserProgress {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Lesson', required: true })
  lessonId: MongooseSchema.Types.ObjectId;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: 0 })
  xpEarned: number;

  @Prop({ default: 0 })
  correctAnswers: number;

  @Prop({ default: 0 })
  totalAnswers: number;

  @Prop({ default: 0 })
  combo: number; // 최고 콤보

  @Prop({ default: 0 })
  speedSeconds: number; // 완료까지 걸린 시간

  @Prop([String])
  wrongQuestionIds: string[]; // 틀린 문제 ID (복습용)

  @Prop()
  completedAt: Date;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);
