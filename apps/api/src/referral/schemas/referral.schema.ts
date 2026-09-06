import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ReferralDocument = Referral & Document;

/** 코드를 어디서 받았는지. 어느 경로가 실제로 도는지 보려고 남긴다 */
export type ReferralSource = 'link' | 'code';

/**
 * 성사된 초대 한 건.
 *
 * 이 컬렉션이 곧 잠금이다. `inviteeId` 에 유니크 인덱스가 걸려 있어서
 * "한 계정은 평생 한 번만 초대받는다" 가 DB 수준에서 보장된다.
 * 보석을 주기 **전에** 여기에 먼저 쓰고, E11000 이 나면 이미 받은 것이니
 * 조용히 물러난다 — 앱이 요청을 두 번 보내도, 컨테이너가 겹쳐 돌아도
 * 보석은 한 번만 나간다.
 */
@Schema({ timestamps: true })
export class Referral {
  /** 코드 주인 (보상 받는 쪽 A) */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  inviterId: Types.ObjectId;

  /** 코드를 쓴 사람 (보상 받는 쪽 B). 계정당 한 번뿐이라 유니크 */
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  inviteeId: Types.ObjectId;

  @Prop({ required: true })
  code: string;

  @Prop({ type: String, default: 'code' })
  source: ReferralSource;

  /**
   * 실제로 지급한 보석 (1인당).
   * 상한을 넘긴 초대는 기록만 남고 0 이다 — 나중에 "왜 안 들어왔지" 를
   * 추적하려면 0 도 기록으로 남아 있어야 한다.
   */
  @Prop({ default: 0 })
  gemsEach: number;

  /** 상한 초과 등으로 보상이 안 나간 경우 그 이유 */
  @Prop({ default: '' })
  skippedReason: string;
}

export const ReferralSchema = SchemaFactory.createForClass(Referral);

// "내가 초대한 사람들" 목록 — 최신순
ReferralSchema.index({ inviterId: 1, createdAt: -1 });
