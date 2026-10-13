import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { GemParams } from './gem-ledger.const';

/**
 * 보석 장부 한 줄 — 유저의 gems 가 움직일 때마다 하나씩 쌓는다 (+ 들어옴 / − 나감).
 * 잔액의 진실은 여전히 users.gems 다. 이건 "어디서 얼마" 를 보여주기 위한 기록이라
 * 쓰기에 실패해도 지급·차감을 되돌리지 않는다 (GemLedgerService.record).
 */
@Schema({
  collection: 'gem_transactions',
  timestamps: { createdAt: true, updatedAt: false },
  versionKey: false,
})
export class GemTransaction {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  /** 들어오면 +, 나가면 − */
  @Prop({ required: true })
  amount: number;

  /** GEM_SOURCES 중 하나. 옛 값이 남아도 화면은 "보석 변동" 으로 보여준다 */
  @Prop({ required: true })
  source: string;

  /** 화면 문구에 끼울 값 (등급·순위·카드 끝자리 등). 문장은 앱이 만든다 */
  @Prop({ type: Object, default: {} })
  params: GemParams;

  createdAt?: Date;
}

export type GemTransactionDocument = HydratedDocument<GemTransaction>;
export const GemTransactionSchema =
  SchemaFactory.createForClass(GemTransaction);

// 내역은 항상 "이 유저의 최근 것부터" 로 읽는다 (_id 커서)
GemTransactionSchema.index({ userId: 1, _id: -1 });
