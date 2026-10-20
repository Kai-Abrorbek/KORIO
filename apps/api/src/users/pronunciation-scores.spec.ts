// These service tests exercise query paths, not Mongoose decorator metadata.
jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual<typeof import('@nestjs/mongoose')>('@nestjs/mongoose'),
  Prop: () => () => undefined,
}));

import { NotFoundException } from '@nestjs/common';
import { SavePronunciationDto } from './dto/save-pronunciation.dto';
import { UsersService } from './users.service';

const USER_ID = '507f1f77bcf86cd799439011';
const RESULT: SavePronunciationDto = {
  level: 'lv1',
  step: 1,
  mode: 'easy',
  score: 80,
};

type ScoreUser = { pronunciationScores?: Record<string, number> };

function setup(initial: ScoreUser | null = { pronunciationScores: {} }) {
  const user = initial && {
    ...initial,
    pronunciationScores: initial.pronunciationScores && {
      ...initial.pronunciationScores,
    },
  };
  const query = () => {
    const lean = jest.fn(() => Promise.resolve(user));
    const select = jest.fn(() => ({ lean }));
    return { select };
  };
  const userModel = {
    findById: jest.fn(query),
    findByIdAndUpdate: jest.fn(
      (_id: string, update: { $max: Record<string, number> }) => {
        if (user) {
          user.pronunciationScores ??= {};
          for (const [path, score] of Object.entries(update.$max)) {
            const key = path.slice('pronunciationScores.'.length);
            user.pronunciationScores[key] = Math.max(
              user.pronunciationScores[key] ?? 0,
              score,
            );
          }
        }
        return query();
      },
    ),
  };
  const service = new UsersService(
    userModel as never,
    null as never,
    null as never,
    null as never,
    null as never,
    null as never,
    null as never,
  );
  return { service, userModel };
}

describe('pronunciation scores per learning language', () => {
  it.each([undefined, 'ko'] as const)(
    'preserves legacy Korean keys when language is %s',
    async (targetLanguage) => {
      const { service, userModel } = setup();

      const result = await service.savePronunciation(USER_ID, {
        ...RESULT,
        ...(targetLanguage && { targetLanguage }),
      });

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        USER_ID,
        { $max: { 'pronunciationScores.lv1:1:easy': 80 } },
        { new: true, runValidators: true },
      );
      expect(result.scores).toEqual({ 'lv1:1:easy': 80 });
    },
  );

  it('adds only the English key and leaves Korean and other stages untouched', async () => {
    const existing = { 'lv1:1:easy': 100, 'lv4:2:hard': 70 };
    const { service, userModel } = setup({ pronunciationScores: existing });

    const result = await service.savePronunciation(USER_ID, {
      ...RESULT,
      targetLanguage: 'en',
    });

    expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
      USER_ID,
      { $max: { 'pronunciationScores.en:lv1:1:easy': 80 } },
      { new: true, runValidators: true },
    );
    expect(result.scores).toEqual({ ...existing, 'en:lv1:1:easy': 80 });
  });

  it('atomically preserves each language best score when later results are lower', async () => {
    const { service, userModel } = setup({
      pronunciationScores: { 'lv1:1:easy': 90, 'en:lv1:1:easy': 95 },
    });

    await Promise.all([
      service.savePronunciation(USER_ID, { ...RESULT, score: 60 }),
      service.savePronunciation(USER_ID, {
        ...RESULT,
        targetLanguage: 'en',
        score: 70,
      }),
    ]);

    expect(await service.getPronunciation(USER_ID)).toEqual({
      scores: { 'lv1:1:easy': 90, 'en:lv1:1:easy': 95 },
    });
    expect(
      userModel.findByIdAndUpdate.mock.calls.map((call) => call[1]),
    ).toEqual([
      { $max: { 'pronunciationScores.lv1:1:easy': 60 } },
      { $max: { 'pronunciationScores.en:lv1:1:easy': 70 } },
    ]);
  });

  it('returns the complete existing map without filtering or rewriting keys', async () => {
    const scores = { 'lv1:1:easy': 100, 'en:lv1:1:easy': 60 };
    const { service, userModel } = setup({ pronunciationScores: scores });

    expect(await service.getPronunciation(USER_ID)).toEqual({ scores });
    expect(userModel.findById).toHaveBeenCalledWith(USER_ID);
    expect(userModel.findByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('returns an empty map for users without pronunciation scores', async () => {
    const { service } = setup({});

    expect(await service.getPronunciation(USER_ID)).toEqual({ scores: {} });
  });

  it('keeps missing-user errors for reads and writes', async () => {
    const { service } = setup(null);

    await expect(service.getPronunciation(USER_ID)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    await expect(
      service.savePronunciation(USER_ID, RESULT),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
