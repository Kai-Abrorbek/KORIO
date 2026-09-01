import type {
  LocalizedReadingText,
  ReadingPassageSegment,
} from '../../../reading-lessons/schemas/reading-lesson.schema';
import { getLevel2ReadingGloss } from './reading-level2.glosses';

export type Level2QuestionSeed = readonly [
  prompt: string,
  options: readonly string[],
  answerIndex: number,
  explanation: string,
];

export type Level2WritingSeed = readonly [
  prompt: string,
  helper: string,
  keywords: readonly string[],
  exampleAnswer: string,
];

export type CompactLevel2ReadingLessonSeed = {
  unit: number;
  title: string;
  topic: string;
  passage: readonly string[];
  vocabulary: readonly string[];
  questions: readonly Level2QuestionSeed[];
  writing: Level2WritingSeed;
};

const localized = (
  ko: string,
  en = '',
  uz = '',
  ru = '',
): LocalizedReadingText => ({ ko, uz, en, ru });

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const passageSegments = (
  text: string,
  vocabulary: readonly string[],
): ReadingPassageSegment[] => {
  const idByWord = new Map(
    vocabulary.map((word, index) => [word, `v${index + 1}`]),
  );
  const words = [...idByWord.keys()].sort((a, b) => b.length - a.length);
  if (!words.length) return [{ text, vocabularyId: '' }];

  const pattern = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'g');
  return text
    .split(pattern)
    .filter(Boolean)
    .map((segment) => ({
      text: segment,
      vocabularyId: idByWord.get(segment) || '',
    }));
};

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

export function defineLevel2Lesson(seed: CompactLevel2ReadingLessonSeed) {
  const code = `culture-reading-2-${String(seed.unit).padStart(2, '0')}`;

  return {
    code,
    level: 2,
    unit: seed.unit,
    order: seed.unit,
    title: seed.title,
    topic: localized(seed.topic),
    estimatedMinutes: Math.max(
      7,
      Math.ceil(seed.passage.join('').length / 150) + 5,
    ),
    media: {
      imageUrl: '',
      imageAlt: localized(`${seed.title} 읽기 자료의 대표 이미지`),
    },
    passage: seed.passage.map((text, index) => ({
      id: `paragraph-${index + 1}`,
      segments: passageSegments(text, seed.vocabulary),
    })),
    vocabulary: seed.vocabulary.map((word, index) => {
      const gloss = getLevel2ReadingGloss(word);
      return {
        id: `v${index + 1}`,
        word,
        pronunciation: '',
        meaning: localized(word, gloss.en, gloss.uz, gloss.ru),
        sourceGlosses: { en: gloss.en, zh: '', ja: '' },
        note: localized(''),
        example: vocabularyExample(seed.passage, word),
      };
    }),
    questions: seed.questions.map(
      ([prompt, options, answerIndex, explanation], index) => ({
        id: `q${index + 1}`,
        prompt: localized(prompt),
        options: options.map((option) => localized(option)),
        answerIndex,
        explanation: localized(explanation),
      }),
    ),
    writing: {
      prompt: localized(seed.writing[0]),
      helper: localized(seed.writing[1]),
      placeholder: localized('한국어로 천천히 써 보세요.'),
      keywords: [...seed.writing[2]],
      exampleAnswer: seed.writing[3],
    },
    source: {
      bookCode: 'culture-korean-reading-2',
      bookTitle: '문화가 있는 한국어 읽기 2',
      pageStart: 15 + (seed.unit - 1) * 6,
      pageEnd: 18 + (seed.unit - 1) * 6,
    },
    isActive: true,
  };
}

export const level2Lesson = (
  unit: number,
  title: string,
  topic: string,
  passage: readonly string[],
  vocabulary: readonly string[],
  questions: readonly Level2QuestionSeed[],
  writing: Level2WritingSeed,
) =>
  defineLevel2Lesson({
    unit,
    title,
    topic,
    passage,
    vocabulary,
    questions,
    writing,
  });
