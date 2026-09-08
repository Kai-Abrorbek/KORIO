/**
 * 읽기 레슨 시드를 실제 문서로 만드는 곳. **모든 레벨이 여기 하나를 쓴다.**
 *
 * 예전에는 `reading-level1/2/3.helpers.ts` 세 파일이 같은 함수 네 개
 * (`localized`, `escapeRegExp`, `passageSegments`, `vocabularyExample`)를
 * 글자 하나 안 틀리고 복붙해서 갖고 있었다. 레벨마다 실제로 다른 건 아래
 * `ReadingLevelSpec` 여섯 줄뿐인데도 그랬다.
 *
 * ── 레벨을 하나 더 붙이려면 ──
 * 1. 맨 아래에 `LEVEL4` 설정을 쓴다
 * 2. `export const level4Lesson = makeLevelLesson(LEVEL4)` 한 줄
 * 3. 끝. 데이터 파일은 `level4Lesson(...)` 을 그냥 부르면 된다
 */
import type { LocalizedReadingText } from '../../../reading-lessons/schemas/reading-lesson.schema';
import { getLevel1ReadingGloss } from './reading-level1.glosses';
import { getLevel2ReadingGloss } from './reading-level2.glosses';
import { buildReadingVocabularyExercises } from './reading-vocabulary-exercises';

/* ══════════════════════ 시드가 쓰는 입력 모양 ══════════════════════ */

/** `['김민지 씨의 직업은?', ['학생','기자','선생님'], 1, '첫 문단에 나온다']` */
export type ReadingQuestionSeed = readonly [
  prompt: string,
  options: readonly string[],
  answerIndex: number,
  explanation: string,
];

/** `['자신을 소개해 보세요.', '이름·나라·직업 순서로', ['저는','입니다'], '저는 …']` */
export type ReadingWritingSeed = readonly [
  prompt: string,
  helper: string,
  keywords: readonly string[],
  exampleAnswer: string,
];

/** 1급: 영어 뜻만 적고 우즈벡어·러시아어는 사전 파일에서 가져온다 */
export type Level1VocabularySeed = readonly [word: string, english: string];

/** 2급: 단어만 적고 뜻 세 개를 전부 사전 파일에서 가져온다 */
export type Level2VocabularySeed = string;

/** 3급: 사전 파일 없이 네 언어를 그 자리에 적는다 */
export type Level3VocabularySeed = readonly [
  word: string,
  english: string,
  uzbek: string,
  russian: string,
];

/* ════════════════════════ 레벨별 설정 ════════════════════════ */

/** 어휘 시드가 어떤 모양이든 결국 이 네 언어로 편다 */
type ResolvedWord = { word: string; en: string; uz: string; ru: string };

type ReadingLevelSpec<V> = {
  level: number;
  book: { code: string; title: string };
  /** `max(min, ceil(본문 글자수 / charsPerMinute) + pad)` */
  minutes: { min: number; charsPerMinute: number; pad: number };
  /** `pageStart = start + (unit-1) * stride`, `pageEnd = pageStart + span` */
  page: { start: number; stride: number; span: number };
  /** 레벨마다 어휘 시드 모양이 달라서, 펴는 방법만 여기서 정한다 */
  resolveWord: (seed: V) => ResolvedWord;
  /** 본문 어휘를 문장·문단에 다시 넣어 보는 연습을 붙일지 (3급~) */
  vocabularyExercises: boolean;
};

/* ══════════════════════════ 공통 도구 ══════════════════════════ */

const localized = (
  ko: string,
  en = '',
  uz = '',
  ru = '',
): LocalizedReadingText => ({ ko, uz, en, ru });

const WRITING_PLACEHOLDER = '한국어로 천천히 써 보세요.';

/**
 * 이 단어가 실제로 쓰인 본문 문장을 찾아 예문으로 쓴다.
 *
 * 사전형(`가다`)은 본문에 그대로 안 나오니까 어간(`가`)으로도 찾아본다.
 * 어간이 한 글자면 아무 문장에나 걸려서 두 글자 이상일 때만 쓴다.
 */
const vocabularyExample = (passage: readonly string[], word: string) => {
  const sentences = passage.flatMap((paragraph) =>
    (paragraph.match(/[^.!?]+[.!?]?/g) || [paragraph])
      .map((sentence) => sentence.trim())
      .filter(Boolean),
  );
  const stem = word.endsWith('하다')
    ? word.slice(0, -2)
    : word.endsWith('다')
      ? word.slice(0, -1)
      : word;

  return (
    sentences.find(
      (sentence) =>
        sentence.includes(word) ||
        (stem.length >= 2 && sentence.includes(stem)),
    ) ||
    sentences[0] ||
    ''
  );
};

/* ══════════════════════════ 빌더 ══════════════════════════ */

type ReadingLessonArgs<V> = {
  unit: number;
  title: string;
  topic: string;
  passage: readonly string[];
  vocabulary: readonly V[];
  questions: readonly ReadingQuestionSeed[];
  writing: ReadingWritingSeed;
};

function defineReadingLesson<V>(
  spec: ReadingLevelSpec<V>,
  args: ReadingLessonArgs<V>,
) {
  const { unit, title, topic, passage, questions, writing } = args;
  const code = `culture-reading-${spec.level}-${String(unit).padStart(2, '0')}`;
  const words = args.vocabulary.map(spec.resolveWord);
  const pageStart = spec.page.start + (unit - 1) * spec.page.stride;

  return {
    code,
    level: spec.level,
    unit,
    order: unit,
    title,
    topic: localized(topic),
    estimatedMinutes: Math.max(
      spec.minutes.min,
      Math.ceil(passage.join('').length / spec.minutes.charsPerMinute) +
        spec.minutes.pad,
    ),

    // 앱은 imageKey 로 번들된 이미지를 찾는다. code 를 그대로 쓰기 때문에
    // 사진을 넣는 일은 apps/mobile/assets/images/reading-listening/ 에
    // <code>.webp 를 떨어뜨리는 것뿐이다 — 시드를 다시 돌릴 필요가 없다.
    media: {
      imageKey: code,
      imageUrl: '',
      imageAlt: localized(`${title} 읽기 자료의 대표 이미지`),
    },

    // 본문은 원문 그대로 저장한다. 어휘 강조는 API 가 내려줄 때 계산한다
    // (reading-passage.util.ts). 예전엔 여기서 미리 쪼개 넣었다.
    passage: passage.map((text, index) => ({
      id: `paragraph-${index + 1}`,
      text,
    })),

    vocabulary: words.map((entry, index) => ({
      id: `v${index + 1}`,
      word: entry.word,
      pronunciation: '',
      meaning: localized(entry.word, entry.en, entry.uz, entry.ru),
      note: localized(''),
      example: vocabularyExample(passage, entry.word),
    })),

    questions: questions.map(
      ([prompt, options, answerIndex, explanation], index) => ({
        id: `q${index + 1}`,
        prompt: localized(prompt),
        options: options.map((option) => localized(option)),
        answerIndex,
        explanation: localized(explanation),
      }),
    ),

    // 안 쓰는 레벨은 빈 배열. 레벨마다 모양이 달라지면 이걸 받는 쪽이
    // 전부 "있나 없나" 를 먼저 물어봐야 한다.
    vocabularyExercises: spec.vocabularyExercises
      ? buildReadingVocabularyExercises(
          passage,
          words.map((entry) => [entry.word] as const),
        )
      : [],

    writing: {
      prompt: localized(writing[0]),
      helper: localized(writing[1]),
      placeholder: localized(WRITING_PLACEHOLDER),
      keywords: [...writing[2]],
      exampleAnswer: writing[3],
    },

    source: {
      bookCode: spec.book.code,
      bookTitle: spec.book.title,
      pageStart,
      pageEnd: pageStart + spec.page.span,
    },
    isActive: true,
  };
}

/** 설정 하나를 데이터 파일이 부르는 함수로 만든다 */
const makeLevelLesson =
  <V>(spec: ReadingLevelSpec<V>) =>
  (
    unit: number,
    title: string,
    topic: string,
    passage: readonly string[],
    vocabulary: readonly V[],
    questions: readonly ReadingQuestionSeed[],
    writing: ReadingWritingSeed,
  ) =>
    defineReadingLesson(spec, {
      unit,
      title,
      topic,
      passage,
      vocabulary,
      questions,
      writing,
    });

/* ════════════════════════ 레벨 정의 ════════════════════════ */

const LEVEL1: ReadingLevelSpec<Level1VocabularySeed> = {
  level: 1,
  book: {
    code: 'culture-korean-reading-1',
    title: '문화가 있는 한국어 읽기 1',
  },
  minutes: { min: 5, charsPerMinute: 140, pad: 4 },
  page: { start: 14, stride: 4, span: 3 },
  vocabularyExercises: false,
  resolveWord: ([word, english]) => {
    const gloss = getLevel1ReadingGloss(word, english);
    return { word, en: english, uz: gloss.uz, ru: gloss.ru };
  },
};

const LEVEL2: ReadingLevelSpec<Level2VocabularySeed> = {
  level: 2,
  book: {
    code: 'culture-korean-reading-2',
    title: '문화가 있는 한국어 읽기 2',
  },
  minutes: { min: 7, charsPerMinute: 150, pad: 5 },
  page: { start: 15, stride: 6, span: 3 },
  vocabularyExercises: false,
  resolveWord: (word) => {
    const gloss = getLevel2ReadingGloss(word);
    return { word, en: gloss.en, uz: gloss.uz, ru: gloss.ru };
  },
};

const LEVEL3: ReadingLevelSpec<Level3VocabularySeed> = {
  level: 3,
  book: {
    code: 'culture-korean-reading-3',
    title: '문화가 있는 한국어 읽기 3',
  },
  minutes: { min: 10, charsPerMinute: 180, pad: 7 },
  page: { start: 14, stride: 8, span: 5 },
  vocabularyExercises: true,
  resolveWord: ([word, en, uz, ru]) => ({ word, en, uz, ru }),
};

export const level1Lesson = makeLevelLesson(LEVEL1);
export const level2Lesson = makeLevelLesson(LEVEL2);
export const level3Lesson = makeLevelLesson(LEVEL3);
