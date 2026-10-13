import 'reflect-metadata';
import { Types } from 'mongoose';
import { PushService } from './push.service';
import { PushType } from './push.types';

jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('./schemas/device-token.schema', () => ({
  DeviceToken: class DeviceToken {},
}));
jest.mock('./schemas/push-log.schema', () => ({ PushLog: class PushLog {} }));
jest.mock('./schemas/push-ticket.schema', () => ({
  PushTicket: class PushTicket {},
}));

const userId = new Types.ObjectId().toString();
const copy = { title: '알림 제목', body: '알림 내용' };

function setup(tokens: string[] = []) {
  const tokenModel = {
    updateOne: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue(tokens.map((token) => ({ token }))),
      }),
    }),
  };
  const logModel = {
    create: jest.fn().mockResolvedValue({}),
    findOne: jest.fn(),
    updateOne: jest.fn().mockResolvedValue({}),
  };
  const userModel = {
    findById: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue({ appLanguage: 'ko', pushPrefs: {} }),
      }),
    }),
  };
  const service = new PushService(
    tokenModel as never,
    logModel as never,
    userModel as never,
    {} as never,
  );
  return { service, tokenModel, logModel };
}

describe('PushService admin delivery', () => {
  it('keeps tokens from two devices with the same model name', async () => {
    const { service, tokenModel } = setup();
    await service.register(userId, {
      token: 'ExpoPushToken[first]',
      deviceName: 'Galaxy',
    });
    await service.register(userId, {
      token: 'ExpoPushToken[second]',
      deviceName: 'Galaxy',
    });
    expect(tokenModel.updateOne).toHaveBeenCalledTimes(2);
    expect(tokenModel).not.toHaveProperty('deleteMany');
  });

  it('does not consume the deduplication key when no device is registered', async () => {
    const { service, logModel } = setup();
    const accepted = await service.send(userId, PushType.ANNOUNCEMENT, {
      copy,
      dedupKey: 'admin-selected:retry',
    });
    expect(accepted).toBe(false);
    expect(logModel.create).not.toHaveBeenCalled();
  });

  it('reports an already accepted request without sending it again', async () => {
    const { service, logModel } = setup(['ExpoPushToken[device]']);
    logModel.create.mockRejectedValue(
      Object.assign(new Error('duplicate'), { code: 11000 }),
    );
    logModel.findOne.mockReturnValue({
      select: jest.fn().mockReturnValue({
        lean: jest.fn().mockResolvedValue({ delivered: true }),
      }),
    });
    const accepted = await service.send(userId, PushType.ANNOUNCEMENT, {
      copy,
      dedupKey: 'admin-selected:retry',
    });
    expect(accepted).toBe(true);
    expect(logModel.updateOne).not.toHaveBeenCalled();
  });
});
