import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

const FIELDS =
  '_id email nickname username country provider createdAt lastActiveAt isOnboardingCompleted placementLevel totalXP streak longestStreak league gems energy isSuper superTier superPlan superExpiresAt trialStartedAt';
const SORT = {
  newest: { createdAt: -1 as const, _id: -1 as const },
  oldest: { createdAt: 1 as const, _id: 1 as const },
  recent: { lastActiveAt: -1 as const, _id: -1 as const },
  xp: { totalXP: -1 as const, _id: -1 as const },
};
type SortKey = keyof typeof SORT;

interface UserRow {
  _id: Types.ObjectId;
  email?: string;
  nickname?: string;
  username?: string;
  country?: string;
  provider?: string;
  createdAt?: Date;
  lastActiveAt?: Date;
  isOnboardingCompleted?: boolean;
  placementLevel?: number;
  totalXP?: number;
  streak?: number;
  longestStreak?: number;
  league?: string;
  gems?: number;
  energy?: number;
  isSuper?: boolean;
  superTier?: string;
  superPlan?: string;
  superExpiresAt?: Date | null;
  trialStartedAt?: Date | null;
}

const iso = (value?: Date | null) =>
  value ? new Date(value).toISOString() : null;
const publicUser = (row: UserRow) => ({
  id: String(row._id),
  email: row.email ?? '',
  nickname: row.nickname ?? '',
  username: row.username ?? '',
  country: row.country ?? '',
  provider: row.provider ?? '',
  createdAt: iso(row.createdAt),
  lastActiveAt: iso(row.lastActiveAt),
  isOnboardingCompleted: !!row.isOnboardingCompleted,
  placementLevel: row.placementLevel ?? 1,
  totalXP: row.totalXP ?? 0,
  streak: row.streak ?? 0,
  longestStreak: row.longestStreak ?? 0,
  league: row.league ?? 'bronze',
  gems: row.gems ?? 0,
  energy: row.energy ?? 0,
  // The user's projection is informative, not a billing entitlement decision.
  projectedPremium: !!row.isSuper,
  projectedTier: row.superTier ?? null,
  projectedPlan: row.superPlan ?? null,
  projectedExpiresAt: iso(row.superExpiresAt),
  trialStartedAt: iso(row.trialStartedAt),
});

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
  ) {}

  async list(query: {
    page?: string;
    pageSize?: string;
    search?: string;
    country?: string;
    sort?: string;
  }) {
    const page = Number(query.page ?? 1);
    const pageSize = Number(query.pageSize ?? 20);
    const search = query.search?.trim() ?? '';
    const country = query.country?.trim() ?? '';
    const sort = (query.sort ?? 'newest') as SortKey;
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 100 ||
      search.length > 100 ||
      country.length > 20 ||
      !SORT[sort]
    ) {
      throw new BadRequestException('INVALID_USER_FILTER');
    }
    const filter: Record<string, unknown> = { isBot: { $ne: true } };
    if (country) filter.country = country;
    if (search) {
      const slash = String.fromCharCode(92);
      const pattern = new RegExp(
        [...search]
          .map((char) =>
            '.^$*+?()[]{}|'.includes(char) || char === slash
              ? slash + char
              : char,
          )
          .join(''),
        'i',
      );
      filter.$or = [
        { email: pattern },
        { nickname: pattern },
        { username: pattern },
      ];
      if (Types.ObjectId.isValid(search))
        (filter.$or as Record<string, unknown>[]).push({
          _id: new Types.ObjectId(search),
        });
    }
    const [rows, total] = await Promise.all([
      this.users
        .find(filter)
        .select(FIELDS)
        .sort(SORT[sort])
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      this.users.countDocuments(filter),
    ]);
    return {
      items: rows.map((row) => publicUser(row as unknown as UserRow)),
      total,
      page,
      pageSize,
    };
  }

  async get(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('INVALID_USER_ID');
    const row = await this.users
      .findOne({ _id: new Types.ObjectId(id), isBot: { $ne: true } })
      .select(FIELDS)
      .lean();
    if (!row) throw new NotFoundException('USER_NOT_FOUND');
    return publicUser(row as unknown as UserRow);
  }
}
