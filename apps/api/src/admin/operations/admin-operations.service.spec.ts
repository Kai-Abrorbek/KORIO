import { AdminOperationsService } from './admin-operations.service';

jest.mock('../../push/push.service', () => ({ PushService: class {} }));

const admin = {
  userId: '507f1f77bcf86cd799439011',
  email: 'admin@example.com',
  role: 'super_admin' as const,
};
const copy = { ko: '제목', uz: 'Sarlavha', en: 'Title', ru: 'Заголовок' };
const bodies = { ko: '내용', uz: 'Matn', en: 'Body', ru: 'Текст' };

function makeService(previous: unknown = null) {
  const play = { latest: jest.fn().mockReturnValue(null) };
  const push = {
    announce: jest.fn().mockResolvedValue({ sent: 3, targets: 4 }),
  };
  const audit = { record: jest.fn().mockResolvedValue(undefined) };
  const tokens = { distinct: jest.fn().mockResolvedValue(['a', 'b']) };
  const recent = {
    sort: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue([]),
  };
  const auditLogs = {
    findOne: jest
      .fn()
      .mockReturnValue({ lean: jest.fn().mockResolvedValue(previous) }),
    find: jest.fn().mockReturnValue(recent),
  };
  const service = new AdminOperationsService(
    play as never,
    push as never,
    audit as never,
    tokens as never,
    auditLogs as never,
  );
  return { service, play, push, audit, tokens, auditLogs };
}

describe('AdminOperationsService', () => {
  it('reports actual release policy and token count without suggesting unimplemented controls are live', async () => {
    const { service } = makeService();
    const result = await service.status();
    expect(result.push.eligibleUsers).toBe(2);
    expect(result.version.source).toBe('file');
    expect(result.controls.maintenance).toBe('not_implemented');
    expect(result.controls.versionPolicy).toBe('code_deploy');
  });

  it('requires all four translations and a reason before broadcasting', async () => {
    const { service, push } = makeService();
    await expect(
      service.announce(
        {
          key: 'announcement_123',
          title: { ko: '제목' },
          body: bodies,
          reason: '공지',
        },
        admin,
      ),
    ).rejects.toThrow('INVALID_ANNOUNCEMENT_UZ');
    await expect(
      service.announce(
        { key: 'announcement_123', title: copy, body: bodies, reason: '' },
        admin,
      ),
    ).rejects.toThrow('REASON_REQUIRED');
    expect(push.announce).not.toHaveBeenCalled();
  });

  it('rejects an already logged key and never re-sends', async () => {
    const { service, push } = makeService({ _id: 'old' });
    await expect(
      service.announce(
        {
          key: 'announcement_123',
          title: copy,
          body: bodies,
          reason: '재발송 방지',
        },
        admin,
      ),
    ).rejects.toThrow('ANNOUNCEMENT_ALREADY_SENT');
    expect(push.announce).not.toHaveBeenCalled();
  });

  it('broadcasts through the existing push pipeline and records a reasoned audit entry', async () => {
    const { service, push, audit } = makeService();
    const result = await service.announce(
      {
        key: 'announcement_123',
        title: copy,
        body: bodies,
        reason: '새 기능 안내',
      },
      admin,
    );
    expect(result).toEqual({ sent: 3, targets: 4 });
    expect(push.announce).toHaveBeenCalledWith({
      key: 'announcement_123',
      title: copy,
      body: bodies,
    });
    expect(audit.record).toHaveBeenCalledWith(
      expect.objectContaining({
        admin,
        action: 'operations.announcement_send',
        reason: '새 기능 안내',
        targetId: 'announcement_123',
      }),
    );
  });
});
