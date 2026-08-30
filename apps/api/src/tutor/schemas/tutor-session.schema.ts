import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { TutorMode } from '../tutor.const';

/**
 * 튜터 대화 한 세션.
 *
 * 두 가지 일을 한다.
 *  1) 사용량 집계 — 쿼터의 근거. 이게 없으면 원가를 못 막는다
 *  2) 학습 기록 — 다음 세션 개인화의 재료 (Phase 3)
 *
 * 대화 내용 자체는 여기 저장하지 않는다. Realtime API 를 장기 기억으로
 * 쓰지 않는 것과 같은 이유로, 원문을 통째로 쌓아두면 저장 비용과 프라이버시
 * 부담만 커진다. 필요한 건 "무엇을 틀렸나" 같은 요약이다.
 */
@Schema({ timestamps: true })
export class TutorSession {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  mode: TutorMode;

  @Prop()
  scene?: string;

  @Prop({ required: true })
  startedAt: Date;

  @Prop()
  endedAt?: Date;

  /** 실제 대화 시간(초). 쿼터 차감의 근거 */
  @Prop({ default: 0 })
  durationSec: number;

  /**
   * 발급만 되고 실제로 안 쓴 세션인지.
   * 토큰을 받아놓고 연결을 안 하는 경우가 있어서, 시작 시점엔 최소 시간을
   * 잡아두고 종료 보고가 오면 실제 시간으로 정정한다.
   */
  @Prop({ default: false })
  finalized: boolean;

  @Prop()
  model?: string;

  // ── Phase 3 분석 결과 ──
  @Prop()
  topic?: string;

  @Prop({ type: [Object], default: [] })
  mistakes: { original: string; corrected: string; type: string }[];

  @Prop({ type: [String], default: [] })
  newVocabulary: string[];

  @Prop({ type: [String], default: [] })
  grammarPoints: string[];
}

export type TutorSessionDocument = HydratedDocument<TutorSession>;
export const TutorSessionSchema = SchemaFactory.createForClass(TutorSession);

/** 쿼터 계산: 이 유저의 기간 내 사용량 합계 */
TutorSessionSchema.index({ userId: 1, startedAt: -1 });
