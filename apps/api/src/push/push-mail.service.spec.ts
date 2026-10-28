import { Types } from 'mongoose';
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../mail/mail.service', () => ({
  MailService: class MailService {},
}));

import type { MailService } from '../mail/mail.service';
import { PushMailService } from './push-mail.service';
import { PushType } from './push.types';

/** findById(...).select(...).lean() 체인 */
const chain = (value: unknown) => {
  const node = { select: () => node, lean: () => Promise.resolve(value) };
  return node;
};

describe('PushMailService', () => {
  const uid = new Types.ObjectId();
  const baseUser = {
    email: 'learner@example.test',
    appLanguage: 'ko',
    timezone: 'Asia/Tashkent',
  };

  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-for-unsubscribe-links';
    process.env.PUBLIC_API_URL = 'https://api.example.test';
  });

  function build(user: Record<string, unknown> | null, sentToday = 0) {
    const mail = { send: jest.fn().mockResolvedValue(true) };
    const userModel = {
      findById: jest.fn(() => chain(user)),
      updateOne: jest.fn().mockResolvedValue({}),
    };
    const logModel = {
      countDocuments: jest.fn().mockResolvedValue(sentToday),
      create: jest.fn().mockResolvedValue({}),
      updateOne: jest.fn(() => ({ catch: () => Promise.resolve() })),
    };
    const service = new PushMailService(
      mail as unknown as MailService,
      userModel as never,
      logModel as never,
    );
    return { service, mail, userModel, logModel };
  }

  const announce = { copy: { title: '공지', body: '내용' }, dedupKey: 'a1' };

  it('sends the same copy by email with an unsubscribe link', async () => {
    const { service, mail } = build(baseUser);
    await expect(
      service.send(uid, PushType.ANNOUNCEMENT, announce),
    ).resolves.toBe(true);
    const msg = (mail.send.mock.calls[0] as unknown[])[0] as {
      to: string;
      subject: string;
      html: string;
      headers: Record<string, string>;
    };
    expect(msg.to).toBe('learner@example.test');
    expect(msg.subject).toBe('공지');
    expect(msg.headers['List-Unsubscribe']).toContain(
      'https://api.example.test/mail/unsubscribe?u=',
    );
  });

  it('skips accounts without an email and people who unsubscribed', async () => {
    const noEmail = build({ ...baseUser, email: '' });
    await expect(
      noEmail.service.send(uid, PushType.ANNOUNCEMENT, announce),
    ).resolves.toBe(false);
    const unsubscribed = build({ ...baseUser, emailNotifications: false });
    await expect(
      unsubscribed.service.send(uid, PushType.ANNOUNCEMENT, announce),
    ).resolves.toBe(false);
    expect(noEmail.mail.send).not.toHaveBeenCalled();
    expect(unsubscribed.mail.send).not.toHaveBeenCalled();
  });

  it('does not email inactivity reminders to people who turned reminders off in the app', async () => {
    const { service, mail } = build({
      ...baseUser,
      pushPrefs: { master: false },
    });
    await expect(
      service.send(uid, PushType.STREAK_RISK, {
        dedupKey: 'streak_risk:2026-10-28',
        params: { streak: 5 },
      }),
    ).resolves.toBe(false);
    expect(mail.send).not.toHaveBeenCalled();
  });

  it('emails an inactivity reminder to someone push cannot reach', async () => {
    const { service, mail } = build(baseUser);
    await expect(
      service.send(uid, PushType.STREAK_RISK, {
        dedupKey: 'streak_risk:2026-10-28',
        params: { streak: 5 },
      }),
    ).resolves.toBe(true);
    expect(mail.send).toHaveBeenCalledTimes(1);
  });

  it('keeps inactivity reminder emails to one a day', async () => {
    const { service, mail } = build(baseUser, 1);
    await expect(
      service.send(uid, PushType.STREAK_RISK, {
        dedupKey: 'streak_risk:2026-10-28',
        params: { streak: 5 },
      }),
    ).resolves.toBe(false);
    expect(mail.send).not.toHaveBeenCalled();
  });

  it('unsubscribes only with a valid signed link', async () => {
    const { service, userModel } = build(baseUser);
    const url = new URL(service.unsubscribeUrl(uid.toString()));
    const token = url.searchParams.get('t') ?? '';

    await expect(service.unsubscribe(uid.toString(), 'forged')).resolves.toBe(
      false,
    );
    await expect(
      service.unsubscribe(new Types.ObjectId().toString(), token),
    ).resolves.toBe(false);
    expect(userModel.updateOne).not.toHaveBeenCalled();

    await expect(service.unsubscribe(uid.toString(), token)).resolves.toBe(
      true,
    );
    expect(userModel.updateOne).toHaveBeenCalledWith(
      { _id: uid },
      { $set: { emailNotifications: false } },
    );
  });
});
