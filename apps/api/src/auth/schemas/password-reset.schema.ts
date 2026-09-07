import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PasswordResetDocument = PasswordReset & Document;

/**
 * 비밀번호 재설정 한 건.
 *
 * 흐름은 두 단계다.
 *   1) 코드 발송  — codeHash 만 채워진다
 *   2) 코드 확인  — codeHash 를 지우고 tokenHash 를 채운다
 * 코드를 확인한 뒤에는 코드가 아니라 1회용 토큰으로 비밀번호를 바꾼다.
 * 그래야 마지막 단계에서 6자리를 다시 들고 다니지 않아도 된다.
 *
 * ⚠️ 원문(코드·토큰)은 절대 저장하지 않는다. DB 가 새더라도 그 자체로는
 * 남의 계정을 못 먹게 HMAC 해시만 남긴다.
 */
@Schema({ timestamps: true })
export class PasswordReset {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  /** 6자리 코드의 HMAC. 확인이 끝나면 빈 문자열이 된다 (재사용 차단) */
  @Prop({ default: '' })
  codeHash: string;

  /** 코드 확인을 통과해야 채워지는 1회용 토큰의 HMAC */
  @Prop({ default: '', index: true })
  tokenHash: string;

  /** 코드를 틀린 횟수. 한도를 넘으면 이 건은 죽는다 */
  @Prop({ default: 0 })
  attempts: number;

  @Prop({ type: Date, required: true })
  expiresAt: Date;

  /**
   * 다 쓴 시각.
   * ⚠️ `Date | null` 은 유니온이라 Mongoose 가 타입을 못 알아낸다.
   *    type 을 명시하지 않으면 앱이 부팅하다 죽는다.
   */
  @Prop({ type: Date, default: null })
  consumedAt: Date | null;
}

export const PasswordResetSchema = SchemaFactory.createForClass(PasswordReset);

// 만료된 건은 몽고가 알아서 지운다. 남겨둬도 쓸모가 없고, 쌓이면 조회만 느려진다
PasswordResetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// "이 유저의 가장 최근 건" 을 매번 찾는다
PasswordResetSchema.index({ userId: 1, createdAt: -1 });
