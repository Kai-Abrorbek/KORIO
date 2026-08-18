import { BadRequestException } from '@nestjs/common';
import { AnswerGradingService } from './answer-grading.service';

describe('AnswerGradingService', () => {
  let storedQuestion: any;
  let service: AnswerGradingService;

  beforeEach(() => {
    const questionModel = {
      findOne: jest.fn(() => ({
        select: jest.fn(() => ({
          lean: jest.fn(async () => storedQuestion),
        })),
      })),
    };
    const config = { get: jest.fn(() => undefined) };
    service = new AnswerGradingService(questionModel as any, config as any);
  });

  it('rejects smart grading for a deterministic question type', async () => {
    storedQuestion = {
      type: 'sentence_builder',
      answer: '학교에 가요',
      isActive: true,
    };

    await expect(
      service.grade('507f1f77bcf86cd799439011', '학교에 가요', 'ko'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('accepts only configured surface differences before calling AI', async () => {
    storedQuestion = {
      type: 'listen_type',
      answer: '저는 학교에 가요.',
      acceptedAnswers: [],
      grading: {
        mode: 'exact',
        expectedMeaning: 'The speaker goes to school.',
        acceptedAnswers: [],
        tolerance: { punctuation: true, spacing: true, minorTypos: false },
      },
      isActive: true,
    };

    await expect(
      service.grade('507f1f77bcf86cd799439011', '저는학교에가요', 'ko'),
    ).resolves.toMatchObject({
      isCorrect: true,
      result: 'almost',
      source: 'rule',
    });
  });

  it('does not accept a meaning-changing negation as a minor typo', async () => {
    storedQuestion = {
      type: 'listen_type',
      answer: '학교에 가요',
      acceptedAnswers: [],
      grading: {
        mode: 'exact',
        expectedMeaning: 'The speaker goes to school.',
        acceptedAnswers: [],
        tolerance: { punctuation: true, spacing: true, minorTypos: true },
      },
      isActive: true,
    };

    await expect(
      service.grade('507f1f77bcf86cd799439011', '학교에 안 가요', 'ko'),
    ).resolves.toMatchObject({ isCorrect: false, result: 'incorrect' });
  });

  it('does not treat a different Korean verb as a one-letter typo', async () => {
    storedQuestion = {
      type: 'listen_type',
      answer: '저는 학교에 가요',
      acceptedAnswers: [],
      grading: {
        mode: 'exact',
        expectedMeaning: 'The speaker goes to school.',
        tolerance: { punctuation: true, spacing: true, minorTypos: true },
      },
      isActive: true,
    };

    await expect(
      service.grade('507f1f77bcf86cd799439011', '저는 학교에 와요', 'ko'),
    ).resolves.toMatchObject({ isCorrect: false, result: 'incorrect' });
  });

  it('keeps same-meaning answers wrong when the target expression is missing', async () => {
    storedQuestion = {
      type: 'translate_type',
      answer: '먹고 싶어요',
      acceptedAnswers: [],
      grading: {
        mode: 'targetExpression',
        expectedMeaning: 'The speaker wants to eat.',
        targetExpressions: ['-고 싶어요'],
        acceptedAnswers: [],
        tolerance: { punctuation: true, spacing: true, minorTypos: true },
      },
      isActive: true,
    };
    (service as any).client = {
      messages: {
        create: jest.fn(async () => ({
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                meaningMatches: true,
                targetMatches: false,
                registerMatches: true,
                minorTypo: false,
                feedback: '뜻은 맞지만 -고 싶어요를 사용해 보세요.',
                correction: '먹고 싶어요',
              }),
            },
          ],
        })),
      },
    };

    await expect(
      service.grade('507f1f77bcf86cd799439011', '먹을래요', 'ko'),
    ).resolves.toMatchObject({
      isCorrect: false,
      result: 'target_missing',
      source: 'ai',
    });
  });
});
