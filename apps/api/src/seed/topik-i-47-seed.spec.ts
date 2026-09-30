import {
  TOPIK_I_47_LISTENING_SEED,
  TOPIK_I_47_READING_SEED,
} from './data/topik';
import {
  validateTopikIReadingSeed,
  validateTopikListeningSeed,
} from './validate-topik-seed';

// 제47회 TOPIK I B형 공식 정답표 p. 1(듣기), p. 2(읽기)를 대조함.
const listeningAnswers = [
  3, 4, 1, 3, 4, 1, 1, 2, 2, 4, 1, 3, 2, 3, 1, 2, 4, 2, 2, 3, 4, 3, 2, 4, 4, 1,
  2, 1, 3, 4,
];
const listeningPoints = [
  4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 3, 4, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
  3, 4, 3, 4,
];
const readingAnswers = [
  4, 4, 3, 4, 1, 1, 2, 2, 1, 4, 4, 3, 4, 3, 2, 2, 3, 1, 3, 2, 2, 3, 4, 1, 4, 1,
  4, 3, 3, 1, 1, 2, 2, 4, 3, 4, 3, 2, 2, 1,
];
const readingPoints = [
  2, 2, 2, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 2, 2, 2, 3, 2, 2, 3, 2, 3,
  3, 2, 2, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3,
];

describe('TOPIK I 47회 시드', () => {
  it('공식 듣기 정답·배점·그림 선택지를 보존한다', () => {
    expect(validateTopikListeningSeed(TOPIK_I_47_LISTENING_SEED)).toEqual({
      groupCount: 27,
      questionCount: 30,
      totalPoints: 100,
    });
    const questions = [...TOPIK_I_47_LISTENING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(listeningAnswers);
    expect(questions.map((question) => question.points)).toEqual(
      listeningPoints,
    );
    for (const number of [15, 16]) {
      expect(
        questions[number - 1].choices.every((choice) =>
          choice.imageAssetKey?.startsWith(`topik-i-47-q${number}-c`),
        ),
      ).toBe(true);
    }
  });

  it('공식 읽기 정답·배점·문항 구조를 보존한다', () => {
    const result = validateTopikIReadingSeed(TOPIK_I_47_READING_SEED);
    expect(result.groupCount).toBe(16);
    expect(result.questionCount).toBe(40);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_I_47_READING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(readingAnswers);
    expect(questions.map((question) => question.points)).toEqual(readingPoints);
  });
});
