import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SubscriptionEventDocument = SubscriptionEvent & Document;

/**
 * 구독 상태가 바뀐 기록. **덧붙이기만 한다.**
 *
 * **왜 필요한가.** Subscription 문서는 상태를 *제자리에서 덮어쓴다*
 * (subscription.service.applyVerifiedPurchase 의 upsert). 그래서 지금
 * 취소된 구독이 몇 건인지는 셀 수 있어도 이런 건 영원히 알 수 없다:
 *
 *   · 어제 몇 명이 취소했나
 *   · 취소가 지난주보다 늘었나  ← 어드민 알림에서 직접 요구한 지표
 *   · 가입 후 평균 며칠 만에 떠나나 (churn 곡선)
 *
 * 상태 전이는 되돌릴 수 없는 사실이라 지우지 않는다. 행도 얼마 안 생긴다
 * (유저당 결제·갱신·취소 때 한 번씩).
 */
@Schema({ timestamps: true })
export class SubscriptionEvent {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Subscription', default: null })
  subscriptionId: Types.ObjectId | null;

  /** 직전 상태. 새 구독이면 null */
  @Prop({ default: null })
  fromStatus: string | null;

  @Prop({ required: true })
  toStatus: string;

  @Prop({ default: '' })
  provider: string;

  @Prop({ default: '' })
  plan: string;

  @Prop({ default: '' })
  productId: string;

  /**
   * 무엇이 이 전이를 일으켰나.
   *
   *   purchase   결제 확인 (신규 또는 갱신)
   *   supersede  같은 구독의 옛 결제를 만료로 눕힘
   *   expire     만료 스윕
   *   gem_pass   보석으로 산 기간권
   */
  @Prop({ default: 'purchase' })
  reason: string;

  @Prop({ default: Date.now })
  at: Date;
}

export const SubscriptionEventSchema =
  SchemaFactory.createForClass(SubscriptionEvent);

// 기간별 집계 — 일별 신규/취소 추이
SubscriptionEventSchema.index({ at: -1, toStatus: 1 });
// 유저 한 명의 구독 이력 (유저 상세 화면)
SubscriptionEventSchema.index({ userId: 1, at: -1 });
