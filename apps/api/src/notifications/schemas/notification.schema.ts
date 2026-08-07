import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

/**
 * 알림 종류.
 * 프론트는 이 값으로 아이콘·색을 고르고, 문구는 i18n 키 + params 로 만든다.
 * (서버가 한국어 문장을 저장하면 유저 언어를 바꿔도 안 바뀐다)
 */
export enum NotificationType {
  FOLLOW = 'follow', // 누가 나를 팔로우
  LEAGUE_PROMOTED = 'league_promoted', // 리그 승급
  LEAGUE_DEMOTED = 'league_demoted', // 리그 강등
  LEAGUE_RESULT = 'league_result', // 리그 정산 결과
  CHEST = 'chest', // 상자 획득
  STREAK = 'streak', // 연속 학습 달성
  STREAK_RISK = 'streak_risk', // 연속 학습 끊길 위험
  ENERGY_FULL = 'energy_full', // 에너지 가득 참
  LEVEL_UP = 'level_up', // 레벨 상승
  SUPER_EXPIRING = 'super_expiring', // 체험 만료 임박
  SYSTEM = 'system', // 공지
}

export type NotificationDocument = Notification & Document;

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: NotificationType })
  type: NotificationType;

  /**
   * 문구에 끼워 넣을 값. i18n 보간에 그대로 넘긴다.
   * 예: { nickname: '지민' } → "지민님이 회원님을 팔로우했어요"
   */
  @Prop({ type: Object, default: {} })
  params: Record<string, any>;

  /** 눌렀을 때 갈 앱 내 경로. 없으면 그냥 읽고 닫힘 */
  @Prop({ default: '' })
  link: string;

  /** 목록에 띄울 아바타 (팔로우 알림 등). 없으면 타입 아이콘 */
  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ default: false, index: true })
  isRead: boolean;

  @Prop()
  readAt?: Date;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

// 목록은 항상 "내 것 + 최신순" 이라 복합 인덱스가 필요하다
NotificationSchema.index({ userId: 1, createdAt: -1 });
