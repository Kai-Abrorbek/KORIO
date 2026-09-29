import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { TutorPlan, TutorSettings } from '../voice-tutor.types';

@Schema({ timestamps: true, collection: 'voice_tutor_sessions' })
export class VoiceTutorSession {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;
  @Prop({ type: String, enum: ['active', 'ended'], default: 'active' }) status:
    | 'active'
    | 'ended';
  @Prop({ type: Object, required: true }) settings: TutorSettings;
  @Prop({ type: Object, required: true }) plan: TutorPlan;
  /** 학습자가 고른 회화 주제 (topics/voice-tutor-topics.ts). null = 자유 대화 */
  @Prop({ type: String, default: null }) topicId: string | null;
  /** 이번 수업에서 이미 가르친 한국어 (최근 60개). 같은 걸 또 새로 가르치지 않게 */
  @Prop({ type: [String], default: [] }) taughtItems: string[];
  /** 이 세션에 허락한 최대 길이(초). 사용량 계산의 상한 (voice-tutor-quota.service) */
  @Prop({ type: Number, default: null }) allowedSec: number | null;
  @Prop({ default: 0 }) userTurnCount: number;
  @Prop({ default: 0 }) progressAnalyzedTurns: number;
  @Prop({ default: false }) progressRunning: boolean;
  @Prop({ default: false }) processing: boolean;
  @Prop({ default: false }) endRequested: boolean;
  @Prop({ type: Date, default: null }) processingAt: Date | null;
  @Prop({ type: Date, default: null }) endedAt: Date | null;
  createdAt?: Date;
}

export type VoiceTutorSessionDocument = HydratedDocument<VoiceTutorSession>;
export const VoiceTutorSessionSchema =
  SchemaFactory.createForClass(VoiceTutorSession);
VoiceTutorSessionSchema.index({ userId: 1, createdAt: -1 });
