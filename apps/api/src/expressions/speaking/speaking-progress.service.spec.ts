import { Types } from 'mongoose';
import { SpeakingProgressService } from './speaking-progress.service';

describe('SpeakingProgressService proficiency cursors', () => {
  it('keeps English levels independent and preserves the Korean pack key', async () => {
    const userId = new Types.ObjectId().toString();
    const records = new Map<
      string,
      { index: number; total: number; completedCount: number }
    >();
    const model = {
      findOne: ({ packCode }: { packCode: string }) => ({
        lean: () => Promise.resolve(records.get(packCode) ?? null),
      }),
      findOneAndUpdate: (
        { packCode }: { packCode: string },
        update: {
          $set: { index: number; total: number };
          $inc?: { completedCount: number };
        },
      ) => ({
        lean: () => {
          const previous = records.get(packCode);
          const next = {
            index: update.$set.index,
            total: update.$set.total,
            completedCount:
              (previous?.completedCount ?? 0) +
              (update.$inc?.completedCount ?? 0),
          };
          records.set(packCode, next);
          return Promise.resolve(next);
        },
      }),
    };
    const service = new SpeakingProgressService(model as never);

    await service.save(userId, 'en-greetings', 7, 30, 'beginner');
    await service.save(userId, 'en-greetings', 3, 30, 'intermediate');
    await service.save(userId, 'ko-greetings', 2, 12);

    expect((await service.get(userId, 'en-greetings', 'beginner')).index).toBe(
      7,
    );
    expect(
      (await service.get(userId, 'en-greetings', 'intermediate')).index,
    ).toBe(3);
    expect((await service.get(userId, 'en-greetings', 'advanced')).index).toBe(
      0,
    );
    expect((await service.get(userId, 'ko-greetings')).index).toBe(2);
    expect([...records.keys()]).toEqual([
      'en-greetings::beginner',
      'en-greetings::intermediate',
      'ko-greetings',
    ]);

    const completion = await service.save(
      userId,
      'en-greetings',
      30,
      30,
      'beginner',
    );
    expect(completion).toMatchObject({
      packCode: 'en-greetings',
      index: 0,
      completedCount: 1,
      justCompleted: true,
    });
    expect(
      (await service.get(userId, 'en-greetings', 'intermediate')).index,
    ).toBe(3);
  });
});
