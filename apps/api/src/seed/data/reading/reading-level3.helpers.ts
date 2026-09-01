import type {
  LocalizedReadingText,
  ReadingPassageSegment,
} from '../../../reading-lessons/schemas/reading-lesson.schema';
import { buildReadingVocabularyExercises } from './reading-vocabulary-exercises';

export type Level3VocabularySeed = readonly [
  word: string,
  english: string,
  uzbek: string,
  russian: string,
];

export type Level3QuestionSeed = readonly [
  prompt: string,
  options: readonly string[],
  answerIndex: number,
  explanation: string,
];

export type Level3WritingSeed = readonly [
  prompt: string,
  helper: string,
  keywords: readonly string[],
  exampleAnswer: string,
];

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
  vocabulary: readonly Level3VocabularySeed[],
): ReadingPassageSegment[] => {
  const idByWord = new Map(
    vocabulary.map(([word], index) => [word, `v${index + 1}`]),
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

export function level3Lesson(
  unit: number,
  title: string,
  topic: string,
  passage: readonly string[],
  vocabulary: readonly Level3VocabularySeed[],
  questions: readonly Level3QuestionSeed[],
  writing: Level3WritingSeed,
) {
  const code = `culture-reading-3-${String(unit).padStart(2, '0')}`;

  return {
    code,
    level: 3,
    unit,
    order: unit,
    title,
    topic: localized(topic),
    estimatedMinutes: Math.max(
      10,
      Math.ceil(passage.join('').length / 180) + 7,
    ),
    media: {
      imageUrl: '',
      imageAlt: localized(`${title} 읽기 자료의 대표 이미지`),
    },
    passage: passage.map((text, index) => ({
      id: `paragraph-${index + 1}`,
      segments: passageSegments(text, vocabulary),
    })),
    vocabulary: vocabulary.map(([word, en, uz, ru], index) => ({
      id: `v${index + 1}`,
      word,
      pronunciation: '',
      meaning: localized(word, en, uz, ru),
      sourceGlosses: { en, zh: '', ja: '' },
      note: localized(''),
      example: vocabularyExample(passage, word),
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
    vocabularyExercises: buildReadingVocabularyExercises(passage, vocabulary),
    writing: {
      prompt: localized(writing[0]),
      helper: localized(writing[1]),
      placeholder: localized('한국어로 천천히 써 보세요.'),
      keywords: [...writing[2]],
      exampleAnswer: writing[3],
    },
    source: {
      bookCode: 'culture-korean-reading-3',
      bookTitle: '문화가 있는 한국어 읽기 3',
      pageStart: 14 + (unit - 1) * 8,
      pageEnd: 19 + (unit - 1) * 8,
    },
    isActive: true,
  };
}
