import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserProgressDocument = UserProgress & Document;

@Schema({ timestamps: true })
export class UserProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Lesson', required: true })
  lessonId: Types.ObjectId;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: 0 })
  xpEarned: number;

  @Prop({ default: 0 })
  correctAnswers: number;

  @Prop({ default: 0 })
  totalAnswers: number;

  @Prop({ default: 0 })
  combo: number;

  @Prop({ default: 0 })
  speedSeconds: number;

  @Prop([String])
  wrongQuestionIds: string[];

  @Prop()
  completedAt: Date;
}

export const UserProgressSchema = SchemaFactory.createForClass(UserProgress);
