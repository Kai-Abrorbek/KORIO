import {
  TOPIK_II_102_LISTENING_SEED,
  TOPIK_II_102_READING_SEED,
  TOPIK_II_102_WRITING_SEED,
} from './data/topik';
import {
  validateTopikII83ReadingSeed,
  validateTopikListeningSeed,
  validateTopikWritingSeed,
} from './validate-topik-seed';

const listeningAnswers = [
  2, 1, 3, 2, 4, 3, 1, 1, 4, 2, 4, 1, 4, 1, 3, 2, 4, 4, 1, 4, 3, 1, 2, 3, 2, 2,
  3, 4, 2, 3, 3, 4, 1, 1, 2, 3, 1, 4, 4, 2, 2, 3, 1, 2, 3, 3, 2, 1, 4, 4,
];
const readingAnswers = [
  1, 1, 4, 4, 1, 3, 2, 1, 2, 4, 2, 1, 1, 2, 1, 2, 3, 1, 1, 4, 3, 3, 1, 4, 2, 2,
  3, 4, 3, 2, 4, 1, 3, 4, 3, 3, 4, 4, 3, 2, 4, 2, 3, 2, 1, 3, 2, 4, 4, 3,
];

describe('TOPIK II 102회 시드', () => {
  it('듣기 50문항의 정답·배점·그림 선택지를 보존한다', () => {
    const result = validateTopikListeningSeed(TOPIK_II_102_LISTENING_SEED);
    expect(result.questionCount).toBe(50);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_II_102_LISTENING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(questions.map((question) => question.number)).toEqual(
      Array.from({ length: 50 }, (_, index) => index + 1),
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(listeningAnswers);
    expect(questions.every((question) => question.points === 2)).toBe(true);
    for (const number of [1, 2, 3]) {
      expect(
        questions[number - 1].choices.every((choice) =>
          choice.imageAssetKey?.startsWith(
            `topik-ii-102-q${String(number).padStart(2, '0')}-c`,
          ),
        ),
      ).toBe(true);
    }
  });

  it('읽기 50문항의 정답·배점을 보존한다', () => {
    const result = validateTopikII83ReadingSeed(TOPIK_II_102_READING_SEED);
    expect(result.questionCount).toBe(50);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_II_102_READING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(questions.map((question) => question.number)).toEqual(
      Array.from({ length: 50 }, (_, index) => index + 1),
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(readingAnswers);
    expect(questions.every((question) => question.points === 2)).toBe(true);
  });

  it('쓰기 51~54번의 배점·모범답안·도표 수치를 보존한다', () => {
    const result = validateTopikWritingSeed(TOPIK_II_102_WRITING_SEED);
    expect(result.questionCount).toBe(4);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_II_102_WRITING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(questions.map((question) => question.number)).toEqual([
      51, 52, 53, 54,
    ]);
    expect(questions.map((question) => question.points)).toEqual([
      10, 10, 30, 50,
    ]);
    expect(
      questions.every((question) => question.solution.sampleAnswer?.trim()),
    ).toBe(true);
    expect(questions[0].solution.sampleAnswer).toContain('정리해야 합니다');
    expect(questions[1].solution.sampleAnswer).toContain('받지 않아서');
    expect(
      questions[2].stimulus?.chart?.rows.map((row) => row.numericValues),
    ).toEqual([[3400000], [6500000]]);
    expect(questions[3].solution.sampleAnswer).toContain('디지털 인프라');
  });
});
