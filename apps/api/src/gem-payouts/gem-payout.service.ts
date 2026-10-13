import {
  BadRequestException,
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { AdminAuditService } from '../admin/admin-audit.service';
import type { AdminRequestContext } from '../admin/guards/admin.guard';
import { AuthProvider } from '../common/enums/provider.enum';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationType } from '../notifications/schemas/notification.schema';
import { digitsOnly } from '../payments/card/card-number';
import { TelegramBotApi } from '../payments/providers/telegram-stars/telegram-bot.api';
import { botLang } from '../payments/providers/telegram-stars/telegram-stars.texts';
import { PushService } from '../push/push.service';
import { PushType } from '../push/push.types';
import { User, UserDocument } from '../users/schemas/user.schema';
import {
  ADMIN_TRANSITIONS,
  GEM_PAYOUT,
  PAYOUT_REJECT_REASONS,
  PAYOUT_STATUSES,
  SOM_PER_GEM,
  type PayoutBrand,
  type PayoutStatus,
} from './gem-payout.const';
import {
  GemPayoutRequest,
  GemPayoutRequestDocument,
} from './gem-payout-request.schema';
import { payoutDoneBotText, payoutRejectedBotText } from './gem-payout.texts';
import {
  maskPayoutCard,
  normalizeCardHolder,
  payoutCardProblem,
} from './payout-card';

type RequestRecord = GemPayoutRequest & { _id: Types.ObjectId };
type UserSummary = {
  _id: Types.ObjectId;
  nickname?: string;
  username?: string;
  email?: string;
  provider?: string;
  providerId?: string;
  phoneLast4?: string;
  gems?: number;
  appLanguage?: string;
  createdAt?: Date;
};

const DONE_STATUSES: PayoutStatus[] = ['completed', 'rejected', 'cancelled'];
const groupNumber = (n: number) => n.toLocaleString('en-US');

/**
 * 보석 출금 — 유저가 신청하면 보석을 바로 빼 두고, 운영자가 어드민에서 직접 송금한 뒤
 * "송금 완료" 를 누른다. 반려·취소면 보석을 돌려준다. 결과는 앱 알림·푸시·텔레그램 봇으로 간다.
 */
@Injectable()
export class GemPayoutService {
  private readonly logger = new Logger(GemPayoutService.name);

  constructor(
    @InjectModel(GemPayoutRequest.name)
    private readonly requests: Model<GemPayoutRequestDocument>,
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    private readonly notifications: NotificationsService,
    private readonly push: PushService,
    private readonly bot: TelegramBotApi,
    private readonly audit: AdminAuditService,
  ) {}

  // ───────────────────────── 유저 ─────────────────────────

  /** 상점 출금 칸 — 최소 수량·환율·지금 열린 신청·최근 결과 */
  async overview(userId: string) {
    const uid = new Types.ObjectId(userId);
    const [user, recent] = await Promise.all([
      this.users.findById(uid).select('gems').lean<{ gems?: number }>(),
      this.requests
        .find({ userId: uid })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean<RequestRecord[]>(),
    ]);
    const open = recent.find((item) => item.open) ?? null;
    return {
      minGems: GEM_PAYOUT.MIN_GEMS,
      somPerGem: SOM_PER_GEM,
      gems: user?.gems ?? 0,
      open: open ? this.view(open) : null,
      recent: recent.map((item) => this.view(item)),
    };
  }

  async create(
    userId: string,
    dto: {
      brand: PayoutBrand;
      cardNumber: string;
      cardHolder: string;
      gems: number;
    },
  ) {
    const uid = new Types.ObjectId(userId);
    const digits = digitsOnly(dto.cardNumber);
    const problem = payoutCardProblem(digits, dto.brand);
    if (problem) throw new BadRequestException(`PAYOUT_CARD_${problem}`);
    const holder = normalizeCardHolder(dto.cardHolder);
    if (!holder) throw new BadRequestException('PAYOUT_HOLDER_INVALID');
    const gems = dto.gems;
    if (!Number.isInteger(gems) || gems < GEM_PAYOUT.MIN_GEMS) {
      throw new BadRequestException('PAYOUT_BELOW_MIN');
    }
    // 빠른 길 — 열린 신청이 있으면 보석을 건드리기 전에 막는다 (최종 보장은 유니크 인덱스)
    if (await this.requests.exists({ userId: uid, open: true })) {
      throw new ConflictException('PAYOUT_ALREADY_OPEN');
    }

    // 보석 차감을 조건부·원자적으로 (요청이 겹쳐도 음수가 되지 않게)
    const charged = await this.users
      .findOneAndUpdate(
        { _id: uid, gems: { $gte: gems } },
        { $inc: { gems: -gems } },
        { returnDocument: 'after' },
      )
      .select('gems')
      .lean<{ gems: number }>();
    if (!charged) throw new BadRequestException('NOT_ENOUGH_GEMS');

    try {
      const request = await this.requests.create({
        userId: uid,
        gems,
        amountUzs: gems * SOM_PER_GEM,
        brand: dto.brand,
        cardNumber: digits,
        cardLast4: digits.slice(-4),
        cardHolder: holder,
        status: 'pending',
        open: true,
      });
      this.logger.log(
        `[payout] 신청 user=${userId} gems=${gems} card=${maskPayoutCard(digits)}`,
      );
      return { request: this.view(request.toObject()), gems: charged.gems };
    } catch (error) {
      // 신청을 못 남기면 보석만 사라진다 — 돌려준다
      await this.users
        .updateOne({ _id: uid }, { $inc: { gems } })
        .catch(() => undefined);
      if ((error as { code?: number }).code === 11000) {
        throw new ConflictException('PAYOUT_ALREADY_OPEN');
      }
      throw error;
    }
  }

  /** 접수 상태일 때만 취소 — 운영자가 보내기 시작했으면(processing) 못 무른다 */
  async cancel(userId: string, id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('PAYOUT_NOT_FOUND');
    const now = new Date();
    const closed = await this.requests
      .findOneAndUpdate(
        { _id: id, userId: new Types.ObjectId(userId), status: 'pending' },
        {
          $set: {
            status: 'cancelled',
            open: false,
            cancelledAt: now,
            refunded: true,
          },
        },
        { returnDocument: 'after' },
      )
      .lean<RequestRecord>();
    if (!closed) throw new ConflictException('PAYOUT_NOT_CANCELLABLE');
    const gems = await this.refund(closed);
    await this.maskCard(closed);
    return { request: this.view(closed), gems };
  }

  // ───────────────────────── 운영자 ─────────────────────────

  async adminList(query: {
    status?: string;
    page?: string;
    pageSize?: string;
  }) {
    const page = Math.max(1, Number(query.page) || 1);
    const pageSize = Math.min(100, Math.max(1, Number(query.pageSize) || 20));
    // 모르는 상태 값은 전체로 본다
    const status = (PAYOUT_STATUSES as readonly string[]).includes(
      query.status ?? '',
    )
      ? (query.status as PayoutStatus)
      : null;
    const filter: { open?: boolean; status?: PayoutStatus } =
      query.status === 'open' ? { open: true } : status ? { status } : {};
    const [items, total, counts] = await Promise.all([
      this.requests
        .find(filter)
        // 처리할 것(열린 건)은 먼저 신청한 사람부터 보낸다. 전체 보기는 열린 건을 위로
        .sort(
          query.status === 'open'
            ? { createdAt: 1 }
            : status
              ? { createdAt: -1 }
              : { open: -1, createdAt: -1 },
        )
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .lean<RequestRecord[]>(),
      this.requests.countDocuments(filter),
      this.requests.aggregate<{ _id: PayoutStatus; count: number }>([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);
    const users = await this.userMap(items.map((item) => item.userId));
    return {
      items: items.map((item) => ({
        ...this.adminView(item),
        user: this.userView(users.get(item.userId.toString())),
      })),
      total,
      page,
      pageSize,
      counts: Object.fromEntries(counts.map((c) => [c._id, c.count])),
      minGems: GEM_PAYOUT.MIN_GEMS,
    };
  }

  async adminDetail(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException('PAYOUT_NOT_FOUND');
    const item = await this.requests.findById(id).lean<RequestRecord>();
    if (!item) throw new NotFoundException('PAYOUT_NOT_FOUND');
    const [users, history] = await Promise.all([
      this.userMap([item.userId]),
      this.requests
        .find({ userId: item.userId, _id: { $ne: item._id } })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean<RequestRecord[]>(),
    ]);
    return {
      ...this.adminView(item),
      user: this.userView(users.get(item.userId.toString())),
      history: history.map((h) => this.adminView(h)),
    };
  }

  /**
   * 처리 중 / 송금 완료 / 반려. 상태는 정해진 길로만 바뀐다 (끝난 건은 다시 못 연다).
   * 같은 버튼을 두 번 눌러도 한 번만 처리된다 — 바꾸기 전 상태를 조건으로 건다.
   */
  async adminSetStatus(
    id: string,
    body: {
      status: keyof typeof ADMIN_TRANSITIONS;
      reason?: string;
      note?: string;
    },
    admin: AdminRequestContext,
    ip?: string,
    userAgent?: string,
  ) {
    if (!isValidObjectId(id)) throw new NotFoundException('PAYOUT_NOT_FOUND');
    const from = ADMIN_TRANSITIONS[body.status];
    if (!from) throw new BadRequestException('PAYOUT_BAD_STATUS');
    const reason =
      body.status === 'rejected'
        ? (PAYOUT_REJECT_REASONS as readonly string[]).includes(
            body.reason ?? '',
          )
          ? body.reason!
          : 'other'
        : null;
    const now = new Date();
    const final = body.status !== 'processing';
    const set: Record<string, unknown> = {
      status: body.status,
      handledBy: { adminId: admin.userId, email: admin.email },
      [`${body.status}At`]: now,
    };
    if (final) set.open = false;
    if (reason) {
      set.rejectReason = reason;
      set.refunded = true;
    }
    if (typeof body.note === 'string')
      set.adminNote = body.note.trim().slice(0, 500);

    const before = await this.requests
      .findById(id)
      .select('status')
      .lean<{ status: PayoutStatus }>();
    if (!before) throw new NotFoundException('PAYOUT_NOT_FOUND');
    const updated = await this.requests
      .findOneAndUpdate(
        { _id: id, status: { $in: from } },
        { $set: set },
        { returnDocument: 'after' },
      )
      .lean<RequestRecord>();
    if (!updated) throw new ConflictException('PAYOUT_STATE_CHANGED');

    if (body.status === 'rejected') await this.refund(updated);
    if (final) await this.maskCard(updated);

    await this.audit.record({
      admin,
      action: `payout.${body.status}`,
      targetType: 'gem_payout',
      targetId: id,
      targetLabel: `${groupNumber(updated.gems)} 보석 · •••• ${updated.cardLast4}`,
      changes: { status: { from: before.status, to: body.status } },
      reason: reason ?? body.note?.trim() ?? undefined,
      ip,
      userAgent,
    });

    if (body.status === 'completed' || body.status === 'rejected') {
      await this.notifyUser(updated).catch((error) =>
        this.logger.warn(`[payout] 유저 알림 실패 id=${id}: ${String(error)}`),
      );
    }
    return this.adminDetail(id);
  }

  // ───────────────────────── 내부 ─────────────────────────

  private async refund(request: RequestRecord): Promise<number | null> {
    const user = await this.users
      .findOneAndUpdate(
        { _id: request.userId },
        { $inc: { gems: request.gems } },
        { returnDocument: 'after' },
      )
      .select('gems')
      .lean<{ gems: number }>()
      .catch((error) => {
        // refunded=true 로 이미 찍혔으니 손으로 돌려줘야 한다 — 로그로 남긴다
        this.logger.error(
          `[payout] 보석 반환 실패 id=${request._id.toString()} user=${request.userId.toString()} gems=${request.gems}: ${String(error)}`,
        );
        return null;
      });
    return user?.gems ?? null;
  }

  /** 끝난 신청은 카드 번호를 가린다 — 송금이 끝나면 전체 번호를 가지고 있을 이유가 없다 */
  private async maskCard(request: RequestRecord) {
    await this.requests
      .updateOne(
        { _id: request._id, status: { $in: DONE_STATUSES } },
        { $set: { cardNumber: maskPayoutCard(request.cardNumber) } },
      )
      .catch(() => undefined);
  }

  /** 송금 완료·반려를 앱 알림 + 푸시 + (텔레그램이면) 봇으로 알린다 */
  private async notifyUser(request: RequestRecord) {
    const done = request.status === 'completed';
    const params = done
      ? { amount: groupNumber(request.amountUzs), last4: request.cardLast4 }
      : {
          gems: groupNumber(request.gems),
          reason: request.rejectReason ?? 'other',
        };
    const dedupKey = `payout:${request._id.toString()}:${request.status}`;
    await Promise.allSettled([
      this.notifications.create(
        request.userId,
        done
          ? NotificationType.GEM_PAYOUT_DONE
          : NotificationType.GEM_PAYOUT_REJECTED,
        { params, link: '/shop' },
      ),
      this.push.send(
        request.userId,
        done ? PushType.GEM_PAYOUT_DONE : PushType.GEM_PAYOUT_REJECTED,
        { params, link: '/shop', dedupKey },
      ),
      this.notifyTelegram(request),
    ]);
  }

  private async notifyTelegram(request: RequestRecord) {
    const user = await this.users
      .findById(request.userId)
      .select('provider providerId appLanguage')
      .lean<UserSummary>();
    if (user?.provider !== AuthProvider.TELEGRAM || !user.providerId) return;
    if (!this.bot.enabled) return;
    const lang = botLang(user.appLanguage);
    const text =
      request.status === 'completed'
        ? payoutDoneBotText(lang, {
            amount: groupNumber(request.amountUzs),
            last4: request.cardLast4,
          })
        : payoutRejectedBotText(lang, {
            gems: groupNumber(request.gems),
            reason: request.rejectReason,
          });
    await this.bot.call('sendMessage', { chat_id: user.providerId, text });
  }

  private async userMap(ids: Types.ObjectId[]) {
    const users = await this.users
      .find({ _id: { $in: ids } })
      .select(
        'nickname username email provider providerId phoneLast4 gems appLanguage createdAt',
      )
      .lean<UserSummary[]>();
    return new Map(users.map((user) => [user._id.toString(), user]));
  }

  private userView(user: UserSummary | undefined) {
    if (!user) return null;
    return {
      id: user._id.toString(),
      nickname: user.nickname ?? '',
      username: user.username ?? '',
      email: user.email ?? '',
      provider: user.provider ?? '',
      providerId: user.providerId ?? '',
      phoneLast4: user.phoneLast4 ?? '',
      gems: user.gems ?? 0,
      appLanguage: user.appLanguage ?? '',
      joinedAt: user.createdAt ?? null,
    };
  }

  /** 유저에게 보이는 모양 — 카드는 끝 4자리만 */
  view(item: RequestRecord) {
    return {
      id: item._id.toString(),
      gems: item.gems,
      amountUzs: item.amountUzs,
      brand: item.brand,
      cardLast4: item.cardLast4,
      cardHolder: item.cardHolder,
      status: item.status,
      rejectReason: item.rejectReason ?? null,
      createdAt: item.createdAt ?? null,
      completedAt: item.completedAt ?? null,
      rejectedAt: item.rejectedAt ?? null,
    };
  }

  /** 운영자에게 보이는 모양 — 열린 건은 전체 카드 번호 (송금에 필요) */
  private adminView(item: RequestRecord) {
    return {
      ...this.view(item),
      cardNumber: item.cardNumber,
      open: item.open,
      adminNote: item.adminNote ?? '',
      handledBy: item.handledBy ?? null,
      processingAt: item.processingAt ?? null,
      cancelledAt: item.cancelledAt ?? null,
      refunded: item.refunded ?? false,
      updatedAt: item.updatedAt ?? null,
    };
  }
}
