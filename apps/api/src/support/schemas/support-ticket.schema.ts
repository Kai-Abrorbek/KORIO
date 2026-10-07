import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SupportTicketDocument = SupportTicket & Document;

export const SUPPORT_CATEGORIES = [
  'general',
  'learning',
  'billing',
  'bug',
  'other',
] as const;
export type SupportCategory = (typeof SUPPORT_CATEGORIES)[number];

export const SUPPORT_STATUSES = ['open', 'sending', 'answered'] as const;
export type SupportStatus = (typeof SUPPORT_STATUSES)[number];

@Schema({ _id: false })
export class SupportReply {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  adminId: Types.ObjectId;

  @Prop({ required: true })
  adminEmail: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  sentAt: Date;
}

const SupportReplySchema = SchemaFactory.createForClass(SupportReply);

@Schema({ timestamps: true })
export class SupportTicket {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  /** 접수 당시 이메일. 답장 시에는 현재 계정 이메일을 다시 조회한다. */
  @Prop({ default: '' })
  emailAtCreation: string;

  @Prop({ type: String, required: true, enum: SUPPORT_CATEGORIES })
  category: SupportCategory;

  @Prop({ required: true })
  subject: string;

  @Prop({ required: true })
  message: string;

  /** sending은 중복 발송을 막는 잠금이다. 프로세스 장애 시 수동 확인 대상. */
  @Prop({ type: String, required: true, enum: SUPPORT_STATUSES, default: 'open' })
  status: SupportStatus;

  @Prop({ type: Date, default: null })
  replyAttemptedAt: Date | null;

  @Prop({ type: SupportReplySchema, default: null })
  reply: SupportReply | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export const SupportTicketSchema = SchemaFactory.createForClass(SupportTicket);
SupportTicketSchema.index({ userId: 1, createdAt: -1 });
SupportTicketSchema.index({ status: 1, createdAt: -1 });
