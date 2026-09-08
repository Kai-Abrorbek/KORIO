import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedReadingText,
  LocalizedReadingTextSchema,
  ReadingCheckQuestion,
  ReadingCheckQuestionSchema,
  ReadingLessonMedia,
  ReadingLessonMediaSchema,
  ReadingLessonSource,
  ReadingLessonSourceSchema,
  ReadingPassageParagraph,
  ReadingPassageParagraphSchema,
  ReadingVocabularyExercise,
  ReadingVocabularyExerciseSchema,
  ReadingVocabularyItem,
  ReadingVocabularyItemSchema,
  ReadingWordGloss,
  ReadingWordGlossSchema,
  ReadingWritingActivity,
  ReadingWritingActivitySchema,
} from './reading-lesson.parts';

/** 조각 스키마는 전부 parts 에 있다. 여기서 다시 내보내 임포트 경로를 하나로 둔다 */
export * from './reading-lesson.parts';

/**
 * 읽기 레슨 한 편.
 *
 * 각 칸이 무엇인지, `vocabulary` 와 `glossary` 가 어떻게 다른지는
 * `reading-lesson.parts.ts` 맨 위 표에 있다.
 *
 * 유저 진도는 여기 없다 — `ReadingLessonProgress` 가 `lessonCode` 로 따로 잡는다.
 * 그래서 이 문서는 다시 시딩해서 통째로 갈아 끼워도 학습 기록이 안 날아간다.
 */
@Schema({ timestamps: true })
export class ReadingLesson {
  /** 시드가 정하는 사람이 읽는 키. `culture-reading-1-07` 꼴 */
  @Prop({ required: true, trim: true })
  code: string;

  /* ── 어디에 놓이는가 ── */

  @Prop({ required: true, min: 1, max: 6 })
  level: number;

  @Prop({ required: true, min: 1 })
  unit: number;

  @Prop({ required: true, min: 1 })
  order: number;

  /* ── 표지 ── */

  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ type: LocalizedReadingTextSchema, required: true })
  topic: LocalizedReadingText;

  @Prop({ min: 1, default: 6 })
  estimatedMinutes: number;

  @Prop({ type: ReadingLessonMediaSchema, default: () => ({}) })
  media: ReadingLessonMedia;

  /* ── 내용 ── */

  /** 본문. 문단별 원문 문자열 — 어휘 강조는 API 가 내려줄 때 계산한다 */
  @Prop({ type: [ReadingPassageParagraphSchema], default: [] })
  passage: ReadingPassageParagraph[];

  /** 핵심 어휘 — 외울 대상. 본문에서 색이 있다 */
  @Prop({ type: [ReadingVocabularyItemSchema], default: [] })
  vocabulary: ReadingVocabularyItem[];

  /** 본문 사전 — 아무 단어나 눌렀을 때의 뜻. 빠진 건 런타임에 보충된다 */
  @Prop({ type: [ReadingWordGlossSchema], default: [] })
  glossary: ReadingWordGloss[];

  /* ── 활동 ── */

  @Prop({ type: [ReadingCheckQuestionSchema], default: [] })
  questions: ReadingCheckQuestion[];

  /** 3급 이상에서 본문 어휘를 문장과 문단 안에 다시 넣어 보는 연습 */
  @Prop({ type: [ReadingVocabularyExerciseSchema], default: [] })
  vocabularyExercises: ReadingVocabularyExercise[];

  @Prop({ type: ReadingWritingActivitySchema, required: true })
  writing: ReadingWritingActivity;

  /* ── 관리 ── */

  @Prop({ type: ReadingLessonSourceSchema, required: true })
  source: ReadingLessonSource;

  /** 시드에서 빠진 레슨은 지우지 않고 이 값을 내린다 (진도가 붙어 있어서) */
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
