import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PushTicketDocument = PushTicket & Document;

/**
 * Expo 가 발송 요청에 돌려준 티켓 — 나중에 영수증을 받으려고 잠깐 들고 있는다.
 *
 * 티켓이 'ok' 여도 실제 전달은 아직이다. 폰에서 앱이 지워졌거나 재설치돼서
 * 토큰이 죽었다는 사실(DeviceNotRegistered)은 **영수증**으로만 온다.
 * 이걸 안 보면 죽은 토큰에 계속 보내면서 장부엔 "보냄" 으로 남는다.
 */
@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class PushTicket {
  @Prop({ required: true, unique: true })
  ticketId: string;

  @Prop({ required: true })
  token: string;

  createdAt?: Date;
}

export const PushTicketSchema = SchemaFactory.createForClass(PushTicket);

// Expo 는 영수증을 24시간만 들고 있다. 그 뒤엔 물어봐도 소용없다.
PushTicketSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 });
