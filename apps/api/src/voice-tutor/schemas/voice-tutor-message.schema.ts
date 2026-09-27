import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type {
  TutorCorrection,
  TutorDelivery,
  TutorEmotion,
  TutorGesture,
} from '../voice-tutor.types';

@Schema({ timestamps: true, collection: 'voice_tutor_messages' })
export class VoiceTutorMessage {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'VoiceTutorSession', required: true })
  sessionId: Types.ObjectId;
  @Prop({ type: String, enum: ['user', 'teacher'], required: true }) role:
    | 'user'
    | 'teacher';
  @Prop({ required: true, maxlength: 3000 }) text: string;
  @Prop({ maxlength: 3000 }) displayText?: string;
  @Prop({ maxlength: 3000 }) speechText?: string;
  @Prop({ type: String }) emotion?: TutorEmotion;
  @Prop({ type: String }) delivery?: TutorDelivery;
  @Prop({ type: Number, min: 0, max: 1 }) intensity?: number;
  @Prop({ type: Object }) correction?: TutorCorrection;
  @Prop({ type: String }) gesture?: TutorGesture;
  @Prop({ required: true }) language: string;
  @Prop({ type: Types.ObjectId, ref: 'VoiceTutorAudio', default: null })
  audioId: Types.ObjectId | null;
  createdAt?: Date;
}

export type VoiceTutorMessageDocument = HydratedDocument<VoiceTutorMessage>;
export const VoiceTutorMessageSchema =
  SchemaFactory.createForClass(VoiceTutorMessage);
VoiceTutorMessageSchema.index({ sessionId: 1, createdAt: 1, _id: 1 });
