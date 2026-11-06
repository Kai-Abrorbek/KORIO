import {
  TOPIK_II_96_READING_SEED,
  TOPIK_II_102_READING_SEED,
} from './data/topik';
import { TopikExamSeed } from './data/topik/topik-seed.types';
import { TopikTextSegmentType } from '../topik/schemas/topik-content.schema';
import { validateTopikII83ReadingSeed } from './validate-topik-seed';

const blockText = (seed: TopikExamSeed, groupCode: string) => {
  const group = seed.groups.find((item) => item.code === groupCode);
  if (!group?.sharedStimulus) {
    throw new Error(`${seed.exam.round}회 ${groupCode} 공통 지문 없음`);
  }

  return group.sharedStimulus.blocks
    .flatMap((block) => block.segments.map((segment) => segment.text))
    .join(' ');
};

describe.each([
  {
    round: 102,
    seed: TOPIK_II_102_READING_SEED,
    groupCode: 'reading-23-24',
    questionNumbers: [23, 24],
    answers: ['1', '4'],
    evidence: ['마음이 들뜨고', '한 번도 빠지지 않았다'],
  },
  {
    round: 102,
    seed: TOPIK_II_102_READING_SEED,
    groupCode: 'reading-42-43',
    questionNumbers: [42, 43],
    answers: ['2', '3'],
    evidence: ['머릿속이 하얘게', '청혼하기 위해'],
  },
  {
    round: 96,
    seed: TOPIK_II_96_READING_SEED,
    groupCode: 'reading-42-43',
    questionNumbers: [42, 43],
    answers: ['3', '1'],
    evidence: ['영 마음에 들지 않았다', '아내와 처제가'],
  },
])(
  'TOPIK II $round회 $groupCode 자체 제작 대체 지문',
  ({ seed, groupCode, questionNumbers, answers, evidence }) => {
    it('시험 구조와 정답 근거가 유효하다', () => {
      validateTopikII83ReadingSeed(seed);

      const passage = blockText(seed, groupCode);
      evidence.forEach((phrase) => expect(passage).toContain(phrase));
      expect(passage).not.toMatch(/저작권|비공개|확인할 수 없어/);

      const group = seed.groups.find((item) => item.code === groupCode);
      expect(
        group?.sharedStimulus?.blocks.some((block) =>
          block.segments.some(
            (segment) => segment.type === TopikTextSegmentType.UNDERLINE,
          ),
        ),
      ).toBe(true);

      questionNumbers.forEach((number, index) => {
        const question = seed.questions.find((item) => item.number === number);
        expect(question?.correctChoiceKey).toBe(answers[index]);
        expect(question?.solution.explanation.ko).not.toContain('비공개');
        expect(
          question?.prompt
            .flatMap((block) => block.segments.map((segment) => segment.text))
            .join(' '),
        ).not.toContain('비공개');
      });

      expect(seed.exam.description.ko).toContain('자체 제작한 대체 지문');
      expect(seed.exam.source.reference).toContain('자체 작성');
    });
  },
);
