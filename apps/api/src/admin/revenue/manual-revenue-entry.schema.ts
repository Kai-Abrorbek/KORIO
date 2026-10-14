import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ManualRevenueKind = 'expense' | 'telegram_card_revenue';

/**
 * 관리자 확인을 거친 수기 장부. Google Play 원본 보고서와 결제 주문은 변경하지 않는다.
 * 수정 대신 취소하고 새 항목을 기입해 과거 입력과 정정 사유를 보존한다.
 */
@Schema({ timestamps: true, collection: 'admin_manual_revenue_entries' })
export class ManualRevenueEntry {
  @Prop({ required: true, unique: true })
  requestId: string;

  @Prop({ required: true, enum: ['expense', 'telegram_card_revenue'] })
  kind: ManualRevenueKind;

  /** 달력 날짜. 관리자가 선택한 결제일/지출일을 YYYY-MM-DD로 보존한다. */
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  currency: string;

  /** ISO 4217 통화의 최소 단위. UZS와 KRW는 1 = 1이다. */
  @Prop({ required: true })
  amountMinor: number;

  @Prop({ required: true })
  category: string;

  @Prop({ default: '' })
  reference: string;

  /** 대소문자/공백 차이만 나는 카드 증빙번호를 중복 등록하지 않는다. */
  @Prop({ default: '' })
  referenceKey: string;

  @Prop({ default: '' })
  note: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true })
  createdByEmail: string;

  @Prop({ type: Date, default: null })
  voidedAt: Date | null;

  @Prop({ type: Types.ObjectId, ref: 'User', default: null })
  voidedBy: Types.ObjectId | null;

  @Prop({ default: '' })
  voidReason: string;
}

export type ManualRevenueEntryDocument = ManualRevenueEntry &
  Document & { createdAt: Date; updatedAt: Date };
export const ManualRevenueEntrySchema =
  SchemaFactory.createForClass(ManualRevenueEntry);

ManualRevenueEntrySchema.index({ date: -1, currency: 1, kind: 1 });
ManualRevenueEntrySchema.index(
  { kind: 1, referenceKey: 1 },
  {
    unique: true,
    partialFilterExpression: {
      kind: 'telegram_card_revenue',
      referenceKey: { $type: 'string', $gt: '' },
      voidedAt: null,
    },
  },
);
