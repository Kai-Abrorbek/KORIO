import { Types, type Model } from 'mongoose';
jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));
jest.mock('../admin/admin-audit.service', () => ({
  AdminAuditService: class AdminAuditService {},
}));
jest.mock('../mail/mail.service', () => ({
  MailService: class MailService {},
}));

import type { UserDocument } from '../users/schemas/user.schema';
import type { AdminAuditService } from '../admin/admin-audit.service';
import type { MailService } from '../mail/mail.service';
import type { SupportTicketDocument } from './schemas/support-ticket.schema';
import { SupportService } from './support.service';

describe('SupportService', () => {
  const userId = new Types.ObjectId();
  const ticketId = new Types.ObjectId();
  const admin = {
    userId: new Types.ObjectId().toString(),
    email: 'admin@example.test',
    role: 'support' as const,
  };
  let tickets: {
    countDocuments: jest.Mock;
    create: jest.Mock;
    findOneAndUpdate: jest.Mock;
    updateOne: jest.Mock;
    exists: jest.Mock;
  };
  let users: { findById: jest.Mock };
  let mail: { isDeliveryConfigured: jest.Mock; send: jest.Mock };
  let audit: { record: jest.Mock };
  let service: SupportService;

  beforeEach(() => {
    tickets = {
      countDocuments: jest.fn().mockResolvedValue(0),
      create: jest
        .fn()
        .mockImplementation((value: Record<string, unknown>) =>
          Promise.resolve({ ...value, _id: ticketId }),
        ),
      findOneAndUpdate: jest.fn(),
      updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
      exists: jest.fn().mockResolvedValue(true),
    };
    users = {
      findById: jest.fn().mockReturnValue({
        select: () => ({
          lean: jest.fn().mockResolvedValue({
            _id: userId,
            email: 'user@example.test',
          }),
        }),
      }),
    };
    mail = {
      isDeliveryConfigured: jest.fn().mockReturnValue(true),
      send: jest.fn().mockResolvedValue(true),
    };
    audit = { record: jest.fn().mockResolvedValue(undefined) };
    service = new SupportService(
      tickets as unknown as Model<SupportTicketDocument>,
      users as unknown as Model<UserDocument>,
      mail as unknown as MailService,
      audit as unknown as AdminAuditService,
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
});
