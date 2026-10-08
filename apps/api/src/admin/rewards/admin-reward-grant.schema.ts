import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AdminRewardGrantDocument = AdminRewardGrant & Document;

@Schema({ timestamps: true })
export class AdminRewardGrant {
  @Prop({ required: true, unique: true })
  requestId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({
    required: true,
    enum: ['gems', 'energy_refill', 'streak_freeze', 'super_days'],
  })
  kind: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true, enum: ['pending', 'applied'], default: 'pending' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  adminId: Types.ObjectId;

  @Prop({ required: true })
  adminEmail: string;

  @Prop({ required: true })
  reason: string;

  @Prop({ type: Date, default: null })
  appliedAt: Date | null;

  /** 앱에서 지급 사실을 확인한 시각. 기존 문서의 누락 값은 미확인으로 본다. */
  @Prop({ type: Date, default: null })
  acknowledgedAt: Date | null;
}

export const AdminRewardGrantSchema =
  SchemaFactory.createForClass(AdminRewardGrant);
AdminRewardGrantSchema.index({ userId: 1, createdAt: -1 });
AdminRewardGrantSchema.index({
  userId: 1,
  status: 1,
  acknowledgedAt: 1,
  appliedAt: 1,
});
