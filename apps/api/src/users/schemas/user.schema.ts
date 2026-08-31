import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserLevel } from '../../common/enums/level.enum';
import { UserRole } from '../../common/enums/role.enum';
import { AuthProvider } from '../../common/enums/provider.enum';
import { HangulLevel } from '../../common/enums/hangul-level.enum';
import { SelfReportedLevel } from '../../common/enums/self-level.enum';
import { Interest } from '../../common/enums/interest.enum';
import { AvatarConfig, AvatarConfigSchema } from './avatar.schema';
import { DEFAULT_AVATAR_CONFIG } from '../avatar/avatar.constants';
import {
  LEARN_MODES,
  STUDY_MODES,
  TOPIK_LEVELS,
  type LearnMode,
  type StudyMode,
  type TopikLevel,
} from '../learn-mode.constants';

export type UserDocument = User & Document;

export enum UserLeague {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  SAPPHIRE = 'sapphire',
  RUBY = 'ruby',
  EMERALD = 'emerald',
  AMETHYST = 'amethyst',
  PEARL = 'pearl',
  OBSIDIAN = 'obsidian',
  DIAMOND = 'diamond',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true, sparse: true })
  email: string;

  // select: false — 기본 조회에서 제외한다. 필요한 곳(로그인, 비밀번호 변경)만
  // .select('+password') 로 명시적으로 가져온다. 실수로 응답에 실려 나가는 걸 막는다.
  @Prop({ select: false })
  password: string;

  @Prop()
  nickname: string;

  // ✨ 신규: @username (소셜 식별자)
  @Prop({ unique: true, sparse: true })
  username: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  /**
   * 발급된 토큰을 한 번에 무효화하기 위한 카운터.
   *
   * JWT 는 서버가 기억하지 않아서 한 번 나가면 만료(7일)까지 못 막는다.
   * 토큰 안에 이 값을 같이 넣고 검증할 때 대조하면, 이 숫자를 올리는 것만으로
   * 그 유저에게 발급된 모든 토큰이 즉시 죽는다.
   * (비밀번호 변경, 기기 분실 시 올린다)
   */
  @Prop({ default: 0 })
  tokenVersion: number;

  // 소셜 로그인
  @Prop({ enum: AuthProvider })
  provider: AuthProvider;

  @Prop({ sparse: true })
  providerId: string;

  @Prop()
  profileImage: string;

  @Prop({
    type: AvatarConfigSchema,
    default: () => ({
      ...DEFAULT_AVATAR_CONFIG,
    }),
  })
  avatar: AvatarConfig;

  // ✨ 신규: 자기소개
  @Prop({ default: '' })
  bio: string;

  // ✨ 신규: 국가 (플래그 표시용)
  @Prop({ default: '' })
  country: string;

  /**
   * IANA 시간대 (예: 'Asia/Tashkent', 'Asia/Seoul').
   * 하루·한 주의 경계를 이 유저 기준으로 자르는 데 쓴다. 빈 값이면 APP_TIMEZONE.
   * 우즈벡 유저가 한국에 살기도 해서 국가로 유추하면 안 된다 — 기기에서 받는다.
   */
  @Prop({ default: '' })
  timezone: string;

  // 온보딩 데이터
  @Prop()
  targetLanguage: string;

  @Prop([String])
  learningGoals: string[];

  @Prop()
  dailyGoalMinutes: number;

  @Prop({ enum: UserLevel, default: UserLevel.BEGINNER })
  level: UserLevel;

  @Prop({ enum: HangulLevel })
  hangulLevel: HangulLevel;

  // 로드맵 첫 노드(한글 배우기)를 끝낸 시각. 없으면 아직 안 끝낸 것.
  @Prop()
  hangulCompletedAt?: Date;

  @Prop({ type: [String], enum: Interest, default: [] })
  interests: Interest[];

  @Prop({ enum: SelfReportedLevel })
  selfReportedLevel: SelfReportedLevel;

  @Prop()
  reminderHour: number;

  @Prop({ default: false })
  reminderEnabled: boolean;

  @Prop({ default: 1 })
  placementLevel: number; // 1~6 → sectionRangeForLevel 로 로드맵 시작 섹션 결정

  /**
   * 유저가 급수를 **직접 고른** 시각. 안 골랐으면 없다.
   *
   * placementLevel 은 기본값이 1 이라 "1급을 고른 사람"과 "아직 안 고른 사람"이
   * 구분되지 않는다. 그래서 학습 로드로 들어갈 때마다 급수를 다시 물어보거나,
   * 반대로 한 번도 안 고른 사람을 조용히 1급에 묶어버리게 된다.
   * 이 값이 있으면 다시 묻지 않고 바로 로드맵으로 보낸다.
   */
  @Prop()
  placementLevelSetAt?: Date;

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

  /**
   * 구독 등급 — 'super' | 'max'.
   *
   * isSuper 가 "유료 회원인가"라면 이건 "어느 등급인가"다. AI 음성 튜터처럼
   * 분당 실비가 나가는 기능은 max 만 쓸 수 있다.
   * Subscription 컬렉션이 진실이고 여기는 투영이다 (SubscriptionService.syncUser).
   */
  @Prop({ default: 'super' })
  superTier: string;

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

  @Prop({ type: Object, default: null })
  pendingLeagueResult: {
    weekKey: string;
    finalRank: number;
    fromTier: string;
    toTier: string;
    change: string; // 'promote' | 'demote' | 'stay'
    gems: number;
  } | null;

  @Prop({ default: false })
  isBot: boolean; // 리그 봇 유저

  @Prop({ type: Date, default: null })
  lastActiveAt: Date;

  @Prop({ type: [Types.ObjectId], ref: 'LessonNode', default: [] })
  openedChests: Types.ObjectId[];

  // 레전드 완료한 노드 (재도전 방지)
  @Prop({ type: [Types.ObjectId], ref: 'LessonNode', default: [] })
  legendNodes: Types.ObjectId[];

  // 완료한 문법 code 목록 (grammar 순차 잠금용)
  @Prop({ type: [String], default: [] })
  completedGrammar: string[];

  // 보석 보상 지급 완료한 문법 섹션 (중복 지급 방지)
  @Prop({ type: [Number], default: [] })
  completedGrammarSections: number[];

  // 졸업 시험을 통과한 급수. 보석 중복 지급을 막는다
  @Prop({ type: [Number], default: [] })
  completedLevelExams: number[];

  // 학습 로드 모드에서 끝낸 노드 키 ("<섹션>-<유닛>:<종류>", 예: "1-3:practice").
  // 레슨·문법·단어는 각자 자기 진행도가 있으므로 여기엔 실전/복습/마무리만 쌓인다.
  @Prop({ type: [String], default: [] })
  completedStudyNodes: string[];

  // 가이드(학습 로드) 모드인지 자율 모드인지. learnMode(어휘/문법/표현…)와
  // 직교하는 축이다 — 어떤 트랙을 공부하든 "순서대로 vs 마음대로"를 고른다.
  @Prop({ type: String, enum: STUDY_MODES, default: 'guided' })
  studyMode: StudyMode;

  // 현재 학습 중인 모드. 기기가 아니라 계정에 붙어야 한다 —
  // 같은 폰에서 계정을 바꿔도, 폰을 바꿔도 자기 것이 따라와야 함
  @Prop({ type: String, enum: LEARN_MODES, default: 'vocabulary' })
  learnMode: LearnMode;

  // 토픽을 공부 중이면 어느 급수인지. 홈에서 바로 그 급수로 들어간다
  @Prop({ type: String, enum: TOPIK_LEVELS, default: '1' })
  topikLevel: TopikLevel;

  /**
   * 발음 구분 연습 점수. 키는 `레벨:단계:모드` (예: "lv1:3:easy"),
   * 값은 0~100 최고점.
   *
   * 단계가 늘거나 줄어도 스키마를 안 건드리게 평평한 맵으로 둔다.
   * 배열로 잡으면 단계 순서가 바뀔 때 전부 어긋난다.
   */
  @Prop({ type: Object, default: {} })
  pronunciationScores: Record<string, number>;

  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
