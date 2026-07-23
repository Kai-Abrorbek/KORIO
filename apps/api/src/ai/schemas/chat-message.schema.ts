import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatMessageDocument = ChatMessage & Document;

@Schema({ timestamps: true })
export class ChatMessage {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true, enum: ['ai', 'user'] })
  who: 'ai' | 'user';

  /** 한국어 본문 */
  @Prop({ required: true })
  text: string;

  /** 유저 언어 번역 (AI 메시지에만) */
  @Prop({ default: '' })
  translation: string;

  /** 표현 교정 (AI 가 유저 문장에서 오류를 찾았을 때만) */
  @Prop({ type: Object, default: null })
  correction: { wrong: string; right: string; note?: string } | null;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
// 대화 조회는 항상 "내 것 + 시간순"
ChatMessageSchema.index({ userId: 1, createdAt: 1 });
