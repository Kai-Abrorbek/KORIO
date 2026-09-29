import {
  TOPIK_II_35_LISTENING_SEED,
  TOPIK_II_35_READING_SEED,
  TOPIK_II_35_WRITING_SEED,
} from './data/topik';
import {
  validateTopikII35ReadingSeed,
  validateTopikListeningSeed,
  validateTopikWritingSeed,
} from './validate-topik-seed';

// 제35회 TOPIK II 공식 정답표 p.1–2. 세 영역은 각각 100점이다.
const listeningAnswers = [
  2, 4, 1, 2, 4, 3, 2, 4, 1, 3, 1, 3, 4, 4, 3, 3, 1, 1, 2, 1, 2, 2, 4, 3, 4, 2,
  2, 4, 1, 3, 4, 2, 1, 2, 4, 4, 2, 4, 2, 1, 3, 3, 1, 3, 3, 1, 1, 2, 4, 3,
];
const readingAnswers = [
  3, 4, 1, 1, 1, 2, 1, 3, 4, 1, 2, 3, 1, 4, 4, 2, 3, 3, 2, 4, 1, 2, 1, 3, 3, 1,
  4, 3, 4, 4, 1, 2, 4, 4, 2, 2, 4, 4, 2, 3, 3, 1, 2, 2, 3, 2, 3, 2, 1, 4,
];

describe('TOPIK II 35회 시드', () => {
  it('공식 듣기 정답표와 문항 구조가 일치한다', () => {
    const result = validateTopikListeningSeed(TOPIK_II_35_LISTENING_SEED);
    expect(result.questionCount).toBe(50);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_II_35_LISTENING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(listeningAnswers);
    expect(questions.every((question) => question.points === 2)).toBe(true);
    for (const number of [1, 2, 3]) {
      expect(
        questions[number - 1].choices.every((choice) =>
          choice.imageAssetKey?.startsWith(
            `topik-ii-35-q${String(number).padStart(2, '0')}-c`,
          ),
        ),
      ).toBe(true);
    }
  });

  it('공식 읽기 정답표와 35회 문항 유형이 일치한다', () => {
    const result = validateTopikII35ReadingSeed(TOPIK_II_35_READING_SEED);
    expect(result.questionCount).toBe(50);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_II_35_READING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(readingAnswers);
    expect(questions.every((question) => question.points === 2)).toBe(true);
  });

  it('쓰기 원문 4문항·배점·모범답안과 53번 그래프 수치를 보존한다', () => {
    expect(validateTopikWritingSeed(TOPIK_II_35_WRITING_SEED)).toEqual({
      groupCount: 3,
      questionCount: 4,
      totalPoints: 100,
    });
    const questions = TOPIK_II_35_WRITING_SEED.questions;
    expect(questions.map((question) => question.points)).toEqual([
      10, 10, 30, 50,
    ]);
    expect(
      questions.every((question) => question.solution.sampleAnswer?.trim()),
    ).toBe(true);
    expect(
      questions[2].stimulus?.chart?.rows.map((row) => row.numericValues),
    ).toEqual([
      [28, 50],
      [40, 23],
      [22, 22],
      [10, 5],
    ]);
  });
});
