import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LessonCategory } from './lesson.schema';

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
  // 문법 문제 풀이 전용. 어휘 트랙의 fill_in_blank / word_arrange 와
  // 화면이 달라서 유형을 나눈다 (렌더러 선택용).
  GRAMMAR_BLANK = 'grammar_blank',
  GRAMMAR_BUILD = 'grammar_build',
  // 상대가 한국어로 한 말을 듣고 대답을 조립한다. translate_builder 와 화면은
  // 같지만 말풍선에 npcText(한국어)가 들어가고 스피커가 붙는다.
  REPLY_BUILDER = 'reply_builder',
  // 중급 이상 전용. 문장 하나가 아니라 지문·활용을 다룬다.
  READING_QUIZ = 'reading_quiz',
  ERROR_HUNT = 'error_hunt',
  CLOZE_PASSAGE = 'cloze_passage',
  DIALOG_ORDER = 'dialog_order',
  VERB_TRANSFORM = 'verb_transform',
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
  @Prop({ index: true, unique: true, sparse: true })
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

  /**
   * 다중 빈칸 문장 템플릿. 빈칸 자리를 `___` 로 적는다.
   * 예: `Oh, ___ a ___ .`
   * 채워져 있으면 sentencePrefix/Suffix 대신 이걸 쓴다.
   */
  @Prop({ default: '' })
  sentenceTemplate: string;

  /** 빈칸 순서대로의 정답. 빈칸이 2개 이상이면 필수 */
  @Prop({ type: [String], default: [] })
  blankAnswers: string[];

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

  // 정답으로 인정할 추가 표기 (동의 표현 · 허용되는 변형)
  @Prop({ type: [String], default: [] })
  acceptedAnswers: string[];

  // 이 문제가 속한 학습 영역.
  // 레슨의 category 는 "레슨 주제"라 문제 단위 분류로 쓸 수 없다.
  // (회화 레슨 안에도 문법·듣기 문제가 섞인다)
  @Prop({ enum: LessonCategory })
  lessonCategory: LessonCategory;

  // 세분화된 난이도 1~5. level(1/2) 보다 정밀하며 적응형 출제에 쓴다.
  @Prop({ default: 3 })
  difficulty: number;

  // 문법 포인트 · 어휘 주제. "이 문법만 연습" 같은 기능에서 사용.
  @Prop({ type: [String], default: [], index: true })
  tags: string[];

  // grammar_build 전용. 어절 자리마다 보기 묶음 하나.
  // 정답을 순서대로 이으면 완성 문장이 된다.
  @Prop({
    type: [{ options: [String], correct: String }],
    default: [],
  })
  buildRows: { options: string[]; correct: string }[];

  // TTS 로 읽어줄 원문 (듣기 계열). answer 와 다를 수 있다.
  @Prop({ default: '' })
  audioText: string;

  // 오디오 URL (speaking, listening, word_arrange)
  @Prop({ default: '' })
  audioUrl: string;

  // 이미지 URL (image_choice)
  @Prop({ default: '' })
  imageUrl: string;

  /**
   * 지문. reading_quiz 는 읽고 답하는 본문,
   * cloze_passage 는 빈칸 자리를 `___` 로 적은 본문.
   * 빈칸 개수와 blankAnswers 길이는 반드시 같아야 한다.
   */
  @Prop({ default: '' })
  passage: string;

  /** 지문 제목 (reading_quiz) */
  @Prop({ default: '' })
  passageTitle: string;

  /**
   * error_hunt — npcText 안에서 틀린 단어.
   * npcText 에 실제로 등장하는 어절과 글자까지 똑같아야 탭 판정이 된다.
   */
  @Prop({ default: '' })
  wrongWord: string;

  /** verb_transform — 기본형 (예: 먹다) */
  @Prop({ default: '' })
  baseWord: string;

  /** verb_transform — 목표 형태 라벨 (예: 과거 · 존댓말) */
  @Prop({ default: '' })
  targetForm: string;

  @Prop({ default: 10 })
  xpReward: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
