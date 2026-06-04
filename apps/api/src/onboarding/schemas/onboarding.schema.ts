import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OnboardingDocument = Onboarding & Document;

@Schema({ timestamps: true })
export class Onboarding {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ unique: true, sparse: true })
  sessionId: string; // 비로그인 유저 식별용

  // 설문조사
  @Prop()
  targetLanguage: string;

  @Prop([String])
  learningGoals: string[];

  @Prop()
  learningStyle: string;

  @Prop()
  dailyGoalMinutes: number;

  // 레벨 테스트 결과
  @Prop({ default: 0 })
  levelTestScore: number;

  @Prop({ default: 'beginner' })
  detectedLevel: string;

  @Prop({ default: 0 })
  correctAnswers: number;

  @Prop({ default: 0 })
  totalQuestions: number;

  @Prop([String])
  wrongQuestionIds: string[];

  // 비로그인 학습 진도
  @Prop({ default: 0 })
  guestQuestionCount: number;

  @Prop({ type: Object })
  sessionData: Record<string, any>;
}

export const OnboardingSchema = SchemaFactory.createForClass(Onboarding);
