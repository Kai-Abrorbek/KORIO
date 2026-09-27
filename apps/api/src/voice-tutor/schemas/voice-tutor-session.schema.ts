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
