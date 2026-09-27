import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { TutorProgress } from '../voice-tutor.types';

@Schema({ timestamps: true, collection: 'voice_tutor_progress' })
export class VoiceTutorProgress {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'VoiceTutorSession', required: true })
  sessionId: Types.ObjectId;
  @Prop({ required: true }) analyzedTurns: number;
  @Prop({ type: Object, required: true }) progress: TutorProgress;
}

export type VoiceTutorProgressDocument = HydratedDocument<VoiceTutorProgress>;
export const VoiceTutorProgressSchema =
  SchemaFactory.createForClass(VoiceTutorProgress);
VoiceTutorProgressSchema.index({ sessionId: 1, analyzedTurns: -1 });
