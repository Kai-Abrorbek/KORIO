import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PendingSignupDocument = PendingSignup & Document;

/**
 * 이메일 인증을 기다리는 가입 한 건.
 *
 * 계정은 코드를 맞힌 **다음에** 만든다. 예전엔 가입하자마자 계정이 생겨서
 * 없는 주소·남의 주소로도 가입이 됐다. 남의 주소로 먼저 가입해 두면, 진짜
 * 주인이 나중에 소셜 로그인할 때 그 계정에 붙어 버리는 구멍도 있었다.
 *
 * ⚠️ 비밀번호는 bcrypt 해시로, 코드는 HMAC 으로만 저장한다 (원문 없음).
 */
@Schema({ timestamps: true })
export class PendingSignup {
  /** 정규화된 이메일. 주소 하나에 대기 건 하나 */
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  nickname: string;

  /** 선택 입력한 전화번호. 원본 대신 해시·뒷 4자리만 (연락처 매칭과 같은 규칙) */
  @Prop()
  phoneHash?: string;

  @Prop()
  phoneLast4?: string;

  /** 온보딩 데이터 연결용 */
  @Prop()
  sessionId?: string;

  /** 메일 언어 (재전송 때 다시 쓴다) */
  @Prop()
  lang?: string;

  @Prop({ required: true })
  codeHash: string;

  @Prop({ default: 0 })
  attempts: number;

  @Prop({ type: Date, required: true })
  expiresAt: Date;
}

export const PendingSignupSchema = SchemaFactory.createForClass(PendingSignup);

// 만료된 대기 건은 몽고가 알아서 지운다
PendingSignupSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
