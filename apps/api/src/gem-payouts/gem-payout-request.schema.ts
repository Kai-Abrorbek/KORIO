import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  PAYOUT_BRANDS,
  PAYOUT_STATUSES,
  type PayoutBrand,
  type PayoutStatus,
} from './gem-payout.const';

/**
 * 보석 출금 신청 한 건. 보석은 **신청할 때 바로 뺀다** (반려·취소되면 돌려준다) —
 * 운영자가 보내는 동안 같은 보석을 또 쓰면 안 된다.
 */
@Schema({ timestamps: true })
export class GemPayoutRequest {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  gems: number;

  /** 보낼 돈 (so'm) = gems × SOM_PER_GEM. 신청 때 값으로 고정 */
  @Prop({ required: true, min: 0 })
  amountUzs: number;

  @Prop({ type: String, required: true, enum: PAYOUT_BRANDS })
  brand: PayoutBrand;

  /**
   * 받을 카드 번호. 운영자가 보내는 동안만 전체가 필요하다 —
   * 끝나면(완료·반려·취소) "9860 •••• •••• 9012" 로 가린다.
   */
  @Prop({ required: true })
  cardNumber: string;

  @Prop({ required: true })
  cardLast4: string;

  /** 카드에 적힌 이름 (라틴 대문자) */
  @Prop({ required: true })
  cardHolder: string;

  @Prop({
    type: String,
    enum: PAYOUT_STATUSES,
    default: 'pending',
    index: true,
  })
  status: PayoutStatus;

  /**
   * 아직 안 끝난 신청인가. 한 사람에 하나만 열려 있게 이 값에 부분 유니크 인덱스를 건다
   * (동시에 두 번 눌러도 둘 다 들어가지 않는다)
   */
  @Prop({ type: Boolean, default: true })
  open: boolean;

  /** 반려 사유 코드 (PAYOUT_REJECT_REASONS) */
  @Prop({ type: String, default: null })
  rejectReason: string | null;

  /** 운영자 메모 — 유저에겐 안 보인다 */
  @Prop({ type: String, default: '' })
  adminNote: string;

  /** 마지막으로 상태를 바꾼 운영자 */
  @Prop({ type: Object, default: null })
  handledBy: { adminId: string; email: string } | null;

  @Prop({ type: Date, default: null })
  processingAt: Date | null;

  @Prop({ type: Date, default: null })
  completedAt: Date | null;

  @Prop({ type: Date, default: null })
  rejectedAt: Date | null;

  @Prop({ type: Date, default: null })
  cancelledAt: Date | null;

  /** 보석을 돌려줬는가 (반려·취소) — 두 번 돌려주지 않게 */
  @Prop({ type: Boolean, default: false })
  refunded: boolean;

  createdAt?: Date;
  updatedAt?: Date;
}

export type GemPayoutRequestDocument = HydratedDocument<GemPayoutRequest>;
export const GemPayoutRequestSchema =
  SchemaFactory.createForClass(GemPayoutRequest);

GemPayoutRequestSchema.index(
  { userId: 1 },
  {
    unique: true,
    partialFilterExpression: { open: true },
    name: 'one_open_payout_per_user',
  },
);
GemPayoutRequestSchema.index({ userId: 1, createdAt: -1 });
GemPayoutRequestSchema.index({ status: 1, createdAt: -1 });
