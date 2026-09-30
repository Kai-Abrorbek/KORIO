import {
  TOPIK_I_64_LISTENING_SEED,
  TOPIK_I_64_READING_SEED,
} from './data/topik';
import {
  validateTopikIReadingSeed,
  validateTopikListeningSeed,
} from './validate-topik-seed';

// 제64회 TOPIK I 공식 정답·배점표: 듣기와 읽기 각 1쪽.
const listeningAnswers = [
  2, 3, 3, 4, 3, 2, 1, 2, 1, 2, 2, 4, 1, 3, 3, 1, 4, 1, 3, 2, 2, 4, 2, 4, 1, 3,
  4, 1, 4, 4,
];
const listeningPoints = [
  4, 4, 3, 3, 4, 3, 3, 3, 3, 4, 3, 3, 4, 3, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4,
  3, 4, 3, 4,
];
const readingAnswers = [
  4, 2, 1, 2, 4, 2, 1, 4, 3, 3, 2, 2, 2, 1, 2, 3, 4, 3, 1, 4, 1, 3, 3, 1, 4, 3,
  2, 3, 1, 1, 2, 1, 4, 1, 4, 2, 4, 3, 3, 4,
];
const readingPoints = [
  2, 2, 2, 2, 2, 2, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 2, 2, 2, 3, 2, 2, 3, 2, 3,
  3, 2, 2, 3, 2, 2, 2, 3, 2, 3, 3, 3, 3, 3,
];

describe('TOPIK I 64회 시드', () => {
  it('듣기 공식 정답·배점과 그림 선택지를 보존한다', () => {
    const result = validateTopikListeningSeed(TOPIK_I_64_LISTENING_SEED);
    expect(result.groupCount).toBe(27);
    expect(result.questionCount).toBe(30);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_I_64_LISTENING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(questions.map((question) => question.number)).toEqual(
      Array.from({ length: 30 }, (_, index) => index + 1),
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
          choice.imageAssetKey?.startsWith(`topik-i-64-q${number}-c`),
        ),
      ).toBe(true);
    }
  });

  it('읽기 31~70번의 공식 정답·배점을 보존한다', () => {
    const result = validateTopikIReadingSeed(TOPIK_I_64_READING_SEED);
    expect(result.groupCount).toBe(16);
    expect(result.questionCount).toBe(40);
    expect(result.totalPoints).toBe(100);
    const questions = [...TOPIK_I_64_READING_SEED.questions].sort(
      (left, right) => left.number - right.number,
    );
    expect(questions.map((question) => question.number)).toEqual(
      Array.from({ length: 40 }, (_, index) => index + 31),
    );
    expect(
      questions.map((question) => Number(question.correctChoiceKey)),
    ).toEqual(readingAnswers);
    expect(questions.map((question) => question.points)).toEqual(readingPoints);
  });
});
