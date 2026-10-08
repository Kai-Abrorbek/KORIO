import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import type {
  SubscriptionPlan,
  SubscriptionTier,
} from '../subscriptions/subscription.types';

/**
 * 카드 입금 주문 상태.
 *  awaiting_transfer → (영수증 제출) → submitted → approved | rejected
 *  awaiting_transfer → expired (시간 + 유예 지남) | cancelled (유저가 취소·다른 상품으로 바꿈)
 */
export type CardOrderStatus =
  | 'awaiting_transfer'
  | 'submitted'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'cancelled';

/** OpenAI 비전이 영수증에서 읽은 값 + 주문과 맞춰 본 결과 (운영자 힌트일 뿐) */
export interface CardReceiptOcr {
  isReceipt: boolean | null;
  success: boolean | null;
  amount: number | null;
  dateTime: string | null;
  receiverCardLast4: string | null;
  senderCardLast4: string | null;
  checks: {
    amount: 'ok' | 'base' | 'mismatch' | 'unknown';
    receiver: 'ok' | 'mismatch' | 'unknown';
    sender: 'ok' | 'mismatch' | 'unknown';
  };
  error?: string;
}

@Schema({ timestamps: true, collection: 'card_payment_orders' })
export class CardPaymentOrder {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  /** telegram-stars.const 의 상품 id (super_1m 등) */
  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  tier: SubscriptionTier;

  @Prop({ required: true })
  plan: SubscriptionPlan;

  @Prop({ required: true })
  months: number;

  @Prop({ required: true })
  days: number;

  /** 정가 (so'm) */
  @Prop({ required: true })
  baseAmount: number;

  /** 유저가 보내야 하는 고유 금액 (정가 − 1~999) */
  @Prop({ required: true, index: true })
  amount: number;

  @Prop({ required: true, index: true })
  status: CardOrderStatus;

  /** 입금 타이머가 끝나는 시각 */
  @Prop({ required: true })
  expiresAt: Date;

  /** 영수증을 받는 마지막 시각 (expiresAt + 유예) */
  @Prop({ required: true, index: true })
  submitUntil: Date;

  @Prop()
  submittedAt?: Date;

  /** 유저가 돈을 보낸 카드 끝 4자리 (전체 번호는 받지 않는다) */
  @Prop()
  payerLast4?: string;

  /** 유저가 돈을 보냈다고 고른 우리 카드 끝 4자리 */
  @Prop()
  receiverLast4?: string;

  /** 영수증 사진 — 텔레그램에 올린 file_id (서버에 사진을 저장하지 않는다) */
  @Prop()
  receiptFileId?: string;

  /** 같은 사진 재사용 감지용 sha256 */
  @Prop({ index: true })
  receiptSha256?: string;

  /** 운영자들에게 보낸 승인 요청 메시지 (캡션 수정용) */
  @Prop({ type: [{ chatId: Number, messageId: Number }], default: [] })
  adminMessages: { chatId: number; messageId: number }[];

  @Prop({ type: Object, default: null })
  ocr: CardReceiptOcr | null;

  /** 다른 주문에서 이미 쓴 사진이면 그 주문 id */
  @Prop()
  duplicateOf?: string;

  @Prop()
  decidedAt?: Date;

  /** 승인/거절한 운영자 텔레그램 id */
  @Prop()
  decidedBy?: string;

  @Prop()
  rejectReason?: string;

  /** 승인으로 생긴 구독 기간 끝 */
  @Prop()
  premiumUntil?: Date;
}

export type CardPaymentOrderDocument = CardPaymentOrder &
  Document & { createdAt: Date; updatedAt: Date };
export const CardPaymentOrderSchema =
  SchemaFactory.createForClass(CardPaymentOrder);

CardPaymentOrderSchema.index({ userId: 1, status: 1, createdAt: -1 });
CardPaymentOrderSchema.index({ baseAmount: 1, createdAt: -1 });
