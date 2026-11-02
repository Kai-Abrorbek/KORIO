import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {
  LocalizedWordText,
  LocalizedWordTextSchema,
} from '../../words/schemas/word.schema';

export const WORD_COLLECTION_KINDS = [
  'course',
  'textbook',
  'exam',
  'level',
  'topic',
] as const;
export const WORD_COLLECTION_LEVELS = [
  'beginner',
  'intermediate',
  'advanced',
  'mixed',
] as const;
export const WORD_COLLECTION_COVERS = [
  'paper',
  'ink',
  'violet',
  'mist',
] as const;

@Schema({ _id: false })
export class WordCollectionGroup {
  @Prop({ required: true, trim: true })
  id: string;

  @Prop({ type: LocalizedWordTextSchema, required: true })
  title: LocalizedWordText;

  /** Membership only: never copy or rewrite the referenced Word documents. */
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Word' }], default: [] })
  wordIds: Types.ObjectId[];
}

const WordCollectionGroupSchema =
  SchemaFactory.createForClass(WordCollectionGroup);

@Schema({ timestamps: true })
export class WordCollection {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ required: true, trim: true })
  courseId: string;

  @Prop({ required: true, enum: ['ko', 'en'] })
  targetLanguage: string;

  @Prop({ type: String, required: true, enum: WORD_COLLECTION_KINDS })
  kind: (typeof WORD_COLLECTION_KINDS)[number];

  @Prop({ type: String, required: true, enum: WORD_COLLECTION_LEVELS })
  level: (typeof WORD_COLLECTION_LEVELS)[number];

  @Prop({ type: String, required: true, enum: WORD_COLLECTION_COVERS })
  cover: (typeof WORD_COLLECTION_COVERS)[number];

  @Prop({ type: LocalizedWordTextSchema, required: true })
  title: LocalizedWordText;

  @Prop({ type: LocalizedWordTextSchema, default: () => ({}) })
  description: LocalizedWordText;

  @Prop({ type: [WordCollectionGroupSchema], default: [] })
  groups: WordCollectionGroup[];

  @Prop({ default: false })
  isActive: boolean;
}

export type WordCollectionDocument = HydratedDocument<WordCollection>;
export const WordCollectionSchema =
  SchemaFactory.createForClass(WordCollection);
WordCollectionSchema.index({ code: 1 }, { unique: true });
WordCollectionSchema.index({ courseId: 1, targetLanguage: 1, isActive: 1 });
