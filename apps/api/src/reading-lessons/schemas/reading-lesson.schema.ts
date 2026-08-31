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

/**
 * 본문에 나오는 단어 하나의 뜻.
 *
 * 핵심 어휘(vocabulary)와는 성격이 다르다. 저쪽은 "이건 외워라" 라는 교육
 * 콘텐츠(예문·노트 포함)고, 이쪽은 **막혔을 때 눌러서 보는 읽기 보조 도구**다.
 * 그래서 화면에서도 저쪽만 색이 있고 이쪽은 색 없이 눌리기만 한다.
 *
 * 표면형(word)으로 찾는다. 한국어는 교착어라 본문에는 활용형이 나오는데
 * (갔습니다, 학교에서), 사전형만 갖고 있으면 유저가 누른 단어를 못 찾는다.
 * 그래서 본문에 실제로 나온 형태를 키로 두고 기본형(lemma)을 같이 준다.
 */
@Schema({ _id: false })
export class ReadingWordGloss {
  /** 본문에 나온 그대로의 형태. 예: "갔습니다" */
  @Prop({ required: true })
  word: string;

  /** 기본형. 예: "가다" */
  @Prop({ default: '' })
  lemma: string;

  /** 품사 코드 (WORD_POS). 화면이 i18n 으로 옮긴다 */
  @Prop({ default: 'other' })
  pos: string;

  @Prop({ type: LocalizedReadingTextSchema, required: true })
  meaning: LocalizedReadingText;

  /**
   * 문법 태그 (GRAMMAR_TAGS). 문장이 아니라 태그인 이유는 상수 파일 참고.
   * 예: ["past", "formalPolite"]
   */
  @Prop({ type: [String], default: [] })
  grammar: string[];

  /** 태그로 표현이 안 되는 경우에만. 보통 비어 있다 */
  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  note: LocalizedReadingText;
}

export const ReadingWordGlossSchema =
  SchemaFactory.createForClass(ReadingWordGloss);

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

  /** 본문 단어별 뜻. 시드가 채우고, 빠진 건 런타임에 보충된다 */
  @Prop({ type: [ReadingWordGlossSchema], default: [] })
  glossary: ReadingWordGloss[];

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
