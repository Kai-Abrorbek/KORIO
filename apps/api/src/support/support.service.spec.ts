import { Types, type Model } from 'mongoose';
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../admin/admin-audit.service', () => ({
  AdminAuditService: class AdminAuditService {},
}));
jest.mock('../mail/mail.service', () => ({
  MailService: class MailService {},
}));
jest.mock('../push/push.service', () => ({
  PushService: class PushService {},
}));

import type { UserDocument } from '../users/schemas/user.schema';
import type { AdminAuditService } from '../admin/admin-audit.service';
import type { MailService } from '../mail/mail.service';
import type { TelegramBotApi } from '../payments/providers/telegram-stars/telegram-bot.api';
import type { PushService } from '../push/push.service';
import { PushType } from '../push/push.types';
import type { SupportTicketDocument } from './schemas/support-ticket.schema';
import { SupportService } from './support.service';

/** findById(...).select(...).lean() 과 findById(...).lean() 둘 다 받는 체인 */
const chain = (value: unknown) => {
  const node = {
    select: () => node,
    lean: () => Promise.resolve(value),
  };
  return node;
};

describe('SupportService', () => {
  const userId = new Types.ObjectId();
  const ticketId = new Types.ObjectId();
  const admin = {
    userId: new Types.ObjectId().toString(),
    email: 'admin@example.test',
    role: 'support' as const,
  };
  const openTicket = {
    _id: ticketId,
    userId,
    status: 'open',
    subject: '앱 오류',
    category: 'bug',
    message: '학습 화면이 열리지 않아요.',
  };
  let user: Record<string, unknown>;
  let tickets: {
    countDocuments: jest.Mock;
    create: jest.Mock;
    findById: jest.Mock;
    findOneAndUpdate: jest.Mock;
    updateOne: jest.Mock;
    exists: jest.Mock;
  };
  let users: { findById: jest.Mock };
  let mail: { isDeliveryConfigured: jest.Mock; send: jest.Mock };
  let audit: { record: jest.Mock };
  let bot: { enabled: boolean; call: jest.Mock };
  let push: { send: jest.Mock };
  let service: SupportService;

  /** 잠금 → 답변 저장 두 번의 findOneAndUpdate */
  const lockThenAnswer = () =>
    tickets.findOneAndUpdate
      .mockResolvedValueOnce({ ...openTicket, status: 'sending' })
      .mockResolvedValueOnce({ ...openTicket, status: 'answered' });
  const savedReply = () =>
    (
      tickets.findOneAndUpdate.mock.calls[1] as [
        unknown,
        { $set: { reply: Record<string, unknown> } },
      ]
    )[1].$set.reply;

  beforeEach(() => {
    user = { _id: userId, email: 'user@example.test', provider: 'local' };
    tickets = {
      countDocuments: jest.fn().mockResolvedValue(0),
      create: jest
        .fn()
        .mockImplementation((value: Record<string, unknown>) =>
          Promise.resolve({ ...value, _id: ticketId }),
        ),
      findById: jest.fn().mockImplementation(() => chain(openTicket)),
      findOneAndUpdate: jest.fn(),
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
      exists: jest.fn().mockResolvedValue(true),
    };
    users = { findById: jest.fn().mockImplementation(() => chain(user)) };
    mail = {
      isDeliveryConfigured: jest.fn().mockReturnValue(true),
      send: jest.fn().mockResolvedValue(true),
    };
    audit = { record: jest.fn().mockResolvedValue(undefined) };
    bot = { enabled: true, call: jest.fn().mockResolvedValue({}) };
    push = { send: jest.fn().mockResolvedValue(true) };
    service = new SupportService(
      tickets as unknown as Model<SupportTicketDocument>,
      users as unknown as Model<UserDocument>,
      mail as unknown as MailService,
      audit as unknown as AdminAuditService,
      bot as unknown as TelegramBotApi,
      push as unknown as PushService,
    );
  });

  it('stores a user request in the inbox', async () => {
    const result = await service.create(userId.toString(), {
      category: 'bug',
      subject: '앱 오류가 있어요',
      message: '학습 화면이 열리지 않아요.',
    });
    expect(result.status).toBe('open');
    expect(tickets.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId,
        category: 'bug',
        emailAtCreation: 'user@example.test',
      }),
    );
  });

  it('refuses to mark a reply sent when email delivery is not configured', async () => {
    mail.isDeliveryConfigured.mockReturnValue(false);
    await expect(
      service.reply(ticketId.toString(), '확인했습니다.', admin),
    ).rejects.toThrow('MAIL_NOT_CONFIGURED');
    expect(tickets.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it('reopens a ticket after provider rejection', async () => {
    tickets.findOneAndUpdate.mockResolvedValueOnce({
      _id: ticketId,
      userId,
      subject: '앱 오류',
    });
    mail.send.mockResolvedValue(false);
    await expect(
      service.reply(ticketId.toString(), '확인했습니다.', admin),
    ).rejects.toThrow('MAIL_DELIVERY_FAILED');
    expect(tickets.updateOne).toHaveBeenCalledWith(
      { _id: ticketId, status: 'sending' },
      { $set: { status: 'open' } },
    );
    expect(audit.record).toHaveBeenCalledWith(
      expect.objectContaining({ success: false }),
    );
  });

  it('emails users who have an email and pings their phone', async () => {
    lockThenAnswer();
    const result = await service.reply(
      ticketId.toString(),
      '확인했습니다.',
      admin,
    );
    expect(mail.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: 'user@example.test' }),
    );
    expect(bot.call).not.toHaveBeenCalled();
    expect(savedReply()).toEqual(
      expect.objectContaining({ channel: 'email', delivered: true }),
    );
    expect(push.send).toHaveBeenCalledWith(userId, PushType.SUPPORT_REPLY, {
      params: { subject: '앱 오류' },
      link: '/support',
      dedupKey: `support_reply:${String(ticketId)}`,
    });
    expect(result.replyChannel).toBe('email');
  });

  it('answers Telegram mini app users through the bot (they have no email)', async () => {
    user = {
      _id: userId,
      provider: 'telegram',
      providerId: '777',
      appLanguage: 'ru',
    };
    lockThenAnswer();
    await service.reply(
      ticketId.toString(),
      'Проверили, всё исправлено.',
      admin,
    );
    expect(mail.send).not.toHaveBeenCalled();
    expect(bot.call).toHaveBeenCalledWith(
      'sendMessage',
      expect.objectContaining({
        chat_id: '777',
        text: expect.stringContaining('Проверили, всё исправлено.') as string,
      }),
    );
    expect(savedReply()).toEqual(
      expect.objectContaining({ channel: 'telegram', delivered: true }),
    );
  });

  it('keeps the reply in the app when the bot cannot deliver it', async () => {
    user = { _id: userId, provider: 'telegram', providerId: '777' };
    bot.call.mockRejectedValue(
      new Error('Forbidden: bot was blocked by the user'),
    );
    lockThenAnswer();
    await service.reply(ticketId.toString(), '확인했습니다.', admin);
    expect(tickets.updateOne).not.toHaveBeenCalled();
    expect(savedReply()).toEqual(
      expect.objectContaining({ channel: 'telegram', delivered: false }),
    );
    expect(audit.record).toHaveBeenCalledWith(
      expect.objectContaining({
        reason: expect.stringContaining('봇 전송 실패') as string,
      }),
    );
  });

  it('answers in the app when the user has neither email nor Telegram', async () => {
    user = { _id: userId, provider: 'kakao', email: '' };
    mail.isDeliveryConfigured.mockReturnValue(false);
    lockThenAnswer();
    await service.reply(ticketId.toString(), '확인했습니다.', admin);
    expect(mail.send).not.toHaveBeenCalled();
    expect(bot.call).not.toHaveBeenCalled();
    expect(savedReply()).toEqual(
      expect.objectContaining({ channel: 'app', delivered: true }),
    );
  });

  it('does not lock a ticket that was already answered', async () => {
    tickets.findById.mockImplementation(() =>
      chain({ ...openTicket, status: 'answered' }),
    );
    await expect(
      service.reply(ticketId.toString(), '확인했습니다.', admin),
    ).rejects.toThrow('SUPPORT_TICKET_ALREADY_HANDLED');
    expect(tickets.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it('tells the user where the reply will arrive', async () => {
    (tickets as unknown as { find: jest.Mock }).find = jest.fn(() => ({
      sort: () => ({ limit: () => ({ lean: () => Promise.resolve([]) }) }),
    }));
    await expect(service.listMine(userId.toString())).resolves.toEqual({
      items: [],
      replyTo: { channel: 'email', email: 'user@example.test' },
    });
    user = { _id: userId, provider: 'telegram', providerId: '777' };
    await expect(service.listMine(userId.toString())).resolves.toEqual({
      items: [],
      replyTo: { channel: 'telegram', email: null },
    });
  });
});
