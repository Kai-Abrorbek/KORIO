import { BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { AdminAuditService } from './admin-audit.service';
import { AdminAuditLogDocument } from './schemas/admin-audit-log.schema';

describe('AdminAuditService.list', () => {
  const row = {
    _id: 'audit-id',
    at: new Date('2026-10-06T01:00:00.000Z'),
    adminEmail: 'admin@example.com',
    adminRole: 'super_admin',
    action: 'user.ban',
    targetType: 'user',
    targetId: 'user-id',
    targetLabel: 'User',
    changes: {},
    reason: 'reviewed',
    success: true,
    ip: '127.0.0.1',
    errorCode: '',
  };
  const query = {
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue([row]),
  };
  const find = jest.fn().mockReturnValue(query);
  const model = {
    find,
    countDocuments: jest.fn().mockResolvedValue(21),
  } as unknown as Model<AdminAuditLogDocument>;
  const service = new AdminAuditService(model);

  beforeEach(() => jest.clearAllMocks());

  it('paginates and returns only the public audit shape', async () => {
    const response = await service.list({
      page: '2',
      pageSize: '10',
      search: 'admin',
      action: 'user.ban',
    });
    expect(response).toEqual({
      items: [
        {
          id: 'audit-id',
          at: '2026-10-06T01:00:00.000Z',
          adminEmail: 'admin@example.com',
          adminRole: 'super_admin',
          action: 'user.ban',
          targetType: 'user',
          targetId: 'user-id',
          targetLabel: 'User',
          changes: {},
          reason: 'reviewed',
          success: true,
          ip: '127.0.0.1',
          errorCode: '',
        },
      ],
      total: 21,
      page: 2,
      pageSize: 10,
    });
    expect(query.skip).toHaveBeenCalledWith(10);
    expect(query.limit).toHaveBeenCalledWith(10);
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'user.ban' }),
    );
  });

  it('rejects unbounded pagination', async () => {
    await expect(service.list({ pageSize: '1000' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(find).not.toHaveBeenCalled();
  });
});
