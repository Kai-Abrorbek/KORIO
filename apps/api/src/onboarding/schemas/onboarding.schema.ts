import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type OnboardingDocument = Onboarding & Document;

@Schema({ timestamps: true })
export class Onboarding {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: MongooseSchema.Types.ObjectId;

  // 설문조사
  @Prop()
  targetLanguage: string; // 'korean'

  @Prop([String])
  learningGoals: string[]; // ['kpop', 'travel', 'work' ...]

  @Prop()
  learningStyle: string; // 'grammar' | 'conversation' | 'game' | 'vocabulary'

  @Prop()
  dailyGoalMinutes: number; // 5 | 10 | 15 | 20

  // 레벨 테스트 결과
  @Prop({ default: 0 })
  levelTestScore: number;

  @Prop({ default: 'beginner' })
  detectedLevel: string; // 'beginner' | 'intermediate' | 'advanced'

  @Prop({ default: 0 })
  correctAnswers: number;

  @Prop({ default: 0 })
  totalQuestions: number;

  // 비로그인 학습 진도
  @Prop({ default: 0 })
  guestQuestionCount: number; // 30개 넘으면 로그인 유도

  @Prop({ type: Object })
  sessionData: Record<string, any>; // 비로그인 세션 데이터 임시 저장
}

export const OnboardingSchema = SchemaFactory.createForClass(Onboarding);
