import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  TopikI18nText,
  TopikI18nTextSchema,
  TopikSection,
} from './topik-content.schema';

/**
 * 황금 레시피 한 줄. 유형을 푸는 전략을 순서대로 담는다.
 */
@Schema({ _id: false })
export class TopikRecipeTip {
  @Prop({ required: true, min: 1 })
  order: number;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  text: TopikI18nText;
}
export const TopikRecipeTipSchema =
  SchemaFactory.createForClass(TopikRecipeTip);

/**
 * Ranking 표의 한 행.
 * 표제어(form)와 예문(example)은 한국어 원문 그대로 두고,
 * 의미·기능(meaning)만 학습자 언어로 번역한다.
 */
@Schema({ _id: false })
export class TopikGrammarEntry {
  @Prop({ required: true, min: 1 })
  rank: number;

  /** '-다가', '-게 되다' 같은 문법 표제어 (한국어 원문) */
  @Prop({ required: true })
  form: string;

  /** 의미와 기능. 한 문법에 뜻이 둘이면 여러 개 */
  @Prop({ type: [TopikI18nTextSchema], default: [] })
  meanings: TopikI18nText[];

  /** 예문 (한국어 원문). meanings 와 순서를 맞춘다 */
  @Prop({ type: [String], default: [] })
  examples: string[];

  /** 예문에서 문법이 쓰인 부분 — 앱에서 강조 표시용 */
  @Prop({ type: [String], default: [] })
  highlights: string[];
}
export const TopikGrammarEntrySchema =
  SchemaFactory.createForClass(TopikGrammarEntry);

/**
 * 문법 묶음. 읽기 1~2번은 <연결어미 30>, <종결어미 20> 두 묶음이다.
 */
@Schema({ _id: false })
export class TopikGrammarSection {
  @Prop({ required: true })
  key: string;

  @Prop({ type: TopikI18nTextSchema, default: {} })
  title: TopikI18nText;

  @Prop({ type: [TopikGrammarEntrySchema], default: [] })
  entries: TopikGrammarEntry[];

  /** 묶음 하단 TIP */
  @Prop({ type: [TopikI18nTextSchema], default: [] })
  tips: TopikI18nText[];
}
export const TopikGrammarSectionSchema =
  SchemaFactory.createForClass(TopikGrammarSection);

/**
 * 유형별 학습 자료.
 * TOPIK_READING_BLUEPRINT 의 groupCode(reading-01-02 등)로 문항 유형과 연결된다.
 */
@Schema({ timestamps: true })
export class TopikRecipe {
  /** blueprint groupCode. 예: reading-01-02 */
  @Prop({ required: true, unique: true, index: true })
  groupCode: string;

  @Prop({ required: true, enum: TopikSection, index: true })
  section: TopikSection;

  /** 화면에 뜨는 라벨. 예: 읽기 1번~2번 */
  @Prop({ type: TopikI18nTextSchema, default: {} })
  label: TopikI18nText;

  /** 유형 이름. 예: 알맞은 문법 */
  @Prop({ type: TopikI18nTextSchema, default: {} })
  title: TopikI18nText;

  /** 유형 소개 문단 */
  @Prop({ type: TopikI18nTextSchema, default: {} })
  intro: TopikI18nText;

  /** 목표 급수 (3~6) */
  @Prop({ default: 3 })
  targetLevel: number;

  @Prop({ default: 1 })
  order: number;

  /** 황금 레시피 */
  @Prop({ type: [TopikRecipeTipSchema], default: [] })
  goldenRecipe: TopikRecipeTip[];

  /** TOPIK에 자주 출제되는 문법 (Ranking) */
  @Prop({ type: [TopikGrammarSectionSchema], default: [] })
  grammarSections: TopikGrammarSection[];

  /** 기출문제 — 해설과 함께 화면에 직접 보여준다 */
  @Prop({ type: [Types.ObjectId], ref: 'TopikQuestion', default: [] })
  exampleQuestionIds: Types.ObjectId[];

  /** 예상문제 — 별도 페이지에서 푼다 */
  @Prop({ type: [Types.ObjectId], ref: 'TopikQuestion', default: [] })
  practiceQuestionIds: Types.ObjectId[];

  @Prop({ default: true })
  isActive: boolean;
}

export type TopikRecipeDocument = TopikRecipe & Document;
export const TopikRecipeSchema = SchemaFactory.createForClass(TopikRecipe);
