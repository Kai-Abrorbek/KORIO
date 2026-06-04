import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  nickname: string;

  @Prop({ default: 'user' })
  role: string;

  // 소셜 로그인
  @Prop()
  provider: string; // 'local' | 'google' | 'kakao' | 'naver' | 'telegram'

  @Prop({ sparse: true })
  providerId: string;

  @Prop()
  profileImage: string;

  // 온보딩 데이터
  @Prop()
  targetLanguage: string;

  @Prop([String])
  learningGoals: string[];

  @Prop()
  dailyGoalMinutes: number;

  @Prop({ default: 'beginner' })
  level: string;

  // 학습 진도
  @Prop({ default: 0 })
  totalXP: number;

  @Prop({ default: 0 })
  streak: number;

  @Prop()
  lastStudiedAt: Date;

  // 온보딩 완료 여부
  @Prop({ default: false })
  isOnboardingCompleted: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
