import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export const WORD_LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;
export type WordLanguage = (typeof WORD_LANGUAGES)[number];

export enum WordPartOfSpeech {
  NOUN = 'noun',
  VERB = 'verb',
  ADJECTIVE = 'adjective',
  ADVERB = 'adverb',
  PRONOUN = 'pronoun',
  PARTICLE = 'particle',
  DETERMINER = 'determiner',
  NUMERAL = 'numeral',
  INTERJECTION = 'interjection',
  PHRASE = 'phrase',
  OTHER = 'other',
}

@Schema({ _id: false })
export class LocalizedWordText {
  @Prop({ default: '' })
  ko: string;

  @Prop({ default: '' })
  uz: string;

  @Prop({ default: '' })
  en: string;

  @Prop({ default: '' })
  ru: string;
}

export const LocalizedWordTextSchema =
  SchemaFactory.createForClass(LocalizedWordText);

@Schema({ _id: false })
export class WordExample {
  @Prop({ required: true, trim: true })
  korean: string;

  @Prop({ type: LocalizedWordTextSchema, default: () => ({}) })
  translations: LocalizedWordText;
}

export const WordExampleSchema = SchemaFactory.createForClass(WordExample);

@Schema({ _id: false })
export class WordPronunciation {
  @Prop({ default: '' })
  hangul: string;

  @Prop({ default: '' })
  romanization: string;

  @Prop({ default: '' })
  ttsText: string;
}

export const WordPronunciationSchema =
  SchemaFactory.createForClass(WordPronunciation);

@Schema({ _id: false })
export class WordMedia {
  @Prop({ default: '' })
  emoji: string;

  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ type: LocalizedWordTextSchema, default: () => ({}) })
  imageAlt: LocalizedWordText;
}

export const WordMediaSchema = SchemaFactory.createForClass(WordMedia);

@Schema({ _id: false })
export class WordPlacement {
  @Prop({ required: true, min: 1 })
  section: number;

  @Prop({ required: true, min: 1 })
  unit: number;

  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ default: true })
  isCore: boolean;
}

export const WordPlacementSchema =
  SchemaFactory.createForClass(WordPlacement);

@Schema({ timestamps: true })
export class Word {
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ enum: ['ko'], default: 'ko' })
  targetLanguage: 'ko';

  @Prop({ required: true, trim: true })
  headword: string;

  @Prop({ required: true, trim: true, default: 'default' })
  senseKey: string;

  @Prop({ enum: WordPartOfSpeech, default: WordPartOfSpeech.OTHER })
  partOfSpeech: WordPartOfSpeech;

  @Prop({ type: LocalizedWordTextSchema, required: true })
  meaning: LocalizedWordText;

  @Prop({ type: [WordExampleSchema], default: [] })
  examples: WordExample[];

  @Prop({ type: WordPronunciationSchema, default: () => ({}) })
  pronunciation: WordPronunciation;

  @Prop({ type: WordMediaSchema, default: () => ({}) })
  media: WordMedia;

  @Prop({ type: [WordPlacementSchema], default: [] })
  placements: WordPlacement[];

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ min: 1, max: 5, default: 1 })
  difficulty: number;

  @Prop({ type: LocalizedWordTextSchema, default: () => ({}) })
  usageNote: LocalizedWordText;

  @Prop({ default: true })
  isActive: boolean;
}

export type WordDocument = HydratedDocument<Word>;
export const WordSchema = SchemaFactory.createForClass(Word);

WordSchema.index({ code: 1 }, { unique: true });
WordSchema.index(
  { targetLanguage: 1, headword: 1, senseKey: 1 },
  { unique: true },
);
WordSchema.index({
  'placements.section': 1,
  'placements.unit': 1,
  'placements.order': 1,
});
WordSchema.index({ isActive: 1, headword: 1 });
