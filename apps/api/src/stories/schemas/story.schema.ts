import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { STORY_SCENES } from '../stories.const';

/**
 * 듣기 이야기 한 편.
 *
 * | 칸 | 무엇 | 화면에서 |
 * |---|---|---|
 * | `scene` | 앱이 코드로 그리는 배경 장면 이름 | 맨 위 움직이는 그림 |
 * | `narrator` | 1인칭 주인공 | 제목 아래 "Rustam" |
 * | `audio` | 앱 번들 오디오 키와 길이 | 플레이어 |
 * | `sentences` | 원문 + 번역 + 문장·단어 타이밍 | 불이 켜지는 본문 |
 * | `vocabulary` | 핵심 단어 (본문에 점선 밑줄) | 누르면 뜻 시트 |
 * | `questions` | 끝나고 푸는 세 문제 | 완료 시트 |
 *
 * 유저 진도는 여기 없다 — `StoryProgress` 가 `storyCode` 로 따로 잡는다.
 * 그래서 시드를 다시 밀어도 기록이 안 날아간다.
 */

/**
 * 번역 한 벌 (설명 언어들). 원문 언어와 같은 칸은 비어 있다 — 영어 이야기의 en.
 * 어느 칸이 꼭 차 있어야 하는지는 코스가 정한다 (story-courses.ts).
 */
@Schema({ _id: false })
export class StoryTranslation {
  @Prop({ default: '' })
  ko: string;

  @Prop({ default: '' })
  uz: string;

  @Prop({ default: '' })
  en: string;

  @Prop({ default: '' })
  ru: string;
}
export const StoryTranslationSchema =
  SchemaFactory.createForClass(StoryTranslation);

/** 단어 하나가 오디오에서 차지하는 구간 (ms). 오디오를 만들 때 정해진다 */
@Schema({ _id: false })
export class StoryWordTiming {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true, min: 0 })
  startMs: number;

  @Prop({ required: true, min: 0 })
  endMs: number;
}
export const StoryWordTimingSchema =
  SchemaFactory.createForClass(StoryWordTiming);

@Schema({ _id: false })
export class StorySentence {
  /** `s1`, `s2` … 따라 읽기 평가가 이 id 로 문장을 찾는다 */
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, trim: true })
  text: string;

  @Prop({ type: StoryTranslationSchema, required: true })
  translation: StoryTranslation;

  /** 오디오 타이밍. 오디오가 아직 없으면 0 이고 앱은 문장별 TTS 로 대신 읽는다 */
  @Prop({ default: 0, min: 0 })
  startMs: number;

  @Prop({ default: 0, min: 0 })
  endMs: number;

  @Prop({ type: [StoryWordTimingSchema], default: [] })
  words: StoryWordTiming[];
}
export const StorySentenceSchema = SchemaFactory.createForClass(StorySentence);

/** 핵심 단어. `word` 는 본문에 나온 그대로의 형태라 앱이 그 자리에 밑줄을 친다 */
@Schema({ _id: false })
export class StoryVocabularyItem {
  @Prop({ required: true, trim: true })
  word: string;

  /** 뜻은 기본형 기준 (laughs → "kulmoq") */
  @Prop({ type: StoryTranslationSchema, required: true })
  meaning: StoryTranslation;
}
export const StoryVocabularyItemSchema =
  SchemaFactory.createForClass(StoryVocabularyItem);

/** 확인 문제. 질문·보기는 영어 원문이다 (짧고 쉬운 문장만) */
@Schema({ _id: false })
export class StoryQuestion {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  prompt: string;

  @Prop({ type: [String], required: true })
  options: string[];

  @Prop({ required: true, min: 0 })
  answerIndex: number;
}
export const StoryQuestionSchema = SchemaFactory.createForClass(StoryQuestion);

/**
 * 내레이션 오디오.
 *
 * `key` 는 앱 번들 파일 이름이다 (`<code>-<본문 해시 8자>`). 본문이 바뀌면 해시가
 * 바뀌어서, 새 오디오가 안 실린 옛 앱은 그 키를 못 찾고 TTS 로 대신 읽는다 —
 * 엉뚱한 오디오에 엉뚱한 단어가 켜지는 일이 없다.
 */
@Schema({ _id: false })
export class StoryAudio {
  @Prop({ default: '' })
  key: string;

  @Prop({ default: 0, min: 0 })
  durationMs: number;
}
export const StoryAudioSchema = SchemaFactory.createForClass(StoryAudio);

@Schema({ _id: false })
export class StoryNarrator {
  /** 오디오 생성기가 목소리를 고르는 키 (`rustam`) */
  @Prop({ required: true })
  id: string;

  /** 화면에 보이는 이름 (`Rustam`) */
  @Prop({ required: true })
  name: string;
}
export const StoryNarratorSchema = SchemaFactory.createForClass(StoryNarrator);

@Schema({ timestamps: true })
export class Story {
  /** 시드가 정하는 사람이 읽는 키. `<언어>-story-<레벨 slug>-<번호>` — `en-story-b1p-01` */
  @Prop({ required: true, trim: true })
  code: string;

  @Prop({ required: true })
  courseId: string;

  @Prop({ required: true })
  targetLanguage: string;

  /** 코스의 레벨 key ("A1", "B1+"). 어떤 값이 있는지는 story-courses.ts — 시드 검증기가 본다 */
  @Prop({ required: true })
  level: string;

  @Prop({ required: true, min: 1 })
  order: number;

  /** 원문(배우는 언어) 제목 */
  @Prop({ required: true, trim: true })
  title: string;

  /** 설명 언어 제목 */
  @Prop({ type: StoryTranslationSchema, required: true })
  topic: StoryTranslation;

  @Prop({ required: true, enum: STORY_SCENES })
  scene: string;

  @Prop({ type: StoryNarratorSchema, required: true })
  narrator: StoryNarrator;

  @Prop({ type: StoryAudioSchema, default: () => ({}) })
  audio: StoryAudio;

  @Prop({ type: [StorySentenceSchema], default: [] })
  sentences: StorySentence[];

  @Prop({ type: [StoryVocabularyItemSchema], default: [] })
  vocabulary: StoryVocabularyItem[];

  @Prop({ type: [StoryQuestionSchema], default: [] })
  questions: StoryQuestion[];

  /** 시드에서 빠진 이야기는 지우지 않고 이 값을 내린다 (진도가 붙어 있어서) */
  @Prop({ default: true })
  isActive: boolean;
}

export type StoryDocument = HydratedDocument<Story>;
export const StorySchema = SchemaFactory.createForClass(Story);

StorySchema.index({ code: 1 }, { unique: true });
StorySchema.index({ courseId: 1, isActive: 1, level: 1, order: 1 });
