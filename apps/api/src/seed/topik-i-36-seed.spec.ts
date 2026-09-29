import {
  TOPIK_I_36_LISTENING_SEED,
  TOPIK_I_36_READING_SEED,
} from './data/topik';
import {
  validateTopikIReadingSeed,
  validateTopikListeningSeed,
} from './validate-topik-seed';

// 제36회 TOPIK I B형 공식 정답표: 듣기 1~30번, 읽기 31~70번.
const listeningAnswers = [
  1, 3, 2, 2, 4, 3, 3, 1, 3, 1, 1, 2, 3, 1, 2, 4, 1, 4, 3, 3, 2, 4, 1, 4, 4, 2,
  1, 2, 4, 2,
];
const listeningPoints = [
  4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 3, 4, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
  3, 4, 3, 4,
];
const readingAnswers = [
  2, 4, 1, 1, 3, 3, 4, 1, 2, 1, 2, 2, 3, 2, 4, 2, 1, 1, 3, 4, 4, 3, 2, 3, 1, 2,
  2, 4, 3, 1, 3, 4, 1, 4, 3, 3, 4, 4, 1, 2,
];
const readingPoints = [
  2, 2, 2, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 2, 2, 2, 3, 2, 2, 3, 2, 3,
  3, 2, 2, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3,
];

describe('TOPIK I 36회 시드', () => {
  it('공식 듣기 정답·배점·대본·그림 구조를 보존한다', () => {
    expect(validateTopikListeningSeed(TOPIK_I_36_LISTENING_SEED)).toEqual({
      groupCount: 27,
      questionCount: 30,
      totalPoints: 100,
    });
    const questions = [...TOPIK_I_36_LISTENING_SEED.questions].sort(
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
          choice.imageAssetKey?.startsWith(`topik-i-36-q${number}-c`),
        ),
      ).toBe(true);
    }
    for (const [start, end] of [
      [25, 26],
      [27, 28],
      [29, 30],
    ]) {
      expect(questions[start - 1].groupCode).toBe(questions[end - 1].groupCode);
    }
  });

  it('공식 읽기 정답·배점·문항 구조를 보존한다', () => {
    const result = validateTopikIReadingSeed(TOPIK_I_36_READING_SEED);
    expect(result.questionCount).toBe(40);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_I_36_READING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(readingAnswers);
    expect(questions.map((question) => question.points)).toEqual(readingPoints);
  });
});
