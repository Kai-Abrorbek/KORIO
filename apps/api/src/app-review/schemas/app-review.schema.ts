import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  APP_REVIEW_PLATFORMS,
  type AppReviewPlatform,
} from '../app-review.const';

export type AppReviewDocument = AppReview & Document;
export type AppReviewStateDocument = AppReviewState & Document;

/** 유저가 남긴 앱 평가 하나. 7일에 한 번씩 쌓인다 */
@Schema({ timestamps: true, collection: 'app_reviews' })
export class AppReview {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  /** 1–5 */
  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ default: '' })
  comment: string;

  @Prop({ type: String, enum: [...APP_REVIEW_PLATFORMS, null], default: null })
  platform: AppReviewPlatform | null;

  @Prop({ type: String, default: null })
  appVersion: string | null;

  /** 앱 화면 언어 (ko·uz·ru·en) — 의견을 읽을 때 무슨 말로 썼을지 */
  @Prop({ type: String, default: null })
  locale: string | null;

  /** 실제로 준 보석 (보상을 바꾸면 예전 평가는 예전 값으로 남는다) */
  @Prop({ default: 0 })
  rewardGems: number;

  createdAt?: Date;
  updatedAt?: Date;
}

export const AppReviewSchema = SchemaFactory.createForClass(AppReview);
AppReviewSchema.index({ createdAt: -1 });

/**
 * 유저마다 하나 — 모달을 언제 다시 띄울지.
 * userId 가 unique 라서 "7일에 한 번" 을 이 문서의 조건부 upsert 하나로 막는다.
 */
@Schema({ timestamps: true, collection: 'app_review_states' })
export class AppReviewState {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ type: Date, default: null })
  lastReviewAt: Date | null;

  /** "하루 동안 보지 않기" — 이 시각까지 안 띄운다 */
  @Prop({ type: Date, default: null })
  snoozeUntil: Date | null;

  /** "닫기" 를 누른 날 (유저 시간대 YYYY-MM-DD) 과 그날 누른 횟수 */
  @Prop({ type: String, default: null })
  closeDay: string | null;

  @Prop({ default: 0 })
  closeCount: number;
}

export const AppReviewStateSchema =
  SchemaFactory.createForClass(AppReviewState);
