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

/**
 * 답장이 가는 곳.
 *  telegram — 텔레그램 미니앱 유저 (이메일이 없다) → 봇 메시지
 *  email    — 계정 이메일
 *  app      — 둘 다 없으면 앱 "내 문의" 화면 + 푸시로만
 */
export const SUPPORT_REPLY_CHANNELS = ['email', 'telegram', 'app'] as const;
export type SupportReplyChannel = (typeof SUPPORT_REPLY_CHANNELS)[number];

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

  /** 어디로 보냈는지 — 이 필드가 생기기 전 답장은 전부 이메일이었다 */
  @Prop({ type: String, enum: SUPPORT_REPLY_CHANNELS, default: 'email' })
  channel: SupportReplyChannel;

  /** 텔레그램 봇 전송이 실패했으면 false. 답장은 앱 "내 문의" 에 그대로 남는다 */
  @Prop({ default: true })
  delivered: boolean;
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
