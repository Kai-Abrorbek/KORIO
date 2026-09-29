import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import type { ExplanationLanguage, SpeechStyle } from '../voice-tutor.config';
import type { TutorPersonality } from '../personality/voice-tutor-personalities';

@Schema({ timestamps: true, collection: 'voice_tutor_settings' })
export class VoiceTutorSettings {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;

  @Prop({ required: true }) voiceId: string;
  @Prop({ type: String, enum: ['polite', 'casual'], default: 'polite' })
  speechStyle: SpeechStyle;
  @Prop({ type: String, enum: ['ko', 'en', 'ru', 'uz'], default: 'en' })
  explanationLanguage: ExplanationLanguage;
  @Prop({ default: 'beginner' }) koreanLevel: string;
  @Prop({
    type: String,
    enum: ['friendly', 'close_friend', 'savage', 'chaotic_savage'],
    default: 'friendly',
  })
  personality: TutorPersonality;
  @Prop({ type: String, enum: ['female_01', 'male_01'], default: 'female_01' })
  characterId: 'female_01' | 'male_01';
}

export type VoiceTutorSettingsDocument = HydratedDocument<VoiceTutorSettings>;
export const VoiceTutorSettingsSchema =
  SchemaFactory.createForClass(VoiceTutorSettings);
