import { READING_LEVEL1_SEEDS } from './data/reading/reading-level1.data';

const EXPECTED_LESSON_COUNT = 40;
const codes = new Set<string>();
const units = new Set<number>();

if (READING_LEVEL1_SEEDS.length !== EXPECTED_LESSON_COUNT) {
  throw new Error(
    `1급 읽기 단원은 ${EXPECTED_LESSON_COUNT}개여야 합니다: ${READING_LEVEL1_SEEDS.length}개`,
  );
}

for (const lesson of READING_LEVEL1_SEEDS) {
  if (!lesson.code.trim() || codes.has(lesson.code)) {
    throw new Error(`읽기 단원 code가 비었거나 중복입니다: ${lesson.code}`);
  }
  codes.add(lesson.code);

  if (lesson.level !== 1 || lesson.unit < 1 || lesson.unit > 40) {
    throw new Error(`${lesson.code}의 급수 또는 단원 번호가 잘못되었습니다.`);
  }
  if (units.has(lesson.unit)) {
    throw new Error(`1급 ${lesson.unit}과가 중복되었습니다.`);
  }
  units.add(lesson.unit);

  if (!lesson.title.trim() || !lesson.topic.ko.trim()) {
    throw new Error(`${lesson.code}의 제목 또는 주제가 비었습니다.`);
  }
  if (!lesson.passage.length || lesson.passage.some((item) => !item.segments.length)) {
    throw new Error(`${lesson.code}의 읽기 본문이 비었습니다.`);
  }
  if (!lesson.vocabulary.length) {
    throw new Error(`${lesson.code}의 새 어휘가 비었습니다.`);
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
    throw new Error(`${lesson.code}의 읽고 확인하기 문제는 2개 이상이어야 합니다.`);
  }
  for (const question of lesson.questions) {
    if (
      !question.prompt.ko.trim() ||
      question.options.length < 2 ||
      question.answerIndex < 0 ||
      question.answerIndex >= question.options.length
    ) {
      throw new Error(`${lesson.code}의 문제 ${question.id}가 잘못되었습니다.`);
    }
  }

  if (
    !lesson.writing.prompt.ko.trim() ||
    !lesson.writing.helper.ko.trim() ||
    !lesson.writing.exampleAnswer.trim()
  ) {
    throw new Error(`${lesson.code}의 써 봅시다 데이터가 비었습니다.`);
  }

  const expectedStart = 14 + (lesson.unit - 1) * 4;
  if (
    lesson.source.pageStart !== expectedStart ||
    lesson.source.pageEnd !== expectedStart + 3
  ) {
    throw new Error(`${lesson.code}의 교재 페이지 범위가 잘못되었습니다.`);
  }
}

for (let unit = 1; unit <= EXPECTED_LESSON_COUNT; unit += 1) {
  if (!units.has(unit)) throw new Error(`1급 ${unit}과 데이터가 없습니다.`);
}

console.log(
  `✅ 문화가 있는 한국어 읽기 1 · ${READING_LEVEL1_SEEDS.length}개 단원 검증 완료`,
);

