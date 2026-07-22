import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserLevel } from '../../common/enums/level.enum';
import { UserRole } from '../../common/enums/role.enum';
import { AuthProvider } from '../../common/enums/provider.enum';

export type UserDocument = User & Document;

export enum UserLeague {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  DIAMOND = 'diamond',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, sparse: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  nickname: string;

  // ✨ 신규: @username (소셜 식별자)
  @Prop({ unique: true, sparse: true })
  username: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  // 소셜 로그인
  @Prop({ enum: AuthProvider })
  provider: AuthProvider;

  @Prop({ sparse: true })
  providerId: string;

  @Prop()
  profileImage: string;

  // ✨ 신규: 자기소개
  @Prop({ default: '' })
  bio: string;

  // ✨ 신규: 국가 (플래그 표시용)
  @Prop({ default: '' })
  country: string;

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

  // ✨ 신규: 가장 길었던 연속 학습일
  @Prop({ default: 0 })
  longestStreak: number;

  // ✨ 신규: 리그 (게임화)
  @Prop({ enum: UserLeague, default: UserLeague.BRONZE })
  league: UserLeague;

  // ✨ 신규: 프리미엄 여부
  @Prop({ default: false })
  isSuper: boolean;

  @Prop({ default: null })
  superPlan: string;

  @Prop({ default: null })
  superExpiresAt: Date;

  // 신규: 복구펜 개수
  @Prop({ default: 0 })
  streakFreeze: number;

  // 신규: 보석 (인앱 화폐)
  @Prop({ default: 0 })
  gems: number;

  //  신규: 에너지/하트
  @Prop({ default: 5 })
  energy: number;

  //  신규: 팔로잉/팔로워 (배열로 가져감 - MVP)
  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  following: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'User', default: [] })
  followers: Types.ObjectId[];

  // 에너지 마지막 회복 계산 시각 (lazy regen용)
  @Prop({ default: () => new Date() })
  energyUpdatedAt: Date;

  // 무료 에너지 받은 시각들 (하루 3회 제한용)
  @Prop({ type: [Date], default: [] })
  freeEnergyClaims: Date[];

  // 온보딩 완료 여부
  @Prop({ default: false })
  isOnboardingCompleted: boolean;

  @Prop({ default: 0 })
  previousLeagueRank: number;

  @Prop({ default: false })
  isBot: boolean; // 리그 봇 유저

  @Prop({ type: Date, default: null })
  lastActiveAt: Date;

  @Prop({ type: [Types.ObjectId], ref: 'LessonNode', default: [] })
  openedChests: Types.ObjectId[];

  // 레전드 완료한 노드 (재도전 방지)
  @Prop({ type: [Types.ObjectId], ref: 'LessonNode', default: [] })
  legendNodes: Types.ObjectId[];

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
