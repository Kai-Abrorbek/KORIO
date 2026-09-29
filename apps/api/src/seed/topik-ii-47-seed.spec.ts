import {
  TOPIK_II_47_LISTENING_SEED,
  TOPIK_II_47_READING_SEED,
  TOPIK_II_47_WRITING_SEED,
} from './data/topik';
import {
  validateTopikII35ReadingSeed,
  validateTopikListeningSeed,
  validateTopikWritingSeed,
} from './validate-topik-seed';

// 제47회 TOPIK II B형 스캔 정답표 p. 1(듣기), p. 4(읽기)를 육안 대조함.
const listeningAnswers = [
  2, 1, 2, 3, 2, 3, 1, 4, 1, 4, 1, 2, 2, 3, 3, 4, 3, 4, 2, 1, 2, 3, 4, 3, 4, 2,
  3, 4, 1, 3, 4, 3, 2, 1, 3, 1, 3, 4, 4, 1, 2, 1, 1, 4, 1, 4, 2, 2, 3, 2,
];
const readingAnswers = [
  3, 4, 1, 3, 1, 2, 4, 2, 2, 3, 4, 1, 1, 2, 3, 2, 3, 4, 2, 4, 1, 2, 4, 3, 4, 1,
  4, 3, 1, 2, 1, 4, 4, 3, 1, 4, 3, 2, 3, 3, 2, 1, 2, 1, 3, 3, 2, 4, 4, 1,
];

describe('TOPIK II 47회 시드', () => {
  it('공식 듣기 정답·배점과 그림 선택지를 보존한다', () => {
    expect(validateTopikListeningSeed(TOPIK_II_47_LISTENING_SEED)).toEqual({
      groupCount: 35,
      questionCount: 50,
      totalPoints: 100,
    });
    const questions = [...TOPIK_II_47_LISTENING_SEED.questions].sort(
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
            `topik-ii-47-q${String(number).padStart(2, '0')}-c`,
          ),
        ),
      ).toBe(true);
    }
  });

  it('공식 읽기 정답·배점과 50문항 구조를 보존한다', () => {
    expect(validateTopikII35ReadingSeed(TOPIK_II_47_READING_SEED)).toEqual({
      groupCount: 18,
      questionCount: 50,
      totalPoints: 100,
    });
    const questions = [...TOPIK_II_47_READING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(readingAnswers);
    expect(questions.every((question) => question.points === 2)).toBe(true);
  });

  it('쓰기 51~54번과 공식 배점을 보존한다', () => {
    expect(validateTopikWritingSeed(TOPIK_II_47_WRITING_SEED)).toEqual({
      groupCount: 3,
      questionCount: 4,
      totalPoints: 100,
    });
    const questions = [...TOPIK_II_47_WRITING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(questions.map((question) => question.number)).toEqual([
      51, 52, 53, 54,
    ]);
    expect(questions.map((question) => question.points)).toEqual([
      10, 10, 30, 50,
    ]);
    expect(
      questions[2].stimulus?.chart?.rows.map((row) => row.numericValues),
    ).toEqual([[4000], [100000]]);
    expect(
      questions[2].stimulus?.infoItems?.find((item) => item.label === '기대')
        ?.value,
    ).toContain('20만 명');
    expect(
      questions.every((question) => question.solution.sampleAnswer?.trim()),
    ).toBe(true);
  });
});
