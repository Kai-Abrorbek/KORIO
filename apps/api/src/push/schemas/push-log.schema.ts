import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PushLogDocument = PushLog & Document;

/**
 * "이 유저에게 이건 이미 보냈다" 는 장부.
 *
 * 이게 없으면 blue/green 배포로 컨테이너 두 개가 겹치는 순간 같은 크론이
 * 양쪽에서 돌아 알림이 두 번 간다 (리그 정산에서 실제로 겪은 문제다).
 * 발송 **전에** 여기에 먼저 쓰고, E11000(중복)이 나면 남이 이미 보낸 것이니
 * 조용히 건너뛴다. 유니크 인덱스가 락 역할을 한다.
 *
 * 하루 발송 한도도 이 컬렉션을 세서 판단한다.
 */
@Schema({ timestamps: true })
export class PushLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  /**
   * 중복 판정 키. 같은 값이면 같은 발송이다.
   * 예) "daily_reminder:2026-09-04", "trial_ending:3", "follow:<userId>"
   */
  @Prop({ required: true })
  dedupKey: string;

  @Prop({ required: true })
  type: string;

  /** engagement 한도를 먹는 건인지 */
  @Prop({ default: false })
  counted: boolean;

  /** 유저 시간대 기준 'YYYY-MM-DD'. 하루 한도를 셀 때 쓴다 */
  @Prop({ required: true, index: true })
  dayKey: string;

  /** 실제로 기기에 전달 요청까지 갔는지 (토큰이 없으면 false) */
  @Prop({ default: false })
  delivered: boolean;
}

export const PushLogSchema = SchemaFactory.createForClass(PushLog);

// 같은 유저에게 같은 dedupKey 는 한 번만. 이 인덱스가 중복 발송을 막는 잠금이다.
PushLogSchema.index({ userId: 1, dedupKey: 1 }, { unique: true });
// 하루 한도 계산: "오늘 이 유저에게 몇 건 보냈나"
PushLogSchema.index({ userId: 1, dayKey: 1, counted: 1 });
// 장부는 오래 둘 이유가 없다. 60일 뒤 자동 삭제.
PushLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 60 });
