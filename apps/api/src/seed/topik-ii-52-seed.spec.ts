import {
  TOPIK_II_52_LISTENING_SEED,
  TOPIK_II_52_READING_SEED,
  TOPIK_II_52_WRITING_SEED,
} from './data/topik';
import {
  validateTopikII35ReadingSeed,
  validateTopikListeningSeed,
  validateTopikWritingSeed,
} from './validate-topik-seed';

// 제52회 TOPIK II B-홀수형 공식 정답표 p. 1(듣기), p. 2(읽기), p. 3(쓰기).
const listeningAnswers = [
  2, 1, 2, 2, 4, 4, 1, 2, 3, 1, 2, 3, 4, 4, 3, 3, 2, 4, 4, 3, 1, 4, 3, 3, 2, 1,
  2, 3, 4, 4, 3, 1, 1, 2, 3, 4, 4, 2, 1, 1, 3, 2, 1, 3, 1, 4, 2, 1, 4, 3,
];
const readingAnswers = [
  2, 1, 4, 1, 2, 2, 1, 2, 1, 3, 1, 2, 1, 2, 3, 2, 2, 3, 2, 1, 4, 4, 3, 2, 1, 3,
  4, 3, 2, 3, 4, 1, 3, 4, 4, 2, 3, 1, 4, 4, 3, 3, 1, 3, 4, 1, 4, 4, 3, 4,
];

describe('TOPIK II 52회 시드', () => {
  it('공식 듣기 정답·배점과 그림 선택지를 보존한다', () => {
    expect(validateTopikListeningSeed(TOPIK_II_52_LISTENING_SEED)).toEqual({
      groupCount: 35,
      questionCount: 50,
      totalPoints: 100,
    });
    const questions = [...TOPIK_II_52_LISTENING_SEED.questions].sort(
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
            `topik-ii-52-q${String(number).padStart(2, '0')}-c`,
          ),
        ),
      ).toBe(true);
    }
  });

  it('공식 읽기 정답·배점과 50문항 구조를 보존한다', () => {
    expect(validateTopikII35ReadingSeed(TOPIK_II_52_READING_SEED)).toEqual({
      groupCount: 18,
      questionCount: 50,
      totalPoints: 100,
    });
    const questions = [...TOPIK_II_52_READING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(readingAnswers);
    expect(questions.every((question) => question.points === 2)).toBe(true);
  });

  it('쓰기 51~54번과 공식 배점을 보존한다', () => {
    expect(validateTopikWritingSeed(TOPIK_II_52_WRITING_SEED)).toEqual({
      groupCount: 3,
      questionCount: 4,
      totalPoints: 100,
    });
    const questions = [...TOPIK_II_52_WRITING_SEED.questions].sort(
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
    ).toEqual([
      [80, 67],
      [20, 33],
    ]);
    expect(
      questions[2].stimulus?.infoItems?.find(
        (item) => item.label === '조사 대상',
      )?.value,
    ).toContain('3,000명');
    expect(
      questions.every((question) => question.solution.sampleAnswer?.trim()),
    ).toBe(true);
  });
});
