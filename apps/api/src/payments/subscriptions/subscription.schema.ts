import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import type {
  PaymentProviderId,
  SubscriptionCountry,
  SubscriptionPlan,
  SubscriptionPlatform,
  SubscriptionStatus,
} from './subscription.types';

/**
 * 구독의 단일 진실.
 *
 * 어느 나라에서 어느 결제수단으로 샀든 전부 여기로 모인다. 앱·웹·나라가
 * 늘어나도 프리미엄 권한은 KORIO 계정에 붙는다(플랫폼에 안 붙는다).
 *
 * User.isSuper / superPlan / superExpiresAt 은 없애지 않는다 — 에너지·문법·
 * 로드맵 등 20곳 넘게 읽고 있어서 갈아엎으면 위험하다. 대신 이 컬렉션이
 * 진실이고, 바뀔 때마다 그 필드로 **투영**한다 (SubscriptionService.syncUser).
 */
@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  provider: PaymentProviderId;

  @Prop({ required: true })
  platform: SubscriptionPlatform;

  @Prop({ default: 'OTHER' })
  country: SubscriptionCountry;

  @Prop({ required: true })
  plan: SubscriptionPlan;

  /** 스토어/PG 쪽 상품 id (korio_premium_monthly 등) */
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true, index: true })
  status: SubscriptionStatus;

  @Prop({ required: true })
  startedAt: Date;

  @Prop({ required: true, index: true })
  expiresAt: Date;

  @Prop({ default: true })
  autoRenew: boolean;

  /**
   * 결제 건 식별자. 같은 값이 두 번 오면 같은 결제다.
   * Google Play 는 purchaseToken 이 여기 들어간다.
   */
  @Prop({ required: true })
  externalTransactionId: string;

  /** 갱신돼도 안 바뀌는 구독 식별자 (Google 의 linkedPurchaseToken 추적용) */
  @Prop()
  externalSubscriptionId?: string;

  /** 구독 시작 보상(보석)을 이미 줬는지. 갱신마다 또 주면 안 된다 */
  @Prop({ default: false })
  welcomeGrantGiven: boolean;

  /** 마지막으로 스토어에 물어본 시각 */
  @Prop()
  lastVerifiedAt?: Date;
}

export type SubscriptionDocument = Subscription & Document;
export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

/**
 * 멱등성의 핵심.
 * 같은 provider 의 같은 거래를 두 번 처리할 수 없다 — 앱이 결제 도중 죽어서
 * 같은 purchaseToken 을 재전송해도, 웹훅과 클라 요청이 동시에 와도 한 건이다.
 */
SubscriptionSchema.index(
  { provider: 1, externalTransactionId: 1 },
  { unique: true },
);

/** "이 유저의 지금 살아있는 구독" 조회용 */
SubscriptionSchema.index({ userId: 1, status: 1, expiresAt: -1 });
