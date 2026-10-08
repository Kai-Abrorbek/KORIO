import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { createHash } from 'crypto';
import { Model, Types } from 'mongoose';
import { AuthProvider } from '../../common/enums/provider.enum';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { SubscriptionService } from '../subscriptions/subscription.service';
import {
  TelegramBotApi,
  telegramAdminIds,
} from '../providers/telegram-stars/telegram-bot.api';
import {
  botDate,
  botLang,
} from '../providers/telegram-stars/telegram-stars.texts';
import type { TgCallbackQuery } from '../providers/telegram-stars/telegram.types';
import {
  CARD_AMOUNT_UNIQUE_HOURS,
  CARD_RECEIPT_MAX_BYTES,
  CARD_RECEIPT_MIMES,
  CARD_REJECT_REASONS,
  CARD_SUBMIT_GRACE_MIN,
  CARD_TRANSFER_WINDOW_MIN,
  cardCatalog,
  cardProductById,
  pickUniqueAmount,
  type CardRejectReason,
} from './card-payment.const';
import {
  CardPaymentOrder,
  CardPaymentOrderDocument,
} from './card-payment-order.schema';
import {
  ADMIN_REASON_LABEL,
  adminCaption,
  cardApprovedText,
  cardRejectedText,
  orderCode,
  tashkentTime,
} from './card-payment.texts';
import { isLast4, maskCardNumber, parseReceivingCards } from './card-number';
import {
  CardReceiptOcrService,
  compareReceipt,
} from './card-receipt-ocr.service';

const MIN = 60_000;
const OPEN = ['awaiting_transfer', 'submitted'] as const;

export interface UploadedReceipt {
  buffer: Buffer;
  mimetype: string;
  size: number;
  originalname?: string;
}

interface TgSentMessage {
  message_id: number;
  chat: { id: number };
  photo?: { file_id: string; file_size?: number }[];
}

/**
 * Humo·Uzcard 카드 입금 (텔레그램 미니앱) — card-payment.const 머리말 참고.
 *
 *   미니앱 ─ POST /payments/card/orders {productId}   → 고유 금액 + 우리 카드번호 + 30분 타이머
 *   유저   ─ 은행 앱에서 그 금액을 보냄
 *   미니앱 ─ POST /payments/card/orders/:id/receipt (스크린샷 + 보낸 카드 끝 4자리)
 *   서버   ─ 운영자에게 봇으로 사진 + [✅ 승인] [❌ 거절] → OCR 힌트를 캡션에 덧붙임
 *   운영자 ─ 은행 입금 내역에서 금액 확인 후 버튼 → applyOneTimePass → 유저에게 봇 알림
 *
 * 승인·거절은 **조건부 갱신 하나**로 상태를 바꾼다 (submitted 인 것만). 운영자가 둘이
 * 동시에 눌러도, 같은 버튼을 두 번 눌러도 한 번만 반영된다. 기간 반영 자체도
 * externalTransactionId=card:<주문 id> 로 멱등하다.
 */
@Injectable()
export class CardPaymentService implements OnModuleInit {
  private readonly logger = new Logger(CardPaymentService.name);
  private readonly queues = new Map<string, Promise<unknown>>();

  constructor(
    @InjectModel(CardPaymentOrder.name)
    private readonly orders: Model<CardPaymentOrderDocument>,
    @InjectModel(User.name) private readonly users: Model<UserDocument>,
    private readonly subscriptions: SubscriptionService,
    private readonly bot: TelegramBotApi,
    private readonly ocr: CardReceiptOcrService,
  ) {}

  /** 부팅 때 카드 설정을 한 번 시끄럽게 검사한다 — 오타 난 카드번호로 돈을 받으면 끝이다 */
  onModuleInit() {
    const s = this.settings();
    if (!s.switchOn) return;
    for (const p of s.problems) {
      this.logger.error(
        `[card] 카드번호 이상 — 화면에 안 띄운다: ${p.masked} (${p.problem})`,
      );
    }
    if (!s.enabled) {
      this.logger.error(
        `[card] CARD_PAYMENT_ENABLED=true 인데 꺼져 있다 — 카드 ${s.cards.length}개, ` +
          `운영자 ${telegramAdminIds().length}명, 봇 토큰 ${this.bot.enabled ? '있음' : '없음'}`,
      );
      return;
    }
    this.logger.log(
      `[card] 카드 입금 켜짐: ${s.cards.map((c) => `${c.brand} ${maskCardNumber(c.number)}`).join(', ')}`,
    );
  }

  /** env 를 읽어 지금 설정을 만든다 */
  settings() {
    const skipLuhn = process.env.CARD_PAYMENT_SKIP_LUHN === 'true';
    const { cards, problems } = parseReceivingCards(
      process.env.CARD_PAYMENT_CARDS,
      skipLuhn,
    );
    const switchOn = process.env.CARD_PAYMENT_ENABLED === 'true';
    return {
      switchOn,
      enabled:
        switchOn &&
        cards.length > 0 &&
        this.bot.enabled &&
        telegramAdminIds().length > 0,
      cards,
      problems,
    };
  }

  /* ───────────── 미니앱 ───────────── */

  /** 요금제 화면이 처음 부르는 것 — 꺼져 있어도 진행 중 주문은 끝까지 보여준다 */
  async config(userId: string) {
    const s = this.settings();
    const active = await this.openOrder(userId);
    return {
      enabled: s.enabled,
      cards:
        s.enabled || active
          ? s.cards.map((c) => ({
              brand: c.brand,
              number: c.number,
              holder: c.holder,
              last4: c.last4,
            }))
          : [],
      products: cardCatalog(),
      transferMinutes: CARD_TRANSFER_WINDOW_MIN,
      activeOrder: active ? this.view(active) : null,
    };
  }

  async createOrder(userId: string, productId: string) {
    if (!this.settings().enabled)
      throw new ForbiddenException('CARD_PAYMENT_DISABLED');
    const product = cardProductById(productId);
    if (!product) throw new BadRequestException('UNKNOWN_PRODUCT');

    return this.serial(userId, async () => {
      const open = await this.openOrder(userId);
      if (open?.status === 'submitted')
        throw new ConflictException('ORDER_UNDER_REVIEW');
      if (open?.status === 'awaiting_transfer') {
        // 같은 상품을 다시 누르면 같은 주문 (이미 돈을 보냈을 수 있다)
        if (
          open.productId === productId &&
          open.expiresAt.getTime() > Date.now()
        ) {
          return this.view(open);
        }
        open.status = 'cancelled';
        await open.save();
      }

      const since = new Date(Date.now() - CARD_AMOUNT_UNIQUE_HOURS * 60 * MIN);
      const taken = await this.orders.distinct('amount', {
        baseAmount: product.priceUzs,
        createdAt: { $gte: since },
      });
      const now = Date.now();
      const order = await this.orders.create({
        userId: new Types.ObjectId(userId),
        productId: product.id,
        tier: product.tier,
        plan: product.plan,
        months: product.months,
        days: product.days,
        baseAmount: product.priceUzs,
        amount: pickUniqueAmount(product.priceUzs, taken),
        status: 'awaiting_transfer',
        expiresAt: new Date(now + CARD_TRANSFER_WINDOW_MIN * MIN),
        submitUntil: new Date(
          now + (CARD_TRANSFER_WINDOW_MIN + CARD_SUBMIT_GRACE_MIN) * MIN,
        ),
        adminMessages: [],
        ocr: null,
      });
      return this.view(order);
    });
  }

  async getOrder(userId: string, orderId: string) {
    const order = await this.ownOrder(userId, orderId);
    await this.expireIfStale(order);
    return this.view(order);
  }

  async cancel(userId: string, orderId: string) {
    return this.serial(userId, async () => {
      const order = await this.ownOrder(userId, orderId);
      if (order.status === 'awaiting_transfer') {
        order.status = 'cancelled';
        await order.save();
      }
      return this.view(order);
    });
  }

  /**
   * 영수증 제출 → 운영자에게 승인 요청.
   * 운영자에게 하나도 못 보냈으면 주문을 그대로 두고 실패를 돌려준다 (다시 올리면 된다).
   */
  async submitReceipt(
    userId: string,
    orderId: string,
    file: UploadedReceipt | undefined,
    payerLast4: unknown,
    receiverLast4?: unknown,
  ) {
    if (!isLast4(payerLast4)) throw new BadRequestException('INVALID_LAST4');
    if (
      !file?.buffer?.length ||
      file.size > CARD_RECEIPT_MAX_BYTES ||
      !CARD_RECEIPT_MIMES.includes(file.mimetype)
    ) {
      throw new BadRequestException('INVALID_RECEIPT');
    }
    const { cards } = this.settings();
    const receiver =
      isLast4(receiverLast4) && cards.some((c) => c.last4 === receiverLast4)
        ? receiverLast4
        : cards[0]?.last4;

    return this.serial(userId, async () => {
      const order = await this.ownOrder(userId, orderId);
      await this.expireIfStale(order);
      if (order.status === 'submitted')
        throw new ConflictException('ALREADY_SUBMITTED');
      if (order.status === 'expired')
        throw new BadRequestException('ORDER_EXPIRED');
      if (order.status !== 'awaiting_transfer')
        throw new BadRequestException('ORDER_CLOSED');

      const sha = createHash('sha256').update(file.buffer).digest('hex');
      const reused = await this.orders
        .findOne({ receiptSha256: sha, _id: { $ne: order._id } })
        .select('_id status')
        .lean();
      // 이미 승인된 주문의 사진을 또 쓰는 건 받지 않는다 (같은 영수증으로 두 번 받기)
      if (reused?.status === 'approved')
        throw new BadRequestException('RECEIPT_ALREADY_USED');

      order.duplicateOf = reused?._id ? String(reused._id) : undefined;
      order.payerLast4 = payerLast4;
      order.receiverLast4 = receiver;
      order.submittedAt = new Date();
      order.receiptSha256 = sha;

      const who = await this.who(userId);
      const caption = adminCaption(order, who, {
        ocr: this.ocr.enabled ? 'pending' : 'done',
      });
      const markup = decisionKeyboard(order._id.toString());
      const sent: { chatId: number; messageId: number }[] = [];
      let fileId: string | undefined;
      for (const chatId of telegramAdminIds()) {
        try {
          const msg = fileId
            ? await this.bot.call<TgSentMessage>('sendPhoto', {
                chat_id: chatId,
                photo: fileId,
                caption,
                reply_markup: markup,
              })
            : await this.bot.upload<TgSentMessage>(
                'sendPhoto',
                { chat_id: chatId, caption, reply_markup: markup },
                {
                  field: 'photo',
                  buffer: file.buffer,
                  filename: `receipt-${orderCode(order._id.toString())}.${extension(file.mimetype)}`,
                  mime: file.mimetype,
                },
              );
          fileId ??= largestPhoto(msg);
          sent.push({ chatId: msg.chat.id, messageId: msg.message_id });
        } catch (error) {
          this.logger.error(
            `[card] 운영자 ${chatId} 에게 승인 요청 실패: ${String(error)}`,
          );
        }
      }
      if (!sent.length)
        throw new ServiceUnavailableException('CARD_PAYMENT_ADMIN_UNREACHABLE');

      order.receiptFileId = fileId;
      order.adminMessages = sent;
      order.status = 'submitted';
      await order.save();

      if (this.ocr.enabled) {
        void this.attachOcr(
          order._id.toString(),
          file.buffer,
          file.mimetype,
        ).catch((error) =>
          this.logger.warn(`[card] OCR 실패: ${String(error)}`),
        );
      }
      return this.view(order);
    });
  }

  /** 영수증을 읽어 운영자 메시지 캡션에 힌트를 붙인다 (백그라운드) */
  async attachOcr(orderId: string, image: Buffer, mime: string) {
    const fields = await this.ocr.read(image, mime);
    const order = await this.orders.findById(orderId);
    if (!order) return;
    const last4s = this.settings().cards.map((c) => c.last4);
    order.ocr = fields ? compareReceipt(fields, order, last4s) : null;
    await this.orders.updateOne(
      { _id: order._id },
      { $set: { ocr: order.ocr } },
    );
    await this.refreshAdminMessages(order);
  }

  /* ───────────── 운영자 (봇 버튼) ───────────── */

  /** callback_data 가 cp: 로 시작하면 처리하고 true */
  async handleCallback(q: TgCallbackQuery): Promise<boolean> {
    if (!q.data?.startsWith('cp:')) return false;
    const answer = (text?: string) =>
      this.bot
        .call('answerCallbackQuery', {
          callback_query_id: q.id,
          ...(text ? { text } : {}),
        })
        .catch(() => undefined);

    if (!telegramAdminIds().includes(String(q.from.id))) {
      await answer('권한 없음');
      return true;
    }
    const [, action, orderId, reason] = q.data.split(':');
    if (!Types.ObjectId.isValid(orderId)) {
      await answer('주문 id 가 이상해');
      return true;
    }
    const where = q.message
      ? { chat_id: q.message.chat.id, message_id: q.message.message_id }
      : null;

    switch (action) {
      case 'x': // 거절 사유 고르기
      case 'b': // 뒤로
        if (where) {
          await this.bot
            .call('editMessageReplyMarkup', {
              ...where,
              reply_markup:
                action === 'x'
                  ? reasonKeyboard(orderId)
                  : decisionKeyboard(orderId),
            })
            .catch(() => undefined);
        }
        await answer();
        return true;
      case 'a':
        await answer(await this.approve(orderId, String(q.from.id)));
        return true;
      case 'r':
        await answer(await this.reject(orderId, reason, String(q.from.id)));
        return true;
      default:
        await answer();
        return true;
    }
  }

  /** 승인 — 운영자에게 보여줄 한 줄을 돌려준다 */
  async approve(orderId: string, adminId: string): Promise<string> {
    const order = await this.orders.findOneAndUpdate(
      { _id: orderId, status: 'submitted' },
      {
        $set: { status: 'approved', decidedAt: new Date(), decidedBy: adminId },
      },
      { returnDocument: 'after' },
    );
    if (!order) return this.alreadyDecided(orderId);

    try {
      const pass = await this.subscriptions.applyOneTimePass({
        userId: order.userId.toString(),
        provider: 'card_transfer',
        platform: 'telegram',
        country: 'UZ',
        tier: order.tier,
        plan: order.plan,
        productId: `card_${order.productId}`,
        days: order.days,
        externalTransactionId: `card:${order._id.toString()}`,
        priceMicros: order.amount * 1_000_000,
        currency: 'UZS',
      });
      order.premiumUntil = pass.expiresAt;
      await this.orders.updateOne(
        { _id: order._id },
        { $set: { premiumUntil: pass.expiresAt } },
      );
    } catch (error) {
      // 기간을 못 줬으면 승인도 되돌린다 — 다시 누를 수 있게
      await this.orders.updateOne(
        { _id: order._id, status: 'approved' },
        {
          $set: { status: 'submitted' },
          $unset: { decidedAt: 1, decidedBy: 1 },
        },
      );
      this.logger.error(
        `[card] 승인 반영 실패 #${orderCode(orderId)}: ${String(error)}`,
      );
      return '반영 실패 — 잠시 뒤 다시 눌러';
    }

    this.logger.log(
      `[card] 승인 #${orderCode(orderId)} ${order.tier} ${order.amount} so'm by ${adminId}`,
    );
    await this.refreshAdminMessages(order);
    await this.notifyUser(order);
    return '✅ 승인 — 프리미엄 열림';
  }

  async reject(
    orderId: string,
    reasonRaw: string | undefined,
    adminId: string,
  ): Promise<string> {
    const reason = (CARD_REJECT_REASONS as readonly string[]).includes(
      reasonRaw ?? '',
    )
      ? (reasonRaw as CardRejectReason)
      : 'no_money';
    const order = await this.orders.findOneAndUpdate(
      { _id: orderId, status: 'submitted' },
      {
        $set: {
          status: 'rejected',
          rejectReason: reason,
          decidedAt: new Date(),
          decidedBy: adminId,
        },
      },
      { returnDocument: 'after' },
    );
    if (!order) return this.alreadyDecided(orderId);
    this.logger.log(
      `[card] 거절 #${orderCode(orderId)} (${reason}) by ${adminId}`,
    );
    await this.refreshAdminMessages(order);
    await this.notifyUser(order);
    return `❌ 거절 — ${ADMIN_REASON_LABEL[reason]}`;
  }

  /** 운영자용 /cardcheck — 카드 설정이 제대로 들어갔는지 */
  async describe(): Promise<string> {
    const s = this.settings();
    const pending = await this.orders.countDocuments({ status: 'submitted' });
    const lines = [
      `💳 카드 입금: ${s.enabled ? '켜짐 ✅' : '꺼짐'} (스위치 ${s.switchOn ? 'ON' : 'OFF'})`,
      ...s.cards.map(
        (c) =>
          `  ${c.brand === 'humo' ? 'Humo' : 'Uzcard'} ${maskCardNumber(c.number)} — ${c.holder || '이름 없음'} ✅`,
      ),
      ...s.problems.map((p) => `  ⚠️ ${p.masked} — ${PROBLEM_KO[p.problem]}`),
      s.cards.length || s.problems.length
        ? ''
        : '  (CARD_PAYMENT_CARDS 비어 있음)',
      `운영자 ${telegramAdminIds().length}명 · OCR ${this.ocr.enabled ? '켜짐' : '꺼짐(OPENAI_API_KEY 없음)'}`,
      `심사 대기 ${pending}건`,
    ];
    return lines.filter((l) => l !== '').join('\n');
  }

  /* ───────────── 정리 ───────────── */

  /** 시간이 다 지난 입금 대기 주문을 닫는다 */
  @Cron('*/10 * * * *')
  async expireStale() {
    const res = await this.orders.updateMany(
      { status: 'awaiting_transfer', submitUntil: { $lt: new Date() } },
      { $set: { status: 'expired' } },
    );
    return res.modifiedCount;
  }

  /* ───────────── 내부 ───────────── */

  private async alreadyDecided(orderId: string) {
    const current = await this.orders.findById(orderId).select('status').lean();
    return current ? `이미 처리됨 (${current.status})` : '주문이 없어';
  }

  private async openOrder(userId: string) {
    const order = await this.orders
      .findOne({
        userId: new Types.ObjectId(userId),
        status: { $in: [...OPEN] },
      })
      .sort({ createdAt: -1 });
    if (order) await this.expireIfStale(order);
    return order && OPEN.includes(order.status as (typeof OPEN)[number])
      ? order
      : null;
  }

  private async ownOrder(userId: string, orderId: string) {
    if (!Types.ObjectId.isValid(orderId))
      throw new NotFoundException('ORDER_NOT_FOUND');
    const order = await this.orders.findOne({
      _id: new Types.ObjectId(orderId),
      userId: new Types.ObjectId(userId),
    });
    if (!order) throw new NotFoundException('ORDER_NOT_FOUND');
    return order;
  }

  private async expireIfStale(order: CardPaymentOrderDocument) {
    if (
      order.status === 'awaiting_transfer' &&
      order.submitUntil.getTime() < Date.now()
    ) {
      order.status = 'expired';
      await order.save();
    }
  }

  private async who(userId: string) {
    const user = await this.users
      .findById(userId)
      .select('nickname provider providerId')
      .lean<{ nickname?: string; provider?: string; providerId?: string }>();
    return {
      nickname: user?.nickname,
      telegramId:
        user?.provider === AuthProvider.TELEGRAM ? user.providerId : undefined,
    };
  }

  /** 운영자 메시지들의 캡션·버튼을 지금 상태로 맞춘다 */
  private async refreshAdminMessages(order: CardPaymentOrderDocument) {
    const who = await this.who(order.userId.toString());
    const decision =
      order.status === 'approved'
        ? `✅ 승인됨 — ${order.decidedAt ? tashkentTime(order.decidedAt) : ''}`
        : order.status === 'rejected'
          ? `❌ 거절됨 (${ADMIN_REASON_LABEL[order.rejectReason as CardRejectReason] ?? order.rejectReason}) — ${
              order.decidedAt ? tashkentTime(order.decidedAt) : ''
            }`
          : undefined;
    const caption = adminCaption(order, who, { ocr: 'done', decision });
    const reply_markup =
      order.status === 'submitted'
        ? decisionKeyboard(order._id.toString())
        : { inline_keyboard: [] };
    for (const m of order.adminMessages ?? []) {
      await this.bot
        .call('editMessageCaption', {
          chat_id: m.chatId,
          message_id: m.messageId,
          caption,
          reply_markup,
        })
        .catch((error) =>
          this.logger.warn(`[card] 캡션 수정 실패: ${String(error)}`),
        );
    }
  }

  /** 결과를 유저에게 봇으로 알린다 (실패해도 결과는 그대로 — 미니앱이 폴링으로도 본다) */
  private async notifyUser(order: CardPaymentOrderDocument) {
    const user = await this.users
      .findById(order.userId)
      .select('provider providerId appLanguage timezone')
      .lean<{
        provider?: string;
        providerId?: string;
        appLanguage?: string;
        timezone?: string;
      }>();
    if (user?.provider !== AuthProvider.TELEGRAM || !user.providerId) return;
    const lang = botLang(user.appLanguage);
    const text =
      order.status === 'approved'
        ? cardApprovedText(
            lang,
            order.tier,
            order.premiumUntil
              ? botDate(lang, order.premiumUntil, user.timezone)
              : '',
          )
        : cardRejectedText(
            lang,
            (order.rejectReason as CardRejectReason) ?? 'no_money',
          );
    await this.bot
      .call('sendMessage', { chat_id: user.providerId, text })
      .catch((error) =>
        this.logger.warn(`[card] 유저 알림 실패: ${String(error)}`),
      );
  }

  view(order: CardPaymentOrderDocument) {
    const id = order._id.toString();
    return {
      id,
      code: orderCode(id),
      productId: order.productId,
      tier: order.tier,
      months: order.months,
      baseAmount: order.baseAmount,
      amount: order.amount,
      status: order.status,
      createdAt: order.createdAt,
      expiresAt: order.expiresAt,
      submitUntil: order.submitUntil,
      submittedAt: order.submittedAt ?? null,
      decidedAt: order.decidedAt ?? null,
      rejectReason: order.rejectReason ?? null,
      premiumUntil: order.premiumUntil ?? null,
      receiverLast4: order.receiverLast4 ?? null,
    };
  }

  private serial<T>(key: string, job: () => Promise<T>): Promise<T> {
    const previous = this.queues.get(key) ?? Promise.resolve();
    const run = previous.catch(() => undefined).then(job);
    const tail = run.catch(() => undefined);
    this.queues.set(key, tail);
    void tail.then(() => {
      if (this.queues.get(key) === tail) this.queues.delete(key);
    });
    return run;
  }
}

const PROBLEM_KO = {
  LENGTH: '16자리가 아님',
  NOT_DIGITS: '숫자가 아닌 글자',
  BRAND: 'Uzcard(8600)·Humo(9860) 번호가 아님',
  LUHN: '체크섬 틀림 — 오타 확인 (진짜 맞는 번호면 CARD_PAYMENT_SKIP_LUHN=true)',
} as const;

function decisionKeyboard(orderId: string) {
  return {
    inline_keyboard: [
      [
        { text: '✅ 승인', callback_data: `cp:a:${orderId}` },
        { text: '❌ 거절', callback_data: `cp:x:${orderId}` },
      ],
    ],
  };
}

function reasonKeyboard(orderId: string) {
  return {
    inline_keyboard: [
      ...CARD_REJECT_REASONS.map((reason) => [
        {
          text: `❌ ${ADMIN_REASON_LABEL[reason]}`,
          callback_data: `cp:r:${orderId}:${reason}`,
        },
      ]),
      [{ text: '← 뒤로', callback_data: `cp:b:${orderId}` }],
    ],
  };
}

function largestPhoto(msg: TgSentMessage) {
  const sizes = msg.photo ?? [];
  return sizes[sizes.length - 1]?.file_id;
}

const extension = (mime: string) =>
  mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
