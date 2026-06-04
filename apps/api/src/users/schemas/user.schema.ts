import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserLevel } from '../../common/enums/level.enum';
import { UserRole } from '../../common/enums/role.enum';
import { AuthProvider } from '../../common/enums/provider.enum';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  nickname: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  // 소셜 로그인
  @Prop({ enum: AuthProvider })
  provider: AuthProvider; // 'local' | 'google' | 'kakao' | 'naver' | 'telegram'

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

  @Prop({ enum: UserLevel, default: UserLevel.BEGINNER })
  level: UserLevel;

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
