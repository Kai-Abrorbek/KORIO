import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type QuestionDocument = Question & Document;

export enum QuestionType {
  SENTENCE_BUILDER = 'sentence_builder',
  TRANSLATE_BUILDER = 'translate_builder',
  WORD_ARRANGE = 'word_arrange',
  SPEAKING = 'speaking',
  IMAGE_CHOICE = 'image_choice',
  DIALOG_COMPLETE = 'dialog_complete',
  TYPE_ANSWER = 'type_answer',
  WORD_MATCHING = 'word_matching',
  LISTENING = 'listening',
  FILL_IN_BLANK = 'fill_in_blank',
  LISTEN_TYPE = 'listen_type',
  LISTEN_FILL = 'listen_fill',
  TRANSLATE_TYPE = 'translate_type',
  AUDIO_MATCH = 'audio_match',
}

export enum QuestionLevel {
  LEVEL_1 = '1',
  LEVEL_2 = '2',
  LEVEL_3 = '3',
  LEVEL_4 = '4',
  LEVEL_5 = '5',
  LEVEL_6 = '6',
}

class ImageChoiceOption {
  @Prop({ required: true }) text: string;
  @Prop({ required: true }) label: string;
  @Prop({ default: '' }) emoji: string;
  @Prop({ default: '' }) imageUrl: string;
}

// 다국어 텍스트
class I18nText {
  @Prop({ default: '' }) ko: string;
  @Prop({ default: '' }) uz: string;
  @Prop({ default: '' }) en: string;
  @Prop({ default: '' }) ru: string;
}

// 단어 매칭 쌍
class MatchingPair {
  @Prop({ required: true }) korean: string;
  @Prop({ required: true }) native: string; // 유저 언어 (우즈벡어 등)
}

// 대화 라인
class DialogLine {
  @Prop({ required: true, enum: ['npc', 'user'] }) speaker: 'npc' | 'user';
  @Prop({ required: true }) text: string; // 한국어
}

@Schema({ timestamps: true })
export class Question {
  @Prop({ index: true, sparse: true })
  code?: string;

  @Prop({ required: true, enum: QuestionType })
  type: QuestionType;

  @Prop({ required: true, enum: QuestionLevel })
  level: QuestionLevel;

  // 지시문 - 유저 언어로 (예: "다음 문장을 번역하세요")
  @Prop({ type: I18nText, default: {} })
  instruction: I18nText;

  @Prop({
    type: [{ text: String, label: String, emoji: String, imageUrl: String }],
    default: [],
  })
  choices: ImageChoiceOption[];

  // NPC 말풍선 - 한국어 (배우는 언어)
  @Prop({ default: '' })
  npcText: string;

  // 보기 (sentence_builder, word_arrange 등)
  @Prop([String])
  options: string[];

  // 정답 - 한국어 or 유저언어 (타입에 따라 다름)
  @Prop({ default: '' })
  answer: string;

  // 빈칸 앞뒤 텍스트 (image_choice, type_answer)
  @Prop({ default: '' })
  sentencePrefix: string;

  @Prop({ default: '' })
  sentenceSuffix: string;

  // 대화 완성 문제 (dialog_complete)
  @Prop({ type: [{ speaker: String, text: String }], default: [] })
  dialogLines: DialogLine[];

  // 단어 매칭 쌍 (word_matching)
  @Prop({ type: [{ korean: String, native: String }], default: [] })
  pairs: MatchingPair[];

  // 힌트 - 유저 언어로
  @Prop({ type: I18nText, default: {} })
  hint: I18nText;

  // 정답 설명 - 유저 언어로
  @Prop({ type: I18nText, default: {} })
  explanation: I18nText;

  // 정답(한국어)의 뜻 - 유저 언어로.
  // explanation 이 "왜 그런지"라면 이건 "무슨 뜻인지".
  // 학습자가 정답 문장의 의미를 모르면 학습이 안 되므로 피드백에 함께 보여준다.
  @Prop({ type: I18nText, default: {} })
  answerTranslation: I18nText;

  // 오디오 URL (speaking, listening, word_arrange)
  @Prop({ default: '' })
  audioUrl: string;

  // 이미지 URL (image_choice)
  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ default: 10 })
  xpReward: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
