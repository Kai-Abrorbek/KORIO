import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DeviceTokenDocument = DeviceToken & Document;

/**
 * 한 기기의 푸시 주소.
 *
 * 한 유저가 폰·태블릿 여러 대를 쓸 수 있어서 유저당 여러 건이다.
 * 반대로 한 기기를 여러 사람이 쓰면 토큰은 하나인데 주인이 바뀐다 —
 * 그래서 유일 키는 userId 가 아니라 **token** 이다. 로그인할 때마다
 * 그 토큰의 주인을 지금 로그인한 사람으로 덮어써야, 앞사람 알림이
 * 뒷사람 폰으로 가는 사고가 안 난다.
 */
@Schema({ timestamps: true })
export class DeviceToken {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  /** Expo push token — "ExponentPushToken[xxxx]" */
  @Prop({ required: true, unique: true })
  token: string;

  @Prop({ default: 'android' })
  platform: string;

  /** 어느 기기인지 (설정 화면에서 보여줄 수도 있고, 디버깅용) */
  @Prop({ default: '' })
  deviceName: string;

  @Prop({ default: '' })
  appVersion: string;

  @Prop({ default: () => new Date() })
  lastSeenAt: Date;

  /**
   * Expo 가 DeviceNotRegistered 를 돌려준 시각.
   *
   * 지우지 않고 표시만 한다 — 같은 토큰이 재설치로 다시 살아나는 경우가 있고,
   * 그때 upsert 로 되살리면 된다. 발송 대상 조회에서는 제외한다.
   */
  // ⚠️ type 을 명시해야 한다. `Date | null` 은 유니온이라 Mongoose 가
  // 타입을 못 알아내고 앱이 뜨다가 죽는다 (CannotDetermineTypeError).
  @Prop({ type: Date, default: null })
  invalidAt: Date | null;
}

export const DeviceTokenSchema = SchemaFactory.createForClass(DeviceToken);

// 발송 대상 조회는 항상 "이 유저의 살아있는 토큰"
DeviceTokenSchema.index({ userId: 1, invalidAt: 1 });
