import { READING_LEVEL1_SEEDS } from './data/reading/reading-level1.data';
import { READING_LEVEL2_SEEDS } from './data/reading/reading-level2.data';
import { READING_LEVEL3_SEEDS } from './data/reading/reading-level3.data';

const codes = new Set<string>();
const groups = [
  {
    level: 1,
    expectedCount: 40,
    pageStart: 14,
    pageStride: 4,
    pageSpan: 3,
    bookCode: 'culture-korean-reading-1',
    lessons: READING_LEVEL1_SEEDS,
  },
  {
    level: 2,
    expectedCount: 28,
    pageStart: 15,
    pageStride: 6,
    pageSpan: 3,
    bookCode: 'culture-korean-reading-2',
    lessons: READING_LEVEL2_SEEDS,
  },
  {
    level: 3,
    expectedCount: 20,
    pageStart: 14,
    pageStride: 8,
    pageSpan: 5,
    bookCode: 'culture-korean-reading-3',
    lessons: READING_LEVEL3_SEEDS,
  },
] as const;

for (const group of groups) {
  const units = new Set<number>();
  if (group.lessons.length !== group.expectedCount) {
    throw new Error(
      `${group.level}급 읽기 단원은 ${group.expectedCount}개여야 합니다: ${group.lessons.length}개`,
    );
  }

  for (const lesson of group.lessons) {
    if (!lesson.code.trim() || codes.has(lesson.code)) {
      throw new Error(`읽기 단원 code가 비었거나 중복입니다: ${lesson.code}`);
    }
    codes.add(lesson.code);

    if (
      lesson.level !== group.level ||
      lesson.unit < 1 ||
      lesson.unit > group.expectedCount
    ) {
      throw new Error(`${lesson.code}의 급수 또는 단원 번호가 잘못되었습니다.`);
    }
    if (units.has(lesson.unit)) {
      throw new Error(`${group.level}급 ${lesson.unit}과가 중복되었습니다.`);
    }
    units.add(lesson.unit);

    if (!lesson.title.trim() || !lesson.topic.ko.trim()) {
      throw new Error(`${lesson.code}의 제목 또는 주제가 비었습니다.`);
    }
    if (
      !lesson.passage.length ||
      lesson.passage.some((item) => !item.segments.length)
    ) {
      throw new Error(`${lesson.code}의 읽기 본문이 비었습니다.`);
    }
    if (!lesson.vocabulary.length) {
      throw new Error(`${lesson.code}의 새 어휘가 비었습니다.`);
    }
    for (const item of lesson.vocabulary) {
      if (
        !item.meaning.uz.trim() ||
        !item.meaning.en.trim() ||
        !item.meaning.ru.trim()
      ) {
        throw new Error(
          `${lesson.code}의 어휘 ${item.word}에 현지어 뜻이 없습니다.`,
        );
      }
      if (!item.example.trim()) {
        throw new Error(`${lesson.code}의 어휘 ${item.word}에 예문이 없습니다.`);
      }
    }

    const vocabularyIds = new Set(lesson.vocabulary.map((item) => item.id));
    for (const paragraph of lesson.passage) {
      for (const segment of paragraph.segments) {
        if (segment.vocabularyId && !vocabularyIds.has(segment.vocabularyId)) {
          throw new Error(
            `${lesson.code}가 없는 어휘를 참조합니다: ${segment.vocabularyId}`,
          );
        }
      }
    }

    if (lesson.questions.length < 2) {
      throw new Error(
        `${lesson.code}의 읽고 확인하기 문제는 2개 이상이어야 합니다.`,
      );
    }
    for (const question of lesson.questions) {
      if (
        !question.prompt.ko.trim() ||
        question.options.length < 2 ||
        question.answerIndex < 0 ||
        question.answerIndex >= question.options.length ||
        !question.explanation.ko.trim()
      ) {
        throw new Error(`${lesson.code}의 문제 ${question.id}가 잘못되었습니다.`);
      }
    }

    if (lesson.level >= 3) {
      const exercises =
        'vocabularyExercises' in lesson ? lesson.vocabularyExercises : [];
      const expectedTypes = new Set([
        'sentence_word_bank',
        'paragraph_conjugation',
      ]);
      if (exercises.length !== expectedTypes.size) {
        throw new Error(
          `${lesson.code}의 3급 어휘 연습은 두 유형이 모두 있어야 합니다.`,
        );
      }

      const exerciseIds = new Set<string>();
      for (const exercise of exercises) {
        if (
          !exercise.id.trim() ||
          exerciseIds.has(exercise.id) ||
          !expectedTypes.delete(exercise.type) ||
          !exercise.title.ko.trim() ||
          !exercise.instruction.ko.trim() ||
          !exercise.template.trim() ||
          !exercise.wordBank.length
        ) {
          throw new Error(
            `${lesson.code}의 어휘 연습 ${exercise.id}가 잘못되었습니다.`,
          );
        }
        exerciseIds.add(exercise.id);

        const minimumBlanks =
          exercise.type === 'sentence_word_bank' ? 4 : 3;
        if (exercise.blanks.length < minimumBlanks) {
          const counts = exercises
            .map((item) => `${item.type}=${item.blanks.length}`)
            .join(', ');
          throw new Error(
            `${lesson.code}의 어휘 연습 ${exercise.id}에 빈칸이 부족합니다: ${counts}`,
          );
        }

        const blankIds = new Set<string>();
        for (const blank of exercise.blanks) {
          const marker = `{{${blank.id}}}`;
          const markerCount = exercise.template.split(marker).length - 1;
          if (
            !blank.id.trim() ||
            blankIds.has(blank.id) ||
            !blank.baseWord.trim() ||
            !blank.answer.trim() ||
            !blank.acceptedAnswers.includes(blank.answer) ||
            !exercise.wordBank.includes(blank.baseWord) ||
            markerCount !== 1 ||
            !blank.explanation.ko.trim()
          ) {
            throw new Error(
              `${lesson.code}의 어휘 연습 빈칸 ${blank.id}가 잘못되었습니다.`,
            );
          }
          blankIds.add(blank.id);
        }
      }
    }

    if (
      !lesson.writing.prompt.ko.trim() ||
      !lesson.writing.helper.ko.trim() ||
      !lesson.writing.exampleAnswer.trim()
    ) {
      throw new Error(`${lesson.code}의 써 봅시다 데이터가 비었습니다.`);
    }

    const expectedStart = group.pageStart + (lesson.unit - 1) * group.pageStride;
    if (
      lesson.source.bookCode !== group.bookCode ||
      lesson.source.pageStart !== expectedStart ||
      lesson.source.pageEnd !== expectedStart + group.pageSpan
    ) {
      throw new Error(`${lesson.code}의 교재 출처 또는 페이지 범위가 잘못되었습니다.`);
    }
  }

  for (let unit = 1; unit <= group.expectedCount; unit += 1) {
    if (!units.has(unit)) {
      throw new Error(`${group.level}급 ${unit}과 데이터가 없습니다.`);
    }
  }

  console.log(
    `✅ 문화가 있는 한국어 읽기 ${group.level} · ${group.lessons.length}개 단원 검증 완료`,
  );
}
