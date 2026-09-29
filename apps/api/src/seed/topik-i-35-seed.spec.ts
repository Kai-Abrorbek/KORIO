import {
  TOPIK_I_35_LISTENING_SEED,
  TOPIK_I_35_READING_SEED,
} from './data/topik';
import {
  validateTopikIReadingSeed,
  validateTopikListeningSeed,
} from './validate-topik-seed';

// 제35회 TOPIK I 공식 정답표: 읽기의 1~40번은 시험지 31~70번이다.
const listeningAnswers = [
  3, 2, 1, 2, 1, 2, 2, 4, 3, 4, 1, 4, 3, 4, 1,
  3, 3, 4, 3, 2, 2, 2, 1, 1, 4, 4, 1, 3, 1, 2,
];
const listeningPoints = [
  4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 3, 4, 3, 4,
  4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 4, 3, 4,
];
const readingAnswers = [
  3, 4, 1, 4, 1, 3, 3, 1, 1, 3, 2, 4, 1, 2, 2, 4, 3, 3, 2, 4,
  1, 2, 4, 3, 3, 2, 4, 2, 2, 3, 1, 1, 4, 4, 2, 3, 1, 3, 4, 1,
];
const readingPoints = [
  2, 2, 2, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 2, 2, 2,
  3, 2, 2, 3, 2, 3, 2, 3, 2, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3,
];

describe('TOPIK I 35회 시드', () => {
  it('공식 듣기 정답표와 배점 및 구조가 일치한다', () => {
    expect(validateTopikListeningSeed(TOPIK_I_35_LISTENING_SEED)).toEqual({
      groupCount: 27,
      questionCount: 30,
      totalPoints: 100,
    });
    const questions = [...TOPIK_I_35_LISTENING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(questions.map((question) => Number(question.correctChoiceKey))).toEqual(
      listeningAnswers,
    );
    expect(questions.map((question) => question.points)).toEqual(
      listeningPoints,
    );
    for (const number of [15, 16]) {
      expect(
        questions[number - 1].choices.every((choice) =>
          choice.imageAssetKey?.startsWith(`topik-i-35-q${number}-c`),
        ),
      ).toBe(true);
    }
  });

  it('공식 읽기 정답표와 배점 및 구조가 일치한다', () => {
    const result = validateTopikIReadingSeed(TOPIK_I_35_READING_SEED);
    expect(result.questionCount).toBe(40);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_I_35_READING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(questions.map((question) => Number(question.correctChoiceKey))).toEqual(
      readingAnswers,
    );
    expect(questions.map((question) => question.points)).toEqual(readingPoints);
  });
});
