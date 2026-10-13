import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types, type QueryFilter } from 'mongoose';
import { resolveTimezone, startOfMonth } from '../common/date.util';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  GEM_HISTORY,
  type GemParams,
  type GemSource,
} from './gem-ledger.const';
import {
  GemTransaction,
  GemTransactionDocument,
} from './gem-transaction.schema';

export type GemHistoryType = 'all' | 'in' | 'out';

/**
 * 보석 장부. 보석을 주거나 빼는 곳은 **실제로 움직인 뒤에** record 를 부른다.
 *
 * - 조건부 업데이트가 성공했을 때만 부른다 (중복 지급을 막은 그 조건 덕에 장부도 한 번만 쌓인다)
 * - 장부 쓰기가 실패해도 던지지 않는다 — 기록 때문에 보상이 막히면 안 된다. 로그만 남긴다
 * - 이 모듈은 @Global 이라 서비스마다 모듈을 import 할 필요 없다
 */
@Injectable()
export class GemLedgerService {
  private readonly logger = new Logger(GemLedgerService.name);

  constructor(
    @InjectModel(GemTransaction.name)
    private readonly ledger: Model<GemTransactionDocument>,
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
  ) {}

  async record(
    userId: string | Types.ObjectId,
    amount: number,
    source: GemSource,
    params: GemParams = {},
  ): Promise<void> {
    const value = Math.trunc(Number(amount));
    if (!value) return;
    try {
      await this.ledger.create({
        userId: new Types.ObjectId(String(userId)),
        amount: value,
        source,
        params,
      });
    } catch (error) {
      this.logger.warn(
        `[gems] 장부 기록 실패 user=${String(userId)} ${source} ${value}: ${String(error)}`,
      );
    }
  }

  /** 최근 것부터. before 는 앞 페이지 마지막 줄의 id */
  async history(
    userId: string,
    query: { type?: string; before?: string; limit?: string | number },
  ) {
    const filter: QueryFilter<GemTransactionDocument> = {
      userId: new Types.ObjectId(userId),
    };
    if (query.type === 'in') filter.amount = { $gt: 0 };
    else if (query.type === 'out') filter.amount = { $lt: 0 };
    if (query.before && isValidObjectId(query.before)) {
      filter._id = { $lt: new Types.ObjectId(query.before) };
    }
    const size = Math.min(
      GEM_HISTORY.MAX_PAGE_SIZE,
      Math.max(1, Number(query.limit) || GEM_HISTORY.PAGE_SIZE),
    );

    const rows = await this.ledger
      .find(filter)
      .sort({ _id: -1 })
      .limit(size + 1)
      .lean<(GemTransaction & { _id: Types.ObjectId })[]>();
    const items = rows.slice(0, size).map((row) => ({
      id: row._id.toString(),
      amount: row.amount,
      source: row.source,
      params: row.params ?? {},
      createdAt: row.createdAt ?? row._id.getTimestamp(),
    }));
    return {
      items,
      nextCursor:
        rows.length > size ? (items[items.length - 1]?.id ?? null) : null,
    };
  }

  /** 지금 잔액 + 이번 달(유저 시간대) 들어온·나간 보석 + 기록이 시작된 날 */
  async summary(userId: string) {
    const uid = new Types.ObjectId(userId);
    const user = await this.users
      .findById(uid)
      .select('gems timezone')
      .lean<{ gems?: number; timezone?: string }>();
    const from = startOfMonth(new Date(), resolveTimezone(user?.timezone));

    const [month, first] = await Promise.all([
      this.ledger.aggregate<{ in: number; out: number }>([
        { $match: { userId: uid, createdAt: { $gte: from } } },
        {
          $group: {
            _id: null,
            in: { $sum: { $cond: [{ $gt: ['$amount', 0] }, '$amount', 0] } },
            out: { $sum: { $cond: [{ $lt: ['$amount', 0] }, '$amount', 0] } },
          },
        },
      ]),
      this.ledger
        .findOne({ userId: uid })
        .sort({ _id: 1 })
        .select('createdAt')
        .lean<{ createdAt?: Date }>(),
    ]);

    return {
      balance: user?.gems ?? 0,
      monthIn: month[0]?.in ?? 0,
      monthOut: Math.abs(month[0]?.out ?? 0),
      since: first?.createdAt ?? null,
    };
  }
}
