import type {
  LocalizedReadingText,
  ReadingPassageSegment,
} from '../../../reading-lessons/schemas/reading-lesson.schema';

export type VocabularySeed = readonly [word: string, english: string];

export type QuestionSeed = readonly [
  prompt: string,
  options: readonly string[],
  answerIndex: number,
  evidence: string,
];

export type WritingSeed = readonly [
  prompt: string,
  helper: string,
  keywords: readonly string[],
  exampleAnswer: string,
];

export type CompactReadingLessonSeed = {
  unit: number;
  title: string;
  topic: string;
  passage: readonly string[];
  vocabulary: readonly VocabularySeed[];
  questions: readonly QuestionSeed[];
  writing: WritingSeed;
};

const localized = (ko: string, en = ''): LocalizedReadingText => ({
  ko,
  uz: '',
  en,
  ru: '',
});

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const passageSegments = (
  text: string,
  vocabulary: readonly VocabularySeed[],
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

export function defineLevel1Lesson(seed: CompactReadingLessonSeed) {
  const code = `culture-reading-1-${String(seed.unit).padStart(2, '0')}`;

  return {
    code,
    level: 1,
    unit: seed.unit,
    order: seed.unit,
    title: seed.title,
    topic: localized(seed.topic),
    estimatedMinutes: Math.max(
      5,
      Math.ceil(seed.passage.join('').length / 140) + 4,
    ),
    media: {
      imageUrl: '',
      imageAlt: localized(`${seed.title} 읽기 자료의 대표 이미지`),
    },
    passage: seed.passage.map((text, index) => ({
      id: `paragraph-${index + 1}`,
      segments: passageSegments(text, seed.vocabulary),
    })),
    vocabulary: seed.vocabulary.map(([word, english], index) => ({
      id: `v${index + 1}`,
      word,
      pronunciation: '',
      meaning: localized(word, english),
      sourceGlosses: { en: english, zh: '', ja: '' },
      note: localized(''),
      example: '',
    })),
    questions: seed.questions.map(
      ([prompt, options, answerIndex, evidence], index) => ({
        id: `q${index + 1}`,
        prompt: localized(prompt),
        options: options.map((option) => localized(option)),
        answerIndex,
        explanation: localized(evidence),
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
      bookCode: 'culture-korean-reading-1',
      bookTitle: '문화가 있는 한국어 읽기 1',
      pageStart: 14 + (seed.unit - 1) * 4,
      pageEnd: 17 + (seed.unit - 1) * 4,
    },
    isActive: true,
  };
}

export const level1Lesson = (
  unit: number,
  title: string,
  topic: string,
  passage: readonly string[],
  vocabulary: readonly VocabularySeed[],
  questions: readonly QuestionSeed[],
  writing: WritingSeed,
) =>
  defineLevel1Lesson({
    unit,
    title,
    topic,
    passage,
    vocabulary,
    questions,
    writing,
  });
