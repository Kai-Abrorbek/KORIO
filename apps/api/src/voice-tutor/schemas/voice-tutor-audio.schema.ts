import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'voice_tutor_audio' })
export class VoiceTutorAudio {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
  @Prop({ type: Buffer, required: true }) data: Buffer;
  @Prop({ type: Date, required: true }) expiresAt: Date;
}

export type VoiceTutorAudioDocument = HydratedDocument<VoiceTutorAudio>;
export const VoiceTutorAudioSchema =
  SchemaFactory.createForClass(VoiceTutorAudio);
VoiceTutorAudioSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
