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
}

export const AdminRewardGrantSchema =
  SchemaFactory.createForClass(AdminRewardGrant);
AdminRewardGrantSchema.index({ userId: 1, createdAt: -1 });
