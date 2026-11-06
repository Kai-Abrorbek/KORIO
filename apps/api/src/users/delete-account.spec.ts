// These service tests exercise query paths, not Mongoose decorator metadata.
jest.mock('@nestjs/mongoose', () => ({
  ...jest.requireActual<typeof import('@nestjs/mongoose')>('@nestjs/mongoose'),
  Prop: () => () => undefined,
}));

import { Types } from 'mongoose';
import { UsersService } from './users.service';

const USER_ID = '507f1f77bcf86cd799439011';

describe('UsersService.deleteAccount', () => {
  it("removes the person's conversations, recordings and push tokens but keeps payment records", async () => {
    const purged: string[] = [];
    const registered = Object.fromEntries(
      [
        'ChatMessage',
        'VoiceTutorMessage',
        'VoiceTutorMemory',
        'VoiceTutorAudio',
        'DeviceToken',
        'PasswordReset',
        // Accounting and dispute records must survive.
        'Subscription',
        'GemTransaction',
        'GemPayoutRequest',
      ].map((name) => [
        name,
        {
          deleteMany: (filter: { userId: Types.ObjectId }) => ({
            exec: () => {
              expect(filter.userId.toString()).toBe(USER_ID);
              purged.push(name);
              return Promise.resolve({ deletedCount: 1 });
            },
          }),
        },
      ]),
    );
    const userModel = {
      db: { models: registered },
      findById: () => ({
        select: () => ({
          lean: () =>
            Promise.resolve({
              _id: USER_ID,
              provider: 'telegram',
              providerId: '12345',
            }),
        }),
      }),
      updateMany: jest.fn().mockResolvedValue({}),
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    };
    const ownData = { deleteMany: jest.fn().mockResolvedValue({}) };
    const tombstones = { bulkWrite: jest.fn().mockResolvedValue({}) };
    const service = new UsersService(
      userModel as never,
      ownData as never,
      ownData as never,
      {} as never,
      {} as never,
      { clearAll: jest.fn().mockResolvedValue(undefined) } as never,
      {} as never,
      undefined,
      tombstones as never,
    );

    await expect(service.deleteAccount(USER_ID)).resolves.toEqual({
      success: true,
    });
    expect(purged.sort()).toEqual(
      [
        'ChatMessage',
        'DeviceToken',
        'PasswordReset',
        'VoiceTutorAudio',
        'VoiceTutorMemory',
        'VoiceTutorMessage',
      ].sort(),
    );
    expect(userModel.deleteOne).toHaveBeenCalled();
    // 지우기 전에 신원 지문을 남겨야 같은 텔레그램으로 바로 재가입하지 못한다
    expect(tombstones.bulkWrite).toHaveBeenCalledTimes(1);
    expect(tombstones.bulkWrite.mock.invocationCallOrder[0]).toBeLessThan(
      userModel.deleteOne.mock.invocationCallOrder[0],
    );
  });
});
