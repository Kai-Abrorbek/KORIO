import { BadRequestException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { AdminUsersService } from './admin-users.service';
import type { UserDocument } from '../users/schemas/user.schema';

jest.mock('../users/schemas/user.schema', () => ({ User: class User {} }));

describe('AdminUsersService', () => {
  const row = {
    _id: new Types.ObjectId(),
    email: 'learner@example.com',
    nickname: 'Learner',
    createdAt: new Date('2026-10-01'),
    totalXP: 120,
    password: 'must-not-leak',
    adminPassword: 'must-not-leak',
  };
  const query = {
    select: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    lean: jest.fn().mockResolvedValue([row]),
  };
  const find = jest.fn().mockReturnValue(query);
  const model = {
    find,
    countDocuments: jest.fn().mockResolvedValue(1),
  } as unknown as Model<UserDocument>;
  const service = new AdminUsersService(model);

  beforeEach(() => jest.clearAllMocks());

  it('returns a bounded, allowlisted user page', async () => {
    const response = await service.list({ page: '1', pageSize: '20' });
    expect(response.total).toBe(1);
    expect(response.items[0]).toMatchObject({
      id: String(row._id),
      email: 'learner@example.com',
      totalXP: 120,
    });
    expect(response.items[0]).not.toHaveProperty('password');
    expect(response.items[0]).not.toHaveProperty('adminPassword');
    expect(query.select).toHaveBeenCalled();
  });

  it('rejects invalid pagination and ids before querying', async () => {
    await expect(service.list({ pageSize: '1000' })).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(service.get('not-an-id')).rejects.toBeInstanceOf(
      BadRequestException,
    );
    expect(find).not.toHaveBeenCalled();
  });
});
