import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  LocalizedReadingText,
  LocalizedReadingTextSchema,
} from './reading-lesson.schema';

/**
 * 시드에 없어서 런타임에 채운 단어 뜻.
 *
 * 왜 레슨 문서에 바로 안 넣는가: 콘텐츠 문서를 유저 트래픽으로 고쳐 쓰면
 * 시드를 다시 밀 때 무엇이 원본이고 무엇이 자동 생성인지 구분이 안 된다.
 * 따로 두면 지우기도 쉽고, 모아서 시드에 승격시키기도 쉽다.
 *
 * (승격용 덤프: pnpm --filter api gloss:dump)
 */
@Schema({ timestamps: true })
export class ReadingGlossCache {
  @Prop({ required: true })
  lessonCode: string;

  /** 본문에 나온 그대로의 형태 */
  @Prop({ required: true })
  word: string;

  @Prop({ default: '' })
  lemma: string;

  @Prop({ default: 'other' })
  pos: string;

  @Prop({ type: LocalizedReadingTextSchema, required: true })
  meaning: LocalizedReadingText;

  @Prop({ type: [String], default: [] })
  grammar: string[];

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  note: LocalizedReadingText;

  /** 어떤 모델이 만들었는지. 나중에 품질을 되짚을 때 필요하다 */
  @Prop({ default: '' })
  model: string;
}

export type ReadingGlossCacheDocument = HydratedDocument<ReadingGlossCache>;
export const ReadingGlossCacheSchema =
  SchemaFactory.createForClass(ReadingGlossCache);

/** 같은 레슨의 같은 단어는 하나만. 동시 요청이 와도 둘로 갈라지지 않게 */
ReadingGlossCacheSchema.index({ lessonCode: 1, word: 1 }, { unique: true });
