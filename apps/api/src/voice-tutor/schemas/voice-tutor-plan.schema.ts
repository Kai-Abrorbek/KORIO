import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { TutorPlan } from '../voice-tutor.types';

@Schema({ timestamps: true, collection: 'voice_tutor_plans' })
export class VoiceTutorPlan {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'VoiceTutorSession', default: null })
  fromSessionId: Types.ObjectId | null;
  @Prop({ type: Object, required: true }) plan: TutorPlan;
}

export type VoiceTutorPlanDocument = HydratedDocument<VoiceTutorPlan>;
export const VoiceTutorPlanSchema =
  SchemaFactory.createForClass(VoiceTutorPlan);
VoiceTutorPlanSchema.index({ userId: 1, createdAt: -1 });
