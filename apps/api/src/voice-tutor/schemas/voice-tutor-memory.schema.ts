import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true, collection: 'voice_tutor_memories' })
export class VoiceTutorMemory {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true, unique: true })
  userId: Types.ObjectId;
  @Prop({ default: '' }) summary: string;
  @Prop({ default: 'beginner' }) estimatedLevel: string;
  @Prop({ type: [String], default: [] }) grammarMistakes: string[];
  @Prop({ type: [String], default: [] }) repeatedMistakes: string[];
  @Prop({ type: [Object], default: [] })
  recurringMistakes: { wrong: string; correct: string; count: number }[];
  @Prop({ type: [String], default: [] }) learnedVocabulary: string[];
  @Prop({ type: [String], default: [] }) weakVocabulary: string[];
  @Prop({ type: [String], default: [] }) strongPoints: string[];
  @Prop({ type: [String], default: [] }) weakPoints: string[];
  @Prop({ default: '' }) notes: string;
  @Prop({ default: 0 }) lessonsCompleted: number;
  /** Memory of each non-Korean tutor (courses.en), same fields as above. */
  @Prop({ type: Object, default: undefined })
  courses?: Partial<Record<'en', VoiceTutorCourseMemory>>;
}

export interface VoiceTutorCourseMemory {
  summary?: string;
  estimatedLevel?: string;
  grammarMistakes?: string[];
  repeatedMistakes?: string[];
  recurringMistakes?: { wrong: string; correct: string; count: number }[];
  learnedVocabulary?: string[];
  weakVocabulary?: string[];
  strongPoints?: string[];
  weakPoints?: string[];
  notes?: string;
  lessonsCompleted?: number;
}

export type VoiceTutorMemoryDocument = HydratedDocument<VoiceTutorMemory>;
export const VoiceTutorMemorySchema =
  SchemaFactory.createForClass(VoiceTutorMemory);
