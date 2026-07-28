import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserLevel } from '../../common/enums/level.enum';
import { LearningGoal } from '../../common/enums/learning-goal.enum';
import { HangulLevel } from '../../common/enums/hangul-level.enum';
import { SelfReportedLevel } from '../../common/enums/self-level.enum';
import { Interest } from '../../common/enums/interest.enum';

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

  @Prop({ type: [String], enum: LearningGoal })
  learningGoals: LearningGoal[];

  @Prop()
  learningStyle: string;

  @Prop()
  dailyGoalMinutes: number;

  @Prop({ enum: HangulLevel })
  hangulLevel: HangulLevel;

  @Prop({ type: [String], enum: Interest, default: [] })
  interests: Interest[];

  @Prop({ enum: SelfReportedLevel })
  selfReportedLevel: SelfReportedLevel;

  @Prop()
  reminderHour: number;

  @Prop({ default: false })
  reminderEnabled: boolean;

  @Prop({ default: 1 })
  placementLevel: number; // 1~6, 콘텐츠 진입 레벨

  // 레벨 테스트 결과
  @Prop({ default: 0 })
  levelTestScore: number;

  @Prop({ enum: UserLevel, default: UserLevel.BEGINNER })
  detectedLevel: UserLevel;

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
