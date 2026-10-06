import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  Subscription,
  SubscriptionDocument,
} from '../payments/subscriptions/subscription.schema';
import { User, UserDocument } from '../users/schemas/user.schema';
import { ENTITLED_STATUSES } from '../payments/subscriptions/subscription.types';

const SUB_FIELDS =
  '_id userId provider platform country tier plan productId status startedAt expiresAt autoRenew lastVerifiedAt revokedAt priceMicros currency';
interface SubRow {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  provider: string;
  platform: string;
  country: string;
  tier: string;
  plan: string;
  productId: string;
  status: string;
  startedAt: Date;
  expiresAt: Date;
  autoRenew: boolean;
  lastVerifiedAt?: Date;
  revokedAt?: Date | null;
  priceMicros?: number | null;
  currency?: string;
}
interface UserRow {
  _id: Types.ObjectId;
  email?: string;
  nickname?: string;
  trialStartedAt?: Date | null;
}
const iso = (value?: Date | null) =>
  value ? new Date(value).toISOString() : null;

@Injectable()
export class AdminSubscriptionsService {
  constructor(
    @InjectModel(Subscription.name)
    private readonly subscriptions: Model<SubscriptionDocument>,
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
  ) {}

  private present(row: SubRow, user?: UserRow) {
    return {
      id: String(row._id),
      userId: String(row.userId),
      email: user?.email ?? '',
      nickname: user?.nickname ?? '',
      provider: row.provider,
      platform: row.platform,
      country: row.country,
      tier: row.tier,
      plan: row.plan,
      productId: row.productId,
      status: row.status,
      startedAt: iso(row.startedAt),
      expiresAt: iso(row.expiresAt),
      autoRenew: row.autoRenew,
      lastVerifiedAt: iso(row.lastVerifiedAt),
      revokedAt: iso(row.revokedAt),
      priceMicros: row.priceMicros ?? null,
      currency: row.currency ?? '',
      trialStartedAt: iso(user?.trialStartedAt),
      entitledNow:
        ENTITLED_STATUSES.includes(
          row.status as (typeof ENTITLED_STATUSES)[number],
        ) &&
        new Date(row.expiresAt).getTime() > Date.now() &&
        !row.revokedAt,
    };
  }

  async list(query: {
    page?: string;
    pageSize?: string;
    search?: string;
    status?: string;
    tier?: string;
    provider?: string;
  }) {
    const page = Number(query.page ?? 1);
    const pageSize = Number(query.pageSize ?? 20);
    const search = query.search?.trim() ?? '';
    const status = query.status?.trim() ?? '';
    const tier = query.tier?.trim() ?? '';
    const provider = query.provider?.trim() ?? '';
    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > 100 ||
      search.length > 100 ||
      (status &&
        !['active', 'cancelled', 'grace_period', 'on_hold', 'expired'].includes(
          status,
        )) ||
      (tier && !['super', 'max'].includes(tier)) ||
      (provider &&
        !['google_play', 'toss', 'uzum', 'click', 'payme', 'gems'].includes(
          provider,
        ))
    ) {
      throw new BadRequestException('INVALID_SUBSCRIPTION_FILTER');
    }
    const filter: Record<string, unknown> = {};
    if (status) filter.status = status;
    if (tier) filter.tier = tier;
    if (provider) filter.provider = provider;
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
      const matches = await this.users
        .find({ $or: [{ email: pattern }, { nickname: pattern }] })
        .select('_id')
        .lean();
      const ids: Types.ObjectId[] = matches.map((row) => row._id);
      if (Types.ObjectId.isValid(search)) ids.push(new Types.ObjectId(search));
      filter.$or = [{ userId: { $in: ids } }, { productId: pattern }];
    }
    const [rows, total] = await Promise.all([
      this.subscriptions
        .find(filter)
        .select(SUB_FIELDS)
        .sort({ startedAt: -1, _id: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean(),
      this.subscriptions.countDocuments(filter),
    ]);
    const users = await this.users
      .find({ _id: { $in: rows.map((row) => row.userId) } })
      .select('_id email nickname trialStartedAt')
      .lean();
    const byId = new Map(
      users.map((row) => [String(row._id), row as unknown as UserRow]),
    );
    return {
      items: rows.map((row) =>
        this.present(row as unknown as SubRow, byId.get(String(row.userId))),
      ),
      total,
      page,
      pageSize,
    };
  }

  async get(id: string) {
    if (!Types.ObjectId.isValid(id))
      throw new BadRequestException('INVALID_SUBSCRIPTION_ID');
    const row = await this.subscriptions.findById(id).select(SUB_FIELDS).lean();
    if (!row) throw new NotFoundException('SUBSCRIPTION_NOT_FOUND');
    const user = await this.users
      .findById(row.userId)
      .select('_id email nickname trialStartedAt')
      .lean();
    return this.present(
      row as unknown as SubRow,
      user ? (user as unknown as UserRow) : undefined,
    );
  }
}
