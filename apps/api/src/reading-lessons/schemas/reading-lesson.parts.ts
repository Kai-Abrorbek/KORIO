/**
 * 읽기 레슨을 이루는 조각들.
 *
 * **루트 문서는 `reading-lesson.schema.ts` 에 있다.** 전체 구조를 보려면
 * 거기부터 봐라 — 한 화면에 들어온다. 이 파일은 그 각 칸이 실제로 무엇인지다.
 *
 * ── 레슨 한 편이 가진 것 ──
 *
 * | 칸 | 무엇 | 화면에서 |
 * |---|---|---|
 * | `media` | 대표 이미지 | 맨 위 배너 |
 * | `passage` | 본문 (문단별 문자열) | 읽기·낭독 |
 * | `vocabulary` | **핵심 어휘** — "이건 외워라" | 본문에 색칠 + 하단 단어 카드 |
 * | `glossary` | **본문 사전** — "막히면 눌러 봐라" | 아무 단어나 탭하면 뜨는 시트 |
 * | `questions` | 확인 문제 (4지선다) | 본문 다 읽은 뒤 |
 * | `vocabularyExercises` | 어휘를 다시 넣어 보는 연습 (3급~) | 확인 문제 뒤 |
 * | `writing` | 쓰기 활동 | 마지막 |
 * | `source` | 출처 교재·페이지 | 표시 안 함 (관리용) |
 *
 * ⚠️ **`vocabulary` 와 `glossary` 는 다르다.** 둘 다 "단어 + 뜻" 이라 헷갈리는데,
 * `vocabulary` 는 교재가 고른 학습 대상(예문·노트가 붙고 본문에서 색이 있다),
 * `glossary` 는 본문에 나온 **모든** 단어의 사전(색 없이 눌리기만 한다)이다.
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/* ════════════════════════════ 공통 ════════════════════════════ */

export const READING_LANGUAGES = ['ko', 'uz', 'en', 'ru'] as const;
export type ReadingLanguage = (typeof READING_LANGUAGES)[number];

/** 4개 언어 한 벌. 이 파일에서 제일 많이 쓰인다 */
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

/* ════════════════════════════ 미디어 ════════════════════════════ */

/**
 * 레슨 대표 이미지.
 *
 * 앱이 고르는 순서: `imageUrl` → `imageKey` → 주제색 플레이스홀더.
 *
 * 기본은 `imageKey` 다. 앱에 번들된 파일을 가리키는 이름이고, 시드가
 * **레슨 code 를 그대로** 넣는다. 그래서 사진을 넣는 일은
 * `apps/mobile/assets/images/reading-listening/<code>.webp` 에 파일을
 * 떨어뜨리는 것뿐이다 — 시드도 서버 배포도 건드릴 필요가 없다.
 *
 * `imageUrl` 은 나중에 CDN 을 붙일 때를 위한 자리다. 채워져 있으면 이긴다.
 */
@Schema({ _id: false })
export class ReadingLessonMedia {
  /** 앱 번들 이미지 키. 시드가 레슨 code 를 넣는다 */
  @Prop({ default: '' })
  imageKey: string;

  /** 원격 이미지 주소. 있으면 imageKey 보다 우선 */
  @Prop({ default: '' })
  imageUrl: string;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  imageAlt: LocalizedReadingText;
}

export const ReadingLessonMediaSchema =
  SchemaFactory.createForClass(ReadingLessonMedia);

/* ════════════════════════════ 본문 ════════════════════════════ */

/**
 * 문단 하나. **원문 문자열 그대로 저장한다.**
 *
 * 예전에는 핵심 어휘 위치까지 미리 쪼개서 조각 배열로 넣었는데, 그러면 DB 에서
 * 문단 하나가 조각 40개가 되어 사람이 읽을 수가 없었다. 게다가 어휘가 바뀌면
 * 조각도 같이 다시 만들어야 해서 늘 어긋날 위험이 있었다.
 *
 * 지금은 원문만 두고, 어휘 강조는 API 가 내려줄 때 계산한다
 * (`reading-passage.util.ts`). 앱이 받는 모양은 예전 그대로다.
 */
@Schema({ _id: false })
export class ReadingPassageParagraph {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  text: string;
}

export const ReadingPassageParagraphSchema = SchemaFactory.createForClass(
  ReadingPassageParagraph,
);

/**
 * 문단을 어휘 기준으로 쪼갠 한 조각. **응답 전용 — DB 에 없다.**
 * `vocabularyId` 가 있으면 앱이 그 조각에 색을 칠하고 누를 수 있게 한다.
 */
export interface ReadingPassageSegment {
  text: string;
  vocabularyId: string;
}

/* ══════════════════════ 어휘 ① 핵심 어휘 ══════════════════════ */

/**
 * 교재가 고른 학습 대상 단어. "이건 외워라" 쪽이다.
 * 본문에서 색이 있고, 하단에 예문이 붙은 카드로 다시 나온다.
 */
@Schema({ _id: false })
export class ReadingVocabularyItem {
  /** 본문 조각이 가리키는 id. `v1`, `v2` … */
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, trim: true })
  word: string;

  /** 발음 표기 `[도서관]`. 아직 시드에 없다 — 채우면 카드에 바로 뜬다 */
  @Prop({ default: '' })
  pronunciation: string;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  meaning: LocalizedReadingText;

  /** 짧은 보충 설명. 카드에 작은 칩으로 뜬다. 보통 비어 있다 */
  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  note: LocalizedReadingText;

  /** 이 단어가 실제로 쓰인 본문 문장. 시드가 본문에서 찾아 넣는다 */
  @Prop({ default: '' })
  example: string;
}

export const ReadingVocabularyItemSchema = SchemaFactory.createForClass(
  ReadingVocabularyItem,
);

/* ══════════════════════ 어휘 ② 본문 사전 ══════════════════════ */

/**
 * 본문에 나오는 단어 하나의 뜻. "막히면 눌러 봐라" 쪽이다.
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

  /**
   * ⚠️ **기본형(lemma)의 뜻**이다. 활용형의 뜻이 아니다.
   *
   * 갔습니다 → lemma "가다" → meaning "to go / bormoq". "went / bordi" 가 아니다.
   * 시제·말투는 grammar 태그가 이미 들고 있어서, 뜻에까지 넣으면 둘이 서로
   * 어긋난다. 무엇보다 같은 기본형이 어디서나 같은 뜻이어야 사전이 일관된다
   * (갑니다·갔습니다·가서·가는 이 전부 "가다" 하나로 모인다).
   */
  @Prop({ type: LocalizedReadingTextSchema, required: true })
  meaning: LocalizedReadingText;

  /**
   * 문법 태그 (GRAMMAR_TAGS). 활용형이 기본형에 무엇을 더했는지가 전부 여기 있다.
   * 문장이 아니라 태그인 이유는 상수 파일 참고. 예: ["past", "formalPolite"]
   */
  @Prop({ type: [String], default: [] })
  grammar: string[];

  /** 태그로 표현이 안 되는 경우에만. 보통 비어 있다 */
  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  note: LocalizedReadingText;
}

export const ReadingWordGlossSchema =
  SchemaFactory.createForClass(ReadingWordGloss);

/* ══════════════════════ 문제 ① 확인 문제 ══════════════════════ */

/** 본문을 읽었는지 확인하는 4지선다 */
@Schema({ _id: false })
export class ReadingCheckQuestion {
  /** `q1`, `q2` … 채점 때 이 id 로 답을 맞춰 본다 */
  @Prop({ required: true })
  id: string;

  @Prop({ type: LocalizedReadingTextSchema, required: true })
  prompt: LocalizedReadingText;

  @Prop({ type: [LocalizedReadingTextSchema], default: [] })
  options: LocalizedReadingText[];

  @Prop({ required: true, min: 0 })
  answerIndex: number;

  /** 왜 그게 답인지 — 본문 어디에 나오는지를 적는다 */
  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  explanation: LocalizedReadingText;
}

export const ReadingCheckQuestionSchema =
  SchemaFactory.createForClass(ReadingCheckQuestion);

/* ══════════════════ 문제 ② 어휘 재사용 연습 ══════════════════ */

export const READING_VOCABULARY_EXERCISE_TYPES = [
  'sentence_word_bank',
  'paragraph_conjugation',
] as const;
export type ReadingVocabularyExerciseType =
  (typeof READING_VOCABULARY_EXERCISE_TYPES)[number];

@Schema({ _id: false })
export class ReadingVocabularyExerciseBlank {
  @Prop({ required: true })
  id: string;

  /** 단어 상자에 표시되는 기본형 */
  @Prop({ required: true, trim: true })
  baseWord: string;

  /** 본문 문맥에 들어가는 대표 정답 */
  @Prop({ required: true, trim: true })
  answer: string;

  @Prop({ type: [String], default: [] })
  acceptedAnswers: string[];

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  explanation: LocalizedReadingText;
}

export const ReadingVocabularyExerciseBlankSchema =
  SchemaFactory.createForClass(ReadingVocabularyExerciseBlank);

/** 3급 이상에서 본문 어휘를 문장과 문단 안에 다시 넣어 보는 연습 */
@Schema({ _id: false })
export class ReadingVocabularyExercise {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true, enum: READING_VOCABULARY_EXERCISE_TYPES })
  type: ReadingVocabularyExerciseType;

  @Prop({ type: LocalizedReadingTextSchema, required: true })
  title: LocalizedReadingText;

  @Prop({ type: LocalizedReadingTextSchema, required: true })
  instruction: LocalizedReadingText;

  @Prop({ type: [String], default: [] })
  wordBank: string[];

  /** 빈칸은 {{blank-id}} 표식으로 넣는다. */
  @Prop({ required: true })
  template: string;

  @Prop({ type: [ReadingVocabularyExerciseBlankSchema], default: [] })
  blanks: ReadingVocabularyExerciseBlank[];
}

export const ReadingVocabularyExerciseSchema = SchemaFactory.createForClass(
  ReadingVocabularyExercise,
);

/* ════════════════════════════ 쓰기 ════════════════════════════ */

/** 레슨 마지막의 자유 쓰기. 채점은 안 하고 최소 글자 수만 본다 */
@Schema({ _id: false })
export class ReadingWritingActivity {
  @Prop({ type: LocalizedReadingTextSchema, required: true })
  prompt: LocalizedReadingText;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  helper: LocalizedReadingText;

  @Prop({ type: LocalizedReadingTextSchema, default: () => ({}) })
  placeholder: LocalizedReadingText;

  /** 써 보라고 권하는 표현들. 화면에 칩으로 뜬다 */
  @Prop({ type: [String], default: [] })
  keywords: string[];

  @Prop({ default: '' })
  exampleAnswer: string;
}

export const ReadingWritingActivitySchema = SchemaFactory.createForClass(
  ReadingWritingActivity,
);

/* ════════════════════════════ 출처 ════════════════════════════ */

/** 어느 교재 몇 쪽에서 왔는지. 화면에 안 뜨고 시드 관리용이다 */
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
