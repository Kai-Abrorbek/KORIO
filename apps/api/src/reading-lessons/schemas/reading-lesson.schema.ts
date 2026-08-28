import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export const READING_LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;
export type ReadingLanguage = (typeof READING_LANGUAGES)[number];

@Schema({ _id: false })
export class LocalizedReadingText {
  @Prop({ default: '' })
  ko: string;

  @Prop({ default: '' })
  uz: string;

  @Prop({ default: '' })
  en: string;

  @Prop({ default: '' })
  ru: string;
}

export const LocalizedReadingTextSchema =
  SchemaFactory.createForClass(LocalizedReadingText);

@Schema({ _id: false })
export class ReadingLessonMedia {
  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  imageAlt: LocalizedReadingText;
}

export const ReadingLessonMediaSchema =
  SchemaFactory.createForClass(ReadingLessonMedia);

@Schema({ _id: false })
export class ReadingPassageSegment {
  @Prop({ required: true })
  text: string;

  @Prop({ default: '' })
  vocabularyId: string;
}

export const ReadingPassageSegmentSchema =
  SchemaFactory.createForClass(ReadingPassageSegment);

@Schema({ _id: false })
export class ReadingPassageParagraph {
  @Prop({ required: true })
  id: string;

  @Prop({ type: [ReadingPassageSegmentSchema], default: [] })
  segments: ReadingPassageSegment[];
}

export const ReadingPassageParagraphSchema =
  SchemaFactory.createForClass(ReadingPassageParagraph);

@Schema({ _id: false })
export class ReadingSourceGlosses {
  @Prop({ default: '' })
  en: string;

  @Prop({ default: '' })
  zh: string;

  @Prop({ default: '' })
  ja: string;
}

export const ReadingSourceGlossesSchema =
  SchemaFactory.createForClass(ReadingSourceGlosses);

@Schema({ _id: false })
export class ReadingVocabularyItem {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, trim: true })
  word: string;

  @Prop({ default: '' })
  pronunciation: string;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  meaning: LocalizedReadingText;

  @Prop({ type: ReadingSourceGlossesSchema, default: () => ({}) })
  sourceGlosses: ReadingSourceGlosses;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  note: LocalizedReadingText;

  @Prop({ default: '' })
  example: string;
}

export const ReadingVocabularyItemSchema =
  SchemaFactory.createForClass(ReadingVocabularyItem);

@Schema({ _id: false })
export class ReadingCheckQuestion {
  @Prop({ required: true })
  id: string;

  @Prop({ type: LocalizedReadingTextSchema, required: true })
  prompt: LocalizedReadingText;

  @Prop({ type: [LocalizedReadingTextSchema], default: [] })
  options: LocalizedReadingText[];

  @Prop({ required: true, min: 0 })
  answerIndex: number;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  explanation: LocalizedReadingText;
}

export const ReadingCheckQuestionSchema =
  SchemaFactory.createForClass(ReadingCheckQuestion);

@Schema({ _id: false })
export class ReadingWritingActivity {
  @Prop({ type: LocalizedReadingTextSchema, required: true })
  prompt: LocalizedReadingText;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  helper: LocalizedReadingText;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  placeholder: LocalizedReadingText;

  @Prop({ type: [String], default: [] })
  keywords: string[];

  @Prop({ default: '' })
  exampleAnswer: string;
}

export const ReadingWritingActivitySchema =
  SchemaFactory.createForClass(ReadingWritingActivity);

@Schema({ _id: false })
export class ReadingLessonSource {
  @Prop({ required: true })
  bookCode: string;

  @Prop({ required: true })
  bookTitle: string;

  @Prop({ required: true, min: 1 })
  pageStart: number;

  @Prop({ required: true, min: 1 })
  pageEnd: number;
}

export const ReadingLessonSourceSchema =
  SchemaFactory.createForClass(ReadingLessonSource);

@Schema({ timestamps: true })
export class ReadingLesson {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ required: true, min: 1, max: 6 })
  level: number;

  @Prop({ required: true, min: 1 })
  unit: number;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ type: LocalizedReadingTextSchema, required: true })
  topic: LocalizedReadingText;

  @Prop({ min: 1, default: 6 })
  estimatedMinutes: number;

  @Prop({ type: ReadingLessonMediaSchema, default: () => ({}) })
  media: ReadingLessonMedia;

  @Prop({ type: [ReadingPassageParagraphSchema], default: [] })
  passage: ReadingPassageParagraph[];

  @Prop({ type: [ReadingVocabularyItemSchema], default: [] })
  vocabulary: ReadingVocabularyItem[];

  @Prop({ type: [ReadingCheckQuestionSchema], default: [] })
  questions: ReadingCheckQuestion[];

  @Prop({ type: ReadingWritingActivitySchema, required: true })
  writing: ReadingWritingActivity;

  @Prop({ type: ReadingLessonSourceSchema, required: true })
  source: ReadingLessonSource;

  @Prop({ default: true })
  isActive: boolean;
}

export type ReadingLessonDocument = HydratedDocument<ReadingLesson>;
export const ReadingLessonSchema = SchemaFactory.createForClass(ReadingLesson);

ReadingLessonSchema.index({ code: 1 }, { unique: true });
ReadingLessonSchema.index(
  { level: 1, unit: 1 },
  { unique: true, partialFilterExpression: { isActive: true } },
);
ReadingLessonSchema.index({ level: 1, order: 1, isActive: 1 });
