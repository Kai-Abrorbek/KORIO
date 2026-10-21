import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class I18nText {
  @Prop({ default: '' }) ko: string;
  @Prop({ default: '' }) uz: string;
  @Prop({ default: '' }) en: string;
  @Prop({ default: '' }) ru: string;
}

@Schema({ _id: false })
export class GrammarConjugation {
  @Prop({ required: true }) base: string;
  @Prop({ required: true }) result: string;
}

@Schema({ _id: false })
export class GrammarExample {
  /** 배우는 언어의 문장. ko 는 배포된 한국어 문서용 호환 필드다. */
  @Prop({ default: '' }) text: string;
  @Prop({ default: '' }) ko: string;
  @Prop({ type: I18nText, default: {} }) gloss: I18nText;
  @Prop({ default: '' }) highlight: string;
}

@Schema({ _id: false })
export class GrammarDialogueTurn {
  @Prop({ required: true }) speaker: string;
  @Prop({ enum: ['left', 'right'], default: 'left' }) side: string;
  /** 배우는 언어의 발화. ko 는 배포된 한국어 문서용 호환 필드다. */
  @Prop({ default: '' }) text: string;
  @Prop({ default: '' }) ko: string;
  @Prop({ type: I18nText, default: {} }) gloss: I18nText;
  @Prop({ default: '' }) highlight: string;
}

@Schema({ _id: false })
export class GrammarSimilar {
  @Prop({ default: '' }) pattern: string; // 한국어
  @Prop({ type: I18nText, default: {} }) note: I18nText;
}

@Schema({ _id: false })
export class GrammarQuizOption {
  @Prop({ required: true }) text: string; // 한국어 답
  @Prop({ default: false }) correct: boolean;
}

@Schema({ _id: false })
export class GrammarQuizItem {
  /** 배우는 언어로 된 문제. 기존 한국어 문서는 question 을 사용한다. */
  @Prop({ default: '' }) prompt: string;
  @Prop({ type: I18nText, default: {} }) question: I18nText;
  @Prop({ type: [GrammarQuizOption], default: [] })
  options: GrammarQuizOption[];
}

export type GrammarDocument = HydratedDocument<Grammar>;

@Schema({ timestamps: true })
export class Grammar {
  @Prop({ type: String, default: 'ko-general', index: true })
  courseId: string;

  @Prop({ type: String, default: 'ko', index: true })
  targetLanguage: string;

  @Prop({ required: true, unique: true, index: true })
  code: string; // "prog-goitda"

  @Prop({ required: true })
  pattern: string;

  /** 원본 교재 단원 등 콘텐츠 검수에 쓰는 추적 정보. */
  @Prop({ default: 0 })
  sourceUnit: number;

  @Prop({ type: I18nText, default: {} })
  summary: I18nText;

  @Prop({ type: [I18nText], default: [] })
  tags: I18nText[];

  @Prop({ type: I18nText, default: {} })
  explanation: I18nText;

  @Prop({ type: I18nText, default: {} })
  conjugationRule: I18nText;

  @Prop({ type: [GrammarConjugation], default: [] })
  conjugations: GrammarConjugation[];

  @Prop({ type: [GrammarExample], default: [] })
  examples: GrammarExample[];

  @Prop({ type: [GrammarDialogueTurn], default: [] })
  dialogue: GrammarDialogueTurn[];

  @Prop({ type: GrammarSimilar, default: null })
  similar: GrammarSimilar;

  @Prop({ type: [I18nText], default: [] })
  cautions: I18nText[];

  @Prop({ type: [GrammarQuizItem], default: [] })
  quiz: GrammarQuizItem[];

  @Prop({ default: 1, index: true }) section: number; // 문법 섹션 (1~12)

  // 교재 과 = 학습 로드 모드의 하루. 이 값으로 그날 배울 문법만 골라낸다.
  // order 로 유추하지 않는다 — 한 유닛의 문법 개수가 달라지면 조용히 어긋난다.
  @Prop({ default: 1, index: true }) unit: number;

  @Prop({ default: 0, index: true }) order: number; // 순서 (다음 문법 자동 연결)

  @Prop({ default: true })
  isActive: boolean;
}

export const GrammarSchema = SchemaFactory.createForClass(Grammar);

// 학습 로드 모드는 항상 (섹션, 유닛)으로 좁혀서 순서대로 읽는다
GrammarSchema.index({ section: 1, unit: 1, order: 1 });
GrammarSchema.index({ courseId: 1, section: 1, unit: 1, order: 1 });
